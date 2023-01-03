<template>
	<div>
		<div class="hero hero-background min-h-screen">
			<div class="hero-overlay bg-opacity-60"></div>
			<div class="hero-content text-center">
				<div class="max-w-md text-base-100">
					<h1 class="text-5xl font-bold">{{ t('index.title1') }}</h1>
					<h2 class="text-5xl font-bold mb-4">{{ t('index.title2') }}</h2>
					<button class="btn" @click="scroll">{{ t('button.start') }}</button>
				</div>
			</div>
		</div>
		<div class="container mx-auto px-4 md:px-12 pt-6" id="pets">
			<h2 class="text-5xl text-left font-bold">{{ t('index.hot') }}</h2>
			<div class="flex flex-wrap">
				<template v-if="list.loading">
					<div class="lg:px-4 px-1 w-full md:w-1/2 lg:w-1/3 my-4 fadeInUp" v-for="item in 3" :key="item">
						<empty-pet-card /></div
				></template>
				<div v-else class="lg:px-4 px-1 w-full md:w-1/2 lg:w-1/3 my-4 fadeInUp" v-for="item in list.data" :key="item.shelterPetsId">
					<pet-card
						:id="item.pet.petId"
						:name="item.pet.nickname"
						:breed="item.pet.breed"
						:picture="item.pet.picture"
						@cardClick="handleClick(item.pet.petId)"
					/>
				</div>
			</div>
			<button class="btn btn-primary" @click="refresh">{{ t('button.refresh') }}</button>
		</div>
		<div class="container mx-auto px-4 md:px-12 pt-6">
			<h2 class="text-5xl text-left font-bold mb-5">{{ t('index.data') }}</h2>

			<div class="stats shadow w-full text-center">
				<div class="stat">
					<div class="stat-title">{{ t('index.totalPetSearchNum') }}</div>
					<div class="stat-value text-primary">{{ data.totalPetSearchNum }}</div>
				</div>

				<div class="stat">
					<div class="stat-title">{{ t('index.totalPetFoundNum') }}</div>
					<div class="stat-value text-secondary">{{ data.totalPetFoundNum }}</div>
				</div>

				<div class="stat">
					<div class="stat-title">{{ t('index.totalPetAdoptingNum') }}</div>
					<div class="stat-value">{{ data.totalPetAdoptingNum }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useRandom } from './useRandom';
import { getWebData } from '~/service/modules/pet';

const router = useRouter();

const { t } = useI18n();
function scroll() {
	const el = document.getElementById('pets');
	window.scrollTo({ behavior: 'smooth', top: el.offsetTop });
}
const { list, refresh } = useRandom();
const handleClick = (id) => {
	console.log('[handleClick]', id);
	router.push({
		path: '/pet/' + id,
		query: {
			type: 'adopt',
		},
	});
};

const data = reactive({
	totalPetSearchNum: 0,
	totalPetFoundNum: 0,
	totalPetAdoptingNum: 0,
});
onMounted(async () => {
	const { content } = await getWebData();
	data.totalPetSearchNum = content.totalPetSearchNum;
	data.totalPetFoundNum = content.totalPetFoundNum;
	data.totalPetAdoptingNum = content.totalPetAdoptingNum;
});
</script>

<style lang="less" scoped>
.hero-background {
	background: url('https://d33wubrfki0l68.cloudfront.net/7dc9f97351b7c93a5186f390197bfb16c17e1eb8/eecb5/static/media/homehero.bfed1970b3a98b09c2bd.png');
	background-position: 50%;
	background-size: cover;
}
</style>
