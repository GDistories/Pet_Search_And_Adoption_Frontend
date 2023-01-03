<template>
	<div class="text-center">
		<div class="container mx-auto px-4 md:px-12 pt-6">
			<div class="w-full flex justify-center items-center flex-col lg:p-4 my-2">
				<div class="flex justify-between w-full">
					<filter-dialog ref="filterRef" @submit="handleFilter" @reset="resetData" />
					<div class="flex gap-2" v-if="!user.isAdmin && !user.isShelter">
						<create-pet :title="t('filter.add_search')" :type="0" />
					</div>
				</div>
			</div>
			<div class="flex flex-wrap">
				<template v-if="list.loading">
					<div class="lg:px-4 px-1 w-full md:w-1/2 lg:w-1/3 my-4 fadeInUp">
						<empty-pet-card />
					</div>
					<div class="lg:px-4 px-1 w-full md:w-1/2 lg:w-1/3 my-4 fadeInUp">
						<empty-pet-card />
					</div>
					<div class="lg:px-4 px-1 w-full md:w-1/2 lg:w-1/3 my-4 fadeInUp">
						<empty-pet-card /></div
				></template>
				<template v-else>
					<div class="lg:px-4 px-1 w-full md:w-1/2 lg:w-1/3 my-4 fadeInUp" v-for="item in list.data" :key="item.petSearchId">
						<pet-card
							:id="item.pet.petId"
							:name="item.pet.nickname"
							:breed="item.pet.breed"
							:picture="item.pet.picture"
							@cardClick="handleClick(item.petSearchId)"
						/>
					</div>
				</template>
			</div>
		</div>

		<div v-show="list.data.length > 0" class="btn-group">
			<button class="btn btn-outline btn-primary" @click="handlePageChange(pageActive - 1)">«</button>
			<button class="btn btn-outline btn-primary">{{ pageActive }}</button>
			<button class="btn btn-outline btn-primary" @click="handlePageChange(pageActive + 1)">»</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { getSearchPets } from '~/service/modules/pet';

import { IPet } from '~/service/modules/pet/types';
import { useUserStore } from '~/store/user';
const { t } = useI18n();
const router = useRouter();

const user = useUserStore();

const handleClick = (id: number) => {
	console.log('[handleClick]', id);
	router.push({
		path: '/detail/' + id,
		query: {
			type: 'search',
		},
	});
};

let pageActive = ref(1);
const filterRef = ref();
function handlePageChange(pageNum: number) {
	if (pageNum > 0) {
		pageActive.value = pageNum;
		handleFilter(filterRef.value.filterHandler.form);
	}
}

const list = reactive({
	loading: true,
	data: [] as Array<IPet>,
});
const handleFilter = async (value: any) => {
	console.log('[handleFilter]', value);
	list.loading = true;
	const { success, content } = await getSearchPets(pageActive.value, 12, value);
	// console.log('[handleFilter]', value);
	if (success) {
		list.data = content.petList;
		list.loading = false;
		console.log('[lost-pet-search]', list.data);
	}
};
const resetData = () => {
	const initForm = {
		sex: '',
		breed: '',
		size: '',
		color: '',
		countyId: '',
		startAge: 0,
		endAge: 1000,
		startWeight: 0,
		endWeight: 1000,
		startCreateTime: '',
		endCreateTime: '',
	};
	handleFilter(initForm);
};
onMounted(() => {
	resetData();
});
</script>

<style lang="less" scoped>
.table-height-box {
	height: auto;
	max-height: 40vh;
	overflow-y: auto;
}
</style>
