<template>
	<div class="upload-file">
		<el-upload
			ref="uploadRef"
			:accept="'image/*,video/*'"
			:file-list="handler.fileList"
			:action="props.action"
			:limit="props.limit"
			:headers="headers"
			:name="props.name"
			:list-type="props.listType"
			:on-success="handleSuccess"
			:on-change="handleChange"
			:on-remove="handleRemove"
			:before-upload="beforeUpload"
		>
			<!--			:before-remove="beforeRemove"-->
			<el-button v-if="props.mode === 'admin'" type="primary">{{ t('file.upload') }}</el-button>
			<button v-else class="btn my-2 btn-primary">{{ t('file.upload') }}</button>
		</el-upload>
	</div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, reactive, ref, watch } from 'vue';
import type { UploadProps, UploadUserFile } from 'element-plus';

import Message from '~/utils/dom/message';
import localCache from '~/utils/cache';
const { t } = useI18n();
const props = defineProps({
	mode: {
		type: String,
		default: 'user',
	},
	list: {},
	//action是上传的地址
	action: {
		type: String,
		default: import.meta.env.VITE_APP_BASE_UPLOAD,
	},
	//最大允许上传个数
	limit: {
		type: Number,
		default: 20,
	},
	//是否显示已上传文件列表,如果要换成头像上传则设置成false
	//并且把avatar属性设置成true
	showFileList: {
		type: Boolean,
		default: true,
	},
	//上传的文件字段名，后端要求的字段名
	name: {
		type: String,
		default: 'file',
	},
	//文件列表的类型，text/picture/picture-card
	listType: {
		type: String,
		default: 'text',
	},
});
const headers = {
	ContentType: 'multipart/form-data', // 设置Content-Type类型为multipart/form-data
	token: localCache.getCache('token'),
};
const uploadRef = ref();
const handler = reactive({
	changeFlag: true,
	loading: false, // 加载状态
	emitList: [] as Array<any>,
	fileList: [] as Array<UploadUserFile>,
});

const emit = defineEmits(['input', 'change']);

const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
	console.log('[beforeUpload]', rawFile.type);
	if (rawFile.size / 1024 / 1024 > 20) {
		Message({ type: 'error', text: t('file.tip') });
		return false;
	}
	return true;
};

function handleSuccess(result: any, fileInfo: any) {
	handler.changeFlag = false;
	handler.loading = true;
	console.log('[handleSuccess]', result, fileInfo);

	const file = {
		uid: fileInfo.uid,
		status: fileInfo.status,
		name: fileInfo.name,
		url: result.content,
	};
	handler.emitList.push(file);

	const val = [...handler.emitList];

	emit('input', val);
	handler.loading = false;
}

//文件状态改变时的钩子
function handleChange() {
	if (handler.loading) {
		//用于图片校验
		emit('change', true);
	}
}

const handleRemove: UploadProps['onRemove'] = (uploadFile: any, uploadFiles: any) => {
	console.log(uploadFile, uploadFiles);
	console.log('[remove]');
	//同样的暂停掉监听父组件数据，以免产生图片展示bug
	handler.changeFlag = false;
	//获取要删除的图片路径。判断是父组件传递的图片图片路径还是刚刚上传产生的图片路径
	const url = uploadFile.response ? uploadFile.response.content[0].target : uploadFile.url;

	console.log('[url]', url);
	//遍历当前图片路径在通知给父组件的数据中是哪一个。然后删除掉。再通知父组件更新数据
	handler.emitList.forEach((item, index) => {
		if (item.url.indexOf(url) > -1) {
			handler.emitList.splice(index, 1);
			let val = [...handler.emitList];

			emit('input', val);
		}
	});
};

watch(
	() => props.list,
	(newVal: any) => {
		// console.log('new file', handler.changeFlag, newVal);
		//this.changeFlag利用这个变量，让我们在上传的时候暂停掉对父组件传递数据的监听
		//因为这个时候我们还没有通知父组件去接受我们上传成功后的图片路径
		if (handler.changeFlag) {
			// console.log('[upload]')

			//把父组件传递过来的图片数组添加到上传成功后的暂存变量中，
			//再次上传后重新给父组件，更新图片绑定数据
			// handler.emitList = [...newVal]
			//循环遍历父组件数据，重新赋值成element组件所需要的回显数据
			newVal.forEach((item: any) => {
				// console.log('[item]', item)
				let obj = {
					uid: item.name ?? item,
					name: item.name ?? item,
					url: item.url ?? item,
				};
				console.log('[obj]', obj);
				handler.emitList.push(obj);
				handler.fileList.push(obj);
			});
		}
	},
	{ immediate: true }
);

function clearAll() {
	// console.log('[clearAll]');
	handler.emitList = [];
	handler.fileList = [];
	uploadRef.value.clearFiles();
	handler.changeFlag = true;
}

// 主动暴露childMethod方法
defineExpose({ clearAll });
</script>

<style lang="less" scoped></style>
