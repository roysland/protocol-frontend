<script>
    import { toastStore } from '@skeletonlabs/skeleton';
    import { push } from 'svelte-spa-router';
    import { user, api } from '../store/api';
    import { onMount } from 'svelte';

    let email
    let password

    const loginOrRegister = async () => {
        const login = await api.user.login({ email: email, password: password })
        toastStore.trigger({
            message: login.msg,
            autohide: true,
            timeout: 5000
        })
        push('/')
    }
    
    onMount(() => {
        if ($user) {
            
        }
    })
</script>
<section class="m-4 p-4">

<form on:submit={loginOrRegister}>
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
        <button type="submit" class="btn variant-filled-primary btn-base" on:click={loginOrRegister}>
            Logg inn
        </button>
    </footer>
</article>
</form>

</section>