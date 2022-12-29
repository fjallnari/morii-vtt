import json
import re
import sys

try: 
    from nanoid import generate
except ModuleNotFoundError:
    print('nanoid not found, falling back to uuid4')
    from uuid import uuid4 as generate
    

## transforms 5E SRD monsters data json into a more consistent format
## https://gist.github.com/tkfu/9819e4ac6d529e225e9fc58b358c3479

INPUT_PATH = 'monsters_input.json'
OUTPUT_PATH = 'MONSTERS.json'
ABILITY_TAGS = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']
FIELDS_TO_DELETE = [f"{ability}_mod" for ability in ABILITY_TAGS]
FIELDS_WITH_HTML = ["traits", "actions", "reactions", "legendary_actions"]
HTML_REGEX = r'(?:<p><em><strong>(?P<name>[^<>]+)<\/strong><\/em>|<em>(?P<subtitle>[^<>]*)<\/em>)*(?:<p>)*(?P<content>[^<>]+)(?:<\/p>)*'
SILENT = False

def log(s):
    if not SILENT:
        print (s)

def load_source(path):
    source_file = open(path, "r")
    json_obj = json.load(source_file)
    source_file.close()
    
    return json_obj


def dump_result(path, obj):
    output_file = open(path, "w")
    json.dump(obj, output_file, indent=2)
    output_file.close()


def transform_monsters(monsters):
    ''' Adds id to each monster, removes unnecesary fields, standardizes key names '''
    for monster in monsters:
        monster['id'] = generate()
        monster['ability_scores'] = {key:monster[key] for (key) in ABILITY_TAGS}
        
        for field in FIELDS_TO_DELETE + ABILITY_TAGS:
            del monster[field]
                    
        monster_copy = monster.copy()
        
        # replaces all non-lowercase key names
        for key in monster_copy:
            if (key not in ABILITY_TAGS):
                monster[key.lower().replace(' ', '_')] = monster.pop(key)
    
    return monsters


def objectify_groups(group):
    obj_group = {}
    for index, field in enumerate(["name", "subtitle", "content"]):
        if group[index].strip() != "":
            obj_group[field] = group[index].strip()
            # if field == "content":
            #     obj_group[field] = [obj_group[field]]        
    
    return obj_group


def remove_html_strings(monsters):
    ''' Returns modified monster array; needs the input json data to be parsed by transform_monsters() first '''
    for field in FIELDS_WITH_HTML:
        for monster in monsters:
            if monster.get(field):
                field_groups = re.findall(HTML_REGEX, monster[field])
                obj_groups = map(objectify_groups, field_groups)
                monster[field] = list(obj_groups)
    return monsters

def merge_attack_parts(monsters):
    '''Needs html fields to be converted'''
    log("Merging attacks...")
    for index, monster in enumerate(monsters):
        monster_actions = monster.get('actions')
        indices_to_remove = []
        
        if monster_actions:
            for action_index, action in enumerate(monster_actions):
                if action.get('name') and not action.get('subtitle') and not action.get('content'):
                    # [0] ~= attack damage formula, [1] ~= additional content
                    split_content = monster_actions[action_index+2]['content'].split('.')
                    monster_actions[action_index] = {
                        'name': action['name'],
                        'type': monster_actions[action_index+1]['subtitle'],
                        'attack_info': monster_actions[action_index+1]['content'],
                        'attack_dmg': f"{split_content[0]}.",
                    }
                    
                    if len(split_content) > 2:
                        monster_actions[action_index]['content'] = '.'.join(split_content[1:])
                    
                    indices_to_remove.extend([action_index+1, action_index+2])
            
            for index_to_remove in sorted(indices_to_remove, reverse=True):
                del monster_actions[index_to_remove]
    
    return monsters

def join_single_content_objs(monsters, field='actions'):
    '''Joins all the lonely contents together'''
    for monster in monsters:
        monster_actions = monster.get(field)
        indices_to_remove = []
        
        try:
            if monster_actions:
                for action_index, action in enumerate(monster_actions):
                    if action.get('content') and not action.get('name') and not action.get('subtitle'):
                        final = []
                        
                        for action_lookahead in monster_actions[action_index:]:
                            if action_lookahead.get('content') and not action_lookahead.get('name') and not action_lookahead.get('subtitle'):
                                final.append(action_lookahead.get('content'))
                            
                        monster_actions[action_index-1]["content"] = "{}\n\n{}".format(monster_actions[action_index-1]["content"], '\n\n'.join(final))
                        indices_to_remove.extend([action_index])
                
                for index_to_remove in sorted(indices_to_remove, reverse=True):
                    del monster_actions[index_to_remove]   
        except:
            print(monster)


    
    return monsters

def get_uniq_keys(monsters):
    uniq_keys = set()
    for monster in monsters:
        for key in monster:
            uniq_keys.add(key)
    return uniq_keys


if __name__ == "__main__":
    monsters = load_source(INPUT_PATH)
    remove_html_strings(monsters)
    merge_attack_parts(monsters)
    join_single_content_objs(monsters)
    join_single_content_objs(monsters, 'traits')
    
    dump_result(OUTPUT_PATH, monsters)
    # monsters_final = transform_monsters(load_source(INPUT_PATH))
    
    # print(get_uniq_keys(monsters_final))
    # print(json.dumps(monsters_final[0], indent=2))
    
    # dump_result(OUTPUT_PATH, monsters_final)
    