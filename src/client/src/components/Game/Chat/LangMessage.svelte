<script lang="ts">
    import type MessageData from "../../../interfaces/MessageData";
    import { selectedCharacter, user } from "../../../stores";

    export let message: MessageData;

    const chars = '!<>-_\\/[]{}—=+*^?#________';
    
    class TextScramble {
        private chars: string;
        private queue: any[];
        private frameRequest: number;
        private frame: number;
        private resolve: any;

        constructor() {
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }

        public setText(oldText: string, newText: string) {
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];

            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40)
                this.queue.push({ from, to, start, end });
            }

            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }

        private update() {
            let output = '';
            let complete = 0;
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i]
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                    }
                    output += char; //`<span class="dud">${char}</span>`;
                } else {
                    output += from;
                }
            }

            message.messageText = output;
            if (complete === this.queue.length) {
                this.resolve()
            } else {
                this.frameRequest = requestAnimationFrame(this.update)
                this.frame++
            }
        }

        private randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }

    //let fx = new TextScramble();
    //fx.setText(message.messageText, message.langData.originalMessage);

    const langFonts = {
        'elvish': "Midjungards",
        'dwarvish': "MOONRUNE"
    }

    $: langFont = langFonts[message.langData.name.toLowerCase()] ?? 'Quicksand';

    $: isLegible = $user?.gameData?.characters.find(char => char.playerID === $user._id)?.other_profs.find(prof => prof.name.toLowerCase() === message.langData.name.toLowerCase()) && true || $user?._id === $user?.gameData.owner;

</script>

<div class="lang-message {isLegible ? 'legible': ''}" style="font-family: {langFont};">
    {isLegible ? message.langData.originalMessage : message.messageText}
</div>

<style>
    .lang-message {
        text-align: left;
    }

    .lang-message.legible {
        font-family: Quicksand !important;
    }

</style>