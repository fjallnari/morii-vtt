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