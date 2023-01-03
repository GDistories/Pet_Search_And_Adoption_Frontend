<template>
	<el-pagination
		@update:page-size="handleSizeChange"
		@update:current-page="handleCurrentChange"
		:current-page.sync="pageHandler.currentPage"
		:page-sizes="[20, 50, 100, 200]"
		:page-size="pageHandler.pageSize"
		layout="sizes, prev, pager, next"
		:page-count="pageCount"
	>
	</el-pagination>
</template>

<script lang="ts">
export default defineComponent({
	emits: ['pageChange'],
	props: {
		pageCount: {
			type: Number,
			default: 0,
		},
	},
	setup(props, ctx) {
		const { pageCount } = toRefs(props);

		const pageHandler = reactive({
			currentPage: 1,
			pageSize: 20,
		});

		const handleSizeChange = (val: number) => {
			if (val !== pageHandler.pageSize) {
				console.log('[handleSizeChange]', val);
				pageHandler.pageSize = val;
				ctx.emit('pageChange', pageHandler);
			}
		};
		const handleCurrentChange = (val: number) => {
			if (val !== pageHandler.currentPage) {
				console.log('[handleCurrentChange]', val);
				pageHandler.currentPage = val;
				ctx.emit('pageChange', pageHandler);
			}
		};
		return { pageCount, pageHandler, handleSizeChange, handleCurrentChange };
	},
});
</script>

<style lang="less" scoped></style>
