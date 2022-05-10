<script lang="ts">
  interface User {
    id: string;
    username: string;
  }

  let username = "";
  let password = "";
  let test = "";

  async function register() {
    if (username.length < 6 || password.length < 8 || password !== test) {
      return;
    }

    const res = await fetch("/api/v1/auth/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (res.ok) {
      const data: { user: User } = await res.json();
      console.log("register:", data.user.id);
    } else {
      console.error("register:", res.status, res.statusText);
    }
  }
</script>

<form
  action="post"
  class="flex flex-col gap-2 w-1/2 mx-auto items-center"
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
  <button type="submit" class="bg-purple-500 px-4 py-1 rounded shadow">
    Register
  </button>
</form>
