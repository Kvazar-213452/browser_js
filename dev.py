import subprocess

let = input("Type: ")

if let == "0":
    name = input("Name: ")
    subprocess.run(["git", "add", "-A"])
    subprocess.run(["git", "commit", "-m", name])
    subprocess.run(["git", "push"])
elif let == "1":
    subprocess.run(["sass", "web/static/prefab/main.scss", "web/static/css/main.css"])
