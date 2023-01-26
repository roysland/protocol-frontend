<script>
import { SlideToggle } from "@skeletonlabs/skeleton";
    import moment from "moment";
import { api, supplements } from "../../store/api";
let name
let interval
let checkedSupplements = []
let page = 'check'
const addSupplement = async () => {
    const supp = {
        name: name,
        when: interval
    }
    await api.supplements.addSupplement(supp)
    name = null
    page = 'overview'
}

const markChecked = (supplement) => {
    // console.log(supplement)
}

const deleteChecked = async () => {
    await api.supplements.deleteSupplements(checkedSupplements)
    checkedSupplements = []
}
</script>
<div class="radio-group items-center p-1 overflow-hidden space-x-1 rounded-token flex bg-surface-200-700-token border-surface-300 dark:border-surface-600 border-token rounded-token " data-testid="radio-group" role="radiogroup" aria-label="radiogroup">
    <div class="radio-item flex-auto" role="radio" aria-checked="true" aria-label="" tabindex="0" data-testid="radio-item">
        <label class="radio-item-label font-bold text-base text-center cursor-pointer whitespace-nowrap !text-on-secondary-token  text-surface-50 px-4 py-2 rounded-token {page === 'check' ? 'bg-secondary-active-token' : ''}">
            <input class="radio-item-input hidden" type="radio" bind:group={page} value="check"> Sjekkliste</label>
    </div> 
    <div class="radio-item flex-auto" role="radio" aria-checked="false" aria-label="" tabindex="0" data-testid="radio-item">
        <label class="radio-item-label font-bold text-base text-center cursor-pointer whitespace-nowrap bg-secondary-hover-token px-4 py-2 rounded-token {page === 'add' ? 'bg-secondary-active-token' : ''}">
            <input class="radio-item-input hidden" type="radio" bind:group={page} value="add"> Legg til</label>
        </div> 
    <div class="radio-item flex-auto" role="radio" aria-checked="false" aria-label="" tabindex="0" data-testid="radio-item">
        <label class="radio-item-label font-bold text-base text-center cursor-pointer whitespace-nowrap bg-secondary-hover-token px-4 py-2 rounded-token  {page === 'overview' ? 'bg-secondary-active-token' : ''}">
            <input class="radio-item-input hidden" type="radio" bind:group={page} value="overview"> Oversikt</label>
    </div>
</div>
{#if page === 'add'}
<div class="card p-4 mt-4">
    <header class="card-header">Legg til supplement</header>
    <label for="name">
        <span>Navn</span>
        <input class="" type="text" id="name" bind:value={name} minlength="2" required>
    </label>
    <div class="flex items-end justify-between">
        <label for="color">
            <span>Hvor ofte</span>
            <select name="color" id="color" bind:value={interval}>
                <option value="daily">Daglig</option>
                <option value="on-need">Ved behov</option>
            </select>
        </label>
        <button class="btn btn-filled-primary" on:click={addSupplement}>Legg til i listen</button>
    </div>
</div>
{/if}
{#if page === 'overview'}
{#await api.supplements.getAllSupplements() then }
<div class="card m-4">
    <header class="card-header">Mine supplementer</header>
    <ol class="list">
        {#each $supplements as sup}
        <li class="flex align-center">
            <label class="unstyled flex items-center space-x-2 flex-grow"><input type="checkbox" name="supplements-{sup.id}" value={sup.id} bind:group={checkedSupplements}> <span>{sup.name}</span></label>
            <span>{sup.when}</span>
        </li>
        {/each}
    </ol>
</div>
{/await}
{/if}

{#if page === 'check'}
{#await api.supplements.getAllSupplements() then }
<div class="card m-4">
    <header class="card-header">Mine supplementer {moment().format('DD MMMM')}</header>
    <ol class="list">
        {#each $supplements as sup}
        <li class="flex align-center">
            <SlideToggle size="sm" on:change={() => markChecked(sup)}><span>{sup.name}</span></SlideToggle>
            
        </li>
        {/each}
    </ol>
</div>
{/await}
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