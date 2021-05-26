from pathlib import Path
import json
import os.path
import re

BLACKLIST_DATA = []
_path = Path(__file__).resolve().parent
IGNORE_INCLUDE_TOKENS = ['##', '--', '==', 'https://', 'http://']
IGNORE_EXACT_TOKENS = ['']


def normalize(txt: str) -> str:
    return txt.replace(' ', '')


# static files
for file in _path.glob("*.res/*.txt"):
    with open(file, 'r', encoding='latin1') as f:
        txt = f.read()
        # line, comma separation
        words = re.split('\n|,|\t', txt)
        _final = []
        for w in words:
            if not any(tkn in w for tkn in IGNORE_INCLUDE_TOKENS) and not any(
                    tkn is w for tkn in IGNORE_EXACT_TOKENS):
                _final.append(normalize(w))

        final = set(_final)
        BLACKLIST_DATA.extend(final)

out_file_rel_dir = "../exclude.json"
out_file = os.path.join(_path, out_file_rel_dir)

with open(out_file, 'w') as f:
    json.dump(BLACKLIST_DATA, f, indent=2)

# res_badwords_dir = join(dir_path, '/badwords')

# print(res_badwords_dir)
# _, dirs, filenames = next(walk(dir_path))

# print(dirs)