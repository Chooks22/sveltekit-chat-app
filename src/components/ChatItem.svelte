<script lang="ts">
  import { session } from "$app/stores";
  import type { Chat } from "src/routes/_types";
  import Avatar from "./Avatar.svelte";

  export let chat: Chat;
</script>

<li class="flex gap-3">
  <Avatar user={chat.user} size="md" />
  <div class="flex flex-col">
    <span
      class={`font-bold leading-none ${
        $session.id === chat.userId ? "text-yellow-500" : "text-blue-500"
      }`}
    >
      {chat.user.username}
    </span>
    <span>
      {chat.content}
    </span>
  </div>
</li>
