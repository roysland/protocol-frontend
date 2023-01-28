<script>
import {writable} from 'svelte/store'
import AddMedicine from "./medicine/AddMedicine.svelte";
import ShowTodayMedicine from './medicine/ShowTodayMedicine.svelte';
import { Tab, TabGroup } from '@skeletonlabs/skeleton';
import { api, medicine } from '../../store/api.js'
import { onMount } from 'svelte';
const storeTab = writable('today')
let checkedSupplements = []

const whenNamed = (when) => {
	let name = 'Morgen'
	switch (when) {
		case '06-11':
			name = 'Morgen'
			break;
		case '11-15':
			name = 'Formiddag'
			break;
		case '15-19':
			name = 'Ettermiddag'
			break
		case '19-23':
			name = 'Kveld'
			break
		default:
			name = 'Morgen'
			break
	}
	return name
}

const deleteChecked = async () => {
    await api.medicine.deleteMedicine(checkedSupplements)
    checkedSupplements = []
}
onMount(async () => {
    await api.medicine.allMedicine()
})
</script>


<TabGroup selected={storeTab}>
    <Tab value="today">
        Sjekkliste
    </Tab>
	<Tab value="overview">
        Oversikt
    </Tab>
	<Tab value="Add">
        Legg til
    </Tab>
</TabGroup>
{#if $storeTab === 'today'}
<ShowTodayMedicine></ShowTodayMedicine>
{/if}
{#if $storeTab === 'overview'}
<h3>Viser alle aktive medisiner</h3>

<ol class="list">
	{#each $medicine as med}
	<li class="flex align-center">
		<label class="unstyled flex items-center space-x-2 flex-grow"><input type="checkbox" name="supplements-{med.id}" value={med.id} bind:group={checkedSupplements}> <span>{med.name}</span> - <span>{whenNamed(med.when)}</span></label>
	</li>
	{/each}
</ol>

{/if}
{#if $storeTab === 'Add'}
<AddMedicine></AddMedicine>
{/if}

<div class="deleteDrawer bg-primary {checkedSupplements.length > 0 ? 'show' : 'hide'}">
    <div class="flex justify-end">
        <button class="btn btn-filled-primary" on:click={deleteChecked}>Slett merkede</button>
    </div>
</div>
<style lang="scss">
    .deleteDrawer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: rgb(255,255,255,0.7);
        padding: 1rem;
        transform: translateY(100px);
        transition: transform ease-in-out 100ms;
        &.show {
            transform: translateY(0);
        }
    }
</style>