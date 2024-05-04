import { Navbar } from "./_components/navbar";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <section className="px-5 md:px-0 w-full flex flex-col gap-y-5 md:items-center py-10">
      <Navbar />
      <section className="w-full md:w-3/4">{children}</section>
    </section>
  );
}
