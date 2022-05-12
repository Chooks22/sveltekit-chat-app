<script lang="ts">
  import type { InputType } from "./_types";

  export let value = "";
  export let type: InputType = "text";
  export let label: string;
  export let id: string;
  export let name = id;
  export let labelHidden = false;
  export let placeholder = "";

  const input = (e: Event) => {
    value = (e.currentTarget as HTMLInputElement).value;
  };
</script>

<label for={id} hidden={labelHidden}>{label}</label>
<input
  {type}
  {id}
  {name}
  {value}
  {placeholder}
  on:input={input}
  autocomplete="off"
  class="w-full h-10 px-4 py-2 text-white rounded-full shadow outline-none bg-zinc-700 shadow-zinc-900"
/>
