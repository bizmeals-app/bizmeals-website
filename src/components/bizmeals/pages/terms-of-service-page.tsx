'use client'

import LegalPage, { P, UL, OL, LI, Strong, Callout } from './legal-page'

export default function TermsOfServicePage() {
  return (
    <LegalPage
      slug="terms-of-service"
      badge="Terms & Conditions"
      title="Terms & Conditions"
      subtitle="The terms that govern your use of BizMeals' website and services."
      lastUpdated="1 January 2026"
      intro={
        <P>
          These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the website
          and services provided by <Strong>BizMeals</Strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;).
          By accessing our website or engaging our services, you (&ldquo;you&rdquo;, &ldquo;Client&rdquo;,
          &ldquo;User&rdquo;) agree to be bound by these Terms. If you do not agree, please discontinue use
          of our website and services.
        </P>
      }
      sections={[
        {
          id: 'definitions',
          heading: 'Definitions',
          body: (
            <>
              <UL>
                <LI><Strong>&ldquo;Services&rdquo;</Strong> refers to digital marketing, consultancy, BPO, event management, website development, training programs, and any other offerings provided by BizMeals.</LI>
                <LI><Strong>&ldquo;Website&rdquo;</Strong> refers to bizmeals.in and all its sub-domains.</LI>
                <LI><Strong>&ldquo;Engagement&rdquo;</Strong> refers to a specific project or ongoing service relationship formalised through a proposal, statement of work, or signed agreement.</LI>
                <LI><Strong>&ldquo;Deliverables&rdquo;</Strong> refers to the work product, reports, designs, code, content, or other materials we create for you.</LI>
                <LI><Strong>&ldquo;Confidential Information&rdquo;</Strong> refers to non-public information shared between the parties.</LI>
              </UL>
            </>
          ),
        },
        {
          id: 'acceptance-of-terms',
          heading: 'Acceptance of Terms',
          body: (
            <>
              <P>
                By using our Website or Services, you confirm that you are at least 18 years old and have
                the legal capacity to enter into these Terms. If you are entering into an Engagement on
                behalf of a company, you represent that you have the authority to bind that entity.
              </P>
            </>
          ),
        },
        {
          id: 'use-of-website',
          heading: 'Use of Our Website',
          body: (
            <>
              <P>You agree to use our Website only for lawful purposes. You must not:</P>
              <UL>
                <LI>Use the Website in any way that breaches applicable Indian or international law;</LI>
                <LI>Attempt to gain unauthorised access to any part of the Website, its systems, or networks;</LI>
                <LI>Introduce viruses, malware, or any other malicious code;</LI>
                <LI>Scrape, copy, or redistribute Website content without our written permission;</LI>
                <LI>Impersonate another person or misrepresent your affiliation;</LI>
                <LI>Use automated tools to overload or disrupt the Website.</LI>
              </UL>
              <P>
                We may suspend or terminate access at any time if we believe you have violated these Terms.
              </P>
            </>
          ),
        },
        {
          id: 'engagements',
          heading: 'Engagements & Statements of Work',
          body: (
            <>
              <P>
                Each Engagement is governed by a separate proposal, statement of work (SOW), or signed
                agreement that specifies the scope, deliverables, timelines, fees, and payment terms. In
                the event of a conflict between these Terms and an SOW, the SOW prevails for that
                Engagement.
              </P>
              <Callout>
                These Terms form the baseline framework. Specific commercial terms (pricing, scope,
                timelines) are always defined in the applicable SOW or invoice.
              </Callout>
            </>
          ),
        },
        {
          id: 'client-responsibilities',
          heading: 'Client Responsibilities',
          body: (
            <>
              <P>To enable us to deliver the Services effectively, you agree to:</P>
              <UL>
                <LI>Provide accurate, timely information and access to required accounts, assets, and systems;</LI>
                <LI>Respond to our requests for feedback and approvals within agreed timeframes;</LI>
                <LI>Ensure you have the rights to any content, branding, or data you provide to us;</LI>
                <LI>Comply with the policies of third-party platforms (e.g., Google Ads, Meta) involved in the Engagement;</LI>
                <LI>Make timely payments as per the agreed schedule.</LI>
              </UL>
              <P>
                Delays caused by the Client in providing inputs or approvals may affect timelines, and we
                will not be liable for resultant delays.
              </P>
            </>
          ),
        },
        {
          id: 'fees-and-payment',
          heading: 'Fees, Invoicing & Payment',
          body: (
            <>
              <P>
                Fees for Services are as specified in the applicable SOW or invoice. Unless otherwise
                agreed:
              </P>
              <UL>
                <LI>Invoices are payable within <Strong>15 days</Strong> of issuance;</LI>
                <LI>Retainer-based Engagements are billed monthly in advance;</LI>
                <LI>Project-based Engagements may require an advance (typically 40&ndash;50%) before work begins;</LI>
                <LI>Applicable taxes (including GST) are added as per law;</LI>
                <LI>Overdue payments may attract interest of 1.5% per month or the maximum permitted by law.</LI>
              </UL>
              <P>
                See our <Strong>Refund &amp; Cancellation Policy</Strong> for details on cancellations and
                refunds.
              </P>
            </>
          ),
        },
        {
          id: 'deliverables-and-ip',
          heading: 'Deliverables & Intellectual Property',
          body: (
            <>
              <P>
                Upon full payment of all fees due for an Engagement, ownership of the final Deliverables
                transfers to the Client, except for:
              </P>
              <UL>
                <LI>Our pre-existing methodologies, templates, frameworks, and tools;</LI>
                <LI>Third-party libraries, fonts, or assets used under licence;</LI>
                <LI>Underlying know-how and aggregated, anonymised learnings.</LI>
              </UL>
              <P>
                We retain a perpetual, royalty-free licence to display completed work in our portfolio and
                marketing materials unless you request otherwise in writing. Until full payment is received,
                we retain ownership and a lien over all Deliverables.
              </P>
            </>
          ),
        },
        {
          id: 'confidentiality',
          heading: 'Confidentiality',
          body: (
            <>
              <P>
                Both parties agree to keep each other&apos;s Confidential Information confidential and to
                use it solely for the purpose of the Engagement. This obligation survives termination of
                the Engagement for a period of <Strong>3 years</Strong>. Confidential Information does not
                include information that is public, independently developed, or rightfully received from a
                third party without restriction.
              </P>
            </>
          ),
        },
        {
          id: 'warranties-and-disclaimers',
          heading: 'Warranties & Disclaimers',
          body: (
            <>
              <P>
                We warrant that the Services will be performed in a professional, workmanlike manner
                consistent with industry standards. Except for this express warranty, the Services and
                Website are provided <Strong>&ldquo;as is&rdquo;</Strong>. To the fullest extent permitted
                by law, we disclaim all other warranties, express or implied, including warranties of
                merchantability, fitness for a particular purpose, and non-infringement.
              </P>
              <Callout type="warning">
                Marketing and advertising results depend on many factors outside our control, including
                market conditions, product-market fit, and platform algorithms. We do not guarantee
                specific revenue, rankings, lead volumes, or return on ad spend.
              </Callout>
            </>
          ),
        },
        {
          id: 'limitation-of-liability',
          heading: 'Limitation of Liability',
          body: (
            <>
              <P>
                To the maximum extent permitted by law, in no event shall BizMeals be liable for any
                indirect, incidental, special, consequential, or punitive damages, or any loss of profits,
                data, business, or goodwill, arising out of or related to the Services or these Terms.
              </P>
              <P>
                Our total aggregate liability arising out of or related to an Engagement shall not exceed
                the total fees paid by the Client to us under that Engagement in the <Strong>3 months</Strong>{' '}
                preceding the event giving rise to the claim. This limitation does not apply to liability
                that cannot be limited under applicable law (e.g., gross negligence, wilful misconduct).
              </P>
            </>
          ),
        },
        {
          id: 'term-and-termination',
          heading: 'Term & Termination',
          body: (
            <>
              <P>
                These Terms remain in effect while you use our Website or Services. An Engagement continues
                for its stated term unless terminated earlier by:
              </P>
              <UL>
                <LI><Strong>Mutual written agreement;</Strong></LI>
                <LI><Strong>Material breach</Strong> by either party, uncured within 15 days of written notice;</LI>
                <LI><Strong>Immediate termination</Strong> for non-payment, fraud, or breach of confidentiality; or</LI>
                <LI><Strong>Convenience</Strong> with 30 days&apos; prior written notice (subject to payment for work completed).</LI>
              </UL>
              <P>
                Upon termination, you must pay for all Services rendered and expenses incurred up to the
                termination date. Provisions that by their nature should survive &mdash; including
                confidentiality, intellectual property, and liability &mdash; shall remain in effect.
              </P>
            </>
          ),
        },
        {
          id: 'indemnification',
          heading: 'Indemnification',
          body: (
            <>
              <P>
                You agree to indemnify and hold harmless BizMeals, its officers, employees, and partners
                from any claims, damages, losses, or expenses (including reasonable legal fees) arising
                from: (a) your breach of these Terms; (b) your content or materials provided to us; (c)
                your violation of any law or third-party right; or (d) your use of the Deliverables.
              </P>
            </>
          ),
        },
        {
          id: 'governing-law',
          heading: 'Governing Law & Dispute Resolution',
          body: (
            <>
              <P>
                These Terms and any dispute arising out of them shall be governed by the laws of{' '}
                <Strong>India</Strong>, with courts in <Strong>Bengaluru, Karnataka</Strong> having
                exclusive jurisdiction, subject to the following dispute-resolution process:
              </P>
              <OL>
                <LI><Strong>Negotiation:</Strong> The parties shall first attempt to resolve the dispute amicably within 30 days.</LI>
                <LI><Strong>Mediation:</Strong> If unresolved, the parties shall attempt mediation under the Mediation Act, 2023.</LI>
                <LI><Strong>Arbitration:</Strong> If still unresolved, the dispute shall be referred to a sole arbitrator under the Arbitration and Conciliation Act, 1996. The seat and venue shall be Bengaluru. Proceedings shall be in English.</LI>
              </OL>
            </>
          ),
        },
        {
          id: 'changes-to-terms',
          heading: 'Changes to These Terms',
          body: (
            <>
              <P>
                We may revise these Terms at any time. The updated Terms will be posted on this page with a
                revised &ldquo;Last Updated&rdquo; date. Your continued use of the Website or Services after
                changes take effect constitutes acceptance of the revised Terms.
              </P>
            </>
          ),
        },
        {
          id: 'contact',
          heading: 'Contact Us',
          body: (
            <>
              <P>For questions about these Terms, please contact us:</P>
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
