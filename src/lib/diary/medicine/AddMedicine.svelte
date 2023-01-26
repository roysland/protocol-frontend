<script>
    import moment from "moment";
    import { api } from "../../../store/api";

    let name;
    let when = '06-11'
    let start = moment().format('YYYY-MM-DD')
    let end = null

    const addMedicine = async () => {
        const medicine = {
            when: when,
            start: start,
            end: end,
            name: name
        }
        await api.medicine.addMedicine(medicine)
        name = ''
    }
</script>
<section class="m-4">
<div class="alert mb-4">
    <div class="alert-message">
        <h3>Tar du samme medisin flere ganger daglig?</h3>
        <p>Legg inn samme medisin flere ganger.</p>
    </div>
</div>
<div class="card p-4">
    <label for="name">
        <span>Navn på medisin</span>
        <input type="text" id="name" bind:value={name} minlength="2" required />
    </label>
    <div class="mt-2">
        <label class="block">
            <span>Tidspunkt</span> 
            <select bind:value={when}>
                    <option value="06-11">Morgen (06 - 11)</option>
                    <option value="11-15">Formiddag (11 - 15)</option>
                    <option value="15-19">Ettermiddag (15 - 19)</option>
                    <option value="19-23">Kveld (19 - 23)</option>
            </select>
        </label>
    </div>
    <div class="flex items-center space-between gap-2 mt-2">
        <div>
            <label><span>Startdato</span> <input type="date" bind:value={start} required></label>
        </div>
        <div>
            <label><span>Sluttdato (valgfritt)</span> <input type="date" placeholder="" bind:value={end}></label>
        </div>
    </div>
    <div class="footer p-4 flex justify-end">
        <button class="btn btn-filled-primary" on:click={addMedicine}>Lagre</button>
    </div>
</div>
</section>