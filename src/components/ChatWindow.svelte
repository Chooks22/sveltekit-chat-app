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

<ul class="flex flex-col gap-2 px-4 pt-2 pb-14 overflow-auto" bind:this={self}>
  {#each chats as chat}
    <ChatItem {chat} />
  {/each}
</ul>
