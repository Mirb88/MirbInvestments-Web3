export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0D0D0D] px-4 py-8 text-[#EDF2F4]">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-wider text-[#EDF2F4]">MirbInvestments Auth Portal</h1>
        <p className="mt-1 text-xs tracking-widest text-[#F0B90B] uppercase">Secure Web3 Access & Identity</p>
      </header>

      <main className="w-full max-w-md">
        {children}
      </main>

      <footer className="mt-12 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} MirbInvestments — Architecture of Intelligent Capital
      </footer>
    </div>
  );
}
