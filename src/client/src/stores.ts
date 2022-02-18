import { Writable, writable } from 'svelte/store';
import type Campaign from './interfaces/Campaign';
import type User from './interfaces/User';


export const accessToken = writable("");
export const user: Writable<User> = writable();
export const campaignNewActive: Writable<boolean> = writable(false);
export const campaignDetailActive: Writable<boolean> = writable(false);
export const selectedCampaign: Writable<Campaign> = writable();