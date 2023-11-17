<script lang="ts">

    let opacity = 0;
    let transformPos = -20;

    export let visibleOnPageLoad: boolean = true;
    export let fadeTime: number = 1000;

    import { onMount } from "svelte";

    if (visibleOnPageLoad) {
        onMount(() => {
        setTimeout(() => {
            opacity = 1;
            transformPos = 0;
        }, fadeTime);
        });
    } else {
        onMount(() => {
            window.addEventListener('scroll', () => {
            const el = document.getElementById("container");
            const pos = el?.scrollTop;
            if (pos && pos < 0.1) {
                opacity = 1;
                transformPos = 0;
            }
        });
        })
    }

</script>

<div id="container" style="opacity: {opacity}; transition-duration: 0.7s; transform: translateY({transformPos}px)">
    <slot />
</div>
