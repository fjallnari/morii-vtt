import Ajv from "ajv";
import * as characterSchema from '../src/schemas/Character.json';
import * as characterVTTESSchema from '../src/schemas/CharacterVTTES.json';
import * as characterCairnSchema from '../src/schemas/CharacterCairn.json';
import './icons-bundle.js';
import './arrayExtensions';
import App from './App.svelte';

const app = new App({
	target: document.body
});

export const ajv = new Ajv({allowUnionTypes: true});
export const validateCharacter = ajv.compile(characterSchema);
export const validateVTTESCharacter = ajv.compile(characterVTTESSchema);
export const validateCairnCharacter = ajv.compile(characterCairnSchema);
export const fileReader = new FileReader();

export default app;