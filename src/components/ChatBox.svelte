<script lang="ts">
  import IconButton from "./IconButton.svelte";
  import SoloInput from "./SoloInput.svelte";

  export let value: string;
</script>

<span class="absolute bottom-0 flex w-full gap-2 px-4 py-2">
  <SoloInput type="text" id="chat-box" label="Chat" labelHidden bind:value />
  <IconButton type="submit">send</IconButton>
</span>
