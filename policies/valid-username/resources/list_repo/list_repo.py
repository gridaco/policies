from dotenv import load_dotenv
from github import Github
from pathlib import Path
import os.path

load_dotenv()

_path = Path(__file__).resolve().parent.parent
out_file_dir = "service.res/repos.txt"
out_file = os.path.join(_path, out_file_dir)

print(out_file)

# github repos

REPO_NAMES = []


def normalize(name):
    return name


GITHUB_PERSONAL_ACCESS_TOKEN = os.environ.get("PERSONAL_GITHUB_ACCESS_TOKEN")
g = Github(GITHUB_PERSONAL_ACCESS_TOKEN)
ORGS = ["bridgedxyz", 'reflect-ui', 'surfcodes', 'colicodes', 'nothing-app']

for org in ORGS:
    for repo in g.get_organization(org).get_repos():
        norm_repo_name = normalize(repo.name)
        REPO_NAMES.append(norm_repo_name)

with open(out_file, 'w') as f:
    for element in REPO_NAMES:
        f.write(element + "\n")