<template>
	<div class="container mx-auto px-4 md:px-12 pt-6 flex flex-col items-center mt-8">
		<div class="w-full text-right mb-6">
			<admin-create-pet ref="petCreateRef" @afterSubmit="beforeSubmit" :countyShow="false" :adpotShow="true" />
		</div>
		<el-table class="mb-6" border :data="table.data" style="width: 100%">
			<el-table-column type="index" width="50" fixed="left" />
			<el-table-column prop="pet.nickname" :label="t('pet.nickname')" width="120" fixed="left" />
			<el-table-column prop="pet.sex" :label="t('pet.sex')" />
			<el-table-column prop="pet.age" :label="t('pet.age')" />
			<el-table-column prop="pet.size" :label="t('pet.size')" />
			<el-table-column prop="pet.breed" :label="t('pet.breed')" />
			<el-table-column prop="pet.color" :label="t('pet.color')" />
			<el-table-column prop="pet.feature" :label="t('pet.feature')" show-overflow-tooltip />
			<el-table-column prop="pet.petIdNum" :label="t('pet.petIdNum')" show-overflow-tooltip />
			<el-table-column prop="pet.weight" :label="t('pet.weight')" />
			<!--<el-table-column prop="identity" label="identity" />-->
			<el-table-column prop="pet.isFound" :label="t('pet.isFound')" />
			<el-table-column :label="t('pet.picture')" width="200">
				<template #default="scope">
					<ul>
						<el-link v-for="file in getFileList(scope.row.pet.picture)" target="‘_blank’" :href="getFileHttp(file)">{{ file }}</el-link>
					</ul>
				</template>
			</el-table-column>
			<el-table-column fixed="right" :label="t('pet.operation')" width="200">
				<template #default="scope">
					<el-button
						:type="scope.row.status === 1 ? 'primary' : 'success'"
						link
						size="small"
						@click="changeStatus(scope.row.shelterPetsId, scope.row.status === 1 ? 0 : 1)"
					>
						{{ scope.row.status === 1 ? t('admin.status_0') : t('admin.status_1') }}</el-button
					>
					<!--					<el-button v-else link type="primary" size="small" @click="changeStatus(scope.row.shelterPetsId, 1, getPetList)"> 标为被领养</el-button>-->
					<el-button link type="primary" size="small" @click="handleEdit(scope.row)"> {{ t('button.edit') }}</el-button>
					<el-popconfirm :title="t('confirm.confirm_del_text')" @confirm="handleDelete(scope.row.shelterPetsId)">
						<template #reference>
							<el-button link type="primary" size="small"> {{ t('button.delete') }}</el-button>
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>

		<page @page-change="getPetList" :pageCount="pageCount" />
	</div>
</template>
<route lang="yaml">
meta:
  layout: shelter
</route>
<script lang="ts" setup>
import Message from '~/utils/dom/message';
import { IAdoption, IFound, IPet } from '~/service/modules/pet/types';
import { addAdoption, deleteAdoption, getAdoptionByShelterId, updateStatus } from '~/service/modules/shelter';
import { useProvince } from '~/hooks/useProvince';
import settingConfig from '~/config/setting.congig';
import { storeToRefs } from 'pinia';
import { getUnix } from '~/utils/day';

import { getFileHttp, getFileList } from '~/utils/format';
const { area } = useProvince();
const pageCount = ref(0);

const { t } = useI18n();
const { breed, sex, size, color } = settingConfig;

const table = reactive({
	data: [] as Array<IPet>,
});
onMounted(() => {
	handleReset();
});

const handleReset = () => {
	getPetList({ currentPage: 1, pageSize: 20 });
};

const getPetList = async (val: any) => {
	const { content } = await getAdoptionByShelterId(val.currentPage, val.pageSize, user.value.shelterId);
	table.data = content.list;
	pageCount.value = content.totalPageNum;
};

const handleDelete = async (id: number) => {
	console.log('[handleDelete]', id);
	const { success } = await deleteAdoption(id);
	if (success) {
		Message({ type: 'success', text: t('res.success') });
	}

	handleReset();
};

const userStore = useUserStore();
const { user, username } = storeToRefs(userStore);

const beforeSubmit = async (val: any) => {
	console.log('[beforeSubmit]', val);
	const { type, petId, form } = val;

	const _form = {
		shelterId: user.value.shelterId,
		petId: petId,
		status: form.status,
		createTime: getUnix(new Date()),
		username: username.value,
	};
	if (type === 'create') {
		const { success } = await addAdoption(_form);
		if (success) {
			Message({ type: 'success', text: t('res.success') });
		}
	}
	handleReset();
};

const petCreateRef = ref<any>();
const shelterPetsId = ref(0);
const handleEdit = (row: IAdoption) => {
	shelterPetsId.value = row.shelterPetsId;
	petCreateRef.value.editPet(row.pet);
};

const changeStatus = async (shelterPetsId: number, status: number) => {
	const { success } = await updateStatus(shelterPetsId, status, username.value);
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
