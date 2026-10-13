# debug_agent.py — MirbInvestments Debug Specialist with GitHub API (v1.3)
import sys
import os
import requests
import json

API_KEY = os.getenv("OPENROUTER_API_KEY") or os.getenv("GEMINI_API_KEY")
BASE_URL = "https://openrouter.ai/api/v1/chat/completions"
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN") or os.getenv("GITHUBTOKEN")

SYSTEM_PROMPT = """
You are MirbInvestments Debug Specialist.
Focus on GitHub errors, Web3 code, Next.js, ENS, IPFS integration.
Provide precise diagnostics and express solutions.
"""

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
        "max_tokens": 1024
    }
    
    headers = {
        "Authorization": f"Bearer {API_KEY}", 
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(BASE_URL, headers=headers, json=payload, timeout=15)
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

if __name__ == "__main__":
    issue = sys.argv[1] if len(sys.argv) > 1 else "No issue provided"
    print("🔍 [DEBUG AGENT] Analiziram upit/issue:", issue)

    repo = "Mirb88/MirbInvestments-Web3"
    issues = fetch_github_issues(repo)
    print(f"📂 Status povlačenja sa GitHub repozitorijuma '{repo}':", "Aktivno" if isinstance(issues, list) else issues)

    prompt_content = f"Issue: {issue}\nGitHub Context: {issues}"
    result = query_openrouter(prompt_content)
    print(f"\n💡 [DIJAGNOSTIKA & FIX]:\n{result}\n")

