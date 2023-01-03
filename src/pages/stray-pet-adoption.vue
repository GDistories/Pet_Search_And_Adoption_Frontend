<template>
	<div class="text-center">
		<div class="container mx-auto px-4 md:px-12 pt-6 flex flex-col">
			<div class="w-full flex justify-center items-center flex-col lg:p-4 my-2">
				<div class="flex justify-between w-full">
					<div>
						<button class="icon-btn mx-2" title="filter" @click="filterHandler.show = true">
							<Icon icon="carbon:audio-console" class="text-2xl" />
						</button>
						<button class="icon-btn mx-2" title="reset" @click="handleReset">
							<Icon icon="grommet-icons:power-reset" class="text-2xl" />
						</button>
					</div>
					<div class="flex gap-2">
						<input type="text" v-model="name" v-on:input="search" :placeholder="t('filter.search')" class="input input-bordered w-full max-w-xs" />
					</div>
				</div>
				<!--筛选弹窗-->
				<el-dialog v-model="filterHandler.show" :title="t('filter.filter')" :width="device === 'mobile' ? '80%' : '40%'">
					<div class="flex flex-col items-center">
						<v-form v-model="filterHandler.form">
							<v-form-item :label="t('filter.city')" prop="countyId">
								<CascadingSelect v-model="filterHandler.form.countyId"></CascadingSelect>
							</v-form-item>
						</v-form>
					</div>
					<template #footer>
						<span class="dialog-footer">
							<button class="btn my-2 btn-primary" @click="submit">{{ t('filter.search') }}</button>
						</span>
					</template>
				</el-dialog>
			</div>
			<div class="flex flex-wrap">
				<template v-if="list.loading">
					<div class="lg:px-4 px-1 w-full md:w-1/2 lg:w-1/3 my-4 fadeInUp" v-for="item in 12" :key="item">
						<empty-pet-card /></div
				></template>
				<div v-else class="lg:px-4 px-1 w-full md:w-1/2 lg:w-1/3 my-4 fadeInUp" v-for="item in list.data" :key="item.shelterId">
					<div class="card bg-base-100 shadow-xl">
						<div v-if="!item.profilePhoto" class="object-cover h-60 w-full animate-pulse bg-primary"></div>
						<figure v-else><el-image style="height: 15rem" :src="img(item.profilePhoto)" fit="fill" /></figure>
						<div class="card-body">
							<h2 class="card-title">{{ item.shelterName }}</h2>
							<div class="flex h-12 overflow-hidden">
								<Icon icon="carbon:home" class="text-2xl" />
								<span class="text-left">{{ item.address }}</span>
							</div>
							<div class="flex h-12 overflow-hidden">
								<Icon icon="carbon:phone-filled" class="text-2xl" />
								<span class="text-left">{{ item.phone }}</span>
							</div>
							<div class="card-actions justify-end">
								<button class="btn btn-primary" @click="goToShelter(item)">{{ t('button.more_info') }}</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="btn-group">
			<button class="btn btn-outline btn-primary" @click="handlePageChange(pageActive - 1)">«</button>
			<button class="btn btn-outline btn-primary">{{ pageActive }}</button>
			<button class="btn btn-outline btn-primary" @click="handlePageChange(pageActive + 1)">»</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { storeToRefs } from 'pinia';
import { useSettingStore } from '~/store/setting';
import { IPet } from '~/service/modules/pet/types';
import { getShelter, getShelterByName } from '~/service/modules/shelter';
import { useProvince } from '~/hooks/useProvince';
import { IShelter } from '~/service/modules/shelter/types';
const settingStore = useSettingStore();
const { device } = storeToRefs(settingStore);

const { t } = useI18n();

const filterHandler = reactive({
	show: false,
	form: {
		countyId: '' as number,
	},
});
const img = (val: string) => {
	if (!val) return null;
	return import.meta.env.VITE_APP_BASE_IMG + val;
};
const router = useRouter();
function goToShelter(shelter: IShelter) {
	router.push({
		path: '/shelter/' + shelter.shelterId,
		query: {
			shelterName: shelter.shelterName,
		},
	});
}

let pageActive = ref(1);
const totalPageNum = ref(0);
function handlePageChange(pageNum: number) {
	if (pageNum > 0 && pageNum <= totalPageNum.value) {
		pageActive.value = pageNum;
		// console.log('[handlePageChange]', pageActive.value);
		if (name.value !== '') {
			searchPageChange();
		} else {
			handleFilter();
		}
	}
}
const list = reactive({
	loading: true,
	data: [] as Array<IPet>,
});
const handleFilter = async (val?: number) => {
	name.value = '';
	// filterHandler.form.countyId = area_select.value ? area.list[area.value[0]].districts[area.value[1]].districts[area.value[2]].adcode : '';
	list.loading = true;
	const { success, content } = await getShelter(pageActive.value, 12, val ?? '');

	if (success) {
		list.data = content.list;
		totalPageNum.value = content.totalPageNum;
		list.loading = false;
	}
};
const submit = () => {
	handleFilter(filterHandler.form.countyId);
	filterHandler.show = false;
};
const handleReset = () => {
	handleFilter();
};
const name = ref('');
const search = async () => {
	pageActive.value = 1;
	await searchPageChange();
};
const searchPageChange = async () => {
	list.loading = true;
	const { success, content } = await getShelterByName(pageActive.value, 12, name.value);
	if (success) {
		list.data = content.list;
		totalPageNum.value = content.totalPageNum;
		list.loading = false;
	}
};
onMounted(() => {
	handleFilter();
});
</script>

<style scoped>
.demo-image__error .image-slot {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background: var(--el-fill-color-light);
	color: var(--el-text-color-secondary);
	font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
	font-size: 30px;
}
</style>
