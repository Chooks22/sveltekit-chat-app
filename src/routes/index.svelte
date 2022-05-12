<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";
  export const load: Load = ({ session }) => {
    if (session.id !== undefined) {
      return { redirect: "/chat", status: 302 };
    }

    return {};
  };
</script>
