<script>
    import PoopForm from "./PoopForm.svelte";
    import PeriodForm from './PeriodForm.svelte'
    import HealthMeasures from "./HealthMeasures.svelte";
    import Supplement from "./Supplement.svelte";
    import MedicineRegister from "./MedicineRegister.svelte";
    export let params
</script>
{#if params.type === 'poop'}
<PoopForm></PoopForm>
{:else if params.type === 'period'}
<PeriodForm></PeriodForm>
{:else if params.type === 'supplement'}
<Supplement></Supplement>
{:else if params.type === 'medicine'}
<MedicineRegister></MedicineRegister>
<!-- <HealthMeasures></HealthMeasures> -->
{:else}
<p>Implement {params.type}</p>
{/if}
