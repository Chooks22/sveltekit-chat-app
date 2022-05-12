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
  import { authenticate } from "$lib/api";
  import OutlinedInput from "$components/OutlinedInput.svelte";
  import Link from "$components/Link.svelte";
  import ContainedButton from "$components/ContainedButton.svelte";

  let username = "";
  let password = "";
  let test = "";

  async function register() {
    if (username.length < 6 || password.length < 8 || password !== test) {
      return;
    }

    const user = await authenticate("register", {
      username,
      password,
    });

    if (user !== null) {
      $session = user;
      goto("/");
    } else {
      console.error("register: fail");
    }
  }
</script>

<form
  action="post"
  class="flex flex-col items-center gap-4 p-4 mx-auto my-12 rounded-md shadow-md w-max bg-zinc-800 shadow-zinc-900"
  on:submit|preventDefault={register}
>
  <h1 class="self-start text-2xl">Register</h1>
  <OutlinedInput label="Username" id="username" bind:value={username} />
  <OutlinedInput
    type="password"
    label="Password"
    id="password"
    bind:value={password}
  />
  <OutlinedInput
    type="password"
    label="Re-enter Password"
    id="password-test"
    name="password-test"
    bind:value={test}
  />
  <Link href="/login">Already have an account?</Link>
  <ContainedButton type="submit">Register</ContainedButton>
</form>
