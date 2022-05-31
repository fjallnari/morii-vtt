import type { Socket } from 'socket.io-client';
import type { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Writable, writable } from 'svelte/store';
import type Campaign from './interfaces/Campaign';
import type Character from './interfaces/Character';
import type User from './interfaces/User';


export const accessToken = writable("");
export const user: Writable<User> = writable();
export const campaignNewActive: Writable<boolean> = writable(false);
export const campaignDetailActive: Writable<boolean> = writable(false);
export const selectedCampaign: Writable<Campaign> = writable();
export const selectedCharacter: Writable<Character> = writable();
export const socket: Writable<Socket<DefaultEventsMap, DefaultEventsMap>> = writable();
