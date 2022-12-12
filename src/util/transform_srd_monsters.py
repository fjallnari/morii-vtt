import json
from nanoid import generate

## transforms the great 5E SRD monsters data json into more consistent format
## https://gist.github.com/tkfu/9819e4ac6d529e225e9fc58b358c3479

INPUT_PATH = 'srd_5e_monsters.json'
OUTPUT_PATH = 'MONSTERS.json'
ABILITY_TAGS = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']
FIELDS_TO_DELETE = [f"{ability}_mod" for ability in ABILITY_TAGS]

def load_source(path):
    source_file = open(path, "r")
    json_obj = json.load(source_file)
    source_file.close()
    
    return json_obj

def dump_result(path, obj):
    output_file = open(path, "w")
    json.dump(obj, output_file, indent=2)
    output_file.close()

# Adds id to each monster, removes unnecesary fields, standardizes key names
def transform_monsters(obj):
    for monster in obj:
        monster['id'] = generate()
        monster['ability_scores'] = {key:monster[key] for (key) in ABILITY_TAGS}
        
        for field in FIELDS_TO_DELETE + ABILITY_TAGS:
            del monster[field]
                    
        monster_copy = monster.copy()
        
        # replaces all non-lowercase key names
        for key in monster_copy:
            if (key not in ABILITY_TAGS):
                monster[key.lower().replace(' ', '_')] = monster.pop(key)
    
    return obj

def get_uniq_keys(obj):
    uniq_keys = set()
    for monster in obj:
        for key in monster:
            uniq_keys.add(key)
    return uniq_keys


if __name__ == "__main__":
    monsters_final = transform_monsters(load_source(INPUT_PATH))
    
    print(get_uniq_keys(monsters_final))
    # print(json.dumps(monsters_final[0], indent=2))
    
    dump_result(OUTPUT_PATH, monsters_final)
    
    