<script lang="ts">
  import type { ButtonType } from "./_types";

  export let type: ButtonType = "button";
</script>

<button
  {type}
  on:click
  class="relative px-4 py-1 overflow-hidden transition-colors bg-purple-500 rounded shadow before:transition-colors shadow-zinc-900 before:pseudo-fill hover:before:bg-white/10 active:before:bg-white/25"
>
  <slot />
</button>
