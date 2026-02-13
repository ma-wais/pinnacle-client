import { Link } from "react-router-dom";

export default function PrivacyPage() {
  return (
    <div className="terms-page py-60 bg-main-25 min-vh-100">
      <div className="container">
        <div
          className="bg-white rounded-24 p-40 shadow-sm border border-neutral-40 mx-auto"
          style={{ maxWidth: 900 }}
        >
          <div className="mb-40 text-center">
            <Link to="/">
              <img
                src="/eduall/assets/images/logo/logo.png"
                alt="Pinnacle Metals"
                style={{ maxHeight: 80 }}
              />
            </Link>
            <h1 className="mt-24 text-neutral-700 font-bold h2">
              Privacy Policy
            </h1>
            <p className="text-neutral-500">Last Updated: February 2025</p>
          </div>

          <div className="content text-neutral-600 space-y-24">
            <section className="mb-32">
              <h2 className="h4 text-neutral-800 mb-16 font-bold">
                1. Information We Collect
              </h2>
              <p>
                We collect information you provide directly to us when you
                create an account, apply for services, or upload documents. This
                includes your name, email address, phone number, and any
                documents necessary for your application process.
              </p>
            </section>

            <section className="mb-32">
              <h2 className="h4 text-neutral-800 mb-16 font-bold">
                2. How We Use Your Information
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-24 mt-8 space-y-8">
                <li>Provide and maintain our services.</li>
                <li>Process your applications and document uploads.</li>
                <li>
                  Send you technical notices, updates, and support messages.
                </li>
                <li>Communicate with you about services and events.</li>
              </ul>
            </section>

            <section className="mb-32">
              <h2 className="h4 text-neutral-800 mb-16 font-bold">
                3. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures
                to protect your personal data against unauthorized processing
                and against accidental loss, destruction, or damage. However, no
                method of transmission over the Internet or electronic storage
                is 100% secure.
              </p>
            </section>

            <section className="mb-32">
              <h2 className="h4 text-neutral-800 mb-16 font-bold">
                4. Sharing of Information
              </h2>
              <p>
                We do not share your personal information with third parties
                except as necessary to provide our services, comply with the
                law, or protect our rights. This may include sharing with cloud
                storage providers like Cloudinary for document management.
              </p>
            </section>

            <section className="mb-32">
              <h2 className="h4 text-neutral-800 mb-16 font-bold">
                5. Your Rights
              </h2>
              <p>
                You have the right to access, correct, or delete your personal
                information. You can manage your account details through the
                settings page or by contacting us directly.
              </p>
            </section>

            <section className="mb-32">
              <h2 className="h4 text-neutral-800 mb-16 font-bold">
                6. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at support@pinnaclemetals.com.
              </p>
            </section>
          </div>

          <div className="mt-40 text-center">
            <Link to="/" className="btn btn-main rounded-pill px-40 py-12">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
