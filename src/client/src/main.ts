import Ajv from "ajv";
import * as characterSchema5E from '../src/schemas/CharacterSchema5E.json';
import * as characterSchemaVTTES from '../src/schemas/CharacterSchemaVTTES.json';
import * as characterSchemaCairn from '../src/schemas/CharacterSchemaCairn.json';
import * as characterSchemaShadowdark from '../src/schemas/CharacterSchemaShadowdark.json';
import * as characterSchemaDarklings from '../src/schemas/CharacterSchemaDarklings.json';
import './icons-bundle.js';
import './arrayExtensions';
import App from './App.svelte';

const app = new App({
	target: document.body
});

export const ajv = new Ajv({allowUnionTypes: true});
export const validateCharacter5E = ajv.compile(characterSchema5E);
export const validateCharacterVTTES = ajv.compile(characterSchemaVTTES);
export const validateCharacterCairn = ajv.compile(characterSchemaCairn);
export const validateCharacterShadowdark = ajv.compile(characterSchemaShadowdark);
export const validateCharacterDarklings = ajv.compile(characterSchemaDarklings);
export const fileReader = new FileReader();

export default app;