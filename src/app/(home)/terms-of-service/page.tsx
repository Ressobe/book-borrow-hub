export default function TermsOfServicePage() {
  return (
    <main className="w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">I. Acceptance of Terms</h2>
          <p className="text-gray-500">
            By accessing or using our platform, you agree to be bound by these
            Terms of Service and our Privacy Policy.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">II. Intellectual Property</h2>
          <p className="text-gray-500">
            All content and intellectual property on our platform are owned by
            us or our licensors. Users may not reproduce, distribute, or create
            derivative works from this content without prior written consent.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">III. Limitation of Liability</h2>
          <p className="text-gray-500">
            We shall not be liable for any damages or losses resulting from the
            use of our services, including but not limited to indirect,
            incidental, or consequential damages.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">IV. Governing Law</h2>
          <p className="text-gray-500">
            These terms shall be governed by and construed in accordance with
            the laws of the jurisdiction in which our company is located.
          </p>
        </section>
      </div>
    </main>
  );
}
