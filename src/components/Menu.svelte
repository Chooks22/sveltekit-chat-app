<script lang="ts">
  export let visible = false;
  export let anchor: "left" | "right" = "left";

  function toggle() {
    visible = !visible;
  }
</script>

<span class="relative">
  <button class="block" on:click={toggle}>
    <slot name="parent" />
  </button>
  <ul
    on:click={toggle}
    class={`-m-1 absolute flex-col justify-center bg-zinc-700 rounded-sm overflow-hidden shadow-md shadow-zinc-900 ${
      anchor === "left" ? "left-0" : "right-0"
    } ${visible ? "flex" : "hidden"}`}
  >
    <slot />
  </ul>
</span>
