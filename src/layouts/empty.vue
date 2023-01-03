<template>
	<main class="text-center bg-white min-h-screen">
		<RouterView />
	</main>
</template>

<script>
export default {
	components: {},
};
</script>
<style lang="less" scoped>
:deep(body, html, #app) {
	background-color: #ffffff !important;
}
</style>
