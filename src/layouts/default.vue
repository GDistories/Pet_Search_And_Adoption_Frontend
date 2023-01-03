<template>
	<div>
		<Header :class="classObj" />
		<main class="app-main">
			<RouterView />
		</main>
		<Footer />
	</div>
</template>

<script setup lang="ts">
import { useSettingStore } from '~/store/setting';

import { storeToRefs } from 'pinia';
const settingStore = useSettingStore();
const { device } = storeToRefs(settingStore);
const classObj = computed(() => {
	return {
		mobile: device.value === 'mobile',
	};
});

onBeforeMount(() => {
	window.addEventListener('resize', handleResize);
});
onBeforeUnmount(() => {
	window.removeEventListener('resize', handleResize);
});

onMounted(() => {
	const isMobile = handleIsMobile();

	if (isMobile) {
		settingStore.toggleDevice('mobile');
	}
});
function handleIsMobile() {
	return document.body.getBoundingClientRect().width - 1 < 992;
}

function handleResize() {
	if (!document.hidden) {
		const isMobile = handleIsMobile();
		settingStore.toggleDevice(isMobile ? 'mobile' : 'desktop');
	}
}
</script>
<style lang="less" scoped>
.app-main {
	min-height: calc(100vh - 66px - 140px) !important;
}
</style>
