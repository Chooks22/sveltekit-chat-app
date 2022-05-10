<script>
  import "../app.css";
  import Header from "@components/Header.svelte";
</script>

<Header dense />
<main class="h-full bg-zinc-900 p-4">
  <slot />
</main>
