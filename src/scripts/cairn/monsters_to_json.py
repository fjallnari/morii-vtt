import json
import os

INPUT_DIR = 'cairn_monsters'
OUTPUT_PATH = 'monsters.json'


def load_source(path):
    source_file = open(path, "r")
    lines = source_file.readlines()
    source_file.close()
    
    return lines


def dump_result(path, obj):
    output_file = open(path, "w")
    json.dump(obj, output_file, indent=2)
    output_file.close()


def convert_monster_to_json(lines):
    monster = lines[6:]
    stats = monster[2].strip()
    description = ''.join(monster[4:]).strip()
    
    return {"name": monster[0].replace('#', '').strip(), "stats": stats, "description": description}

def get_monsters_as_arr(directory = INPUT_DIR):
    print(f'Generating Cairn monsters > {OUTPUT_PATH}')
    monsters_array = []
    for filename in os.scandir(directory):
        if filename.is_file() and filename.name.endswith('.md'):
            monsters_array.append(convert_monster_to_json(load_source(filename.path)))
            
    dump_result(OUTPUT_PATH, monsters_array)
    
    return monsters_array



if __name__ == "__main__":
    get_monsters_as_arr()