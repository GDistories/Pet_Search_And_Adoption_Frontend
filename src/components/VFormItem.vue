<template>
	<div class="form-item flex items-center" :ref="prop">
		<label class="form-item-label text-right" :style="{ width: labelWidth }">
			{{ label }}
		</label>
		<div class="form-item-con p-2">
			<slot></slot>
		</div>
		<span>{{ err }}</span>
	</div>
</template>

<script lang="ts">
export default defineComponent({
	props: {
		label: {
			type: String,
		},
		prop: {
			type: String,
			default: '',
		},
		err: {
			type: String,
			default: '',
		},
	},
	setup(props, ctx) {
		const { label, prop, err } = toRefs(props);

		const labelWidth = inject('labelWidth');
		const error = ref([]); // 校验信息:['请输入姓名', '请输入 1 - 10 个字符']

		const msg = computed(() => {
			return error.value[0]; // 显示第一个
		});

		return {
			label,
			prop,
			err,
			msg,
			labelWidth,
		};
	},
});
</script>

<style lang="less" scoped>
.form-item {
	.form-item-label {
		vertical-align: middle;
		float: left;
		font-size: 14px;
		color: #606266;
		line-height: 40px;
		padding: 0 12px 0 0;
		box-sizing: border-box;
	}
	.form-item-con {
		line-height: 40px;
		position: relative;
		font-style: 14px;
		overflow: hidden;
	}
}
</style>
