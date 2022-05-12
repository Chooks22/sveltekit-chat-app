<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";
  export const load: Load = ({ session, routeId }) => {
    if (
      session.id === undefined &&
      routeId !== "login" &&
      routeId !== "register"
    ) {
      return { redirect: "/login", status: 303 };
    }

    return {};
  };
</script>

<script lang="ts">
  import { session } from "$app/stores";
  import Avatar from "$components/Avatar.svelte";
  import Header from "$components/Header.svelte";
  import "@fontsource/material-icons";
  import "../app.css";

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
</script>

<Header>
  {#if $session.id}
    <button on:click|preventDefault={toggleFullscreen}>
      <Avatar user={$session} size="lg" />
    </button>
  {/if}
</Header>
<main class="z-0 overflow-auto">
  <slot />
</main>
