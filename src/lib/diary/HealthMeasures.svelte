<script>
import { RangeSlider } from "@skeletonlabs/skeleton";
let mood = 5
</script>
<section class="m-4">
    <RangeSlider bind:value={mood} max={10} step={1} ticked>Label</RangeSlider>
<div class="card p-4">
    <header class="card-header">Blodtrykk</header>
    <div class="items-center p-1 overflow-hidden space-x-1 rounded-token flex bg-surface-200-700-token border-surface-300 dark:border-surface-600 border-token rounded-token ">
        <label> <input type="number"></label>
        <label> <input type="number"></label>
    </div>
    <div class="flex items-center justify-end mt-4">
        <button class="btn btn-filled-primary btn-base">Registrer</button>
    </div>
</div>

<div class="card p-4 mt-4">
    <header class="card-header">Puls</header>
    <div class="flex items-end justify-between">
        <label><span>Slag i minuttet</span> <input class="w-5" type="number"></label>
        <button class="btn btn-filled-primary btn-base">Registrer</button>
    </div>
</div>

<div class="card p-4 mt-4">
    <header class="card-header">Vekt</header>
    <div class="flex items-end justify-between">
        <label><span></span> <input class="w-5" type="number"></label>
        <button class="btn btn-filled-primary btn-base">Registrer</button>
    </div>
</div>
</section>