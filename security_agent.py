# security_agent.py — MirbInvestments Security & Audit Specialist (v1.0)
import os
import sys

def audit_firestore_rules():
    filepath = "firestore.rules"
    print("\n🔍 [SECURITY AGENT] Pokrećem inspekciju firestore.rules...")
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        if "allow read, write: if true;" in content or "allow write: if true;" in content:
            print("🚨 [CRITICAL WARNING] Pronađena potencijalno nezaštićena pravila (open write/read)!")
        else:
            print("✅ [OK] Firestore pravila ne sadrže trivijalne 'allow write: if true' propuste.")
    else:
        print("ℹ️ [INFO] firestore.rules datoteka nije pronađena na osnovnoj putanji.")

def audit_web3_security():
    print("🛡️ [SECURITY AGENT] Provjeravam osjetljive varijable i konfiguracije...")
    env_file = ".env.local"
    if os.path.exists(env_file):
        with open(env_file, "r", encoding="utf-8") as f:
            content = f.read()
        if "PRIVATE_KEY" in content:
            print("⚠️ [WARNING] Detektovan PRIVATE_KEY u .env.local. Provjerite da li je u .gitignore!")
    else:
        print("✅ [OK] Nema izloženih lokalnih .env.local datoteka sa osjetljivim ključevima.")

if __name__ == "__main__":
    print("🚀 --- MIRBINVESTMENTS SECURITY & AUDIT ENGINE (v1.0) ---")
    audit_firestore_rules()
    audit_web3_security()
    print("✨ Sigurnosna inspekcija završena.\n")
