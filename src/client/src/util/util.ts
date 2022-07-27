import CLASS_NAMES from "../enum/ClassNames";
import type { Character } from "../interfaces/Character";

export const validateClassName = (className: string) => {
    return CLASS_NAMES.includes(className) ? className : 'no-class';  
}

export const getClassIcon = (character: Character) => {
    const classes = character.classes.split(' ').map(charClass => charClass.toLowerCase());
    return classes.length <= 2 ? [validateClassName(classes[0])] : classes.map(charClass => validateClassName(charClass));
}

export const capitalize = (text: string) => {
    return text.replace(/^./, str => str.toUpperCase());
}