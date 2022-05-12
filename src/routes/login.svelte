<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";
  export const load: Load = ({ session }) => {
    if (session.id) {
      return { redirect: "/", status: 302 };
    }

    return {};
  };
</script>

<script lang="ts">
  import { goto } from "$app/navigation";
  import { session } from "$app/stores";
  import ContainedButton from "$components/ContainedButton.svelte";
  import OutlinedInput from "$components/OutlinedInput.svelte";
  import { authenticate } from "$lib/api";
  import Link from "$components/Link.svelte";

  let username = "";
  let password = "";

  async function login() {
    const user = await authenticate("login", {
      username,
      password,
    });

    if (user !== null) {
      $session = user;
      goto("/");
    } else {
      console.error("login: fail");
    }
  }
</script>

<form
  action="post"
  class="flex flex-col items-center gap-4 p-4 mx-auto my-12 rounded-md shadow-md w-max bg-zinc-800 shadow-zinc-900"
  on:submit|preventDefault={login}
>
  <h1 class="self-start text-2xl">Login</h1>
  <OutlinedInput label="Username" id="username" bind:value={username} />
  <OutlinedInput
    type="password"
    label="Password"
    id="password"
    bind:value={password}
  />
  <Link href="/register">Don't have an account yet?</Link>
  <ContainedButton type="submit">Login</ContainedButton>
</form>
