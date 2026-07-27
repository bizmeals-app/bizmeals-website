import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface RouteContext {
  params: Promise<{ slug: string }>
}

// POST /api/forms/[slug]/submit - Public form submission
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params

    // Find the form by slug
    const form = await db.customForm.findUnique({ where: { slug } })

    if (!form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 })
    }

    if (!form.published) {
      return NextResponse.json({ error: 'This form is no longer accepting submissions' }, { status: 400 })
    }

    // Parse field definitions
    let fields: Array<{
      id: string
      type: string
      label: string
      required: boolean
      options?: string[]
    }> = []

    try {
      fields = JSON.parse(form.fields)
    } catch {
      fields = []
    }

    // Parse submitted data
    const body = await request.json()

    // Validate required fields
    const errors: Array<{ field: string; message: string }> = []

    for (const field of fields) {
      const value = body[field.id]
      const isEmpty = value === undefined || value === null || String(value).trim() === ''

      if (field.required && isEmpty) {
        errors.push({
          field: field.id,
          message: `${field.label} is required`,
        })
      }

      // Basic type validation
      if (!isEmpty && value !== undefined) {
        if (field.type === 'email' && !String(value).includes('@')) {
          errors.push({
            field: field.id,
            message: `${field.label} must be a valid email address`,
          })
        }
        if (field.type === 'number' && isNaN(Number(value))) {
          errors.push({
            field: field.id,
            message: `${field.label} must be a valid number`,
          })
        }
        if (field.type === 'url') {
          try {
            new URL(String(value))
          } catch {
            errors.push({
              field: field.id,
              message: `${field.label} must be a valid URL`,
            })
          }
        }
        if (field.type === 'select' && field.options?.length && !field.options.includes(String(value))) {
          errors.push({
            field: field.id,
            message: `${field.label} has an invalid selection`,
          })
        }
      }
    }

    if (errors.length > 0) {
      return NextResponse.json({ error: 'Validation failed', errors }, { status: 422 })
    }

    // Build submission data — only include values for defined fields
    const data: Record<string, unknown> = {}
    for (const field of fields) {
      if (body[field.id] !== undefined) {
        data[field.id] = body[field.id]
      }
    }

    // Save the submission
    await db.customFormSubmission.create({
      data: {
        formId: form.id,
        data: JSON.stringify(data),
      },
    })

    return NextResponse.json({
      success: true,
      message: form.successMsg,
    })
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
