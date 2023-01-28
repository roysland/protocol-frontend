<script>
import { ListBox, ListBoxItem } from "@skeletonlabs/skeleton";
import { createEventDispatcher, onMount } from 'svelte';
import { writable } from "svelte/store";
import { push } from 'svelte-spa-router'
import { poopTypes, poops, api } from "../../store/api";
import moment from "moment";
import SvelteHeatmap from 'svelte-heatmap';
const dispatch = createEventDispatcher()

let stool = writable(0)

let showForm = false

const handleCancel = () => {
    showForm = false
}
const handleSave = async () => {
    await api.stool.registerPoop($stool)
    showForm = false
}

const badgeMap = [
    'filled-error',
    'filled-warning',
    'filled-success',
    'filled-success',
    'filled-warning',
    'filled-error'
]
let heatmap

Promise.all([api.stool.getTypes(),
api.stool.getMyPoops()])

</script>
{#if showForm}
<div class="card mt-4 mx-4">
	<div class="p-4">
        <ListBox label="Konsistens" selected={stool}>
            {#each $poopTypes as st}
            <ListBoxItem value={st.id}>
                <div class="flex items-center">
                    <div class="image mr-4" style="width: 64px;"><img src={st.image} /></div>
                    <span>{st.name}</span>
                </div>  
            </ListBoxItem>
            {/each}
        </ListBox>
    </div>
	<footer class="card-footer">
        <div class="flex justify-between">
            <button class="btn" on:click={() => showForm = false}>Avbryt</button>
            <button class="btn btn-filled-primary" on:click={handleSave}>Lagre</button>
        </div>
    </footer>
</div>
{/if}

{#if !showForm}
<div class="flex items-center justify-center p-4">
    <button class="btn btn-filled-primary" on:click={() => { showForm = true}}>Legg til dobesøk</button>
</div>
{/if}
<nav class="list-nav">
	<p class="font-bold">Siste dobesøk</p>
	<dl class="list-dl">
        {#each $poops as poop}
		<div class="card glass-primary mb-4">
            <span class="badge bg-primary-500">💀</span>
            <span class="flex-auto">
                <dt>{moment(poop.createdAt).fromNow()}</dt>
                <dd><span class="badge {badgeMap[poop.stool.bristolValue]}">{poop.stool.description}</span> - {poop.stool.name}</dd>
            </span>
        </div>
        {/each}
	</dl>
</nav>