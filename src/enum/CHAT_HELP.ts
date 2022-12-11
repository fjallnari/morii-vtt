export const CHAT_HELP = `#### Morii Chat Commands

**/help, /h** ~ display this help message

**/roll [dice], /r**

- uses standard dice notation (AdX ~ where A is the number of dice to be rolled & X is the number of faces of each dice)

- math operators (+ , - , * , / , ^ , ** , %), percentile dice (d%)

- *keep* (k{n} / kh{n} / kl{n}), *drop* (d{n} / dh{n} / dl{n}) ~ keeps or drops the specified amount of dice

- *re-roll* (r / ro / r{cp} / ro{cp}) ~ rerolls the lowest die (usually a 1), o ~= once only

*examples:* /r 8d8 + 8, /r d6*5, /r 4d6k3, /r 2d20kl1, /r 4d6d1, /r d6r 

**/lang [language] [message], /l**

- translate & transcribe message into the specified language

- original message is shown to GMs and characters who know the language

- use <> to not translate parts of text

*supported languages:* elvish, dwarvish and gnomish

*example:* /l dwarvish Welcome, friends of \<\u180eGrinmi\u180e\>.`;