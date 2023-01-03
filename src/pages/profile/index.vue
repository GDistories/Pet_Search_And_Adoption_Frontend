<template>
	<div class="container mx-auto px-4 md:px-12 pt-6">
		<div class="card card-side bg-base-100 shadow-xl overflow-hidden">
			<ul class="menu bg-base-100 w-56">
				<li @click="activeChange(0)">
					<a :class="{ active: active === 0 }">
						{{ t('profile.pets') }}
					</a>
				</li>
				<li @click="activeChange(1)">
					<a :class="{ active: active === 1 }">
						{{ t('profile.profile') }}
					</a>
				</li>
				<li @click="activeChange(2)">
					<a :class="{ active: active === 2 }">
						{{ t('profile.change') }}
					</a>
				</li>
				<li @click="activeChange(3)">
					<a :class="{ active: active === 3 }">
						{{ t('profile.password') }}
					</a>
				</li>
			</ul>
			<div class="card-body">
				<section v-show="active === 0" class="w-full flex flex-wrap">
					<div class="stats shadow drawer-button cursor-pointer mr-4" @click="open('find')">
						<div class="stat">
							<div class="stat-figure text-primary">
								<Icon icon="ic:baseline-widgets" class="text-4xl" />
							</div>
							<div class="stat-title">{{ t('my.my_find') }}</div>
							<div class="stat-value">{{ table.find.length }}</div>
						</div>
					</div>
					<div class="stats shadow drawer-button cursor-pointer mr-4" @click="open('search')">
						<div class="stat">
							<div class="stat-figure text-primary">
								<Icon icon="ic:round-manage-search" class="text-4xl" />
							</div>
							<div class="stat-title">{{ t('my.my_search') }}</div>
							<div class="stat-value">{{ table.search.length }}</div>
						</div>
					</div>
					<!--表格弹窗-->
					<el-drawer v-model="drawer" direction="ttb" size="80%">
						<el-table border :data="mode === 'find' ? table.find : table.search">
							<el-table-column fixed type="index" width="50" />
							<el-table-column fixed prop="pet.nickname" :label="t('pet.nickname')" width="100" />
							<el-table-column prop="pet.sex" :label="t('pet.sex')" width="60" />
							<el-table-column prop="pet.age" :label="t('pet.age')" width="60" />
							<el-table-column prop="pet.breed" :label="t('pet.breed')" width="100" />
							<el-table-column prop="pet.size" :label="t('pet.size')" width="100" />
							<el-table-column prop="pet.weight" :label="t('pet.weight')" width="100" />
							<el-table-column prop="pet.color" :label="t('pet.color')" width="100" />
							<el-table-column prop="pet.feature" :label="t('pet.feature')" max-width="200px" />
							<el-table-column prop="pet.petIdNum" :label="t('pet.petIdNum')" width="150px" />
							<el-table-column :label="t('pet.picture')" min-width="200">
								<template #default="scope">
									<ul>
										<el-link v-for="file in getFileList(scope.row.pet.picture)" target="‘_blank’" :href="getFileHttp(file)">{{ file }}</el-link>
									</ul>
								</template>
							</el-table-column>
							<el-table-column :label="t('pet.createTime')" width="150px">
								<template #default="scope">
									{{ getDate(scope.row.createTime) }}
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
					</el-drawer>
				</section>
				<section v-show="active === 1" class="flex flex-col justify-center items-center">
					<el-upload
						class="avatar-uploader"
						:action="upload"
						:headers="headers"
						name="file"
						:show-file-list="false"
						:on-success="handleAvatarSuccess"
						:before-upload="beforeAvatarUpload"
					>
						<img v-if="profilePhoto" :src="getFileHttp(profilePhoto)" class="avatar" />
						<Icon v-else class="text-2xl avatar-uploader-icon" icon="material-symbols:add" />
					</el-upload>

					<h1 class="text-3xl font-bold mb-4">{{ user.username }}</h1>
					<h1 class="text-3xl font-bold mb-4">{{ user.firstName }} {{ user.lastName }}</h1>
					<small class="p-1">{{ user.description ?? 'An Awesome Description Awaits Here' }}</small
					><small class="p-1">{{ user.gender ?? '' }}</small> <small>{{ user.phone ?? '' }}</small
					><small class="p-1">{{ user.email ?? '' }}</small
					><small class="p-1">{{ user.shelterName ?? '' }}</small>
					<div class="flex items-center">
						<small>{{ user.address ?? '' }}</small>
						<map-dialog v-if="user.location" :title="user.address" :location="user.location" />
					</div>
				</section>
				<section v-show="active === 2" class="flex flex-col justify-center items-center text-center">
					<v-form ref="profileRef" v-model="changeProfile">
						<v-form-item :label="t('user.phone')"
							><input
								v-model="changeProfile.form.phone"
								name="phone"
								type="text"
								class="input flex min-w-[10px] input-primary focus:outline-offset-0 input-bordered"
							/>
						</v-form-item>
						<v-form-item v-if="!isShelter" :label="t('user.firstName')"
							><input
								v-model="changeProfile.form.firstName"
								name="firstName"
								type="text"
								class="input flex min-w-[10px] input-primary focus:outline-offset-0 input-bordered"
							/>
						</v-form-item>
						<v-form-item v-if="!isShelter" :label="t('user.lastName')"
							><input
								v-model="changeProfile.form.lastName"
								name="lastName"
								type="text"
								class="input flex min-w-[10px] input-primary focus:outline-offset-0 input-bordered"
							/> </v-form-item
						><v-form-item :label="t('user.address')"
							><input
								v-model="changeProfile.form.address"
								name="address"
								type="text"
								class="input flex min-w-[10px] input-primary focus:outline-offset-0 input-bordered"
							/> </v-form-item
						><v-form-item v-if="!isShelter" :label="t('user.dob')">
							<el-date-picker v-model="changeProfile.form.birth" type="date" />
						</v-form-item>
						<v-form-item v-if="!isShelter" :label="t('user.gender')"
							><select v-model="changeProfile.form.gender" class="select select-primary select-bordered flex min-w-[10px] focus:outline-offset-0">
								<option>Male</option>
								<option>Female</option>
							</select>
						</v-form-item>
						<v-form-item v-if="!isShelter" :label="t('user.description')"
							><input
								v-model="changeProfile.form.description"
								name="description"
								type="text"
								class="input flex min-w-[10px] input-primary focus:outline-offset-0 input-bordered"
							/>
						</v-form-item>
						<v-form-item v-if="isShelter" :label="t('user.shelterName')"
							><input
								v-model="changeProfile.form.shelterName"
								name="shelterName"
								type="text"
								class="input flex min-w-[10px] input-primary focus:outline-offset-0 input-bordered"
							/>
						</v-form-item>
						<v-form-item v-if="isShelter" :label="t('filter.city')" prop="countyId">
							<CascadingSelect v-model="changeProfile.form.countyId"></CascadingSelect>
						</v-form-item>
						<v-form-item v-if="isShelter" :label="t('user.location')">
							<p>{{ location_text }}</p>
							<map-select @getLocation="handleLocation" />
						</v-form-item>
					</v-form>
					<!--					<el-button class="btn btn-primary" @click="changeProfile.submit">{{ t('login.submit') }}</el-button>-->
					<el-button size="large" round color="#65c3c8" @click="changeProfile.submit">{{ t('login.submit') }}</el-button>
				</section>
				<section v-show="active === 3 && !isAdmin" class="flex flex-col justify-center items-center text-center">
					<v-form ref="passRef" v-model="changePass.form" :rules="passRules">
						<v-form-item :label="t('password.old_password')" prop="old_password"
							><input
								v-model="changePass.form.old_password"
								name="password"
								type="password"
								class="input flex min-w-[10px] max-w-xs input-primary focus:outline-offset-0 input-bordered"
							/>
						</v-form-item>
						<v-form-item :label="t('password.new_password')" prop="new_password"
							><input
								v-model="changePass.form.new_password"
								name="password"
								type="password"
								class="input flex min-w-[10px] max-w-xs input-primary focus:outline-offset-0 input-bordered"
							/>
						</v-form-item>
						<v-form-item :label="t('password.check_password')" prop="check_password"
							><input
								v-model="changePass.form.check_password"
								name="password"
								type="password"
								class="input flex min-w-[10px] max-w-xs input-primary focus:outline-offset-0 input-bordered"
							/>
						</v-form-item>
					</v-form>
					<!--					<button class="btn btn-primary" @click="changePass.submit">{{ t('confirm.confirm') }}</button>-->
					<el-button size="large" round color="#65c3c8" @click="changePass.submit">{{ t('login.submit') }}</el-button>
				</section>

				<admin-create-pet
					v-if="mode === 'find'"
					ref="petCreateRef"
					:createShow="false"
					@afterSubmit="beforeSubmit"
					:county-show="true"
					:shelterShow="true"
				/>
				<admin-create-pet v-else ref="petCreateRef" :createShow="false" @afterSubmit="beforeSubmit" :county-show="true" :shelterShow="false" />
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue';

import { getFileHttp } from '~/utils/format';
import useProfile from './useProfile';
import usePass from './usePass';
import useFile from '~/hooks/useFile';
import { usePets } from '~/pages/profile/usePets';
import { getDate, getUnix } from '~/utils/day';
import { UploadProps } from 'element-plus';
import Message from '~/utils/dom/message';
import { storeToRefs } from 'pinia';
import { deletePetFound, deletePetSearch, updatePetFound, updatePetSearch } from '~/service/modules/pet';

import { useRoute } from 'vue-router';

import { getFileList } from '~/utils/format';
const { profilePhoto, user, changeProfile, profileRef, handleLocation, location_text, updateAvatar } = useProfile();
const { passRules, passRef, changePass, isAdmin, isShelter } = usePass();
const { upload, headers, beforeAvatarUpload } = useFile();

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
	console.log('[handleAvatarSuccess]', response.content);
	updateAvatar(response.content);
};

const active = ref(0);
interface IMenu {
	index: number;
	title: string;
}

const { t } = useI18n();

const { mode, drawer, table, open, getMyFindTable, getMySearchTable } = usePets();

const userStore = useUserStore();
const { username } = storeToRefs(userStore);

const beforeSubmit = async (val: any) => {
	console.log('[beforeSubmit]', val);
	const { type, form, petId } = val;
	if (mode.value === 'find') {
		const _form = {
			petFoundId: petFoundId.value,
			shelterId: form.status === 0 ? '' : form.shelterId,
			petId: petId,
			status: form.status,
			createTime: getUnix(new Date()),
			countyId: form.countyId,
			username: username.value,
		};
		const { success } = await updatePetFound(_form);
		if (success) {
			Message({ type: 'success', text: t('res.success') });
			await getMyFindTable();
		}
	} else {
		const _form = {
			petSearchId: petSearchId.value,
			petId: petId,
			createTime: getUnix(new Date()),
			countyId: form.countyId,
			username: username.value,
		};
		const { success } = await updatePetSearch(_form);
		if (success) {
			Message({ type: 'success', text: t('res.success') });
			await getMySearchTable();
		}
	}
};
const petCreateRef = ref<any>();
const petFoundId = ref(0);
const petSearchId = ref(0);
const handleEdit = (row: any) => {
	if (mode.value === 'find') {
		petFoundId.value = row.petFoundId;
		const _form = {
			shelterId: row.shelterId,
			status: row.status,
			countyId: row.countyId,
		};
		petCreateRef.value.editPet(row.pet, _form);
	} else {
		petSearchId.value = row.petSearchId;
		const _form = {
			countyId: row.countyId,
		};
		petCreateRef.value.editPet(row.pet, _form);
	}
};
const handleDelete = async (id: number) => {
	if (mode.value === 'find') {
		const { success } = await deletePetFound(id);
		if (success) {
			Message({ type: 'success', text: t('res.success') });
			await getMyFindTable();
		}
	} else {
		const { success } = await deletePetSearch(id);
		if (success) {
			Message({ type: 'success', text: t('res.success') });
			await getMySearchTable();
		}
	}
};
const route = useRoute();
const router = useRouter();
onMounted(() => {
	if (route.query.active) {
		active.value = Number(route.query.active);
	}
});

const activeChange = (index: number) => {
	active.value = index;
	router.replace({ path: '/profile', query: { active: index } });
};
</script>

<style lang="less" scoped>
.avatar-uploader .avatar {
	width: 178px;
	height: 178px;
	display: block;
}
:deep {
	.el-date-editor.el-input,
	.el-date-editor.el-input__wrapper {
		width: 212px;
		height: 48px;
	}
	.el-input__wrapper {
		border-radius: 25px !important;
		width: 212px;
		height: 48px;
		background-color: #faf7f5;
	}
}
</style>

<style>
.avatar-uploader .el-upload {
	width: 120px;
	height: 120px;
	border-radius: 50%;
	border: 1px dashed var(--el-border-color);
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	text-align: center;
}
</style>
