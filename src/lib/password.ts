// Secure password hashing using Web Crypto API (works on Vercel + Node.js)
// No external dependencies needed - uses PBKDF2 with 100,000 iterations

const ITERATIONS = 100000
const KEY_LENGTH = 64 // 512 bits
const SALT_LENGTH = 32

function arrayBufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

function hexToArrayBuffer(hex: string): ArrayBuffer {
  const bytes = new Uint8Array(hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)))
  return bytes.buffer
}

export async function hashPassword(password: string): Promise<string> {
  // Generate a random salt
  const salt = new Uint8Array(SALT_LENGTH)
  crypto.getRandomValues(salt)
  const saltHex = arrayBufferToHex(salt.buffer)

  // Derive key using PBKDF2
  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: ITERATIONS,
      hash: 'SHA-512',
    },
    keyMaterial,
    KEY_LENGTH * 8
  )

  const hashHex = arrayBufferToHex(derivedBits)
  // Format: iterations$salt$hash
  return `${ITERATIONS}$${saltHex}$${hashHex}`
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const parts = storedHash.split('$')
  if (parts.length !== 3) return false

  const iterations = parseInt(parts[0])
  const saltHex = parts[1]
  const originalHash = parts[2]

  const salt = hexToArrayBuffer(saltHex)

  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: iterations,
      hash: 'SHA-512',
    },
    keyMaterial,
    KEY_LENGTH * 8
  )

  const newHash = arrayBufferToHex(derivedBits)
  return newHash === originalHash
}

// Legacy hash verification (for backwards compatibility with old hashes)
function legacyHash(password: string): string {
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  const salt = 'bizmeals2025'
  let hash2 = 0
  const combined = password + salt + hash.toString(36)
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i)
    hash2 = ((hash2 << 5) - hash2) + char
    hash2 = hash2 & hash2
  }
  return Math.abs(hash).toString(36) + Math.abs(hash2).toString(36) + 'h'
}

// Check if a hash is in legacy format
function isLegacyHash(hash: string): boolean {
  // Legacy hashes don't contain '$' and end with 'h'
  return !hash.includes('$') && hash.endsWith('h')
}

// Smart verify: supports both new and legacy hash formats
export async function smartVerifyPassword(password: string, storedHash: string): Promise<boolean> {
  if (isLegacyHash(storedHash)) {
    return legacyHash(password) === storedHash
  }
  return verifyPassword(password, storedHash)
}
