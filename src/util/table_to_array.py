import re

TABLE = """
1 	Agune 	6 	Drelil 	11 	Lirann 	16 	Sybil
2 	Beatrice 	7 	Elgile 	12 	Lirathil 	17 	Theune
3 	Breagan 	8 	Esme 	13 	Lisabeth 	18 	Wenain
4 	Bronwyn 	9 	Griya 	14 	Moralil 	19 	Ygwal
5 	Cannora 	10 	Henaine 	15 	Morgwen 	20 	Yslen
"""

def convert_table(table):
    columns = len(re.findall('[0-9]+ 	', table.split('\n')[1]))
    content = list(filter(lambda x: x, table.split('\n')))
    rows = len(content)
        
    result = [None] * (rows * columns)
    
    for row_index, line in enumerate(content):
        line_array = re.split('[0-9]+ 	', line)[1:]
        
        for column_index, item in enumerate(line_array):
            result[row_index + column_index * rows] = item.strip()
    
    return result

if __name__ == "__main__":
    print(convert_table(TABLE))