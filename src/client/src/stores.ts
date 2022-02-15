import { Writable, writable } from 'svelte/store';
import type User from './interfaces/User';


export const accessToken = writable("");
export const user: Writable<User> = writable();