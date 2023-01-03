<template>
	<Transition name="fade">
		<div class="vmessage-container fixed top-9 w-auto alert shadow-lg fade-in-linear-enter-active" :class="type[props.type]">
			<div>
				<svg
					v-if="props.type === 'success'"
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current flex-shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<svg
					v-else-if="props.type === 'info'"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="stroke-current flex-shrink-0 w-6 h-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
				</svg>
				<svg
					v-else-if="props.type === 'warning'"
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current flex-shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					/>
				</svg>
				<svg
					v-else-if="props.type === 'error'"
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current flex-shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span>{{ props.text }}</span>
			</div>
		</div></Transition
	>
</template>

<script setup>
const props = defineProps({
	type: {
		type: String,
		default: 'info',
	},
	text: {
		type: String,
		default: 'default message',
	},
});
const type = {
	info: 'alert-info',
	success: 'alert-success',
	warning: 'alert-warning',
	error: 'alert-error',
};
const visible = ref(false);
onMounted(() => {
	visible.value = true;
	setTimeout(() => {
		// visible.value = false
	}, 2000);
});
</script>

<style scoped>
.vmessage-container {
	left: 50%;
	transform: translateX(-50%);
	z-index: 9999;
}
</style>
