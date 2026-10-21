#!/usr/bin/env python3
# debug_agent.py — MirbInvestments Advanced Debug Specialist (v14.0 Sovereign Elite Diagnostic Edition)

import sys
import os
import re
import json
import sqlite3
import requests
import subprocess
from datetime import datetime

# API Ključevi i Konfiguracija
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY") or os.getenv("GEMINI_API_KEY")
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN") or os.getenv("GITHUBTOKEN")

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

# Lokacije Baza i Sabirnica
PROJECT_DIR = os.path.expanduser("~/MirbInvestments-Web3")
HUB_DIR = os.path.expanduser("~/ai_agent_hub")
LOG_FILE = os.path.join(HUB_DIR, "debug_report.log")
CACHE_FILE = ".tsbuildinfo"
DEBUG_DB_PATH = os.path.join(HUB_DIR, "debug_memory.db")
BUS_PATH = os.path.join(HUB_DIR, "collective_predictive_bus.json")

# Zvanični besplatni modeli usaglašeni sa SOVEREIGN_HUB_2026
GROQ_OFFICIAL_MODELS = [
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "qwen/qwen3.8-27b",
    "llama-3.1-8b-instant"
]

OPENROUTER_HIGH_INTEL_MODELS = [
    "meta-llama/llama-3.3-70b-instruct",
    "google/gemini-2.0-flash-lite-preview-02-05:free"
]

SYSTEM_PROMPT = """
Ti si MirbInvestments Debug Specialist v14.0.
Tvoj zadatak je ekspertna dijagnostika i sanacija TypeScript, React (Next.js), Web3, ENS, i IPFS problema.
Pruži izuzetno precizna, bezbjedna i izravna tehnička rješenja bez suvišne proze.
"""

def init_debug_memory():
    """Inicijalizuje SQLite trajnu memoriju za praćenje istorije grešaka i popravki."""
    os.makedirs(HUB_DIR, exist_ok=True)
    with sqlite3.connect(DEBUG_DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS debug_audit_log (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT,
                file_path TEXT,
                line_number TEXT,
                error_code TEXT,
                description TEXT,
                status TEXT
            )
        """)
        conn.commit()

def log_issue_to_db_and_file(file_path, line_num, err_code, desc):
    """Upisuje problem u SQLite bazu i tekstualni log fajl."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # Tekstualni log
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"[{timestamp}] File: {file_path} | Line: {line_num} | Error: {err_code} | Desc: {desc}\n")
        
    # SQLite Log
    with sqlite3.connect(DEBUG_DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO debug_audit_log (timestamp, file_path, line_number, error_code, description, status) VALUES (?, ?, ?, ?, ?, ?)",
            (timestamp, file_path, line_num, err_code, desc, "FORWARDED_TO_FIXER")
        )
        conn.commit()

def query_ai_debug_engine(prompt):
    """Hibridni AI poziv koji prvenstveno koristi Groq API sa GPT-OSS 120B modelom."""
    user_prompt = f"🔍 DIAGNOSTIC REQ:\n{prompt}"

    # 1. Groq API Poziv
    if GROQ_API_KEY:
        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY.strip()}",
            "Content-Type": "application/json"
        }
        for model_slug in GROQ_OFFICIAL_MODELS:
            try:
                payload = {
                    "model": model_slug,
                    "messages": [
                        {"role": "system", "content": SYSTEM_PROMPT},
                        {"role": "user", "content": user_prompt}
                    ],
                    "temperature": 0.2
                }
                res = requests.post(GROQ_URL, headers=headers, json=payload, timeout=25)
                if res.status_code == 200:
                    return f"✨ [GROQ AI SOLUTION via {model_slug}]:\n" + res.json()["choices"][0]["message"]["content"]
            except Exception:
                pass

    # 2. OpenRouter Fallback
    if OPENROUTER_API_KEY:
        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY.strip()}",
            "Content-Type": "application/json"
        }
        for model_slug in OPENROUTER_HIGH_INTEL_MODELS:
            try:
                payload = {
                    "model": model_slug,
                    "messages": [
                        {"role": "system", "content": SYSTEM_PROMPT},
                        {"role": "user", "content": user_prompt}
                    ],
                    "temperature": 0.2
                }
                res = requests.post(OPENROUTER_URL, headers=headers, json=payload, timeout=30)
                if res.status_code == 200:
                    return f"✨ [OPENROUTER AI SOLUTION via {model_slug}]:\n" + res.json()["choices"][0]["message"]["content"]
            except Exception:
                pass

    return "⚠️ AI dijagnostička mreža nije dostupna ili nije dostignut prag odziva."

def fetch_github_issues(repo):
    if not GITHUB_TOKEN:
        return "GITHUB_TOKEN nije postavljen. Preskačem live GitHub sync."
    url = f"https://api.github.com/repos/{repo}/issues"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            return response.json()
        return f"GitHub API Status: {response.status_code}"
    except Exception as e:
        return f"Greška pri povezivanju na GitHub: {str(e)}"

def parse_ts_errors(output):
    matches = re.findall(r"(.+\.tsx?)\((\d+),\d+\): error (TS\d+): (.+)", output)
    return [{"file": m[0], "line": m[1], "code": m[2], "desc": m[3]} for m in matches]

def analyze_project(project_path):
    init_debug_memory()
    print("🔍 [DEBUG SPECIALIST v14.0] Pokrećem inkrementalnu i dubinsku dijagnostiku...")
    
    cache_path = os.path.join(project_path, CACHE_FILE)
    dynamic_timeout = 60 if os.path.exists(cache_path) else 180
    print(f"⏱️ Dinamički alocirano vrijeme za analizu: {dynamic_timeout} sekundi.")

    issues = []
    try:
        cmd = ["npx", "tsc", "--noEmit", "--skipLibCheck", "--incremental", "--tsBuildInfoFile", CACHE_FILE]
        res = subprocess.run(cmd, cwd=project_path, capture_output=True, text=True, timeout=dynamic_timeout)
        ts_output = res.stdout + res.stderr
        issues = parse_ts_errors(ts_output)
        
        if issues:
            print(f"⚠️ Detektovano je ukupno {len(issues)} TypeScript grešaka:")
            fixer_script = os.path.join(HUB_DIR, "code_fixer_agent.py")
            
            for issue in issues:
                err_msg = f"File: {issue['file']} | Line: {issue['line']} | Error: {issue['code']} | Desc: {issue['desc']}"
                print(f"   - {err_msg}")
                log_issue_to_db_and_file(issue['file'], issue['line'], issue['code'], issue['desc'])
                
                if os.path.exists(fixer_script):
                    print(f"🔄 [TANDEM SYNC] Proslijeđujem '{issue['file']}' Code Fixeru v13.5...")
                    subprocess.run([
                        sys.executable, fixer_script,
                        issue["file"],
                        f"Popravi TypeScript grešku {issue['code']} na liniji {issue['line']}: {issue['desc']}"
                    ])
        else:
            print("✅ TypeScript: Nema pronađenih sintaksnih niti tipskih grešaka u projektu!")
            
    except subprocess.TimeoutExpired:
        print(f"⚠️ Dijagnostika je prekoracila timeout od {dynamic_timeout}s. Keš je uspostavljen za naredni ciklus.")
    except Exception as e:
        print(f"⚠️ Greška pri pokretanju dijagnostike: {e}")

    # Sinhronizacija sa Kolektivnim Prediktivnim Busom
    bus_data = {}
    if os.path.exists(BUS_PATH):
        try:
            with open(BUS_PATH, "r", encoding="utf-8") as bf:
                bus_data = json.load(bf)
        except Exception:
            bus_data = {}

    bus_data["debug_specialist_v14"] = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "status": "OPTIMIZED" if len(issues) == 0 else "ISSUES_FOUND",
        "detected_issues_count": len(issues),
        "issues_summary": issues[:10]
    }

    with open(BUS_PATH, "w", encoding="utf-8") as bf:
        json.dump(bus_data, bf, indent=2)
        
    print("📊 Dijagnostički nalazi i SQLite memorija su sinhronizovani sa Kolektivnim Busom.")

if __name__ == "__main__":
    target_arg = sys.argv[1] if len(sys.argv) > 1 else "."
    print("🔍 [DEBUG AGENT] Okruženje analize:", target_arg)

    repo = "Mirb88/MirbInvestments-Web3"
    github_issues = fetch_github_issues(repo)
    print(f"📂 Status sinhronizacije sa GitHub repozitorijumom '{repo}':", "Aktivno" if isinstance(github_issues, list) else github_issues)

    analyze_project(PROJECT_DIR)

    if len(sys.argv) > 1 and not sys.argv[1].startswith("."):
        prompt_content = f"Issue: {target_arg}\nGitHub Context: {github_issues}"
        result = query_ai_debug_engine(prompt_content)
        print(f"\n💡 [AI DIJAGNOSTIKA & KOREKCIJA]:\n{result}\n")
