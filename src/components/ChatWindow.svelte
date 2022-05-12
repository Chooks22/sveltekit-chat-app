<script lang="ts">
  import type { Chat } from "src/routes/_types";
  import { onMount } from "svelte";
  import ChatItem from "./ChatItem.svelte";

  export let self: HTMLUListElement;
  export let chats: Chat[];

  onMount(() => {
    self.scrollTo(0, self.scrollHeight);
  });
</script>

<ul
  class="flex flex-col h-screen gap-2 px-4 pt-2 overflow-auto pb-14"
  bind:this={self}
>
  {#each chats as chat}
    <ChatItem {chat} />
  {/each}
</ul>
