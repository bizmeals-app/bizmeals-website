'use client'

import LegalPage, { P, UL, LI, Strong, Callout } from './legal-page'

export default function RefundPolicyPage() {
  return (
    <LegalPage
      slug="refund-policy"
      badge="Refund & Cancellation"
      title="Refund & Cancellation Policy"
      subtitle="Our policy for cancellations, refunds, and billing adjustments."
      lastUpdated="1 January 2026"
      intro={
        <P>
          At <Strong>BizMeals</Strong>, we want every client to be confident in their investment. This
          Refund &amp; Cancellation Policy explains how cancellations and refunds work for our digital
          marketing, consultancy, BPO, event management, website development, and training services. This
          policy is published in compliance with the <Strong>Consumer Protection Act, 2019</Strong> and
          applicable e-commerce rules of India.
        </P>
      }
      sections={[
        {
          id: 'general-principles',
          heading: 'General Principles',
          body: (
            <>
              <P>
                Because our services are largely time-based and tailored to each client, refunds are
                evaluated based on the work completed up to the point of cancellation. The following
                principles apply across all service lines:
              </P>
              <UL>
                <LI>Fees for work already performed and third-party costs already incurred are non-refundable.</LI>
                <LI>Refunds, where applicable, are issued to the original payment method within <Strong>10&ndash;15 business days</Strong>.</LI>
                <LI>All cancellation requests must be sent in writing to <a href="mailto:info@bizmeals.in" className="text-[#0F2557] font-bold underline decoration-[#F5A623] underline-offset-2 hover:text-[#F5A623] transition-colors">info@bizmeals.in</a>.</LI>
                <LI>Statutory taxes (GST) paid to the government cannot be refunded by us; they are adjusted against any refund.</LI>
              </UL>
            </>
          ),
        },
        {
          id: 'retainer-services',
          heading: 'Retainer-Based Services (Marketing, BPO, Consultancy)',
          body: (
            <>
              <P>
                Retainer-based engagements (e.g., monthly digital marketing or BPO services) can be
                cancelled with <Strong>15 days&apos; written notice</Strong> before the next billing cycle.
              </P>
              <UL>
                <LI><Strong>Advance-paid retainers:</Strong> If you cancel mid-cycle, you will be charged for the services rendered up to the cancellation date on a pro-rata basis, and the balance will be refunded.</LI>
                <LI><Strong>Post-paid retainers:</Strong> You will be invoiced only for services rendered up to the cancellation date.</LI>
                <LI><Strong>Minimum commitment:</Strong> If your SOW includes a minimum commitment period, early cancellation may attract an early-termination fee as specified in the SOW.</LI>
                <LI><Strong>Third-party ad spend:</Strong> Amounts already disbursed to ad platforms (Google, Meta, etc.) are non-refundable.</LI>
              </UL>
            </>
          ),
        },
        {
          id: 'project-services',
          heading: 'Project-Based Services (Website Development, Events)',
          body: (
            <>
              <P>
                Fixed-scope projects follow a milestone-based payment schedule. Refunds are calculated
                based on completed milestones:
              </P>
              <UL>
                <LI><Strong>Before work begins:</Strong> If you cancel before any work has started, the advance is refundable minus a 10% administrative fee.</LI>
                <LI><Strong>During the project:</Strong> You are billed for completed milestones and work-in-progress up to the cancellation date. The unutilised balance is refunded.</LI>
                <LI><Strong>After delivery:</Strong> No refunds apply to delivered and accepted milestones.</LI>
                <LI><Strong>Third-party costs:</Strong> Domain registrations, hosting, licensed assets, and event bookings already paid for are non-refundable.</LI>
              </UL>
              <Callout>
                Deliverables created up to the point of cancellation remain the property of BizMeals until
                full payment for that work is received, at which point ownership transfers to the client.
              </Callout>
            </>
          ),
        },
        {
          id: 'training-programs',
          heading: 'Training Programs',
          body: (
            <>
              <P>Our training and career programs follow this cancellation schedule:</P>
              <UL>
                <LI><Strong>More than 7 days before the start date:</Strong> Full refund minus a 10% processing fee.</LI>
                <LI><Strong>3&ndash;7 days before the start date:</Strong> 50% refund.</LI>
                <LI><strong>Less than 3 days before the start date:</strong> No refund, but you may transfer your seat to another person once.</LI>
                <LI><Strong>After the program begins:</Strong> No refund for sessions already conducted; pro-rata refund for the remaining sessions only if BizMeals cancels.</LI>
              </UL>
              <P>
                If BizMeals cancels a program, you will receive a full refund or the option to transfer to
                the next scheduled batch.
              </P>
            </>
          ),
        },
        {
          id: 'events',
          heading: 'Event Management',
          body: (
            <>
              <P>
                For events we organise on your behalf, refunds depend on the cancellation timeline relative
                to the event date and the recoverability of committed costs:
              </P>
              <UL>
                <LI><Strong>60+ days before the event:</Strong> Refund of unspent funds minus a 15% coordination fee.</LI>
                <LI><Strong>30&ndash;60 days before:</Strong> Refund of unspent funds minus committed vendor costs and a 25% coordination fee.</LI>
                <LI><Strong>Less than 30 days before:</Strong> Refund of only the recoverable portion of vendor costs; most committed expenses are non-refundable at this stage.</LI>
              </UL>
            </>
          ),
        },
        {
          id: 'non-refundable-items',
          heading: 'Non-Refundable Items',
          body: (
            <>
              <P>The following are expressly non-refundable:</P>
              <UL>
                <LI>Third-party ad spend already disbursed to advertising platforms;</LI>
                <LI>Domain registrations, SSL certificates, and annual hosting fees once activated;</LI>
                <LI>Licensed software, fonts, stock images, and premium plugins;</LI>
                <LI>Work hours already expended on strategy, design, development, or consulting;</LI>
                <LI>Government taxes and fees (e.g., GST) already remitted;</LI>
                <LI>Committed vendor payments for events and productions.</LI>
              </UL>
            </>
          ),
        },
        {
          id: 'how-to-cancel',
          heading: 'How to Request a Cancellation or Refund',
          body: (
            <>
              <P>To request a cancellation or refund, please:</P>
              <UL>
                <LI>Send an email to <a href="mailto:info@bizmeals.in" className="text-[#0F2557] font-bold underline decoration-[#F5A623] underline-offset-2 hover:text-[#F5A623] transition-colors">info@bizmeals.in</a> with the subject line &ldquo;Cancellation Request &mdash; [Your Company/Name]&rdquo;.</LI>
                <LI>Include your invoice number, engagement details, and the reason for cancellation.</LI>
                <LI>Our team will review and respond within <Strong>3 business days</Strong> with the refund amount (if any) and processing timeline.</LI>
              </UL>
              <Callout type="warning">
                Refund requests must be made within <Strong>60 days</Strong> of the original payment.
                Requests beyond this period will be reviewed on a case-by-case basis.
              </Callout>
            </>
          ),
        },
        {
          id: 'billing-errors',
          heading: 'Billing Errors & Disputes',
          body: (
            <>
              <P>
                If you believe you have been charged in error, please notify us in writing within{' '}
                <Strong>15 days</Strong> of the invoice date. We will investigate and, where an error is
                confirmed, issue a refund or credit note promptly. Disputes raised after 15 days are
                presumed to be accepted as accurate.
              </P>
            </>
          ),
        },
        {
          id: 'contact',
          heading: 'Contact Us',
          body: (
            <>
              <P>For cancellation or refund queries, please reach out:</P>
              <UL>
                <LI><Strong>Email:</Strong> info@bizmeals.in</LI>
                <LI><Strong>Phone:</Strong> +91 8217330484</LI>
                <LI><Strong>Address:</Strong> Bangalore, Karnataka, India</LI>
              </UL>
            </>
          ),
        },
      ]}
    />
  )
}
