
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';

// This is now a standard Server Component. Data fetching is moved to the client-side providers.
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
  );
}
