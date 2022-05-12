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
  import { goto } from "$app/navigation";
  import { session } from "$app/stores";
  import Avatar from "$components/Avatar.svelte";
  import Header from "$components/Header.svelte";
  import Menu from "$components/Menu.svelte";
  import MenuItem from "$components/MenuItem.svelte";
  import { logout as _logout } from "$lib/api";
  import "@fontsource/material-icons";
  import "../app.css";
  import { onMount } from "svelte";

  let fullscreen = false;

  onMount(() => {
    const onchange = () => {
      fullscreen = Boolean(document.fullscreenElement);
    };
    onchange();

    document.addEventListener("fullscreenchange", onchange);
    return () => {
      document.removeEventListener("fullscreenchange", onchange);
    };
  });

  function toggleFullscreen() {
    const isFullscreen = Boolean(document.fullscreenElement);
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    fullscreen = !isFullscreen;
  }

  async function logout() {
    const ok = await _logout();
    if (ok) {
      $session = {} as any;
      goto("/");
    }
  }
</script>

<Header>
  {#if $session.id}
    <Menu anchor="right">
      <Avatar user={$session} size="lg" slot="parent" />
      <MenuItem
        icon={fullscreen ? "fullscreen_exit" : "fullscreen"}
        on:click={toggleFullscreen}
      >
        Toggle Fullscreen
      </MenuItem>
      <MenuItem style="danger" icon="logout" on:click={logout}>Logout</MenuItem>
    </Menu>
  {/if}
</Header>
<main class="z-0 overflow-auto">
  <slot />
</main>
