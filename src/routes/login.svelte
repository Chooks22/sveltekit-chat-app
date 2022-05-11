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
  import type { AuthBody, AuthResult } from "./api/v1/_types";

  let username = "";
  let password = "";

  async function login() {
    const body: AuthBody = {
      username,
      password,
    };

    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const data: AuthResult = await res.json();
      session.set(data.user);
      await goto("/");
    } else {
      console.error("login:", res.status, res.statusText);
    }
  }
</script>

<form
  action="post"
  class="flex flex-col gap-2 w-1/2 mx-auto items-center"
  on:submit|preventDefault={login}
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
  <button type="submit" class="bg-purple-500 px-4 py-1 rounded shadow">
    Login
  </button>
</form>
