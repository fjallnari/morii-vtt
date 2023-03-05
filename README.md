# Morii VTT [![CI](https://github.com/Ashmogh/morii-vtt/actions/workflows/main.yml/badge.svg)](https://github.com/Ashmogh/morii-vtt/actions/workflows/main.yml)
Morii is a web-based half-vtt (i.e. no maps) for playing TTRPGs. It currently supports D&D 5E and Cairn.

## Key Features
- **Campaign Management** - Create, destroy and join campaigns, invite/kick players
- **Live Games** - See/edit your character sheet, send messages to fellow players, roll some dice
- **Game Overview for GMs** - All character/NPC sheets in one place with system specific useful info
- **Character Sheets** - All the things you would expect from digital character sheets, fully incorporated rolling and more
- **Import/Export** - Import/export your characters into simple .json files or between campaigns.
- **Language Module** - Transcribe message into a fantasy language (supports elvish, dwarvish and gnomish)

### Systems

#### D&D 5E
- **Quick-Create** - Create your new character *blazingly fast* with 5E SRD Classes, Races, Spells and Equipment included *(I)*
- **Roll20 Import** - Import your characters exported from roll20 using the [VTTES](https://github.com/justas-d/roll20-enhancement-suite) plugin. 
- **SRD Monsters** - As a GM, view, save, add and modify monsters in your campaigns (with all SRD monsters included)
- **GM Overview** - Includes initiative tracker and simple ordered views of characters' armor class and passive perceptions

#### Cairn
- **Character Reroll** - Create new random character instantly, with as much rolling as you want. Also supports the Cairn optional gear packages.
- **GM Overview** - Includes basic stats overview of all PCs and separate monsters view with all Cairn SRD monsters
---

**With all that aside**, this project is still actively developed, and as such expect some rough edges here and there. If you have any issues, encounter bugs, or have some general feedback etc., feel free to [start a new issue](https://github.com/Ashmogh/morii-vtt/issues/new) or [reach out directly over Discord](https://discord.com/invite/MhKxwkRpEU).

*(I)* As there are no subclasses/backgrounds under the OGL you will sadly still have to import these manually.


## Dev Environment
If you'd like to try Morii out on local/want to contribute, you will need the following variables in a `.env` file:
```
MONGO_INITDB_DATABASE=morii
MONGO_URL=mongodb://mongo/morii-mongo?readPreference=primary

JWT_SECRET='anything can be here for dev' ~ you can also use something like "openssl rand -base64 12"
JWT_REFRESH_SECRET='same as JWT_SECRET, should be different for prod'
```
There is also a Docker dev setup which you can use so (Linux is recommended, WSL2 should work as well):
- `./bin/start-dev.sh` ~ spins up a new docker container with separated client, server and MongoDB instances
- `./bin/stop-dev.sh` ~ stops the container, you can also just Ctrl+C the running process, it calls this script to cleanly exit
You might need to add the execution permission fro both of these, like so: `chmod +x <script>`.

You can also manually spin your own MongoDB localhost instance and run MoriiVTT like this (Node 18 recommended):
1. Create local docker MongoDB container ~ `docker run -d -p 27017:27017 -v ~/mongodb_data:/data/db --name morii-mongo-local mongo:latest`.
2. Modify the `MONGO_URL` variable in `.env` to be `mongodb://localhost:27017`.
3. Run either the full stack with `yarn run-stack-dev` OR in two separate terminals: `yarn server-dev` on root and `yarn dev` in `src/client`.


## 📝 Licenses
-   **Notice of Open Game Content:** This project uses *open game content* under the [Open Gaming License, Version 1.0a](Legal.md).
-   **Designation of Open Game Content:** This project contains classes, races, spells, equipment and general rules contained in SRD5 under the aforementioned OGL license.
-   **Source Code:** The source code itself (typescript, svelte etc.) is licenced under the [MIT License](https://github.com/Ashmogh/morii-vtt/blob/main/LICENSE).
-   **Race Icons:** All race icons were created by Ashmogh using Midjourney.
-   **Class Icons:** All class icons were created by [Jime Mosqueda](https://www.artstation.com/jimemosqueda).
-   **Fonts:** *Midjungards* (the elvish font) was made by [Robert Pfeffer](http://robert-pfeffer.net). *Moonrune* (the dwarvish & gnomish font) was made by Morten Bek.
-   **Cairn:** All Cairn-related info comes from [Cairn SRD](https://cairnrpg.com/cairn-srd/), created by Yochai Gal and provided under the [CC-BY-SA 4.0.](https://creativecommons.org/licenses/by-sa/4.0/) license.
