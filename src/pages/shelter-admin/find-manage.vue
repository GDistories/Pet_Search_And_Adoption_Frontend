<template>
	<div class="container mx-auto px-4 md:px-12 pt-6 flex flex-col items-center mt-8">
		<div class="w-full text-right mb-6">
			<admin-create-pet ref="petCreateRef" @afterSubmit="beforeSubmit" />
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
			<!--<el-table-column prop="pet.identity" label="identity" />-->
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
  layout: shelter
</route>
<script lang="ts" setup>
import Message from '~/utils/dom/message';
import { IFound, IPet } from '~/service/modules/pet/types';
import { getFoundByShelterId } from '~/service/modules/shelter';
import { createPetFound, deletePetFound, updatePetFound } from '~/service/modules/pet';
import { useProvince } from '~/hooks/useProvince';
import settingConfig from '~/config/setting.congig';
import { storeToRefs } from 'pinia';
import { getUnix } from '~/utils/day';
import { getFileHttp, getFileList } from '~/utils/format';
const table = reactive({
	data: [] as Array<IPet>,
});

const { t } = useI18n();
const { area } = useProvince();
const pageCount = ref(0);

const { breed, sex, size, color } = settingConfig;

onMounted(() => {
	handleReset();
});
const handleReset = () => {
	getPetList({ currentPage: 1, pageSize: 20 });
};

const getPetList = async (val: any) => {
	console.log('[getPetList]');
	const currentPage = val ? val.currentPage : 1;
	const pageSize = val ? val.pageSize : 20;
	const { content } = await getFoundByShelterId(currentPage, pageSize, user.value.shelterId);
	table.data = content.petList;
	pageCount.value = content.totalPageNum;
};
const handleDelete = async (id: number) => {
	const { success } = await deletePetFound(id);
	if (success) {
		Message({ type: 'success', text: t('res.success') });
		handleReset();
	}
};

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const beforeSubmit = async (val: any) => {
	console.log('[beforeSubmit]', val);
	const { type, form, petId } = val;

	const _form = {
		shelterId: user.value.shelterId,
		petId: petId,
		status: 1,
		createTime: getUnix(new Date()),
		countyId: Number(form.countyId),
		username: import.meta.env.VITE_APP_BASE_USERNAME,
		petFoundId: petFoundId.value,
	};

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
	petCreateRef.value.editPet(row.pet, { countyId: row.countyId });
};
</script>

<style scoped>
.avatar-uploader .avatar {
	width: 178px;
	height: 178px;
	display: block;
}
</style>
