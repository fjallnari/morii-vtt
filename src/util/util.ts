export function chunkify <T>(items: T[], chunkSize: number) {
    var chunks = [],
        index = 0,
        originLen = items.length;
  
    while (index < originLen) {
      chunks.push(items.slice(index, index += chunkSize));
    }
  
    return chunks;
}

// https://gist.github.com/robmathers/1830ce09695f759bf2c4df15c29dd22d#gistcomment-3553222
export const groupBy = <T>(arr: T[], keys: (keyof T)[]): { [key: string]: T[] } => {
  return arr.reduce((storage, item) => {
    const objKey = keys.map(key => `${ item[key] }`).join(':');
    
    if (storage[objKey]) {
      storage[objKey].push(item);
    } else {
      storage[objKey] = [item];
    }
    return storage;
  }, {} as { [key: string]: T[] });
}