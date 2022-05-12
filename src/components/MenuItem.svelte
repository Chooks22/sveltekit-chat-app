<script lang="ts">
  export let icon = "";
  export let style: "none" | "danger" = "none";
</script>

<span
  on:click
  class={`flex items-center justify-between h-10 gap-6 px-2 cursor-pointer whitespace-nowrap ${
    style === "danger" ? "bg-red-600 hover:bg-red-500" : "hover:bg-zinc-500"
  }`}
>
  <slot />
  <span class="text-2xl font-icon">{icon}</span>
</span>
