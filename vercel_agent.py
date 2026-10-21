#!/usr/bin/env python3
# vercel_agent.py — Vercel Deployment & Build Status Specialist (v4.0 Sovereign Elite Sentinel Edition)

import os
import sys
import time
import json
import re
import sqlite3
import subprocess
import requests
from datetime import datetime

# Konfiguracija i Putanje
HUB_DIR = os.path.expanduser("~/ai_agent_hub")
PROJECT_DIR = os.path.expanduser("~/MirbInvestments-Web3")
BUS_PATH = os.path.join(HUB_DIR, "collective_predictive_bus.json")
VERCEL_DB_PATH = os.path.join(HUB_DIR, "vercel_memory.db")

# Čitanje tokena i ID-a ISKLJUČIVO iz okruženja (100% zaštita)
VERCEL_TOKEN = os.getenv("VERCEL_TOKEN")
PROJECT_ID = os.getenv("VERCEL_PROJECT_ID") or "prj_cpEXQNBaNkcLbnutsIuld1AD65BU"

def init_vercel_memory():
    """Inicijalizuje SQLite trajnu memoriju za praćenje istorije Vercel deployment-a."""
    os.makedirs(HUB_DIR, exist_ok=True)
    with sqlite3.connect(VERCEL_DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS vercel_deployments_log (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT,
                deployment_id TEXT,
                commit_message TEXT,
                url TEXT,
                state TEXT,
                error_summary TEXT
            )
        """)
        conn.commit()

def log_deployment_to_db(dep_id, commit_msg, url, state, error_summary=""):
    """Zapisuje detalje deployment-a u trajnu SQLite bazu."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with sqlite3.connect(VERCEL_DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO vercel_deployments_log (timestamp, deployment_id, commit_message, url, state, error_summary) VALUES (?, ?, ?, ?, ?, ?)",
            (timestamp, dep_id, commit_msg, url, state, error_summary)
        )
        conn.commit()

def get_build_events(deployment_id):
    """Automatski dohvaća detaljne logove ako Vercel build ne uspije i šalje ih Code Fixer-u ako pronađe fajl."""
    url = f"https://api.vercel.com/v2/deployments/{deployment_id}/events"
    headers = {"Authorization": f"Bearer {VERCEL_TOKEN}"}
    error_logs = []
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            events = response.json()
            print("\n🔍 --- LOGOVI GREŠKE SA VERCEL SERVERA ---")
            for event in events:
                text = event.get("text") or event.get("message") or ""
                if text:
                    cleaned_text = text.strip()
                    print(f"  > {cleaned_text}")
                    error_logs.append(cleaned_text)
            print("------------------------------------------")
            
            full_error_text = "\n".join(error_logs)
            
            # Pokušaj ekstrakcije uzroka greške i slanja na Code Fixer v13.5
            file_match = re.search(r"(src/[^\s:]+\.tsx?)", full_error_text)
            if file_match:
                failed_file = file_match.group(1)
                print(f"🔄 [TANDEM CODE FIXER] Detektovan problematični fajl na Vercelu: {failed_file}")
                fixer_script = os.path.join(HUB_DIR, "code_fixer_agent.py")
                if os.path.exists(fixer_script):
                    subprocess.run([
                        sys.executable, fixer_script,
                        failed_file,
                        f"Popravi Vercel build grešku na serveru: {full_error_text[:300]}"
                    ])
            return full_error_text[:500]
        else:
            print(f"⚠️ Nije moguće dohvatiti logove: HTTP {response.status_code}")
            return f"HTTP Error {response.status_code}"
    except Exception as e:
        print(f"⚠️ Greška pri preuzimanju logova: {e}")
        return str(e)

def sync_with_collective_bus(state, dep_id, dep_url, commit_msg):
    """Ažurira Kolektivni Prediktivni Bus sa najnovijim Vercel statusom."""
    bus_data = {}
    if os.path.exists(BUS_PATH):
        try:
            with open(BUS_PATH, "r", encoding="utf-8") as bf:
                bus_data = json.load(bf)
        except Exception:
            bus_data = {}

    bus_data["vercel_sentinel_v4"] = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "state": state,
        "deployment_id": dep_id,
        "deployment_url": dep_url,
        "commit_message": commit_msg,
        "system_status": "OPTIMIZED" if state == "READY" else ("BUILDING" if state not in ["ERROR", "CANCELED"] else "BUILD_FAILED")
    }

    with open(BUS_PATH, "w", encoding="utf-8") as bf:
        json.dump(bus_data, bf, indent=2)
        
    print("📊 Status Vercel deployment-a uspješno sinhronizovan sa Kolektivnim Busom.")

def check_deployment():
    init_vercel_memory()
    print("🚀 [VERCEL SENTINEL v4.0] Povezujem se sa Vercel API komandnim centrom...")

    if not VERCEL_TOKEN:
        print("⚠️ GREŠKA: VERCEL_TOKEN nije postavljen u okruženju!")
        print("💡 Postavite ga komandom: export VERCEL_TOKEN='vaš_token'")
        return

    url = f"https://api.vercel.com/v6/deployments?projectId={PROJECT_ID}&limit=1"
    headers = {"Authorization": f"Bearer {VERCEL_TOKEN}"}

    try:
        for attempt in range(12):  # Čeka do 60 sekundi u ciklusu
            response = requests.get(url, headers=headers, timeout=10)
            if response.status_code == 200:
                deployments = response.json().get("deployments", [])
                if deployments:
                    latest = deployments[0]
                    state = latest.get('readyState') or latest.get('state') or 'UNKNOWN'
                    commit_msg = latest.get('meta', {}).get('githubCommitMessage', 'Nije navedeno')
                    dep_uid = latest.get('uid')
                    dep_url = f"https://{latest.get('url')}"

                    print(f"📡 Status builda [{attempt + 1}/12]: {state}")
                    print(f"🔹 Deployment ID: {dep_uid}")
                    print(f"🔹 Commit: {commit_msg}")
                    print(f"🔹 URL: {dep_url}")

                    if state in ["READY", "ERROR", "CANCELED"]:
                        print("\n---------------------------------------")
                        error_summary = ""
                        if state == "READY":
                            print("✅ USPJEH! Build je stabilan i aktivan u produkciji.\n")
                        elif state == "ERROR":
                            print("❌ BUILD JE PAO! Automatski pokrećem analizu logova i Tandem Fixer...\n")
                            error_summary = get_build_events(dep_uid)
                        else:
                            print(f"⚠️ Deployment je u stanju: {state}\n")

                        # Upis u bazu i bus
                        log_deployment_to_db(dep_uid, commit_msg, dep_url, state, error_summary)
                        sync_with_collective_bus(state, dep_uid, dep_url, commit_msg)
                        return
                else:
                    print("ℹ️ Nema pronađenih deployment-a za dati projekat.")
                    return
            else:
                print(f"⚠️ Vercel API Greška: {response.status_code} - {response.text}")
                return

            time.sleep(5)
    except Exception as e:
        print(f"⚠️ Mrežna greška pri komunikaciji sa Vercel-om: {e}")

if __name__ == "__main__":
    check_deployment()
