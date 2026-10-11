# web3_agent.py — Universal Deep Diagnostics & Context Repair Agent
import os
import subprocess

def master_context_repair():
    print("\n🔍 --- DUBOKA DIJAGNOSTIKA CLIENTPROVIDERS I LAYOUT STABLA ---")
    
    # 1. Provera i korekcija ClientProviders fajla
    cp_path = None
    for root, dirs, files in os.walk("src"):
        for file in files:
            if file in ["ClientProviders.tsx", "ClientProviders.jsx"]:
                cp_path = os.path.join(root, file)
                break

    if cp_path and os.path.exists(cp_path):
        print(f"📌 Pronađen ClientProviders na: {cp_path}")
        with open(cp_path, "r", encoding="utf-8") as f:
            cp_code = f.read()

        if "AuthProvider" not in cp_code:
            print("🛠️ Injektujem AuthProvider direktno u ClientProviders...")
            if "import { AuthProvider }" not in cp_code:
                cp_code = "import { AuthProvider } from '@/context/AuthContext';\n" + cp_code
            
            # Wrap children inside ClientProviders
            cp_code = cp_code.replace("{children}", "<AuthProvider>{children}</AuthProvider>")
            with open(cp_path, "w", encoding="utf-8") as f:
                f.write(cp_code)
            print("✨ AuthProvider je uspešno integrisan u ClientProviders!")
    else:
        print("ℹ️ ClientProviders fajl nije pronađen pojedinačno. Proveravam root layout...")

    # 2. Korekcija src/app/layout.tsx — AuthProvider stavljamo na NAJVIŠI MOGUĆI NIVO
    layout_path = "src/app/layout.tsx"
    if os.path.exists(layout_path):
        with open(layout_path, "r", encoding="utf-8") as f:
            l_code = f.read()

        # Osiguravamo da AuthProvider obuhvata I ClientProviders I MainLayout
        old_tree = """        <ClientProviders>
          <AuthProvider>
            <MainLayout>
              {children}
            </MainLayout>
          </AuthProvider>
        </ClientProviders>"""

        top_level_tree = """        <AuthProvider>
          <ClientProviders>
            <MainLayout>
              {children}
            </MainLayout>
          </ClientProviders>
        </AuthProvider>"""

        if old_tree in l_code:
            l_code = l_code.replace(old_tree, top_level_tree)
            with open(layout_path, "w", encoding="utf-8") as f:
                f.write(l_code)
            print("✨ AuthProvider je podignut na NAJVIŠI nivo (iznad ClientProviders) u layout.tsx!")

    # 3. Automatski Git Push
    print("\n🚀 Šaljem kompletno sinhronizovanu ispravku na GitHub...")
    subprocess.run(["git", "add", "."])
    subprocess.run(["git", "commit", "-m", "Master AI Agent: Global AuthProvider Elevation"])
    push_res = subprocess.run(["git", "push", "origin", "main"], capture_output=True, text=True)
    
    if push_res.returncode == 0:
        print("🌐 Status: Uspešno poslate sve izmjene! Vercel pokreće novu verziju.")
    else:
        print("🌐 Git Push odziv:\n", push_res.stdout if push_res.stdout else push_res.stderr)

if __name__ == "__main__":
    print("🚀 MirbInvestments Master Web3 Agent (v3.0) Pokrenut!")
    while True:
        cmd = input("\n🧠 Unesite komandu ('fix', 'izlaz'): ").strip().lower()
        if cmd in ["izlaz", "exit"]:
            break
        elif cmd == "fix":
            master_context_repair()
