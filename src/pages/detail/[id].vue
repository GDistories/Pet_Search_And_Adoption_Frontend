<template>
	<div class="container mx-auto px-4 md:px-12 pt-6">
		<div class="flex flex-row justify-between">
			<h1 class="text-5xl font-bold">{{ pet.data.nickname }}</h1>
		</div>
		<div class="bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-box my-4">
			<div class="w-1/2 mx-auto py-8">
				<div role="listbox" aria-label="Image carousel" color="primary" class="carousel rounded-box w-full">
					<template v-for="(item, index) in getFileList(pet.data.picture)" :key="item">
						<div v-if="getFileType(item) === 'video'" :id="'item' + index + 1" class="carousel-item relative w-full">
							<video class="w-full" controls>
								<source :src="httpUrl(item)" type="video/mp4" />
							</video>
						</div>
						<div v-else-if="getFileType(item) === 'image'" :id="'item' + index + 1" class="carousel-item relative w-full">
							<img :src="httpUrl(item)" alt="Biscuit-large-1" class="w-full" />
						</div>
					</template>
				</div>
				<div class="flex justify-center w-full py-2 gap-2">
					<a v-for="(item, index) in getFileList(pet.data.picture).length" :key="item" :href="'#item' + index + 1" class="btn btn-xs">{{
						index + 1
					}}</a>
				</div>
			</div>
		</div>
		<p class="text-left">{{ pet.data.feature }}</p>
		<div class="flex flex-wrap">
			<article class="w-full md:w-1/2 lg:w-1/3 px-2 py-4">
				<div aria-label="Card" class="card h-40 card-bordered">
					<div class="card-body items-center text-center">
						<svg
							stroke="currentColor"
							fill="currentColor"
							stroke-width="0"
							viewBox="0 0 16 16"
							class="text-5xl text-primary"
							height="1em"
							width="1em"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M13.5 11h-1.729L8.438 6H9.5l.5-.5v-4L9.5 1h-4l-.5.5v4l.5.5h1.062l-3.333 5H1.5l-.5.5v3l.5.5h3l.5-.5v-3l-.5-.5h-.068L7.5 6.4l3.068 4.6H10.5l-.5.5v3l.5.5h3l.5-.5v-3l-.5-.5zM6 5V2h3v3H6zm-2 7v2H2v-2h2zm9 2h-2v-2h2v2z"
							></path>
						</svg>
						<h2 class="card-title">{{ t('pet.breed') }}</h2>
						<p>{{ pet.data.breed }}</p>
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
							viewBox="0 0 16 16"
							class="text-5xl text-primary"
							height="1em"
							width="1em"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M8 1.003a7 7 0 0 0-7 7v.43c.09 1.51 1.91 1.79 3 .7a1.87 1.87 0 0 1 2.64 2.64c-1.1 1.16-.79 3.07.8 3.2h.6a7 7 0 1 0 0-14l-.04.03zm0 13h-.52a.58.58 0 0 1-.36-.14.56.56 0 0 1-.15-.3 1.24 1.24 0 0 1 .35-1.08 2.87 2.87 0 0 0 0-4 2.87 2.87 0 0 0-4.06 0 1 1 0 0 1-.9.34.41.41 0 0 1-.22-.12.42.42 0 0 1-.1-.29v-.37a6 6 0 1 1 6 6l-.04-.04zM9 3.997a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 7.007a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-7-5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm7-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM13 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
							></path>
						</svg>
						<h2 class="card-title">{{ t('pet.color') }}</h2>
						<p>{{ pet.data.color }}</p>
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
							viewBox="0 0 512 512"
							class="text-5xl text-primary"
							height="1em"
							width="1em"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M360 73c-14.43 0-27.79 7.71-38.055 21.395-10.263 13.684-16.943 33.2-16.943 54.94 0 21.74 6.68 41.252 16.943 54.936 10.264 13.686 23.625 21.396 38.055 21.396s27.79-7.71 38.055-21.395C408.318 190.588 415 171.075 415 149.335c0-21.74-6.682-41.255-16.945-54.94C387.79 80.71 374.43 73 360 73zm-240 96c-10.012 0-19.372 5.32-26.74 15.145C85.892 193.968 81 208.15 81 224c0 15.85 4.892 30.032 12.26 39.855C100.628 273.68 109.988 279 120 279c10.012 0 19.374-5.32 26.742-15.145 7.368-9.823 12.256-24.006 12.256-39.855 0-15.85-4.888-30.032-12.256-39.855C139.374 174.32 130.012 169 120 169zm188.805 47.674c-1.625 1.26-3.208 2.58-4.737 3.974-13.716 12.524-23.816 31.052-31.53 54.198-14.59 43.765-20.404 103.306-30.063 164.154h235.05c-9.66-60.848-15.476-120.39-30.064-164.154-7.714-23.146-17.812-41.674-31.528-54.198-1.53-1.396-3.112-2.715-4.737-3.974-12.84 16.293-30.942 26.994-51.195 26.994s-38.355-10.7-51.195-26.994zM81.27 277.658c-.573.485-1.143.978-1.702 1.488-9.883 9.024-17.315 22.554-23.03 39.7-10.6 31.8-15.045 75.344-22.063 120.154h171.048c-7.017-44.81-11.462-88.354-22.062-120.154-5.714-17.146-13.145-30.676-23.028-39.7-.56-.51-1.127-1.003-1.702-1.488C148.853 289.323 135.222 297 120 297c-15.222 0-28.852-7.678-38.73-19.342z"
							></path>
						</svg>
						<h2 class="card-title">{{ t('pet.age') }}</h2>
						<p>{{ pet.data.age }}</p>
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
							viewBox="0 0 16 16"
							class="text-5xl text-primary"
							height="1em"
							width="1em"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M11.5 1a.5.5 0 0 1 0-1h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-3.45 3.45A4 4 0 0 1 8.5 10.97V13H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V14H6a.5.5 0 0 1 0-1h1.5v-2.03a4 4 0 1 1 3.471-6.648L14.293 1H11.5zm-.997 4.346a3 3 0 1 0-5.006 3.309 3 3 0 0 0 5.006-3.31z"
							></path>
						</svg>
						<h2 class="card-title">{{ t('pet.gender') }}</h2>
						<p>{{ pet.data.sex }}</p>
					</div>
				</div>
			</article>
			<article class="w-full md:w-1/2 lg:w-1/3 px-2 py-4">
				<div aria-label="Card" class="card h-40 card-bordered">
					<div class="card-body items-center text-center">
						<Icon icon="mdi:size-xs" class="text-5xl primary-col" />
						<h2 class="card-title">{{ t('pet.size') }}</h2>
						<p>{{ pet.data.size }}</p>
					</div>
				</div>
			</article>
			<article class="w-full md:w-1/2 lg:w-1/3 px-2 py-4">
				<div aria-label="Card" class="card h-40 card-bordered">
					<div class="card-body items-center text-center">
						<Icon icon="mdi:weight-kilogram" class="text-5xl primary-col" />
						<h2 class="card-title">{{ t('pet.weight') }}</h2>
						<p>{{ pet.data.weight }}</p>
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
						<h2 class="card-title">{{ t('pet.contact') }}</h2>
						<a href="mailto:suekmwdadoptions@gmail.com" target="_blank" rel="noopener noreferrer">{{ pet.user.email }}</a>
					</div>
				</div>
			</article>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { getPetFoundById, getPetSearchById } from '~/service/modules/pet';
import { getFileList, getFileType } from '~/utils/format';
const route = useRoute();

const { t } = useI18n();

onMounted(() => {
	initPet();
});
const pet = reactive({
	data: {},
	user: {},
});

const httpUrl = (val: string) => {
	return import.meta.env.VITE_APP_BASE_IMG + val;
};

async function initPet() {
	const { params, query } = route;
	console.log('[initPet]', params.id);
	if (query.type === 'find') {
		const { content } = await getPetFoundById(params.id as string);
		console.log('[[id]]', content);
		pet.data = content.pet;
		pet.user = content.user;
	} else {
		const { content } = await getPetSearchById(params.id as string);
		console.log('[[id]]', content);
		pet.data = content.pet;
		pet.user = content.user;
	}
}

const shelter = reactive({});
</script>

<style scoped>
.primary-col {
	color: #65c3c8;
}
</style>
