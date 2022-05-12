<script lang="ts">
  export let label: string;
  export let id: string;
  export let name = id;
  export let value = "";
  export let placeholder = "";
  export let type: "text" | "email" | "password" = "text";

  $: dirty = value.length > 0;

  const input = (e: Event) => {
    value = (e.currentTarget as HTMLInputElement).value;
  };
</script>

<div class="relative flex items-center group bg-inherit">
  <label
    for={id}
    class={`absolute px-1 m-2 leading-none text-white bg-inherit group-focus-within:text-purple-500 pointer-events-none transition-[colors,transform] origin-left ${
      dirty
        ? "-translate-y-5 scale-[.86]"
        : "group-focus-within:-translate-y-5 group-focus-within:scale-[.86]"
    }`}
  >
    {label}
  </label>
  <input
    {type}
    {id}
    {name}
    {placeholder}
    class="h-10 p-2 text-white transition-colors bg-transparent border border-white rounded outline-none group-focus-within:border-purple-500 caret-purple-500"
    on:input={input}
  />
</div>
