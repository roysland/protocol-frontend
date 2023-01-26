<script>
import {writable} from 'svelte/store'
import AddMedicine from "./medicine/AddMedicine.svelte";
import ShowTodayMedicine from './medicine/ShowTodayMedicine.svelte';
import { Tab, TabGroup } from '@skeletonlabs/skeleton';
import { api, medicine } from '../../store/api.js'
import { onMount } from 'svelte';
const storeTab = writable('today')

onMount(async () => {
    await api.medicine.allMedicine()
})
</script>


<TabGroup selected={storeTab}>
    <Tab value="today">
        Today
    </Tab>
	<Tab value="overview">
        Overview
    </Tab>
	<Tab value="Add">
        Add
    </Tab>
</TabGroup>
{#if $storeTab === 'today'}
<ShowTodayMedicine></ShowTodayMedicine>
{/if}
{#if $storeTab === 'overview'}
<h3>Showing all medicine</h3>
<dl class="list-dl">
{#each $medicine as med}
	<div>
		<span class="badge">💊</span>
		<span class="flex-auto">
			<dt>{med.name}</dt>
			<dd>{med.when}</dd>
		</span>
	</div>
{/each}
</dl>
{/if}
{#if $storeTab === 'Add'}
<AddMedicine></AddMedicine>
{/if}

