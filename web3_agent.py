# web3_agent.py — MirbInvestments Web3 Autonomous Engineer (v8.5 Auto-Fix)
# Collaboration: Elitni Saborci & AI Expert System

import os
import sys
import requests
import json

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

SYSTEM_PROMPT = """
Ti si Elitni Web3 Inženjerski Agent Specijalista za MirbInvestments repozitorijum.
Tvoj primarni fokus je Next.js App Router arhitektura, React Client Providers, AuthProvider i Vercel Deployment stabilnost.
"""

def apply_autofix():
    filepath = "src/app/layout.tsx"
    if not os.path.exists(filepath):
        filepath = "app/layout.tsx"
    
    if os.path.exists(filepath):
        print(f"🛠️ [AUTONOMNI FIX] Otvaram i analiziram {filepath}...")
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Detekcija i zamjena pogrešnog redoslijeda provajdera
        has_changes = False
        
        # Pogrešan raspored 1: AuthProvider vani, ClientProviders unutra
        old_pattern_1 = "<AuthProvider>\n            <ClientProviders>"
        new_pattern_1 = "<ClientProviders>\n            <AuthProvider>"
        
        old_pattern_2 = "<AuthProvider>\n          <ClientProviders>"
        new_pattern_2 = "<ClientProviders>\n          <AuthProvider>"

        old_close_1 = "</ClientProviders>\n          </AuthProvider>"
        new_close_1 = "</AuthProvider>\n          </ClientProviders>"

        old_close_2 = "</ClientProviders>\n        </AuthProvider>"
        new_close_2 = "</AuthProvider>\n        </ClientProviders>"

        updated_content = content

        if old_pattern_1 in updated_content:
            updated_content = updated_content.replace(old_pattern_1, new_pattern_1)
            has_changes = True

        if old_pattern_2 in updated_content:
            updated_content = updated_content.replace(old_pattern_2, new_pattern_2)
            has_changes = True

        if old_close_1 in updated_content:
            updated_content = updated_content.replace(old_close_1, new_close_1)
            has_changes = True

        if old_close_2 in updated_content:
            updated_content = updated_content.replace(old_close_2, new_close_2)
            has_changes = True

        # Opšta zamjena ako su specifični razmaci drugačiji
        if not has_changes and "<AuthProvider>" in updated_content and "<ClientProviders>" in updated_content:
            # Direktno prelaganje hijerarhije
            updated_content = updated_content.replace("<AuthProvider>\n", "TEMP_AUTH_TOKEN\n")
            updated_content = updated_content.replace("<ClientProviders>\n", "<AuthProvider>\n")
            updated_content = updated_content.replace("TEMP_AUTH_TOKEN\n", "<ClientProviders>\n")
            has_changes = True

        if has_changes:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(updated_content)
            print(f"✅ [WEB3 AGENT] Uspješno refaktorisan {filepath}!")
            print("🚀 Hijerarhija je ispravljena: ClientProviders -> AuthProvider -> MainLayout")
        else:
            print("ℹ️ [WEB3 AGENT] Fajl je već refaktorisan ili su provajderi na pravoj poziciji.")
    else:
        print("⚠️ [WEB3 AGENT] Greška: layout.tsx nije pronađen.")

def query_web3_intelligence(prompt):
    if OPENROUTER_API_KEY:
        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://mirb.investments",
            "X-Title": "MirbInvestments Web3 Engine"
        }
        payload = {
            "model": "google/gemini-1.5-flash",
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.2,
            "max_tokens": 1024
        }
        try:
            res = requests.post(OPENROUTER_URL, headers=headers, json=payload, timeout=12)
            if res.status_code == 200:
                return res.json()['choices'][0]['message']['content']
        except Exception:
            pass

    return "🛠️ [LOKALNA ANALIZA] Preporučuje se ugnježđivanje AuthProvider unutar ClientProviders."

if __name__ == "__main__":
    task = sys.argv[1].lower() if len(sys.argv) > 1 else "inspect"
    
    print("\n🚀 --- MIRBINVESTMENTS WEB3 AUTONOMOUS ENGINE (v8.5) ---")
    
    if task == "fix":
        apply_autofix()
    else:
        print("🔍 Pokrećem analizu Web3 repozitorijuma...")
        res = query_web3_intelligence(task)
        print(f"\n💡 [ANALIZA]:\n{res}\n")

