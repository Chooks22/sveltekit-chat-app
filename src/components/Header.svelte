<script lang="ts">
  import { session } from "$app/stores";
</script>

<header
  class="flex-shrink-0 h-16 p-4 bg-zinc-800 items-center align-bottom flex justify-end"
>
  {#if $session.id}
    <img
      src={`https://avatars.dicebear.com/api/big-ears-neutral/${$session.id}.svg?size=48`}
      class="rounded-full cursor-pointer"
      alt=""
      srcset=""
    />
  {/if}
</header>
