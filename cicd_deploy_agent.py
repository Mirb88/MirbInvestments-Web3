# cicd_deploy_agent.py — CI/CD & Deployment Specialist (v1.0)
# Location: ~/MirbInvestments-Web3/
import os
import sys
import subprocess
import requests

PROJECT_DIR = os.path.expanduser("~/MirbInvestments-Web3")

def run_git_deployment(commit_message="auto-deploy via CI/CD Agent"):
    os.chdir(PROJECT_DIR)
    try:
        print("📦 [CI/CD AGENT] Dodajem izmijenjene fajlove...")
        subprocess.run(["git", "add", "."], check=True)
        
        print(f"📝 [CI/CD AGENT] Kreiram commit: '{commit_message}'...")
        subprocess.run(["git", "commit", "-m", commit_message], check=True)
        
        print("🚀 [CI/CD AGENT] Šaljem kod na GitHub repozitorijum...")
        res = subprocess.run(["git", "push", "origin", "main"], capture_output=True, text=True, check=True)
        return True, "Uspješno poslan kôd na GitHub!\n" + res.stdout
    except subprocess.CalledProcessError as e:
        err_msg = e.stderr if e.stderr else str(e)
        return False, f"⚠️ Git/Deployment Greška: {err_msg}"

if __name__ == "__main__":
    msg = sys.argv[1] if len(sys.argv) > 1 else "feat: automatska nadogradnja ekosistema"
    success, output = run_git_deployment(msg)
    print("\n--- REZULTAT CI/CD AGENTA ---")
    print(output)
