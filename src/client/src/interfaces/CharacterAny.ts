import type { Character5E } from "./5E/Character5E";
import type { CharacterCairn } from "./Cairn/CharacterCairn";
import type { CharacterShadowdark } from "./Shadowdark/CharacterShadowdark";

export type CharacterAny = Character5E | CharacterCairn | CharacterShadowdark;

export default CharacterAny;