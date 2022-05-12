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
  class="flex flex-col items-center w-1/2 gap-2 mx-auto"
  on:submit|preventDefault={register}
>
  <span>
    <label class="block" for="username">Username</label>
    <input type="text" id="username" name="username" bind:value={username} />
  </span>
  <span>
    <label class="block" for="password">Password</label>
    <input
      type="password"
      id="password"
      name="password"
      bind:value={password}
    />
  </span>
  <span>
    <label class="block" for="password-test">Re-enter Password</label>
    <input
      type="password"
      id="password-test"
      name="password-test"
      bind:value={test}
    />
  </span>
  <a href="/login">Already have an account?</a>
  <button type="submit" class="px-4 py-1 bg-purple-500 rounded shadow">
    Register
  </button>
</form>
