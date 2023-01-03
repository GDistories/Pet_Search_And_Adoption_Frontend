<template>
	<div class="navbar bg-base-100">
		<div v-if="device === 'mobile'" class="navbar bg-base-100">
			<div class="navbar-start">
				<div class="dropdown">
					<label tabindex="0" class="btn btn-ghost btn-circle">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
						</svg>
					</label>
					<ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
						<li v-for="item in menuItems" :key="item.path" @click="router.push(item.path)">
							<a :class="{ active: isActive(item.path) }"> {{ t(item.name) }}</a>
						</li>
						<li v-if="user.isShelter" @click="openPage('/shelter-admin/find-manage')">
							<a>{{ t('nav.shelter') }}</a>
						</li>

						<li v-if="user.isAdmin" @click="openPage('/admin/find-manage')">
							<a>{{ t('nav.admin') }}</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div v-else class="flex-1">
			<Icon icon="icons8-cat-footprint" class="text-5xl mx-2" />
			<button
				v-for="item in menuItems"
				:key="item.path"
				:class="{ 'btn-active': isActive(item.path), 'btn btn-ghost normal-case text-xl mx-1': true }"
				@click="router.push(item.path)"
			>
				{{ t(item.name) }}
			</button>

			<button v-if="user.isShelter" class="btn btn-ghost normal-case text-xl mx-1" @click="openPage('/shelter-admin/find-manage')">
				{{ t('nav.shelter') }}
			</button>

			<button v-if="user.isAdmin" class="btn btn-ghost normal-case text-xl mx-1" @click="openPage('/admin/find-manage')">
				{{ t('nav.admin') }}
			</button>
		</div>

		<div class="flex-none gap-2">
			<button class="icon-btn mx-2" :title="t('button.toggle_langs')" @click="toggleLocales()">
				<Icon icon="carbon-language" class="text-2xl" />
			</button>
			<div v-if="user.isLogin" class="dropdown dropdown-end">
				<label tabindex="0" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						<img :src="getFileHttp(profilePhoto) ?? 'https://placeimg.com/80/80/people'" />
					</div>
				</label>
				<ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
					<li v-if="!isAdmin">
						<router-link to="/profile"> {{ t('nav.profile') }}</router-link>
					</li>
					<li>
						<a @click="handleLogout"> {{ t('nav.logout') }}</a>
					</li>
				</ul>
			</div>
			<button v-if="!user.isLogin" @click="goToLogin" class="btn btn-outline btn-info normal-case">{{ t('nav.login') }}</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '~/store/user';
import { Icon } from '@iconify/vue';

import { useSettingStore } from '~/store/setting';

import { storeToRefs } from 'pinia';
import { getFileHttp } from '~/utils/format';
const settingStore = useSettingStore();
const { device } = storeToRefs(settingStore);

const { t, availableLocales, locale } = useI18n();
const router = useRouter();

const userStore = useUserStore();
const { profilePhoto } = storeToRefs(userStore);
interface MenuItem {
	path: string;
	name: string;
}

const menuItems = ref<MenuItem[]>([
	{ path: '/home', name: 'nav.home' },
	{ path: '/lost-pet-search', name: 'nav.lost_pet_search' },
	{ path: '/find-pet-owner', name: 'nav.find_pet_owner' },
	{ path: '/stray-pet-adoption', name: 'nav.stray_pet_adoption' },
]);

const isActive = (path: string) => {
	return router.currentRoute.value.path.split('/')[1] === path.split('/')[1];
};

const toggleLocales = () => {
	// change to some real logic
	const locales = availableLocales;
	locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
};

const goToLogin = () => {
	router.push('/login');
};

const openPage = (path: string) => {
	window.open(path, '_blank');
};

const user = useUserStore();

const { isAdmin } = storeToRefs(user);
const handleLogout = async () => {
	await user.logout();
	await router.push('/login');
};
</script>

<style scoped></style>
