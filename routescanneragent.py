# routescanneragent.py — MirbInvestments Route Scanner Specialist
import os
import sys

def scan_routes(project_path="."):
    routes = []
    print(f"🔎 Scanning routes in project: {project_path}")
    
    for root, dirs, files in os.walk(project_path):
        # Preskačemo node_modules i .next radi brzine i izbjegavanja lažnih tragova
        if "node_modules" in root or ".next" in root or ".git" in root:
            continue
            
        for file in files:
            if file.endswith((".js", ".ts", ".tsx")):
                full_path = os.path.join(root, file)
                try:
                    with open(full_path, "r", encoding="utf-8", errors="ignore") as f:
                        content = f.read()
                        if "route" in content.lower() or "router" in content.lower() or "useclient" in content.replace(" ", "").lower():
                            routes.append(full_path)
                except Exception as e:
                    pass
    return routes

if __name__ == "__main__":
    project_path = sys.argv[1] if len(sys.argv) > 1 else "."
    found_routes = scan_routes(project_path)
    print(f"\n📂 Found {len(found_routes)} route/router files:")
    for r in found_routes:
        print(" -", r)
