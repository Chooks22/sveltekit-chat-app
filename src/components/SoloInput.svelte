<script lang="ts">
  type InputType =
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";

  export let value = "";
  export let type: InputType = "text";
  export let label: string;
  export let id: string;
  export let name = id;
  export let labelHidden = false;

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
  on:input={input}
  autocomplete="off"
  class="w-full h-10 px-3 py-2 text-white rounded-full shadow bg-zinc-700 shadow-zinc-900"
/>
