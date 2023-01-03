<template>
	<div class="container mx-auto px-4 md:px-12 pt-6 flex flex-col items-center">
		<div class="w-full text-right mb-6">
			<el-button @click="formHandler.show = true">{{ t('button.create') }}</el-button>
		</div>
		<filter-form @submit="filterSubmit" @reset="filterSubmit" />
		<el-table class="mb-6" border :data="table.data" style="width: 100%">
			<el-table-column type="index" width="50" />
			<el-table-column prop="photo" :label="t('user.photo')">
				<template #default="scope">
					<el-avatar :size="50" :src="getFileHttp(scope.row.profilePhoto)" />
				</template>
			</el-table-column>
			<el-table-column prop="username" :label="t('login.username')" width="120" />
			<el-table-column prop="email" :label="t('login.email')" />
			<el-table-column prop="phone" :label="t('user.phone')" />
			<!--			<el-table-column prop="identity" label="identity" />-->
			<el-table-column :label="t('user.dob')">
				<template #default="scope">
					{{ getDate(scope.row.dob) }}
				</template>
			</el-table-column>
			<el-table-column prop="gender" :label="t('user.gender')" />
			<el-table-column prop="firstName" :label="t('user.firstName')" />
			<el-table-column prop="lastName" :label="t('user.lastName')" />
			<el-table-column prop="address" :label="t('user.address')" max-width="250px" />
			<!--			<el-table-column prop="description" label="description" />-->

			<el-table-column fixed="right" :label="t('pet.operation')" width="120">
				<template #default="scope">
					<el-button link type="primary" size="small" @click="formHandler.edit(scope.row)"> {{ t('button.edit') }}</el-button>
					<el-popconfirm :title="t('confirm.confirm_del_text')" @confirm="handleDelete(scope.row.username, handleReset)">
						<template #reference>
							<el-button link type="primary" size="small"> {{ t('button.delete') }}</el-button>
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>

		<page @page-change="initUserList" :pageCount="pageCount" />

		<el-dialog class="text-left" v-model="formHandler.show" @close="formHandler.resetForm(ruleFormRef)">
			<el-form ref="ruleFormRef" :model="formHandler.form" :rules="rules" label-width="120px" status-icon>
				<el-form-item :label="t('login.username')" prop="username">
					<el-input v-model="formHandler.form.username" />
				</el-form-item>
				<el-form-item :label="t('user.phone')" prop="phone">
					<el-input v-model="formHandler.form.phone" />
				</el-form-item>
				<el-form-item v-if="!formHandler.form.userId" :label="t('login.password')" prop="password">
					<el-input v-model="formHandler.form.password" />
				</el-form-item>
				<el-form-item :label="t('login.email')" prop="email">
					<el-input v-model="formHandler.form.email" />
				</el-form-item>
				<el-form-item :label="t('user.gender')" prop="gender">
					<el-select v-model="formHandler.form.gender" placeholder="gender">
						<el-option label="Male" value="M" />
						<el-option label="Female" value="F" />
					</el-select>
				</el-form-item>
				<el-form-item :label="t('user.dob')" prop="birth">
					<el-date-picker v-model="formHandler.form.birth" type="date" placeholder="Pick a day" />
				</el-form-item>
				<el-form-item :label="t('user.firstName')" prop="firstName">
					<el-input v-model="formHandler.form.firstName" />
				</el-form-item>
				<el-form-item :label="t('user.lastName')" prop="lastName">
					<el-input v-model="formHandler.form.lastName" />
				</el-form-item>
				<el-form-item :label="t('user.address')" prop="address"> <el-input v-model="formHandler.form.address" /> </el-form-item>
				<el-form-item :label="t('user.description')" prop="description">
					<el-input v-model="formHandler.form.description" />
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
import { getUserList, user_delete } from '~/service/modules/user';
import FilterForm from './cpns/FilterForm.vue';
import { useUserForm } from './hooks/useUserForm';
import { IUser } from '~/service/modules/user/types';
import { getFileHttp } from '~/utils/format';
import useFile from '~/hooks/useFile';
import Message from '~/utils/dom/message';
import { getDate } from '~/utils/day';

const { t } = useI18n();
const table = reactive({
	data: [] as Array<IUser>,
});
onMounted(() => {
	handleReset();
});

const pageCount = ref(0);
const initUserList = async (val: any, form?: any) => {
	if (!form) form = {};
	const { content } = await getUserList(val.currentPage, val.pageSize, form);
	table.data = content.list;
	pageCount.value = content.totalPageNum;
};
const handleReset = () => {
	initUserList({
		currentPage: 1,
		pageSize: 20,
	});
};
const filterSubmit = (val?: any) => {
	console.log('[filterSubmit]', val);
	initUserList(
		{
			currentPage: 1,
			pageSize: 20,
		},
		val
	);
};

const { ruleFormRef, formHandler, rules } = useUserForm();

const { upload, headers, beforeAvatarUpload } = useFile();

// const beforeClose = () => {
// 	imageUrl.value = '';
// 	formHandler.resetForm(ruleFormRef.value);
// };
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
	console.log('[handleAvatarSuccess]', response.content);
	formHandler.form.profilePhoto = response.content;
	// imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const handleDelete = async (username: string) => {
	const { success } = await user_delete(username);
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
