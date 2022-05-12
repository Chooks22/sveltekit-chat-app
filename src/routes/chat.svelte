<script lang="ts">
  import { session } from "$app/stores";
  import ChatBox from "$components/ChatBox.svelte";
  import ChatWindow from "$components/ChatWindow.svelte";
  import { sendMessage } from "$lib/api";
  import { ChatClient } from "$lib/chat";
  import type { Message } from "@prisma/client";
  import { onMount } from "svelte";
  import type { Chat } from "./_types";

  export let messages: Message[];
  export let users: App.Session[];

  let message = "";
  let chatWindow: HTMLUListElement;

  const userList = users.reduce((list, user) => {
    list.set(user.id, user);
    return list;
  }, new Map<string, App.Session>());

  let chats = messages.map<Chat>((msg) => ({
    ...msg,
    user: userList.get(msg.userId)!,
  }));

  onMount(() => {
    const chat = new ChatClient("ws://127.0.0.1:3001");
    chat.on("message", async (chat) => {
      chats.push(chat);
      chats = chats;
    });
  });

  const submit = async () => {
    const content = message.trim();
    if (content.length > 0) {
      const ok = await sendMessage($session.id, message);
      if (ok) {
        message = "";
        chatWindow.scrollTo(0, chatWindow.scrollHeight);
      }
    }
  };
</script>

<form
  class="flex flex-col w-full h-full relative"
  on:submit|preventDefault={submit}
>
  <ChatWindow {chats} bind:self={chatWindow} />
  <ChatBox bind:value={message} />
</form>
