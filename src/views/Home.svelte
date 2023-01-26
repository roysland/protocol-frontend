<script>
import { Modal, modalStore } from "@skeletonlabs/skeleton";
import DiaryInput from "../lib/diary/DiaryInput.svelte";

let selectedEntry = null
function triggerModal (type) {
	const comp = {
		ref: DiaryInput,
		props: { which: type}
	}
	const d = {
		type: 'component',
		component: comp
	}
	modalStore.trigger(d)
}
</script>

<div class="flex justify-center items-center w-100">
	<div class="shortcuts">
		<a href="#/form/poop" class="btn-icon btn-filled-primary btn-lg">🚽</a>
		<a href="#/form/period" class="btn-icon btn-filled-secondary btn-lg">🩸</a>
		<a href="#/form/food" class="btn-icon btn-filled-tertiary btn-lg">🍽</a>
		<a href="#/form/medicine" class="btn-icon btn-filled-error btn-lg">🩺</a>
		<a href="#/form/supplement" class="btn-icon btn-filled-success btn-lg">🌿</a>
	</div>
</div>
{#if selectedEntry}
	<Modal class="default"></Modal>
{/if}

