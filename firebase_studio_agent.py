# firebase_studio_agent.py — Firebase Firestore & Auth Studio Specialist (v1.0)
# Location: ~/MirbInvestments-Web3/
import os
import sys
import json

PROJECT_DIR = os.path.expanduser("~/MirbInvestments-Web3")

def inspect_firestore_rules():
    rules_path = os.path.join(PROJECT_DIR, "firestore.rules")
    if os.path.exists(rules_path):
        with open(rules_path, "r", encoding="utf-8") as f:
            content = f.read()
        print("📜 [FIREBASE STUDIO] Detektovana firestore.rules konfiguracija:")
        return content
    else:
        return "⚠️ 'firestore.rules' fajl nije pronađen u projektnom direktorijumu."

def validate_firebase_config():
    config_paths = [
        os.path.join(PROJECT_DIR, "src/lib/firebase.ts"),
        os.path.join(PROJECT_DIR, "src/context/AuthContext.tsx")
    ]
    found = []
    for cp in config_paths:
        if os.path.exists(cp):
            found.append(cp)
    
    if found:
        return f"✅ Detektovani Firebase konfiguracioni fajlovi:\n" + "\n".join([f"  - {p}" for p in found])
    else:
        return "⚠️ Nisu pronađeni standardni Firebase inicijalizacioni fajlovi."

if __name__ == "__main__":
    action = sys.argv[1].lower() if len(sys.argv) > 1 else "status"
    
    print("🔥 --- FIREBASE STUDIO AGENT (Firestore & Auth Specijalista) ---")
    if action in ["status", "info", "check"]:
        print(validate_firebase_config())
        print("\n" + inspect_firestore_rules())
    elif action in ["rules", "pravila"]:
        print(inspect_firestore_rules())
    else:
        print(f"💡 Upotreba: python firebase_studio_agent.py [status|rules]")
