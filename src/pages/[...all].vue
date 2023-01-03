<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
	<div>
		<el-empty :description="t('not-found')" />
	</div>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>
