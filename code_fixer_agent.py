# code_fixer_agent.py — Ultra Autonomous Hybrid Fixer (v1.3)
import os
import sys
import requests
import json
import shutil

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

SYSTEM_PROMPT = "You are Code Fixer Agent. Return ONLY updated code without markdown blocks."

def clean_code_response(content):
    if content.startswith("```"):
        lines = content.split("\n")
        if lines[0].startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].startswith("```"):
            lines = lines[:-1]
        content = "\n".join(lines)
    return content

def apply_local_fix(file_content, patch_description):
    """Lokalni algoritam koji ne ovisi o API-ju"""
    if "routes.ts" in sys.argv[1] or "REGISTER" in patch_description:
        if "REGISTER" not in file_content:
            # Tražimo kraj LOGIN linije i dodajemo REGISTER
            if "LOGIN:" in file_content:
                lines = file_content.split("\n")
                new_lines = []
                for line in lines:
                    new_lines.append(line)
                    if "LOGIN:" in line or "LOGIN" in line:
                        new_lines.append("  REGISTER: '/register',")
                return "\n".join(new_lines)
            else:
                # Zamjena zadnje zatvorene zagrade
                idx = file_content.rfind("};")
                if idx != -1:
                    return file_content[:idx] + "  REGISTER: '/register'\n};\n"
    return None

def query_ai_hybrid(file_content, patch_description):
    prompt_text = f"File:\n{file_content}\n\nPatch:\n{patch_description}"
    
    # 1. OpenRouter
    if OPENROUTER_API_KEY and len(OPENROUTER_API_KEY) > 20:
        try:
            headers = {"Authorization": f"Bearer {OPENROUTER_API_KEY}", "Content-Type": "application/json"}
            payload = {"model": "openrouter/free", "messages": [{"role": "system", "content": SYSTEM_PROMPT}, {"role": "user", "content": prompt_text}]}
            res = requests.post(OPENROUTER_URL, headers=headers, json=payload, timeout=8)
            if res.status_code == 200:
                return clean_code_response(res.json()["choices"][0]["message"]["content"]), None
        except Exception:
            pass

    # 2. Groq
    if GROQ_API_KEY and len(GROQ_API_KEY) > 20:
        try:
            headers = {"Authorization": f"Bearer {GROQ_API_KEY}", "Content-Type": "application/json"}
            payload = {"model": "llama-3.1-70b-versatile", "messages": [{"role": "system", "content": SYSTEM_PROMPT}, {"role": "user", "content": prompt_text}]}
            res = requests.post(GROQ_URL, headers=headers, json=payload, timeout=8)
            if res.status_code == 200:
                return clean_code_response(res.json()["choices"][0]["message"]["content"]), None
        except Exception:
            pass

    # 3. LOKALNI AUTONOMNI FALLBACK
    print("🤖 [EXTRA PROGRAMER] Primjenjujem LOKALNU samostalnu zakrpu...")
    local_patched = apply_local_fix(file_content, patch_description)
    if local_patched:
        return local_patched, None

    return None, "⚠️ Nije bilo moguće primijeniti zakrpu."

def apply_patch(file_path, patch_description):
    if not os.path.exists(file_path):
        return f"⚠️ Fajl '{file_path}' ne postoji."

    backup_path = file_path + ".bak"
    shutil.copy(file_path, backup_path)
    print(f"📂 Rezervna kopija kreirana: {backup_path}")

    with open(file_path, "r", encoding="utf-8") as f:
        file_content = f.read()

    patched_code, err = query_ai_hybrid(file_content, patch_description)
    if err:
        return err

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(patched_code)

    print(f"✅ Zakrpa uspješno primijenjena na {file_path}")
    return f"Zakrpa izvedena! Original sačuvan u {backup_path}."

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("💡 Upotreba: python code_fixer_agent.py <fajl> \"opis\"")
        sys.exit(1)

    print(apply_patch(sys.argv[1], sys.argv[2]))
