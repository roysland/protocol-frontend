<script>
    import {TabGroup, Tab} from '@skeletonlabs/skeleton'
    import { writable } from 'svelte/store';
    import { MedicineToday, MedicineAll, MedicineEdit } from '../lib/medicine/index.js'
    const storeTab = writable('checklist');
</script>
<TabGroup selected={storeTab}>
	<Tab value="checklist">Sjekkliste</Tab>
	<Tab value="all">Alle medisiner</Tab>
    <Tab value="edit">Håndter medisiner</Tab>
</TabGroup>
{#if $storeTab === 'checklist'}
<MedicineToday></MedicineToday>
{:else if $storeTab === 'all'}
<MedicineAll></MedicineAll>
{:else if $storeTab === 'edit'}
<MedicineEdit></MedicineEdit>
{/if}