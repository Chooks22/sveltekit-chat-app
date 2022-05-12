<script lang="ts">
  type ButtonType = "button" | "submit" | "reset";
  export let type: ButtonType = "button";
</script>

<button
  {type}
  class="font-icon h-10 w-10 p-4 flex items-center justify-center bg-purple-500 rounded-full text-xl shadow shadow-zinc-900"
>
  <slot />
</button>
