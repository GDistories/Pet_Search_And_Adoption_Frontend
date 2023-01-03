<template>
	<div class="container mx-auto px-4 md:px-12 pt-6 flex flex-col items-center mt-8">
		<div class="w-full text-right mb-6">
			<admin-create-pet ref="petCreateRef" @afterSubmit="beforeSubmit" :county-show="true" :shelterShow="true" />
		</div>
		<filter-form @submit="handleSubmit" @reset="handleReset" />
		<el-table class="mb-6" border :data="table.data" style="width: 100%">
			<el-table-column type="index" width="50" />
			<el-table-column prop="pet.nickname" :label="t('pet.nickname')" width="120" />
			<el-table-column prop="pet.sex" :label="t('pet.sex')" />
			<el-table-column prop="pet.age" :label="t('pet.age')" />
			<el-table-column prop="pet.size" :label="t('pet.size')" />
			<el-table-column prop="pet.breed" :label="t('pet.breed')" />
			<el-table-column prop="pet.color" :label="t('pet.color')" />
			<el-table-column prop="pet.feature" :label="t('pet.feature')" show-overflow-tooltip />
			<el-table-column prop="pet.petIdNum" :label="t('pet.petIdNum')" show-overflow-tooltip />
			<el-table-column prop="pet.weight" :label="t('pet.weight')" />
			<el-table-column prop="pet.isFound" :label="t('pet.isFound')" />
			<el-table-column :label="t('pet.picture')" width="200">
				<template #default="scope">
					<ul>
						<el-link v-for="file in getFileList(scope.row.pet.picture)" target="‘_blank’" :href="getFileHttp(file)">{{ file }}</el-link>
					</ul>
				</template>
			</el-table-column>
			<el-table-column fixed="right" :label="t('pet.operation')" width="120">
				<template #default="scope">
					<el-button link type="primary" size="small" @click="handleEdit(scope.row)"> {{ t('button.edit') }}</el-button>
					<el-popconfirm :title="t('confirm.confirm_del_text')" @confirm="handleDelete(scope.row.petFoundId)">
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
  layout: admin
</route>
<script lang="ts" setup>
import Message from '~/utils/dom/message';
import FilterForm from '../search-manage/cpns/FilterForm.vue';
import { createPetFound, deletePetFound, getFindPets, updatePetFound } from '~/service/modules/pet';
import { IFound, IPet } from '~/service/modules/pet/types';
import { getFileHttp, getFileList } from '~/utils/format';
import { useProvince } from '~/hooks/useProvince';
import { getUnix } from '~/utils/day';

const table = reactive({
	data: [] as Array<IPet>,
});
onMounted(() => {
	handleReset();
});

const { t } = useI18n();
const { area } = useProvince();
const pageCount = ref(0);
const handlePageChange = () => {
	console.log('[handlePageChange]');
};
const getPetList = async (val: any, filter?: any) => {
	console.log('[getPetList触发]');
	const { content } = await getFindPets(val.currentPage, val.pageSize, filter ?? {});
	table.data = content.petList;
	pageCount.value = content.totalPageNum;
};

const handleSubmit = (val: any) => {
	console.log('[handleSubmit]');
	getPetList({ currentPage: 1, pageSize: 20 }, val);
};

const handleReset = () => {
	console.log('[handleReset]');
	getPetList({ currentPage: 1, pageSize: 20 });
};

const handleDelete = async (id: number) => {
	const { success } = await deletePetFound(id);
	if (success) {
		Message({ type: 'success', text: t('res.success') });
		handleReset();
	}
};

const beforeSubmit = async (val: any) => {
	console.log('[beforeSubmit]', val);
	const { type, form, petId } = val;

	const _form = {
		petFoundId: petFoundId.value,
		shelterId: form.status === 0 ? '' : form.shelterId,
		petId: petId,
		status: form.status,
		createTime: getUnix(new Date()),
		countyId: form.countyId,
		username: import.meta.env.VITE_APP_BASE_USERNAME,
	};
	// formHandler.show = true;

	const { success } = type === 'create' ? await createPetFound(_form) : await updatePetFound(_form);
	if (success) {
		Message({ type: 'success', text: t('res.success') });
		handleReset();
	}
};

const petCreateRef = ref<any>();
const petFoundId = ref(0);
const handleEdit = (row: IFound) => {
	petFoundId.value = row.petFoundId;
	const _form = {
		shelterId: row.shelterId,
		status: row.status,
		countyId: row.countyId,
	};
	petCreateRef.value.editPet(row.pet, _form);
};
</script>

<style scoped>
.avatar-uploader .avatar {
	width: 178px;
	height: 178px;
	display: block;
}
</style>
