<script lang="ts">
    import axios from "axios";
    import io from 'socket.io-client';
    import { user, socket, ownerSocketID, userIDPairs, formatModifier, sendSkillCheck, messageMode } from '../stores';
    import { push, replace } from "svelte-spa-router";
    import Chat from "../components/Game/Chat/Chat.svelte";
    import GameInfo from "../components/Game/GameInfo.svelte";
    import type UserIDPair from "../interfaces/UserIDPair";
    import { nanoid } from "nanoid/non-secure";
    import LoadingCircle from "../components/LoadingCircle.svelte";
    import GameRouterOwner from "../components/Game/GameRouterOwner.svelte";
    import GameRouterPlayer from "../components/Game/GameRouterPlayer.svelte";

    export let params: { id?: string } = {};

    // initialises socket
    socket.set(io());

    // returns current campaign object or redirects to dashboard
    const loadGame = async () => {
		try {
			const response = await axios.get(`/api/game/${params.id}`);
                        
			user.set(response.data.userInfo);
            $socket.emit('join-room', { roomID: params.id, userID: $user._id });
			return $user.gameData;
		}
		catch (err){
            replace('/');
		}
	}

    $socket.on('user-joined-room', (joinedUser: UserIDPair) => {

        // if you are the owner, and user joins
        if ($user && $user.gameData && $user._id === $user.gameData.owner) {
            // save user's id pair inside the userIDPairs store (Record<userID, socketID>)
            userIDPairs.update( userIDPairs => {
                userIDPairs[joinedUser.userID] = joinedUser.socketID;
                return userIDPairs;
            });

            // then send them your/owner's socket id
            $socket.emit('ack-join', { ownerSocketID: $socket.id, joinedUserSocketID: joinedUser.socketID });
        }

        // if you are the user, and owner joins
        if (joinedUser.isOwner) {
            // save owner's socket into the ownerSocketID store
            ownerSocketID.set(joinedUser.socketID);
            // then send them your id pair in response
            $socket.emit('ack-owner-join', { ownerSocketID: $ownerSocketID, userID: $user._id, socketID: $socket.id });
        }
    });

    // if user joins after the owner, owner sends their socketID to the user through 'ack-join'
    $socket.on('ack-join', (ownerAckSocketID: string) => {
        ownerSocketID.set(ownerAckSocketID);
    });

    // if owner joins after the user, user sends their ID pair to the owner through 'ack-owner-join' and it ends up here
    $socket.on('ack-owner-join', (userAckIDPair: UserIDPair) => {
        userIDPairs.update( userIDPairs => {
                userIDPairs[userAckIDPair.userID] = userAckIDPair.socketID;
                return userIDPairs;
        });
    });

    /**
     * Formats modifier to show plus signs if the modifier is positive
     */
    formatModifier.set((modifier: number, signDisplay: ("exceptZero" | "always" | "auto" | "never") = "exceptZero") => {
        return new Intl.NumberFormat("en-US", {
            signDisplay: signDisplay
        }).format(modifier);
    });

    sendSkillCheck.set(async (
        modifier: number, 
        skillName: string, 
        charName: string = '', 
        entityID: string = '', 
        diceType = 'd20', 
        customID = nanoid(16),
        customFormula: string = '',
        flag = '',
        diceAccent: 'roll-over' | 'roll-under' = 'roll-over'
    ) => {
        const messageText = customFormula === '' ? `/r ${diceType}${modifier !== 0 ? $formatModifier(modifier, "always"): ''}` : `/r ${customFormula}`;

        $socket.emit('chat-message', {
            senderInfo: {
                _id: $user._id, 
                username: $user.username,
                settings: $user.settings,
            }, 
            messageText: messageText,
            messageID: customID, 
            skillCheckInfo: {
                characterName: charName,
                skillName: skillName,
                entityID: entityID,
                flag: flag,
                diceAccent: diceAccent
            },
            gameID: params.id,
            ownerSocketID: $ownerSocketID,
            messageMode: $messageMode
        });
    });

</script>

{#await loadGame()}
    <div id="progress-circle">
        <LoadingCircle/>
    </div>
{:then gameData}
    <game-content>
        <!-- <GameGuide></GameGuide> -->
        <div class="character-sheet">
            {#if $user && $user._id === gameData.owner}
                <GameRouterOwner gameData={gameData}></GameRouterOwner>
            {:else}
                <GameRouterPlayer gameData={gameData}></GameRouterPlayer>
            {/if}
        </div>
        <div class="game-info">
            <GameInfo gameData={gameData}></GameInfo>
        </div>
        <div class="chat">
            <Chat></Chat>
        </div>
    </game-content>
{/await}


<style>
    game-content {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: minmax(0, 1fr) minmax(0, 10fr);
        grid-auto-flow: row;
        grid-template-areas:
            "character-sheet character-sheet character-sheet game-info"
            "character-sheet character-sheet character-sheet chat";
        
        padding-top: 1em;
        height: calc(95vh);
        gap: 1em;
    }

    game-content > div {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .character-sheet { grid-area: character-sheet; }
    .game-info { grid-area: game-info; }
    .chat { grid-area: chat; }

    #progress-circle {
      display: flex; 
      justify-content: center;
      align-items: center;
      height: 95vh;
    }

    :global(::-webkit-scrollbar) {
        width: 8px;
    }
    :global(::-webkit-scrollbar-track) {
        background: #1d1d22;
    }
    :global(::-webkit-scrollbar-thumb) {
        background-color: #757578;
        border: transparent;
    }
    :global(::-webkit-scrollbar-thumb:hover) {
        background-color: #404044;
    }


</style>