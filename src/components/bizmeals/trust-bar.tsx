'use client'

const row1Names = [
  'TechCorp', 'EduVerse', 'FreshMart', 'HealthFirst',
  'StartupHub', 'BuildRight', 'GreenLeaf', 'RetailPro',
  'DigiScale', 'NexGen',
]

const row2Names = [
  'CloudPeak', 'UrbanEats', 'FinEdge', 'MedPro',
  'FoodChain', 'StyleHub', 'AutoDrive', 'DataNest',
  'SkillForge', 'TradeLink',
]

function MarqueeRow({ names, reverse = false }: { names: string[]; reverse?: boolean }) {
  const duplicated = [...names, ...names]

  return (
    <div className="relative overflow-hidden" role="marquee" aria-label="Trusted partners">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className={`flex items-center ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {duplicated.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex items-center gap-2 mx-6 md:mx-8 shrink-0"
          >
            <span className="text-sm uppercase tracking-widest text-muted-foreground/30 font-medium whitespace-nowrap">
              {name}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-biz-orange/30 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TrustBar() {
  return (
    <section
      className="py-10 relative overflow-hidden"
      aria-label="Trusted by leading companies"
    >
      {/* Subtle section glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-biz-orange/20 to-transparent" />

      <div className="space-y-4">
        <MarqueeRow names={row1Names} />
        <MarqueeRow names={row2Names} reverse />
      </div>

      {/* Bottom subtle glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-biz-teal/15 to-transparent" />
    </section>
  )
}
