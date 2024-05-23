export default function RegulationsPage() {
  return (
    <main className="w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold tracking-tight">Regulations</h1>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">I. User Conduct</h2>
          <p className="text-gray-500">
            Users agree to use our services in a lawful and ethical manner. This
            includes refraining from activities that may be harmful, illegal, or
            infringe on the rights of others.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">II. Content Guidelines</h2>
          <p className="text-gray-500">
            Users are responsible for the content they publish on their
            profiles. Content must not violate any laws or regulations, infringe
            on intellectual property rights, or contain offensive or
            inappropriate material.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">III. Account Security</h2>
          <p className="text-gray-500">
            Users are responsible for maintaining the security of their accounts
            and passwords. Any unauthorized use of accounts should be reported
            immediately.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">IV. Termination</h2>
          <p className="text-gray-500">
            We reserve the right to suspend or terminate user accounts that
            violate these regulations or engage in harmful behavior.
          </p>
        </section>
      </div>
    </main>
  );
}
