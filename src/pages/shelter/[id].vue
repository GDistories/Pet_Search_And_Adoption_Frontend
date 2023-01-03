<template>
	<div class="container mx-auto px-4 md:px-12 pt-6">
		<div class="flex flex-col items-start">
			<div class="flex items-end mb-10">
				<div class="avatar mr-5">
					<div class="w-24 rounded-full">
						<img :src="img(shelter.data.profilePhoto)" alt="Shelter" />
					</div>
				</div>
				<h1 class="text-5xl font-bold mb-4">{{ shelter.data.shelterName }}</h1>
			</div>
			<div class="flex items-end mb-10">
				<p class="mr-2">{{ shelter.data.address }}</p>
				<map-dialog :title="shelter.data.address" :location="shelter.data.location" />
			</div>
		</div>
		<div class="flex flex-wrap mb-4">
			<article class="w-full md:w-1/2 lg:w-1/3 px-2 py-4">
				<div aria-label="Card" class="card h-40 card-bordered">
					<div class="card-body items-center text-center">
						<Icon icon="carbon:phone" class="text-4xl primary-col" />
						<h2 class="card-title">{{ t('shelter.phone') }}</h2>
						<a href="mailto:suekmwdadoptions@gmail.com" target="_blank" rel="noopener noreferrer">{{ shelter.data.phone }}</a>
					</div>
				</div>
			</article>
			<article class="w-full md:w-1/2 lg:w-1/3 px-2 py-4">
				<div aria-label="Card" class="card h-40 card-bordered">
					<div class="card-body items-center text-center">
						<svg
							stroke="currentColor"
							fill="currentColor"
							stroke-width="0"
							viewBox="0 0 20 20"
							class="text-5xl text-primary"
							height="1em"
							width="1em"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
							<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
						</svg>
						<h2 class="card-title">{{ t('shelter.contact') }}</h2>
						<a href="mailto:suekmwdadoptions@gmail.com" target="_blank" rel="noopener noreferrer">{{ shelter.data.email }}</a>
					</div>
				</div>
			</article>
		</div>
		<div class="flex flex-col items-start">
			<h1 class="text-4xl font-bold mb-4">{{ t('shelter.claime_title') }}</h1>
		</div>
		<div class="flex flex-wrap">
			<template v-if="found.loading">
				<div class="lg:px-4 px-1 w-full md:w-1/2 lg:w-1/3 my-4 fadeInUp" v-for="item in 3" :key="item">
					<empty-pet-card /></div
			></template>
		</div>
		<div class="flex flex-wrap mb-4">
			<div class="lg:px-4 px-1 w-full md:w-1/2 lg:w-1/3 my-4 fadeInUp" v-for="item in found.list" :key="item.petFoundId">
				<pet-card
					:id="item.pet.petId"
					:name="item.pet.nickname"
					:breed="item.pet.breed"
					:picture="item.pet.picture"
					@cardClick="handleClick(item.petFoundId, 'find')"
				/>
			</div>
		</div>
		<div class="flex flex-col items-start">
			<h1 class="text-4xl font-bold mb-4">{{ t('shelter.adopt_title') }}</h1>
		</div>
		<div class="flex flex-wrap">
			<template v-if="adoption.loading">
				<div class="lg:px-4 px-1 w-full md:w-1/2 lg:w-1/3 my-4 fadeInUp" v-for="item in 3" :key="item">
					<empty-pet-card /></div
			></template>
		</div>
		<div class="flex flex-wrap">
			<div class="lg:px-4 px-1 w-full md:w-1/2 lg:w-1/3 my-4 fadeInUp" v-for="item in adoption.list" :key="item.pet.petId">
				<pet-card
					:id="item.pet.petId"
					:name="item.pet.nickname"
					:breed="item.pet.breed"
					:picture="item.pet.picture"
					@cardClick="handleClick(item.pet.petId, 'adopt')"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { getAdoptionByShelterId, getFoundByShelterId, getShelterByName } from '~/service/modules/shelter';

const route = useRoute();
const img = (val: string) => {
	return import.meta.env.VITE_APP_BASE_IMG + val;
};
const { t } = useI18n();
onMounted(() => {
	getShelterInfo();
	initFound();
	initAdoption();
});
const shelter = reactive({
	data: {},
});
const getShelterInfo = async () => {
	const { query } = route;
	if (query.shelterName) {
		const { content } = await getShelterByName(1, 1, query.shelterName.toString());
		shelter.data = content.list[0];
	}
};
const found = reactive({
	loading: false,
	list: [],
});
const adoption = reactive({
	loading: false,
	list: [],
});
async function initFound() {
	found.loading = true;
	const { params } = route;
	const { content } = await getFoundByShelterId(1, 1000, Number(params.id));
	// console.log('[initAdoption]', content.petList);
	found.list = content.petList;
	found.loading = false;
}

async function initAdoption() {
	adoption.loading = true;
	const { params } = route;
	const { content } = await getAdoptionByShelterId(1, 100, Number(params.id));
	console.log('[initAdoption]', content);
	adoption.list = content.list.filter((item: any) => item.status === 0);
	adoption.loading = false;
}

const router = useRouter();
const handleClick = async (id: number, type: string) => {
	switch (type) {
		case 'find': {
			await router.push({
				path: '/detail/' + id,
				query: {
					type: 'find',
				},
			});
			break;
		}
		case 'adopt': {
			await router.push({
				path: '/pet/' + id,
			});
			break;
		}
	}
};
</script>

<style scoped>
.primary-col {
	color: #65c3c8;
}
</style>
