import json
import os
import re

try: 
    from nanoid import generate
except ModuleNotFoundError:
    print('nanoid not found, falling back to uuid4')
    from uuid import uuid4 as generate

INPUT_DIR = 'cairn_monsters'
OUTPUT_PATH = 'monsters.json'
COMPLEX_STATS_RE = r"(?P<hp>[0-9]+) HP,(?: (?P<armor>[0-9]+) Armor,)*(?: (?P<str>[0-9]+) STR,)*(?: (?P<dex>[0-9]+) DEX,)*(?: (?P<wil>[0-9]+) WIL(?:,)?)*(?: )?(?P<attacks>(?:[a-zA-Z -]*(?: )?\([^\(\)]+\)(?:,| or)*)*)(?P<special>.*)"

def load_source(path):
    source_file = open(path, "r")
    lines = source_file.readlines()
    source_file.close()
    
    return lines


def dump_result(path, obj):
    output_file = open(path, "w")
    json.dump(obj, output_file, indent=2)
    output_file.close()

def fix_missing_parenthesis(attack: str):
    return attack + ")" if attack[-1] != ")" else attack

def convert_monster_to_json(lines, complex):
    monster = lines[6:]
    stats = monster[2].strip()
    stats_complex = {}
    description = ''.join(monster[4:]).strip()
    
    # split HP, Armor, STR, DEX, WIL, attacks and special into separate properties
    
    if complex:
        match = re.match(COMPLEX_STATS_RE, stats)
        stats_complex = match.groupdict() if match else stats_complex
        
        stats_complex['attacks'] = list(filter(None, re.split('\), |\),| or | or|, or ', stats_complex['attacks']))) if stats_complex['attacks'] else []
        stats_complex['attacks'] = list(map(fix_missing_parenthesis, stats_complex['attacks']))
        stats_complex = {k: v for k, v in stats_complex.items() if v}
    
    return {"name": monster[0].replace('#', '').strip(), "stats": stats, **stats_complex, "description": description, "id": generate(size=10)}

def get_monsters_as_json(directory = INPUT_DIR, complex = False):
    print(f'Generating Cairn monsters > {OUTPUT_PATH}')
    monsters_array = []
    for filename in os.scandir(directory):
        if filename.is_file() and filename.name.endswith('.md'):
            monsters_array.append(convert_monster_to_json(load_source(filename.path), complex))
            
    dump_result(OUTPUT_PATH, monsters_array)
    
    return monsters_array



if __name__ == "__main__":
    get_monsters_as_json(complex=True)