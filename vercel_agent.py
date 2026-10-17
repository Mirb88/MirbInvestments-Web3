# vercel_agent.py — Vercel Deployment & Build Status Specialist (Ultimate Secure Sentinel v3.0)
import os
import sys
import time
import requests

# Čitanje tokena i ID-a ISKLJUČIVO iz okruženja (100% zaštita od GitHub Push Protection blokada)
VERCEL_TOKEN = os.getenv("VERCEL_TOKEN")
PROJECT_ID = os.getenv("VERCEL_PROJECT_ID") or "prj_cpEXQNBaNkcLbnutsIuld1AD65BU"

def get_build_events(deployment_id):
    """ Automatski dohvaća detaljne logove ako Vercel build ne uspije """
    url = f"https://api.vercel.com/v2/deployments/{deployment_id}/events"
    headers = {"Authorization": f"Bearer {VERCEL_TOKEN}"}
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            events = response.json()
            print("\n🔍 --- LOGOVI GREŠKE SA VERCEL SERVERA ---")
            for event in events:
                text = event.get("text") or event.get("message") or ""
                if text:
                    print(f"  > {text.strip()}")
            print("------------------------------------------")
        else:
            print(f"⚠️ Nije moguće dohvatiti logove: HTTP {response.status_code}")
    except Exception as e:
        print(f"⚠️ Greška pri preuzimanju logova: {e}")

def check_deployment():
    if not VERCEL_TOKEN:
        print("⚠️ GREŠKA: VERCEL_TOKEN nije postavljen u okruženju!")
        print("Postavite ga komandom: export VERCEL_TOKEN='vaš_token'")
        return

    url = f"https://api.vercel.com/v6/deployments?projectId={PROJECT_ID}&limit=1"
    headers = {"Authorization": f"Bearer {VERCEL_TOKEN}"}

    print("🔄 Povezivanje sa Vercel API komandnim centrom...")

    try:
        for attempt in range(12):  # Čeka do 60 sekundi ako je build u toku
            response = requests.get(url, headers=headers, timeout=10)
            if response.status_code == 200:
                deployments = response.json().get("deployments", [])
                if deployments:
                    latest = deployments[0]
                    state = latest.get('readyState') or latest.get('state') or 'UNKNOWN'
                    commit_msg = latest.get('meta', {}).get('githubCommitMessage', 'Nije navedeno')
                    dep_uid = latest.get('uid')
                    dep_url = f"https://{latest.get('url')}"

                    print(f"🚀 Status builda [{attempt + 1}/12]: {state}")
                    print(f"🔹 Deployment ID: {dep_uid}")
                    print(f"🔹 Commit: {commit_msg}")
                    print(f"🔹 URL: {dep_url}")

                    if state in ["READY", "ERROR", "CANCELED"]:
                        print("\n---------------------------------------")
                        if state == "READY":
                            print("✅ Uspjeh! Build je stabilan i spreman u produkciji.\n")
                        elif state == "ERROR":
                            print("❌ Build je pao! Automatski dohvatam logove grešaka...\n")
                            get_build_events(dep_uid)
                        else:
                            print(f"⚠️ Deployment je u stanju: {state}\n")
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
