import json

### INPUT LINE EXAMPLE: "33 	Gate 	A portal to a random plane opens."

INPUT_PATH = 'cairnSpells.txt'
OUTPUT_PATH = 'cairnSpells.json'

def load_source(path):
    source_file = open(path, "r")
    lines = source_file.readlines()
    source_file.close()
    
    return lines

def dump_result(path, obj):
    output_file = open(path, "w")
    json.dump(obj, output_file, indent=2)
    output_file.close()

    
def getSpellObj(spellString: str):
    splitString = spellString.split(' 	')
    return { "name": splitString[1], "description": splitString[2] }


def convertSpellsToObj():
    lines = load_source(INPUT_PATH)
    spellArray = []
    
    for line in lines:
        spellArray.append(getSpellObj(line.rstrip('\n')))
        
    dump_result(OUTPUT_PATH, spellArray)
    
    return spellArray


if __name__ == "__main__":
    print(convertSpellsToObj())