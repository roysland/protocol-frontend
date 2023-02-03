<script>
import { medicine, api } from "../../store/api";
import moment from 'moment'
import { SlideToggle, Drawer, drawerStore } from "@skeletonlabs/skeleton";

let dosageUnit
let form = {
    name: '',
    dosage: null,
    fromDate: null,
    toDate: null,
    when: 'morning'
}
const openDrawer = () => {
    const settings = {
        id: 'create-medicine',
        position: 'bottom',
        height: '80%'
    }
    drawerStore.open(settings)
}

const addMedicine = async () => {
    const newItem = await api.medicine.add(form)
    medicine.set([...$medicine, newItem])
    drawerStore.close()
}

</script>
<div class="floating-icon">
<button class="floating-icon-button" on:click={openDrawer}>➕</button>
</div>

{#await api.medicine.all()}
    <div class="placeholder animate-pulse" />
    <div class="placeholder animate-pulse" />
    <div class="placeholder animate-pulse" />
    <div class="placeholder animate-pulse" />
{:then}
<div class="card p-4 m-4">
    {#each $medicine as med}
    <div class="flex items-center my-4">
        
    </div>
    {/each}
</div>
{/await}
<Drawer>
<div class="card m-4 p-4">
    <label class="input-label"><span>Navn på medisin</span> <input bind:value={form.name} type="text" placeholder="Navn"></label>
<!--     <div class="flex items-center justify-between">
        <label class="input-label mr-4"><span>Navn på medisin</span> <input required bind:value={form.dosage} type="number" placeholder="Dose"></label>
        <label class="input-label"><span>Select</span> 
            <select bind:value={dosageUnit}>
                <option value="tabletter">Tabletter</option>
                <option value="mg">mg (milligrad)</option>
                <option value="ml">ml (milliliter)</option>
                <option value="ml">dråper (doseskje)</option>
            </select>
        </label>
    </div> -->
    <div class="flex items-center gap-2 justify-between">
        <label class="input-label"><span>Start dato</span> <input required type="date" bind:value={form.fromDate}></label>
        <label class="input-label"><span>Slutt dato (valgfritt)</span> <input type="date" bind:value={form.toDate}></label>
    </div>
    <div>
        <label class="input-label"><span>Når skal du ta den:</span> 
            <select bind:value={form.when}>
                <option value="morning">Morgen (06-10)</option>
                <option value="midday">Formiddag (10 - 14)</option>
                <option value="afternoon">Ettermiddag (15 - 19)</option>
                <option value="evening">Kveld (19 - 24)</option>
                <option value="night">Natt (24 - 06)</option>
            </select>
        </label>
    </div>
    <footer class="flex justify-between items-center">
        <button class="btn variant-filled-primary btn-base">
            Skeleton
        </button>
        <button class="btn variant-filled-secondary btn-base" on:click={() => drawerStore.close()}>Avbryt</button>
        <button class="btn variant-filled-primary btn-base" on:click={addMedicine}>Legg til medisin</button>
    </footer>
</div>
</Drawer>
<style lang="scss">
    .floating-icon {
        position: absolute;
        bottom: 2rem;
        right: 1rem;

    }
    .floating-icon-button {
        --tw-brightness: brightness(1.15);
        border-radius: 50%;
        width: 4rem;
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        background-color: rgb(45, 33, 88);
    }
    .single-option {
        display: flex;
        gap: 1rem;
    }
</style>