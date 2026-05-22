import type { Metadata } from "next";
import PageHero from "../../components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Statement — The Ortus Club",
  description: "How The Ortus Club collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "What information we collect",
    body: "We collect information from you when you register on our site, subscribe to our newsletter, respond to a survey, or fill out a form. When registering, you may be asked to enter your: name, email address, mailing address, or phone number.",
  },
  {
    title: "How we use your information",
    body: "By attending or registering for our events, you are agreeing to subscribe to our marketing communications and invite processes. You are giving permission for your contact information to be shared with the event sponsors and giving them permission to send you follow-up communications about their products and services.",
  },
  {
    title: "How we protect your information",
    body: "We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information. We make reasonable attempts to protect your information by using physical and electronic safeguards.",
  },
  {
    title: "Cookies",
    body: "We use cookies to remember preferences, understand how visitors use our website, and improve our service. You can control cookies through your browser settings.",
  },
  {
    title: "Third-party services",
    body: "We use trusted third-party providers for analytics, marketing automation, payment processing, and event-management workflows. These providers have access only to the information needed to perform their function and are contractually bound to keep it confidential.",
  },
  {
    title: "Your rights",
    body: "You may request access to, correction of, or deletion of your personal information at any time by contacting us at info@ortusclub.com. We will respond to verified requests within a reasonable timeframe.",
  },
  {
    title: "Updates to this statement",
    body: "We may update this privacy statement from time to time. Any changes will be posted on this page with an updated revision date.",
  },
  {
    title: "Contact us",
    body: "If you have any questions about this privacy statement or our handling of your personal information, please email info@ortusclub.com.",
  },
];

export default function PrivacyStatementPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Statement" />

      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-600 text-sm mb-12">
            This privacy statement explains how The Ortus Club (Ortus Strategy, Pte. Ltd.) collects, uses,
            and protects your personal information.
          </p>
          <div className="space-y-10">
            {sections.map((s) => (
              <div key={s.title}>
                <h2
                  className="text-2xl mb-3"
                  style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500 }}
                >
                  {s.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
