<template>
	<div class="v-confirm">
		<input type="checkbox" checked id="my-modal" class="modal-toggle" />
		<div class="modal" style="z-index: 9999">
			<div class="modal-box">
				<h3 class="font-bold text-lg">{{ props.title }}</h3>
				<p class="py-4">{{ props.text }}</p>
				<div class="modal-action">
					<label class="btn" @click="cancelCallback">{{ i18n.t('confirm.confirm') }}</label>
					<label class="btn" @click="confirmCallback">{{ i18n.t('confirm.cancel') }}</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

import { useI18n } from 'vue-i18n';
const props = defineProps({
	title: {
		type: String,
		default: 'info',
	},
	text: {
		type: String,
		default: 'default message',
	}, // 确认按钮
	confirmCallback: {
		type: Function,
		default: () => {},
	},
	// 取消按钮
	cancelCallback: {
		type: Function,
		default: () => {},
	},
});
const i18n = useI18n();
// 点击 target 目标元素外部相当于点击了取消
const target = ref(null);
onClickOutside(target, () => {
	props.cancelCallback();
});
</script>
