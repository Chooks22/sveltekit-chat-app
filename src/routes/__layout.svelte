<script>
  import Header from "$components/Header.svelte";
  import "../app.css";
</script>

<Header />
<main class="h-full bg-zinc-900 p-4">
  <slot />
</main>
