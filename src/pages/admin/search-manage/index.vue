<template>
	<div class="container mx-auto px-4 md:px-12 pt-6 flex flex-col items-center mt-8">
		<div class="w-full text-right mb-6">
			<admin-create-pet ref="petCreateRef" @afterSubmit="beforeSubmit" :county-show="true" :shelterShow="false" />
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
			<el-table-column :label="t('pet.picture')" width="200">
				<template #default="scope">
					<ul>
						<el-link v-for="file in getFileList(scope.row.pet.picture)" target="‘_blank’" :href="getFileHttp(file)">{{ file }}</el-link>
					</ul>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="operation" width="120">
				<template #default="scope">
					<el-button link type="primary" size="small" @click="handleEdit(scope.row)"> {{ t('button.edit') }}</el-button>
					<el-popconfirm :title="t('confirm.confirm_del_text')" @confirm="handleDelete(scope.row.petSearchId)">
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
import { IPet, ISearch } from '~/service/modules/pet/types';
import { createPetSearch, deletePetSearch, getSearchPets, updatePetSearch } from '~/service/modules/pet';
import { useProvince } from '~/hooks/useProvince';
import FilterForm from './cpns/FilterForm.vue';
import { getUnix } from '~/utils/day';
import { getFileHttp, getFileList } from '~/utils/format';

const { area } = useProvince();
const pageCount = ref(0);
const table = reactive({
	data: [] as Array<IPet>,
});
onMounted(() => {
	handleReset();
});

const { t } = useI18n();
const getPetList = async (val: any, filter?: any) => {
	const { content } = await getSearchPets(val.currentPage, val.pageSize, filter ?? {});
	table.data = content.petList;
	pageCount.value = content.totalPageNum;
};

const handleSubmit = (val: any) => {
	getPetList({ currentPage: 1, pageSize: 20 }, val);
};
const handleReset = () => {
	getPetList({ currentPage: 1, pageSize: 20 });
};
const handleDelete = async (id: number) => {
	const { success } = await deletePetSearch(id);
	if (success) {
		Message({ type: 'success', text: t('res.success') });
		handleReset();
	}
};
const beforeSubmit = async (val: any) => {
	console.log('[beforeSubmit]', val);
	const { type, form, petId } = val;

	const _form = {
		petSearchId: petSearchId.value,
		petId: petId,
		createTime: getUnix(new Date()),
		countyId: form.countyId,
		username: import.meta.env.VITE_APP_BASE_USERNAME,
	};
	// formHandler.show = true;

	const { success } = type === 'create' ? await createPetSearch(_form) : await updatePetSearch(_form);
	if (success) {
		Message({ type: 'success', text: t('res.success') });
		handleReset();
	}
};
const petCreateRef = ref<any>();
const petSearchId = ref(0);
const handleEdit = (row: ISearch) => {
	petSearchId.value = row.petSearchId;
	const _form = {
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
