# code_fixer_agent.py — MirbInvestments Code Fixer Specialist (v1.1 Ultra)
# Location: ~/MirbInvestments-Web3/
import os
import sys
import requests
import json
import shutil

API_KEY = os.getenv("OPENROUTER_API_KEY") or os.getenv("GEMINI_API_KEY")
BASE_URL = "https://openrouter.ai/api/v1/chat/completions"

SYSTEM_PROMPT = """
You are MirbInvestments Code Fixer Agent (Extra Programer).
Your role is to generate safe patches for code files based on user instructions.
Output ONLY the raw corrected code for the specified file without any introductory text or markdown formatting blocks (do not wrap in ```), so it can be saved directly to disk safely.
"""

def query_openrouter(file_content, patch_description):
    if not API_KEY:
        return None, "⚠️ API Key (OPENROUTER_API_KEY ili GEMINI_API_KEY) nije pronađen u okruženju."

    payload = {
        "model": "openrouter/free",
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"File Content:\n{file_content}\n\nPatch Request:\n{patch_description}"}
        ],
        "temperature": 0.2,
        "max_tokens": 2048
    }
    
    headers = {
        "Authorization": f"Bearer {API_KEY}", 
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(BASE_URL, headers=headers, json=payload, timeout=25)
        if response.status_code == 200:
            content = response.json()["choices"][0]["message"]["content"]
            
            if content.startswith("```"):
                lines = content.split("\n")
                if lines[0].startswith("```"):
                    lines = lines[1:]
                if lines and lines[-1].startswith("```"):
                    lines = lines[:-1]
                content = "\n".join(lines)
                
            return content, None
        else:
            return None, f"⚠️ OpenRouter Error {response.status_code}: {response.text}"
    except Exception as e:
        return None, f"⚠️ Greška pri komunikaciji sa API-jem: {str(e)}"

def apply_patch(file_path, patch_description):
    if not os.path.exists(file_path):
        return f"⚠️ Fajl '{file_path}' ne postoji u sistemu."

    backup_path = file_path + ".bak"
    try:
        shutil.copy(file_path, backup_path)
        print(f"📂 Rezervna kopija kreirana: {backup_path}")
    except Exception as e:
        return f"⚠️ Greška pri kreiranju rezervne kopije: {str(e)}"

    with open(file_path, "r", encoding="utf-8") as f:
        file_content = f.read()

    print(f"🛠️ [EXTRA PROGRAMER] Generišem bezbjednu zakrpu za '{file_path}'...")
    patched_code, err = query_openrouter(file_content, patch_description)

    if err:
        return err

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(patched_code)

    print(f"✅ Zakrpa uspješno primijenjena na {file_path}")
    return f"Zakrpa je uspješno izvedena! Original sačuvan u {backup_path}."

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("💡 Upotreba: python code_fixer_agent.py <putanja_do_fajla> \"opis_zakrpe\"")
        sys.exit(1)

    file_path = sys.argv[1]
    patch_description = sys.argv[2]
    result = apply_patch(file_path, patch_description)
    print("\n💡 Rezultat rada Extra Programera:\n", result)
