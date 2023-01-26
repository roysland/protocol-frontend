<script>
    import { TabGroup, Tab } from '@skeletonlabs/skeleton';
    import { push } from 'svelte-spa-router';
    import { writable } from 'svelte/store';
    import { api } from '../store/api';
    let storeTab = writable('login')

    let email
    let password

    const registerUser = async (e) => {
        e.preventDefault()
        if (email && password) {
            await api.user.register({email: email, password: password})
            window.location.reload()
        }   
        
    }
    const login = async (e) => {
        e.preventDefault()
        if (email && password) {
            await api.user.login({email: email, password: password})
            window.location.reload()
        }
        
    }
</script>
<section class="m-4 p-4">
<TabGroup selected={storeTab}>
	<Tab value="login">Logg inn</Tab>
	<Tab value="signup">Registrer</Tab>
</TabGroup>

{#if $storeTab === 'login'}
<form on:submit={login}>
<article class="card p-4">
    <label class="input-label">
        <span>Epost</span> 
        <input type="email" placeholder="Epost" autocomplete="email" bind:value={email}>
    </label>
    <label class="input-label">
        <span>Passord</span> 
        <input type="password" placeholder="Passord" autocomplete="current-password" bind:value={password}>
    </label>
    <footer class="card-footer">
        <button type="submit" class="btn variant-filled-primary btn-base" on:click={login}>
            Logg inn
        </button>
    </footer>
</article>
</form>
{:else}
<form on:submit={register}>
<article class="card p-4">
    <header class="card-header">Lag en bruker</header>
    <label class="input-label">
        <span>Epost</span> 
        <input type="email" placeholder="Epost" autocomplete="email" bind:value={email}>
    </label>
    <label class="input-label">
        <span>Passord</span> 
        <input type="password" placeholder="Passord" bind:value={password}>
    </label>
    <footer class="card-footer">
        <button type="submit" class="btn variant-filled-primary btn-base" on:click={registerUser}>
            Registrer bruker
        </button>
    </footer>
</article>
</form>
{/if}
</section>