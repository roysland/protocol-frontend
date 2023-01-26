<script>
import { periods, api } from "../../store/api";
import {push } from 'svelte-spa-router'
import { SlideToggle, ProgressBar } from '@skeletonlabs/skeleton'
import Moment from 'moment'
let happenedToday = true
let actualDate = Date.now()
const handleSave = async () => {
    await api.periods.registerPeriod(actualDate)
}

const isActivePeriod = (period) => {
    return Moment(period.createdAt) > Moment().subtract(5, 'days')
}

const timeToNext = (period) => {
    return Moment(period.createdAt).add(28, 'days').fromNow()
}

</script>
<div class="alert alert-warning">
    <div class="alert-message">
        <h3>Uferdig</h3>
        <p>Denne modulen er ikke ferdig ennå</p>
    </div>
</div>
<div class="card mt-4 mx-4">
	<div class="p-4">
     <SlideToggle bind:checked={happenedToday}>
        {#if happenedToday}
            <code>Startet i dag</code>
        {:else}
        <label for="name">
            <span>Dato</span>
            <input type="date" id="name" bind:value={actualDate}>
        </label>
        {/if}
    </SlideToggle>
    </div>
	<footer class="card-footer">
        <div class="flex justify-between">
            <button class="btn" on:click={() => push('/')}>Avbryt</button>
            <button class="btn btn-filled-primary" on:click={handleSave}>Lagre</button>
        </div>
    </footer>
</div>
{#await api.periods.getMyPeriods() then data}
{#if $periods.length === 0}
    <div class="alert  alert-primary">
        <div class="alert-message ">
            <h3>Ingen registrerte</h3>
            <p>Du har ikke registrert noen menstruasjonsperioder. Klikk her hvis du har det nå</p>
            <button class="btn btn-filled-primary" on:click={handleSave}>Jeg fikk mensen i dag</button>
        </div>
    </div>
{:else}
<div class="p-8 card bg-white">
{#if isActivePeriod($periods[0])}
    <ProgressBar label="Pågående" />
{:else}
    Tid til neste menstruasjon: { timeToNext($periods[0])}
{/if}
</div>
<div class="card mt-8">
<ul>
{#each $periods as period}
    <li>Mens: {Moment(period.createdAt).format('D MMMM')}</li>
{/each}
</ul>
</div>
{/if}
{/await}