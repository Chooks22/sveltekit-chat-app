<script lang="ts">
  import type { ButtonType } from "./_types";

  export let type: ButtonType = "button";
</script>

<button
  {type}
  class="relative flex items-center justify-center w-10 h-10 p-4 overflow-hidden text-xl transition-colors bg-purple-500 rounded-full shadow font-icon shadow-zinc-900 before:transition-colors before:pseudo-fill hover:before:bg-white/10 active:before:bg-white/25"
>
  <slot />
</button>
