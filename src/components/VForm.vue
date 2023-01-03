<template>
	<div><slot></slot></div>
</template>

<script lang="ts">
import Message from '~/utils/dom/message';
import { validator } from '~/utils/validator';
export default defineComponent({
	props: {
		modelValue: {
			type: Object,
			default() {
				return {};
			},
		},
		rules: {
			type: Object,
			default() {
				return {};
			},
		},
		labelWidth: {
			type: String,
			default: '120px',
		},
	},
	setup(props, ctx) {
		provide('labelWidth', props.labelWidth);
		// 校验整个表单
		function validateFields(reset = false) {
			let valid = true;
			const ruleKeys = Object.keys(props.rules);
			// console.log('[VForm]', ruleKeys);
			ruleKeys.forEach((ruleKey) => {
				const value = props.modelValue[ruleKey];
				// const keyResult = validateField(value, ruleKey);
				const keyResult = validateField(value, ruleKey, reset);
				if (keyResult.length > 0) {
					valid = false;
					Message({ type: 'error', text: keyResult[0] });
				}
			});

			return valid;
		}
		function resetFields() {
			let obj = {};
			Object.keys(props.modelValue).forEach((key) => {
				obj = {
					...obj,
					[key]: null,
				};
			});
			validateFields(true);
			ctx.emit('update:modelValue', obj);
		}

		function validateField(value, prop, reset = false) {
			const defaults = ctx.slots.default();
			const [vNode] = defaults.filter((vnode) => vnode.props && prop === vnode.props.prop);

			const rules = props.rules[prop];

			let keyResult = [];
			if (vNode && rules) {
				if (!reset) {
					keyResult = validator(value, rules);
				}
				vNode.error = keyResult;
			}
			return keyResult;
		}
		return {
			validateFields,
			resetFields,
		};
	},
});
</script>
