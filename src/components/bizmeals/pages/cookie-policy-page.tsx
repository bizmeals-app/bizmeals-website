'use client'

import LegalPage, { P, UL, LI, Strong, Callout } from './legal-page'

export default function CookiePolicyPage() {
  return (
    <LegalPage
      slug="cookie-policy"
      badge="Cookie Policy"
      title="Cookie Policy"
      subtitle="How BizMeals uses cookies and similar technologies on this website."
      lastUpdated="1 January 2026"
      intro={
        <P>
          This Cookie Policy explains how <Strong>BizMeals</Strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;)
          uses cookies and similar tracking technologies on our website (bizmeals.in). This policy should
          be read alongside our <Strong>Privacy Policy</Strong>. By using our website, you consent to the
          use of cookies as described here.
        </P>
      }
      sections={[
        {
          id: 'what-are-cookies',
          heading: 'What Are Cookies?',
          body: (
            <>
              <P>
                Cookies are small text files placed on your device by the websites you visit. They are
                widely used to make websites work efficiently and to provide information to site owners.
                Cookies allow a website to remember your actions and preferences over a period of time, so
                you don&apos;t have to re-enter them every time you visit.
              </P>
              <P>
                In addition to cookies, we may use <Strong>web beacons</Strong>, <Strong>pixel tags</Strong>,
                and <Strong>local storage</Strong> &mdash; collectively, &ldquo;tracking technologies&rdquo;
                &mdash; which work in similar ways.
              </P>
            </>
          ),
        },
        {
          id: 'types-of-cookies',
          heading: 'Types of Cookies We Use',
          body: (
            <>
              <P>We use the following categories of cookies:</P>
              <UL>
                <LI>
                  <Strong>Strictly Necessary Cookies:</Strong> Required for the website to function
                  correctly. They enable core features such as security, session management, and
                  accessibility. These cannot be disabled.
                </LI>
                <LI>
                  <Strong>Preference Cookies:</Strong> Remember your settings and choices (e.g., theme,
                  language) to provide a more personalised experience.
                </LI>
                <LI>
                  <Strong>Analytics &amp; Performance Cookies:</Strong> Help us understand how visitors
                  interact with the website so we can improve it. They collect aggregated, anonymised
                  information.
                </LI>
                <LI>
                  <Strong>Marketing &amp; Advertising Cookies:</Strong> Used to deliver relevant
                  advertisements and measure the performance of marketing campaigns, including on
                  third-party platforms.
                </LI>
                <LI>
                  <Strong>Third-Party Cookies:</Strong> Set by external services we use (e.g., Google
                  Analytics, Meta Pixel, LinkedIn Insight Tag) and governed by their respective privacy
                  policies.
                </LI>
              </UL>
            </>
          ),
        },
        {
          id: 'specific-cookies',
          heading: 'Specific Cookies We Set',
          body: (
            <>
              <P>The table below lists the main cookies used on our website:</P>
              <div className="overflow-x-auto -mx-2 px-2">
                <table className="w-full text-[12.5px] border-collapse">
                  <thead>
                    <tr className="bg-[#0F2557] text-white">
                      <th className="text-left px-3 py-2.5 font-bold rounded-l-lg">Cookie</th>
                      <th className="text-left px-3 py-2.5 font-bold">Purpose</th>
                      <th className="text-left px-3 py-2.5 font-bold">Duration</th>
                      <th className="text-left px-3 py-2.5 font-bold rounded-r-lg">Category</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#3A4256]">
                    <tr className="border-b border-[#E5E9F0]">
                      <td className="px-3 py-2.5 font-bold text-[#0F2557]">session_id</td>
                      <td className="px-3 py-2.5">Maintains your browsing session</td>
                      <td className="px-3 py-2.5">Session</td>
                      <td className="px-3 py-2.5">Strictly Necessary</td>
                    </tr>
                    <tr className="border-b border-[#E5E9F0] bg-[#F5F7FA]/50">
                      <td className="px-3 py-2.5 font-bold text-[#0F2557]">theme_pref</td>
                      <td className="px-3 py-2.5">Remembers your display preference</td>
                      <td className="px-3 py-2.5">1 year</td>
                      <td className="px-3 py-2.5">Preference</td>
                    </tr>
                    <tr className="border-b border-[#E5E9F0]">
                      <td className="px-3 py-2.5 font-bold text-[#0F2557]">_ga</td>
                      <td className="px-3 py-2.5">Google Analytics &mdash; distinguishes users</td>
                      <td className="px-3 py-2.5">2 years</td>
                      <td className="px-3 py-2.5">Analytics</td>
                    </tr>
                    <tr className="border-b border-[#E5E9F0] bg-[#F5F7FA]/50">
                      <td className="px-3 py-2.5 font-bold text-[#0F2557]">_ga_*</td>
                      <td className="px-3 py-2.5">Google Analytics 4 &mdash; session state</td>
                      <td className="px-3 py-2.5">2 years</td>
                      <td className="px-3 py-2.5">Analytics</td>
                    </tr>
                    <tr className="border-b border-[#E5E9F0]">
                      <td className="px-3 py-2.5 font-bold text-[#0F2557]">_fbp</td>
                      <td className="px-3 py-2.5">Meta Pixel &mdash; ad delivery &amp; measurement</td>
                      <td className="px-3 py-2.5">90 days</td>
                      <td className="px-3 py-2.5">Marketing</td>
                    </tr>
                    <tr className="bg-[#F5F7FA]/50">
                      <td className="px-3 py-2.5 font-bold text-[#0F2557]">li_sugr</td>
                      <td className="px-3 py-2.5">LinkedIn Insight Tag &mdash; ad performance</td>
                      <td className="px-3 py-2.5">90 days</td>
                      <td className="px-3 py-2.5">Marketing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <P className="mt-3 text-[12px] text-[#5A6478]">
                This list is indicative and may be updated as we add or modify services. Some cookies may
                also be set by third-party tools embedded in our pages.
              </P>
            </>
          ),
        },
        {
          id: 'why-we-use-cookies',
          heading: 'Why We Use Cookies',
          body: (
            <>
              <P>We use cookies to:</P>
              <UL>
                <LI>Enable core website functionality and security;</LI>
                <LI>Remember your preferences and improve your experience;</LI>
                <LI>Analyse website traffic and user behaviour to improve our content;</LI>
                <LI>Measure the effectiveness of our marketing campaigns;</LI>
                <LI>Show you relevant content and advertising on other platforms.</LI>
              </UL>
            </>
          ),
        },
        {
          id: 'managing-cookies',
          heading: 'Managing & Disabling Cookies',
          body: (
            <>
              <P>
                You have control over cookies. You can <Strong>accept</Strong> or <Strong>reject</Strong>{' '}
                non-essential cookies through your browser settings at any time. Disabling some cookies may
                affect website functionality.
              </P>
              <P>Here&apos;s how to manage cookies in popular browsers:</P>
              <UL>
                <LI><Strong>Google Chrome:</Strong> Settings &rarr; Privacy and security &rarr; Cookies and other site data</LI>
                <LI><Strong>Mozilla Firefox:</Strong> Settings &rarr; Privacy &amp; Security &rarr; Cookies and Site Data</LI>
                <LI><Strong>Safari:</Strong> Preferences &rarr; Privacy &rarr; Cookies and website data</LI>
                <LI><Strong>Microsoft Edge:</Strong> Settings &rarr; Cookies and site permissions &rarr; Cookies and site data</LI>
              </UL>
              <Callout>
                Strictly necessary cookies cannot be disabled as they are essential for the website to
                function. All other cookies are set only with your consent.
              </Callout>
            </>
          ),
        },
        {
          id: 'third-party-cookies',
          heading: 'Third-Party Services',
          body: (
            <>
              <P>
                We use trusted third-party services that may set their own cookies. These are governed by
                the respective providers&apos; privacy policies:
              </P>
              <UL>
                <LI><Strong>Google Analytics</Strong> &mdash; website analytics (Google Privacy &amp; Terms)</LI>
                <LI><Strong>Meta (Facebook) Pixel</Strong> &mdash; ad measurement (Meta Privacy Policy)</LI>
                <LI><Strong>LinkedIn Insight Tag</Strong> &mdash; ad performance (LinkedIn Privacy Policy)</LI>
                <LI><Strong>YouTube</Strong> &mdash; embedded videos (Google Privacy &amp; Terms)</LI>
              </UL>
              <P>
                We encourage you to review the privacy policies of these providers. Where possible, we
                configure analytics to use anonymised or consent-mode data collection.
              </P>
            </>
          ),
        },
        {
          id: 'updates',
          heading: 'Updates to This Policy',
          body: (
            <>
              <P>
                We may update this Cookie Policy to reflect changes in technology, regulation, or our
                practices. The &ldquo;Last Updated&rdquo; date indicates the latest revision. Continued use
                of the website after changes constitutes acceptance of the updated policy.
              </P>
            </>
          ),
        },
        {
          id: 'contact',
          heading: 'Contact Us',
          body: (
            <>
              <P>For questions about our use of cookies, please contact us:</P>
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
