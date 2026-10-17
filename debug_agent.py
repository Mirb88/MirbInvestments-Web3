# debug_agent.py — MirbInvestments Advanced Debug Specialist (Dynamic Timeout & Incremental Edition)
import sys
import os
import requests
import json
import subprocess
import datetime
import re

API_KEY = os.getenv("OPENROUTER_API_KEY") or os.getenv("GEMINI_API_KEY")
BASE_URL = "https://openrouter.ai/api/v1/chat/completions"
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN") or os.getenv("GITHUBTOKEN")
LOG_FILE = "debug_report.log"
CACHE_FILE = ".tsbuildinfo"

SYSTEM_PROMPT = """
Ti si MirbInvestments Debug Specialist.
Fokusiraj se na TypeScript, React (Next.js), Web3, ENS, i IPFS integracije.
Pruži preciznu dijagnostiku i jasna tehnička rješenja.
"""

def log_issue(issue_text):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"[{timestamp}] {issue_text}\n")

def query_openrouter(prompt):
    if not API_KEY:
        return "⚠️ API Key nije pronađen u okruženju (OPENROUTER_API_KEY ili GEMINI_API_KEY)."

    payload = {
        "model": "openrouter/free",
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.3,
        "max_tokens": 1500
    }

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(BASE_URL, headers=headers, json=payload, timeout=25)
        if response.status_code == 200:
            return response.json()["choices"][0]["message"]["content"]
        else:
            return f"⚠️ OpenRouter API Error {response.status_code}: {response.text}"
    except Exception as e:
        return f"⚠️ Greška mrežnog poziva: {str(e)}"

def fetch_github_issues(repo):
    if not GITHUB_TOKEN:
        return "GITHUB_TOKEN nije postavljen. Preskačem povlačenje live issue-a sa GitHub-a."
    url = f"https://api.github.com/repos/{repo}/issues"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            return response.json()
        else:
            return f"GitHub API Status: {response.status_code}"
    except Exception as e:
        return f"Greška u konekciji sa GitHub-om: {str(e)}"

def parse_ts_errors(output):
    matches = re.findall(r"(.+\.tsx?)\((\d+),\d+\): error (TS\d+): (.+)", output)
    return [{"file": m[0], "line": m[1], "code": m[2], "desc": m[3]} for m in matches]

def analyze_project(project_path="."):
    print("🔍 [DEBUG AGENT] Pokrećem optimizovanu inkrementalnu dijagnostiku...")
    
    cache_path = os.path.join(project_path, CACHE_FILE)
    dynamic_timeout = 60 if os.path.exists(cache_path) else 180
    print(f"⏱️ Dinamički alocirano vrijeme za analizu: {dynamic_timeout} sekundi.")

    try:
        cmd = ["npx", "tsc", "--noEmit", "--skipLibCheck", "--incremental", "--tsBuildInfoFile", CACHE_FILE]
        res = subprocess.run(cmd, cwd=project_path, capture_output=True, text=True, timeout=dynamic_timeout)
        ts_output = res.stdout + res.stderr
        issues = parse_ts_errors(ts_output)
        
        if issues:
            print(f"⚠️ Pronađeno {len(issues)} TypeScript grešaka:")
            for issue in issues:
                err_msg = f"File: {issue['file']} | Line: {issue['line']} | Error: {issue['code']} | Desc: {issue['desc']}"
                print(f"   - {err_msg}")
                log_issue(err_msg)
                
                fixer_script = os.path.expanduser("~/ai_agent_hub/code_fixer_agent.py")
                if os.path.exists(fixer_script):
                    print(f"🔄 [TANDEM] Proslijeđujem fajl '{issue['file']}' Code Fixeru...")
                    subprocess.run([
                        "python", fixer_script,
                        issue["file"],
                        f"Fix {issue['desc']} at line {issue['line']}"
                    ])
        else:
            print("✅ TypeScript: Nema pronađenih grešaka u projektu (Inkrementalna analiza potvrđena).")
    except subprocess.TimeoutExpired:
        print(f"⚠️ TypeScript dijagnostika je prekoračila {dynamic_timeout}s. Keš je uspostavljen za naredno pokretanje.")
    except Exception as e:
        print(f"⚠️ Greška pri pokretanju TypeScript dijagnostike: {e}")

if __name__ == "__main__":
    target_arg = sys.argv[1] if len(sys.argv) > 1 else "."
    print("🔍 [DEBUG AGENT] Analiziram okruženje:", target_arg)

    repo = "Mirb88/MirbInvestments-Web3"
    github_issues = fetch_github_issues(repo)
    print(f"📂 Status povlačenja sa GitHub repozitorijuma '{repo}':", "Aktivno" if isinstance(github_issues, list) else github_issues)

    analyze_project(os.path.expanduser("~/MirbInvestments-Web3"))

    if len(sys.argv) > 1 and not sys.argv[1].startswith("."):
        prompt_content = f"Issue: {target_arg}\nGitHub Context: {github_issues}"
        result = query_openrouter(prompt_content)
        print(f"\n💡 [AI DIJAGNOSTIKA & FIX]:\n{result}\n")
