<script lang="ts">
  type Size = "sm" | "md" | "lg";
  export let user: App.Session;
  export let size: Size = "md";

  const sizes: Record<Size, number> = {
    sm: 32,
    md: 40,
    lg: 48,
  };
</script>

<img
  src={`https://avatars.dicebear.com/api/big-ears-neutral/${user.id}.svg?size=${sizes[size]}`}
  class="rounded-full"
  alt={`Avatar of ${user.username}`}
/>
