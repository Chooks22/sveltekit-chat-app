<script lang="ts">
  export let href: string;
</script>

<a
  {href}
  class="relative text-violet-500 hover:text-violet-400 before:pseudo-underline hover:before:pseudo-underlined"
>
  <slot />
</a>
