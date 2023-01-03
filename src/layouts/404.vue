<script setup lang="ts">
const router = useRouter();
const { t } = useI18n();
</script>

<template>
	<main p="x4 y10" class="container mx-auto px-4 md:px-12 pt-6" text="center teal-700 dark:gray-200">
		<div text-4xl>
			<div i-carbon-warning inline-block />
		</div>
		<div>
			<button class="btn btn-primary" @click="router.back()">{{ t('button.back') }}</button>
			<RouterView />
		</div>
	</main>
</template>
