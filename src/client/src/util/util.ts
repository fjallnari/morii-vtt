import CLASS_NAMES from "../enum/ClassNames";

export const validateClassName = (className: string) => {
    return CLASS_NAMES.includes(className) ? className : 'no-class';  
}

export const getClassIcon = (characterClasses: string) => {
    const classesArray = characterClasses.split(' ').map(charClass => charClass.toLowerCase());
    return classesArray.length <= 2 ? [validateClassName(classesArray[0])] : classesArray.map(charClass => validateClassName(charClass));
}

export const capitalize = (text: string) => {
    return text.replace(/^./, str => str.toUpperCase());
}

export const getASModifier = ((abilityScores: any, AS: string) => {
    return (~~(abilityScores[AS] ? abilityScores[AS].value : 0) - 10) / 2 >> 0;
});

export const getRandomIndex = (arrayLen: number) => {
    return Math.floor(Math.random() * arrayLen);
}

export const randomChoice = <T>(array: T[]) => {
    return array[getRandomIndex(array.length)];
}

/**
 * looks through the record of levels ( level: total) to find the highest one under or equal to current class level
 * this way we don't have to have all the levels saved, only the ones where the value change
 */
export const findHighestPossibleValue = <T>(record: Record<number, T>, classLevel: number, placeholder: string = '') => {
    if ( !record ) { return placeholder }

    for (var iterLevel = classLevel; iterLevel >= 1; iterLevel--) {
        if (record[iterLevel]) {
            return record[iterLevel];
        }
    }

    return placeholder;
}

// from https://joshtronic.com/2020/02/17/converting-integers-to-roman-numerals-with-typescript/
export const int2roman = (original: number): string => {
    if (original === 0) { return '0' }

    if (original < 0 || original > 3999) {
      throw new Error('Error: Input integer limited to 0 through 3,999');
    }
  
    const numerals = [
      ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'], // 1-9
      ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'], // 10-90
      ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'], // 100-900
      ['M', 'MM', 'MMM'], // 1000-3000
    ];

    const digits = Math.round(original).toString().split('');
    let position = (digits.length - 1);
  
    return digits.reduce((roman, digit) => {
      if (digit !== '0') {
        roman += numerals[position][parseInt(digit) - 1];
      }
  
      position -= 1;
  
      return roman;
    }, '');
}