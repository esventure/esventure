import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link to="/">
          <Button variant="ghost" className="mb-8 -ml-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="font-poppins text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-gray max-w-none space-y-6 text-foreground/80">
          <p className="text-sm text-muted-foreground">Last updated: December 11, 2025</p>

          <section className="space-y-4">
            <h2 className="font-poppins text-xl font-semibold text-foreground">Introduction</h2>
            <p>
              Es Venture ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when you visit our website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-poppins text-xl font-semibold text-foreground">Information We Collect</h2>
            <p>We collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Analytics Data:</strong> We use Google Analytics to collect anonymized data about how visitors use our website, 
                including pages visited, time spent on pages, and general location (country/city level). This data is collected only 
                if you consent to analytics cookies.
              </li>
              <li>
                <strong>Form Submissions:</strong> When you use our project planner tool, we collect the information you provide 
                to generate your project outline. This may include project descriptions and contact preferences.
              </li>
              <li>
                <strong>Contact Information:</strong> If you reach out via email or book a call, we collect your email address 
                and any information you choose to share.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-poppins text-xl font-semibold text-foreground">How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Improve our website and services based on usage patterns</li>
              <li>Respond to your inquiries and provide project consultations</li>
              <li>Generate personalized project outlines through our planning tool</li>
              <li>Communicate with you about potential projects</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-poppins text-xl font-semibold text-foreground">Cookies</h2>
            <p>
              We use cookies to analyze site traffic via Google Analytics. These cookies are only activated if you 
              click "Accept" on our cookie consent banner. You can change your preference at any time by clearing 
              your browser cookies and revisiting our site.
            </p>
            <p>
              <strong>Google Analytics:</strong> We use Google Analytics 4 (GA4) to understand how visitors interact 
              with our website. Google Analytics uses cookies to collect anonymized data. You can learn more about 
              how Google uses this data at{" "}
              <a 
                href="https://policies.google.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google's Privacy Policy
              </a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-poppins text-xl font-semibold text-foreground">Your Rights</h2>
            <p>Under GDPR and other applicable privacy laws, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for analytics cookies at any time</li>
              <li>Object to processing of your personal data</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-poppins text-xl font-semibold text-foreground">Data Retention</h2>
            <p>
              Analytics data is retained according to Google Analytics' default retention settings (14 months). 
              Contact information and project-related communications are retained for as long as necessary to 
              fulfill the purposes outlined in this policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-poppins text-xl font-semibold text-foreground">Contact Us</h2>
            <p>
              If you have questions about this privacy policy or want to exercise your data rights, please contact us at:{" "}
              <a href="mailto:esther@esventure.nl" className="text-primary hover:underline">
                esther@esventure.nl
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
