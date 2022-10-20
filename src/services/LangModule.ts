import NameGen from "../util/namegen";

export default class LangModule {
    private langGenMap: Record<string, NameGen.Generator>
    private fallBackGen: NameGen.Generator;


    constructor() {
        this.langGenMap = {
            'elvish': new NameGen.Generator(NameGen.ELVISH),
            'dwarvish': new NameGen.Generator(NameGen.DWARVISH),
            'gnomish': new NameGen.Generator(NameGen.GNOMISH)
        }

        this.fallBackGen = new NameGen.Generator(NameGen.FANTASY_S_E);
    }

    private analyseSyllables(word: string) {
        const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;
        return word.match(syllableRegex);
    }

    private validateMessage(fullMessage: string) {
        return /^(?:\/lang|\/l)\040(?<lang_name>[a-zA-Z]+)\040(?<content>.+)/gm.exec(fullMessage) as RegExpExecArray;
    }

    public composeMessage(fullMessage: string) {
        let wordMap = new Map<string, string>();

        const matchedGroups = this.validateMessage(fullMessage);
        if (matchedGroups === null || !matchedGroups || !matchedGroups.groups) {
            return { messageText: 'ERR: Incorrect /lang command.'};
        }

        const { groups: { lang_name, content }} = matchedGroups;

        let generator = this.langGenMap[lang_name.toLowerCase()];
        if (!generator) {
            return {messageText: `ERR: '${lang_name}' is not a supported language.`}
        }

        // strips the command and interpunction        
        const messageText = content.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g," ") ?? '';

        const translatedText = messageText.split(' ').map(word => {
            // if the word is in <>, dont 'translate' it
            if(word[0] !== '<' && word.slice(-1) !== '>'){
                if (!wordMap.get(word)) {
                    wordMap.set(word, generator.toString()); //word[0].toUpperCase() === word ? pseudoWord.charAt(0).toUpperCase() + pseudoWord.slice(1) :
                }
                // console.log(wordMap.get(word), this.analyseSyllables(wordMap.get(word) ?? ''));
                return wordMap.get(word);
            }

            return word.replaceAll(/<|>/g, '');
        }).join(' ');


        return { messageText: translatedText, langData: { name: lang_name, originalMessage: content.replaceAll(/<|>/g, '')}};
    }

}