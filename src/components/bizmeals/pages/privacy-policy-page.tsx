'use client'

import LegalPage, { P, UL, LI, Strong, Callout } from './legal-page'

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      slug="privacy-policy"
      badge="Privacy Policy"
      title="Privacy Policy"
      subtitle="How BizMeals collects, uses, stores, and protects your personal information."
      lastUpdated="1 January 2026"
      intro={
        <P>
          <Strong>BizMeals</Strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting your
          privacy. This Privacy Policy explains what personal information we collect, how we use it, and the
          choices you have. This policy applies to our website, our digital marketing, consultancy, BPO,
          training, and related services. This policy is published in compliance with the{' '}
          <Strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</Strong> of India and applicable
          information-technology rules.
        </P>
      }
      sections={[
        {
          id: 'information-we-collect',
          heading: 'Information We Collect',
          body: (
            <>
              <P>We collect information in the following broad categories:</P>
              <UL>
                <LI>
                  <Strong>Information you provide directly:</Strong> Your name, email address, phone number,
                  company name, designation, and any details you share when you fill out a contact form,
                  request a consultation, subscribe to our newsletter, apply for a job, or enrol in a
                  training program.
                </LI>
                <LI>
                  <Strong>Business information:</Strong> When you engage our services, we may collect
                  business details such as your website, industry, marketing goals, ad-account access,
                  and any assets or credentials required to deliver the engagement.
                </LI>
                <LI>
                  <Strong>Payment information:</Strong> Billing name, address, GSTIN, and transaction
                  references. Card numbers and net-banking credentials are handled entirely by our
                  payment gateway partners and are never stored on our servers.
                </LI>
                <LI>
                  <Strong>Technical information:</Strong> IP address, browser type and version, device
                  identifiers, operating system, referring URLs, pages visited, and time spent on pages,
                  collected through cookies and similar technologies.
                </LI>
                <LI>
                  <Strong>Communications:</Strong> Records of emails, WhatsApp messages, support tickets,
                  and call notes created when you interact with our team.
                </LI>
              </UL>
              <Callout>
                We do <Strong>not</Strong> collect or process sensitive personal data such as Aadhaar
                numbers, biometrics, or health information unless explicitly required for a specific
                regulated service and provided with your consent.
              </Callout>
            </>
          ),
        },
        {
          id: 'how-we-use-information',
          heading: 'How We Use Your Information',
          body: (
            <>
              <P>We use your personal information for the following lawful purposes:</P>
              <UL>
                <LI>To respond to your enquiries and provide consultations, proposals, and quotes.</LI>
                <LI>To deliver, manage, and improve the services you have engaged us for.</LI>
                <LI>To process payments, issue invoices, and maintain accounting and tax records.</LI>
                <LI>To communicate with you about your project, renewals, and relevant updates.</LI>
                <LI>To send marketing communications, newsletters, and event invitations (only with your
                  consent, which you may withdraw at any time).</LI>
                <LI>To analyse and improve our website, services, and marketing performance.</LI>
                <LI>To detect, prevent, and address fraud, security issues, and policy violations.</LI>
                <LI>To comply with legal, regulatory, and contractual obligations.</LI>
              </UL>
              <P>
                We process your information on the basis of <Strong>consent</Strong>,{' '}
                <Strong>contractual necessity</Strong>, <Strong>legal obligation</Strong>, and our{' '}
                <Strong>legitimate business interests</Strong> in operating and securing our services.
              </P>
            </>
          ),
        },
        {
          id: 'legal-basis',
          heading: 'Legal Basis for Processing',
          body: (
            <>
              <P>
                Under the DPDP Act, 2023, we process your personal data only when we have a valid legal
                ground. Specifically, we process your data when:
              </P>
              <UL>
                <LI>You have given clear, specific, and informed consent for a particular purpose;</LI>
                <LI>Processing is necessary for the performance of a contract or engagement you have with us;</LI>
                <LI>Processing is required to comply with a legal or regulatory obligation; or</LI>
                <LI>Processing is necessary for a legitimate purpose that does not override your rights
                  and interests.</LI>
              </UL>
              <P>
                You may withdraw your consent at any time by contacting us at the details provided below.
                Withdrawing consent will not affect the lawfulness of processing carried out before withdrawal.
              </P>
            </>
          ),
        },
        {
          id: 'information-sharing',
          heading: 'Sharing & Disclosure',
          body: (
            <>
              <P>
                We do <Strong>not sell</Strong> your personal information. We may share it only in the
                following limited circumstances:
              </P>
              <UL>
                <LI>
                  <Strong>Service providers &amp; sub-processors:</Strong> Trusted third parties that
                  support our operations &mdash; such as cloud-hosting providers, email and analytics
                  platforms, payment gateways, CRM tools, and ad-platform partners &mdash; under written
                  agreements requiring confidentiality and data protection.
                </LI>
                <LI>
                  <Strong>Client engagements:</Strong> When you refer us to a partner or when delivering
                  services, only the minimum information necessary to perform the engagement is shared.
                </LI>
                <LI>
                  <Strong>Legal compliance:</Strong> If required by law, court order, or government
                  authority, or to protect our rights, property, or safety.
                </LI>
                <LI>
                  <Strong>Business transfers:</Strong> In the event of a merger, acquisition, or asset
                  sale, information may be transferred subject to the protections of this policy.
                </LI>
              </UL>
              <P>
                When sharing data with third parties, we require them to handle it in accordance with
                applicable data-protection laws and this policy.
              </P>
            </>
          ),
        },
        {
          id: 'data-retention',
          heading: 'Data Retention',
          body: (
            <>
              <P>
                We retain personal information only for as long as necessary to fulfil the purposes
                outlined in this policy, unless a longer retention period is required by law. General
                retention guidelines:
              </P>
              <UL>
                <LI><Strong>Active client records:</Strong> For the duration of the engagement plus 7 years for accounting and tax compliance.</LI>
                <LI><Strong>Marketing contacts:</Strong> Until you unsubscribe or until 2 years of inactivity, whichever is earlier.</LI>
                <LI><Strong>Job applications:</Strong> Up to 24 months unless you request earlier deletion.</LI>
                <LI><Strong>Website &amp; analytics logs:</Strong> Up to 13 months.</LI>
                <LI><Strong>Backups:</Strong> Securely overwritten on a rolling schedule.</LI>
              </UL>
              <P>
                After the retention period, data is securely deleted or anonymised so it can no longer
                identify you.
              </P>
            </>
          ),
        },
        {
          id: 'data-security',
          heading: 'Data Security',
          body: (
            <>
              <P>
                We implement industry-standard technical, administrative, and physical safeguards to
                protect your personal information against unauthorised access, alteration, disclosure, or
                destruction. These measures include:
              </P>
              <UL>
                <LI>Encryption of data in transit (TLS) and at rest where applicable.</LI>
                <LI>Role-based access controls and multi-factor authentication for internal systems.</LI>
                <LI>Regular security reviews and staff training on data protection.</LI>
                <LI>Vetted, contractually-bound sub-processors with confidentiality obligations.</LI>
                <LI>Incident-response procedures for suspected breaches.</LI>
              </UL>
              <Callout type="warning">
                No method of transmission or storage is 100% secure. While we strive to protect your
                information, we cannot guarantee absolute security.
              </Callout>
            </>
          ),
        },
        {
          id: 'your-rights',
          heading: 'Your Rights & Choices',
          body: (
            <>
              <P>Under applicable law, you have the following rights regarding your personal data:</P>
              <UL>
                <LI><Strong>Access &amp; portability:</Strong> Request a copy of the personal data we hold about you.</LI>
                <LI><Strong>Correction:</Strong> Request correction of inaccurate or incomplete data.</LI>
                <LI><Strong>Erasure:</Strong> Request deletion of your data, subject to legal retention obligations.</LI>
                <LI><Strong>Withdrawal of consent:</Strong> Withdraw consent for processing at any time.</LI>
                <LI><Strong>Objection &amp; restriction:</Strong> Object to or restrict certain processing activities.</LI>
                <LI><Strong>Grievance redressal:</Strong> Lodge a complaint with our Grievance Officer or the Data Protection Board of India.</LI>
              </UL>
              <P>
                To exercise any of these rights, email{' '}
                <a href="mailto:info@bizmeals.in" className="text-[#0F2557] font-bold underline decoration-[#F5A623] underline-offset-2 hover:text-[#F5A623] transition-colors">info@bizmeals.in</a>.
                We will respond within the timeframes prescribed by law (typically 30 days).
              </P>
            </>
          ),
        },
        {
          id: 'cookies',
          heading: 'Cookies & Tracking Technologies',
          body: (
            <>
              <P>
                We use cookies and similar technologies to operate, secure, and analyse our website and to
                personalise your experience. This includes essential cookies (required for the site to
                function), analytics cookies (to understand usage), and marketing cookies (to measure ad
                performance). You can control cookies through your browser settings, and our{' '}
                <Strong>Cookie Policy</Strong> provides further detail.
              </P>
            </>
          ),
        },
        {
          id: 'childrens-privacy',
          heading: "Children's Privacy",
          body: (
            <>
              <P>
                Our services are intended for businesses and professionals. We do not knowingly collect
                personal information from children under 18. If you believe a child has provided us with
                personal data, please contact us and we will promptly delete it.
              </P>
            </>
          ),
        },
        {
          id: 'international-transfers',
          heading: 'International Data Transfers',
          body: (
            <>
              <P>
                BizMeals is headquartered in India. Some of our service providers may process data outside
                India. Where this occurs, we ensure that appropriate safeguards &mdash; such as standard
                contractual clauses and the transfer-impact assessments required under the DPDP Act &mdash;
                are in place to protect your information.
              </P>
            </>
          ),
        },
        {
          id: 'grievance-officer',
          heading: 'Grievance Officer',
          body: (
            <>
              <P>
                In compliance with the DPDP Act, 2023, we have appointed a Grievance Officer to address
                concerns regarding the processing of your personal data:
              </P>
              <Callout>
                <Strong>Grievance Officer &mdash; BizMeals</Strong>
                <br />
                Email: <a href="mailto:info@bizmeals.in" className="font-bold underline decoration-[#F5A623] underline-offset-2">info@bizmeals.in</a>
                <br />
                Phone: +91 8217330484
                <br />
                Address: Bangalore, Karnataka, India
              </Callout>
              <P>
                You may also lodge a complaint with the <Strong>Data Protection Board of India</Strong> if
                you are not satisfied with our response.
              </P>
            </>
          ),
        },
        {
          id: 'changes',
          heading: 'Changes to This Policy',
          body: (
            <>
              <P>
                We may update this Privacy Policy from time to time to reflect changes in our practices,
                services, or legal requirements. The &ldquo;Last Updated&rdquo; date at the top of this page
                indicates when the policy was last revised. Material changes will be highlighted on our
                website. Continued use of our services after a change constitutes acceptance of the updated
                policy.
              </P>
            </>
          ),
        },
        {
          id: 'contact',
          heading: 'Contact Us',
          body: (
            <>
              <P>If you have any questions about this Privacy Policy or our data practices, please contact us:</P>
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
