<template>
	<div class="container mx-auto px-4 md:px-12 pt-6 flex flex-col items-center">
		<div class="w-full text-right mb-6">
			<el-button @click="formHandler.show = true">{{ t('button.create') }}</el-button>
		</div>
		<el-card class="w-full mb-4" shadow="never">
			<el-form :inline="true">
				<el-form-item
					><el-cascader
						:placeholder="t('select')"
						v-model="countyId"
						:options="area.list"
						:props="{ value: 'adcode', label: 'name', children: 'districts', emitPath: false }"
						@change="filterSubmit"
				/></el-form-item>
				<el-form-item>
					<el-button @click="handleReset">{{ t('confirm.reset') }}</el-button></el-form-item
				>
			</el-form>
		</el-card>
		<el-table class="mb-6" border :data="table.data" style="width: 100%">
			<el-table-column type="index" width="50" />
			<el-table-column prop="photo" :label="t('user.photo')">
				<template #default="scope">
					<el-avatar :size="50" :src="getFileHttp(scope.row.profilePhoto)" />
				</template>
			</el-table-column>
			<el-table-column prop="username" :label="t('login.username')" width="120" />
			<el-table-column prop="shelterName" :label="t('user.shelterName')" width="120" />
			<el-table-column prop="email" :label="t('login.email')" />
			<el-table-column prop="phone" :label="t('user.phone')" />
			<el-table-column prop="address" :label="t('user.address')" max-width="300px" />
			<el-table-column fixed="right" :label="t('pet.operation')" width="120">
				<template #default="scope">
					<el-button link type="primary" size="small" @click="formHandler.edit(scope.row)"> {{ t('button.edit') }}</el-button>
					<el-popconfirm :title="t('confirm.confirm_del_text')" @confirm="handleDelete(scope.row.username)">
						<template #reference>
							<el-button link type="primary" size="small"> {{ t('button.delete') }}</el-button>
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>

		<page @page-change="initShelterList" :pageCount="pageCount" />

		<el-dialog class="text-left" v-model="formHandler.show" @close="formHandler.resetForm(ruleFormRef)">
			<el-form ref="ruleFormRef" :model="formHandler.form" :rules="rules" label-width="120px" status-icon>
				<el-form-item prop="username" :label="t('login.username')">
					<el-input v-model="formHandler.form.username" />
				</el-form-item>
				<el-form-item v-if="!formHandler.form.shelterId" :label="t('login.register_code')" prop="registerCode">
					<el-input v-model="formHandler.form.registerCode" />
				</el-form-item>
				<el-form-item :label="t('user.shelterName')" prop="shelterName">
					<el-input v-model="formHandler.form.shelterName" />
				</el-form-item>
				<el-form-item :label="t('user.phone')" prop="phone">
					<el-input v-model="formHandler.form.phone" />
				</el-form-item>
				<el-form-item v-if="!formHandler.form.shelterId" :label="t('login.password')" prop="password">
					<el-input v-model="formHandler.form.password" />
				</el-form-item>
				<el-form-item :label="t('login.email')" prop="email">
					<el-input v-model="formHandler.form.email" />
				</el-form-item>
				<el-form-item :label="t('user.address')" prop="location">
					<map-select @getLocation="handleLocation" />
					<el-input v-model="formHandler.form.location" disabled />
				</el-form-item>
				<el-form-item :label="t('user.shelterName')" prop="address"> <el-input v-model="formHandler.form.address" /> </el-form-item>
				<el-form-item :label="t('user.shelterName')" prop="countyId">
					<el-cascader
						v-model="formHandler.form.countyId"
						:options="area.list"
						:props="{ value: 'adcode', label: 'name', children: 'districts', emitPath: false }"
					/>
				</el-form-item>
				<el-form-item :label="t('user.photo')" prop="profilePhoto">
					<el-upload
						class="avatar-uploader"
						:action="upload"
						:headers="headers"
						name="file"
						:show-file-list="false"
						:on-success="handleAvatarSuccess"
						:before-upload="beforeAvatarUpload"
					>
						<img v-if="formHandler.form.profilePhoto" :src="getFileHttp(formHandler.form.profilePhoto)" class="avatar" />
						<Icon v-else class="text-2xl avatar-uploader-icon" icon="material-symbols:add" />
					</el-upload>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="formHandler.resetForm(ruleFormRef)">{{ t('confirm.cancel') }}</el-button>
					<el-button type="primary" @click="formHandler.submitForm(ruleFormRef, handleReset)"> {{ t('confirm.confirm') }} </el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<route lang="yaml">
meta:
  layout: admin
</route>
<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import type { UploadProps } from 'element-plus';
import { getShelterList, shelter_delete } from '~/service/modules/user';
import { IUser } from '~/service/modules/user/types';
import { getFileHttp } from '~/utils/format';
import { useProvince } from '~/hooks/useProvince';
import { useShelterForm } from './hooks/useShelterForm';
import useFile from '~/hooks/useFile';
import Message from '~/utils/dom/message';

const { t } = useI18n();
const { area } = useProvince();
const countyId = ref('');
const table = reactive({
	data: [] as Array<IUser>,
});
onMounted(() => {
	initShelterList({
		currentPage: 1,
		pageSize: 20,
	});
});

const pageCount = ref(0);

const initShelterList = async (val: any, countyId?: string | number) => {
	const { content } = await getShelterList(val.currentPage, val.pageSize, Number(countyId));
	table.data = content.list;
	pageCount.value = content.totalPageNum;
};
const filterSubmit = () => {
	initShelterList(
		{
			currentPage: 1,
			pageSize: 20,
		},
		Number(countyId.value)
	);
};
const handleReset = () => {
	countyId.value = '';
	filterSubmit();
};

const { ruleFormRef, formHandler, rules, handleLocation } = useShelterForm();

const { upload, headers, beforeAvatarUpload } = useFile();

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
	console.log('[handleAvatarSuccess]', response.content);
	formHandler.form.profilePhoto = response.content;
	// imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const handleDelete = async (username: string) => {
	const { success } = await shelter_delete(username);
	if (success) {
		Message({ type: 'success', text: t('res.success') });
		handleReset();
	}
};
</script>

<style scoped>
.avatar-uploader .avatar {
	width: 178px;
	height: 178px;
	display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
	border: 1px dashed var(--el-border-color);
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	text-align: center;
}
</style>
