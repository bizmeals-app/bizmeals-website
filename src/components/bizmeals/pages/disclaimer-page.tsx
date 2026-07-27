'use client'

import LegalPage, { P, UL, LI, Strong, Callout } from './legal-page'

export default function DisclaimerPage() {
  return (
    <LegalPage
      slug="disclaimer"
      badge="Disclaimer"
      title="Disclaimer"
      subtitle="Important limitations, warranties, and risk disclosures for BizMeals' website and services."
      lastUpdated="1 January 2026"
      intro={
        <P>
          The information and materials provided by <Strong>BizMeals</Strong> on this website and through
          our services are for general informational and business purposes only. By accessing our website or
          engaging our services, you acknowledge and accept the disclaimers outlined below.
        </P>
      }
      sections={[
        {
          id: 'general-information',
          heading: 'General Information Disclaimer',
          body: (
            <>
              <P>
                All information on this website is provided in good faith and is believed to be accurate at
                the time of publication. However, BizMeals makes no representation or warranty of any kind,
                express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or
                completeness of any information on the site. Your reliance on such information is strictly at
                your own risk.
              </P>
            </>
          ),
        },
        {
          id: 'no-guarantee-of-results',
          heading: 'No Guarantee of Results',
          body: (
            <>
              <P>
                BizMeals provides growth-oriented services including digital marketing, consultancy, BPO,
                website development, and training. While we apply industry best practices and our expertise
                to every engagement, <Strong>we do not guarantee specific outcomes</Strong>, including but
                not limited to:
              </P>
              <UL>
                <LI>Search engine rankings or traffic levels;</LI>
                <LI>Lead volumes, conversion rates, or sales figures;</LI>
                <LI>Return on ad spend (ROAS) or revenue growth;</LI>
                <LI>Approval of ads by third-party platforms;</LI>
                <LI>Business outcomes resulting from consultancy advice.</LI>
              </UL>
              <Callout type="warning">
                Marketing and business results depend on numerous factors beyond our control &mdash;
                including market conditions, product-market fit, pricing, competition, and platform
                algorithms. Past performance is not indicative of future results.
              </Callout>
            </>
          ),
        },
        {
          id: 'professional-advice',
          heading: 'Not Professional Advice',
          body: (
            <>
              <P>
                The content on this website and the outputs of our consultancy services do not constitute{' '}
                <Strong>legal, financial, tax, investment, or medical advice</Strong>. You should consult a
                qualified professional before making decisions based on information provided by BizMeals. We
                are not liable for any actions taken or not taken in reliance on such information.
              </P>
            </>
          ),
        },
        {
          id: 'third-party-links',
          heading: 'Third-Party Links & Content',
          body: (
            <>
              <P>
                Our website may contain links to third-party websites, tools, and services that are not
                owned or controlled by BizMeals. We have no control over and assume no responsibility for
                the content, privacy policies, or practices of any third-party sites. We do not warrant the
                accuracy or reliability of any information on third-party sites.
              </P>
            </>
          ),
        },
        {
          id: 'testimonials',
          heading: 'Testimonials & Case Studies',
          body: (
            <>
              <P>
                Testimonials, case studies, and portfolio entries on our website reflect the experiences and
                results of specific clients in specific contexts. They are not a promise or guarantee of
                similar results for any other client. Actual results vary based on numerous factors unique
                to each business and engagement.
              </P>
            </>
          ),
        },
        {
          id: 'external-platforms',
          heading: 'Third-Party Platforms & Policies',
          body: (
            <>
              <P>
                Our services may involve the use of third-party platforms such as Google Ads, Meta
                (Facebook/Instagram), LinkedIn, YouTube, and analytics tools. BizMeals is not responsible
                for the actions, policies, or changes of these platforms, including ad rejections, account
                suspensions, algorithm updates, or data-accuracy issues. Clients must comply with the terms
                of service of each platform used.
              </P>
            </>
          ),
        },
        {
          id: 'website-availability',
          heading: 'Website Availability Disclaimer',
          body: (
            <>
              <P>
                BizMeals strives to keep the website accessible and up-to-date, but we do not warrant that
                the website will be uninterrupted, error-free, or free from harmful components. We may
                modify, suspend, or discontinue any part of the website at any time without notice. Under no
                circumstances shall we be liable for any downtime or loss arising from website
                unavailability.
              </P>
            </>
          ),
        },
        {
          id: 'limitation-of-liability',
          heading: 'Limitation of Liability',
          body: (
            <>
              <P>
                To the fullest extent permitted by law, BizMeals, its officers, employees, partners, and
                affiliates shall not be liable for any direct, indirect, incidental, consequential, special,
                or exemplary damages arising from your use of the website or services, including but not
                limited to loss of profits, data, goodwill, or business interruption. This limitation
                applies even if we have been advised of the possibility of such damages.
              </P>
            </>
          ),
        },
        {
          id: 'intellectual-property',
          heading: 'Intellectual Property Disclaimer',
          body: (
            <>
              <P>
                All content on this website &mdash; including text, graphics, logos, images, and software
                &mdash; is the property of BizMeals or its content creators and is protected by Indian and
                international intellectual-property laws. Unauthorised use, reproduction, or distribution of
                any content is prohibited.
              </P>
            </>
          ),
        },
        {
          id: 'force-majeure',
          heading: 'Force Majeure',
          body: (
            <>
              <P>
                BizMeals shall not be held liable for any delay or failure in performance resulting from
                events beyond our reasonable control, including but not limited to acts of God, natural
                disasters, pandemics, war, terrorism, civil unrest, government actions, labour disputes,
                power outages, internet or telecommunications failures, and cyberattacks.
              </P>
            </>
          ),
        },
        {
          id: 'changes',
          heading: 'Changes to This Disclaimer',
          body: (
            <>
              <P>
                We reserve the right to update or modify this Disclaimer at any time. Changes are effective
                immediately upon posting on this page. Your continued use of the website or services after
                any changes constitutes acceptance of the revised Disclaimer.
              </P>
            </>
          ),
        },
        {
          id: 'contact',
          heading: 'Contact Us',
          body: (
            <>
              <P>If you have any questions about this Disclaimer, please contact us:</P>
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
