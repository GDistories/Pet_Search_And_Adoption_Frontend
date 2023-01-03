<!-- 弹窗组件 -->
<template>
	<!-- <div>Dialog</div> -->
	<el-dialog class="dialog-wrap" :title="title" :width="width" :top="top" v-model="dialogVisible" :close-on-click-modal="clickModalClose">
		<slot name="content"></slot>
		<span v-if="!footerSlot" name="footer" class="dialog-footer">
			<button class="comfirmBtn btn btn-primary" @click="comfirmBtn">确 定</button>
			<button class="cancalBtn btn btn-primary" @click="dialogVisible = false">取 消</button>
		</span>
		<span v-else name="footer" class="dialog-footer">
			<slot name="footer"></slot>
		</span>
	</el-dialog>
</template>

<script setup lang="ts">
// 弹窗组件 AppDialog.vue -> props参数 与事件
/**
 * param -> 参数
 *** @param title {String} - 左上侧的标题
 *** @param width {String} - 弹窗的宽度 默认800px 支持 px与%
 *** @param top {String} - 弹窗距离顶部位置 默认15vh
 *** @param visible {Boolean} - 弹窗显示与隐藏 默认false
 *** @param footerSlot {Boolean} - 弹窗的底部是否是呀slot 默认false
 *** @param clickModalClose {Boolean} - 弹窗是否支持点击遮罩层关闭弹窗 默认true
 * event -> 事件
 *** @event changeDialog {Fun}} - 关闭事件
 *** @event dialogComfirm {Fun}} - 保存事件
 <app-dialog
 v-model="visible"
 @changeDialog="changeDialog"
 @dialogComfirm="dialogComfirm"
 title="简单的弹窗"
 >
 </app-dialog>
 */
// import { defineProps, defineEmits } from 'vue'
const emit = defineEmits(['changeDialog', 'dialogComfirm']);
const props = defineProps({
	visible: {
		type: Boolean,
		default: false,
	},
	title: {
		type: String,
		default: '',
	},
	width: {
		type: String,
		default: '800px',
	},
	top: {
		type: String,
		default: '15vh',
	},
	footerSlot: {
		type: Boolean,
		default: false,
	},
	clickModalClose: {
		type: Boolean,
		default: true,
	},
});
// console.log(props, 'props')
// 计算 dialog 的显示 与隐藏
const dialogVisible = computed({
	get: () => props.visible,
	set: (newValue) => {
		emit('changeDialog', newValue);
	},
});

// 提交
const comfirmBtn = () => {
	emit('dialogComfirm', false);
};
</script>
<script lang="ts">
export default {
	name: 'VDialog',
};
</script>
<style lang="less" scoped>
.dialog-wrap {
	:deep(.el-dialog__header) {
		height: 32px;
		line-height: 32px;
		padding: 0 15px;
		border-bottom: 1px solid #e5e5e5;
		.el-dialog__title {
			font-size: 16px;
			line-height: 32px;
			font-weight: 700;
		}
		.el-dialog__headerbtn {
			top: 10px;
			cursor: pointer;
		}
	}
	:deep(.el-dialog__body) {
		padding: 10px 15px;
		display: flex;
		flex-direction: column;
	}
	:deep(.el-dialog__footer) {
		padding: 1px 15px;
		height: 40px;
		line-height: 40px;

		.dialog-footer {
			position: relative;
			display: inline-block;
			width: 100%;
			height: 100%;
			right: 0;
			left: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			text-align: center;
			.btn {
				padding: 6px 12px;
			}
		}
	}
}
</style>
