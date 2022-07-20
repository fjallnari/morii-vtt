<script lang="ts">
    import axios from "axios";
    import io from 'socket.io-client';
    import { user, socket, ownerSocketID, userIDPairs } from '../stores';
    import { push, replace } from "svelte-spa-router";
    import Chat from "../components/Game/Chat/Chat.svelte";
    import GameInfo from "../components/Game/GameInfo.svelte";
    import CircularProgress from '@smui/circular-progress';
    import CharacterHandler from "../components/Game/CharacterHandler.svelte";
    import type UserIDPair from "../interfaces/UserIDPair";
    import GameOverview from "../components/Game/GameOverview/GameOverview.svelte";

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

</script>

{#await loadGame()}
    <div id="progress-circle"><CircularProgress style="height: 4em; width: 4em;" indeterminate /></div>
{:then gameData}
    <div class="game-content">
        {#if $user && $user._id === gameData.owner}
            <GameOverview gameData={gameData}></GameOverview>
        {:else}
            <CharacterHandler gameData={gameData}></CharacterHandler>
        {/if}
        <div class="right-panel">
            <GameInfo gameData={gameData}></GameInfo>
            <Chat></Chat>
        </div>
    </div>
{/await}


<style>
    .game-content {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding-top: 1em;
        height: 95vh;
        gap: 1em;
    }

    .right-panel {
        display: flex;
        flex-direction: column; 
        align-items: center;
        height: inherit;
        gap: 1em;
    }

    #progress-circle {
      display: flex; 
      justify-content: center;
      align-items: center;
      height: 95vh;
    }


</style>