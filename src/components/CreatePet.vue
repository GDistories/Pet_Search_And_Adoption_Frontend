<template>
	<div>
		<button class="btn btn-primary gap-2" @click="open">
			<Icon icon="carbon:add" class="text-2xl" />
			{{ title }}
		</button>
		<!--发布弹窗-->
		<el-dialog v-model="show" :title="title" :width="device === 'mobile' ? '80%' : '40%'" center style="max-height: 70vh; overflow-y: auto">
			<div class="flex flex-col items-center">
				<v-form ref="formRef" v-model="handler.form" :rules="handler.rules">
					<v-form-item :label="t('pet.nickname')" prop="nickname"
						><input
							v-model="handler.form.nickname"
							name="nickname"
							type="text"
							:placeholder="t('pet.nickname_message')"
							class="input flex min-w-[10px] max-w-xs input-primary focus:outline-offset-0 input-bordered"
						/>
					</v-form-item>
					<v-form-item :label="t('pet.breed')" prop="breed"
						><select v-model="handler.form.breed" class="select select-primary select-bordered flex w-md focus:outline-offset-0">
							<option v-for="item in breed" :key="item.value" :value="item.value" :label="item.label">
								{{ item.label }}
							</option>
						</select></v-form-item
					><v-form-item :label="t('pet.sex')" prop="sex"
						><select v-model="handler.form.sex" class="select select-primary select-bordered flex w-md focus:outline-offset-0">
							<option v-for="item in sex" :key="item.value" :value="item.value" :label="item.label">
								{{ item.label }}
							</option>
						</select></v-form-item
					><v-form-item :label="t('pet.size')" prop="size"
						><select v-model="handler.form.size" class="select select-primary select-bordered flex w-md focus:outline-offset-0">
							<option v-for="item in size" :key="item.value" :value="item.value" :label="item.label">
								{{ item.label }}
							</option>
						</select></v-form-item
					><v-form-item :label="t('pet.color')" prop="color"
						><select v-model="handler.form.color" class="select select-primary select-bordered flex w-md focus:outline-offset-0">
							<option v-for="item in color" :key="item.value" :value="item.value" :label="item.label">
								{{ item.label }}
							</option>
						</select></v-form-item
					>
					<v-form-item :label="t('pet.age')" prop="age">
						<input
							v-model.number="handler.form.age"
							name="age"
							type="text"
							class="input flex min-w-[10px] input-primary focus:outline-offset-0 input-bordered"
							:placeholder="t('pet.age_message')"
							style="width: 100px" /></v-form-item
					><v-form-item :label="t('pet.weight')" prop="weight"
						><input
							v-model="handler.form.weight"
							name="weight"
							type="text"
							:placeholder="t('pet.weight_message')"
							class="input flex min-w-[10px] max-w-xs input-primary focus:outline-offset-0 input-bordered"
						/>
					</v-form-item>
					<v-form-item :label="t('pet.feature')" prop="feature"
						><input
							v-model="handler.form.feature"
							name="feature"
							type="text"
							:placeholder="t('pet.feature_message')"
							class="input flex min-w-[10px] max-w-xs input-primary focus:outline-offset-0 input-bordered"
						/>
					</v-form-item>
					<v-form-item :label="t('pet.petIdNum')" prop="petIdNum"
						><input
							v-model="handler.form.petIdNum"
							name="petIdNum"
							type="text"
							:placeholder="t('pet.petIdNum_message')"
							class="input flex min-w-[10px] max-w-xs input-primary focus:outline-offset-0 input-bordered"
						/>
					</v-form-item>
					<v-form-item :label="t('filter.city')" prop="countyId">
						<CascadingSelect v-model="handler.form.countyId"></CascadingSelect>
					</v-form-item>
					<v-form-item v-if="type === 1" :label="t('search.type')" prop="status">
						<select
							v-model="handler.form.status"
							@change="getShelterList"
							class="select select-primary select-bordered flex w-md focus:outline-offset-0"
						>
							<option :value="0">keep at home</option>
							<option :value="1">send to the shelter</option>
						</select> </v-form-item
					><v-form-item v-if="handler.form.status === 1" :label="t('search.shelter')" prop="shelterId">
						<select v-model="handler.form.shelterId" class="select select-primary select-bordered flex w-md focus:outline-offset-0">
							<option v-for="item in shelterList.data" :key="item.shelterId" :value="item.shelterId">
								{{ item.shelterName }}
							</option>
						</select>
					</v-form-item>
					<v-form-item :label="t('pet.picture')" prop="picture">
						<upload-file ref="fileRef" :list="fileList" @input="handleFileInput"></upload-file>
					</v-form-item>
				</v-form>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<button class="btn btn-primary my-2" @click="cancel">Cancel</button>
					<button class="btn btn-primary my-2" @click="submit">Confirm</button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { storeToRefs } from 'pinia';
import { useProvince } from '~/hooks/useProvince';
import settingConfig from '~/config/setting.congig';
import { IPet } from '~/service/modules/pet/types';
import { createPet, createPetFound, createPetSearch } from '~/service/modules/pet';
import Message from '~/utils/dom/message';

import type { UploadUserFile } from 'element-plus';
import { getUnix } from '~/utils/day';
import { getShelter } from '~/service/modules/shelter';
import { checkPermission } from '~/utils/permission';

const { isLogin } = checkPermission();
const open = () => {
	isLogin().then((res) => {
		console.log(res);
		show.value = true;
	});
};
const props = defineProps({
	title: {
		type: String,
	},
	type: {
		type: Number,
	},
});
const { title, type } = toRefs(props);
const settingStore = useSettingStore();
const { device } = storeToRefs(settingStore);

const { breed, sex, size, color } = settingConfig;

const { t } = useI18n();

const show = ref(false);
const formRef = ref();
const handler = reactive({
	form: {
		nickname: '',
		sex: '',
		age: undefined,
		breed: '',
		size: '',
		color: '',
		picture: '',
		feature: '',
		petIdNum: '',
		weight: undefined,
		countyId: '',
		identity: 0,
		isFound: 1,
		status: 0,
		shelterId: undefined,
	} as IPet,
	rules: {
		age: [
			{ required: true, message: t('rules.age') },
			{ pattern: /^[1-9]\d*$/, message: t('rules.age_number') },
		],
		weight: [
			{ required: true, message: t('rules.weight') },
			{ pattern: /^[1-9]\d*$/, message: t('rules.weight_number') },
		],
		color: [{ required: true, message: t('rules.color') }],
		size: [{ required: true, message: t('rules.size') }],
		sex: [{ required: true, message: t('rules.sex') }],
		breed: [{ required: true, message: t('rules.breed') }],
		nickname: [{ required: true, message: t('rules.nickname') }],
	},
});

const cancel = () => {
	show.value = false;
	formRef.value.resetFields();
};
const userStore = useUserStore();

const { username } = storeToRefs(userStore);
const router = useRouter();
const submit = async () => {
	console.log('[submit]', encodeURI(JSON.stringify(fileList.value).toString()));
	if (formRef.value.validateFields()) {
		handler.form.picture = encodeURI(JSON.stringify(fileList.value).toString());

		// 创建宠物
		const { success: createPetSuccess, content: petId } = await createPet(handler.form);
		if (createPetSuccess) {
			// 创建宠物搜索信息
			const date = new Date();
			const _form = {
				petId,
				username: username.value,
				countyId: handler.form.countyId,
				createTime: getUnix(date),
			};
			if (type?.value === 1) {
				_form.status = handler.form.status;
				_form.shelterId = handler.form.shelterId;
			}
			const { content: searchId, success: createSuccess } = type?.value === 0 ? await createPetSearch(_form) : await createPetFound(_form);
			if (createSuccess) {
				// 跳转到详情页面
				await router.push({
					path: '/detail/' + searchId,
					query: {
						type: type?.value === 0 ? 'search' : 'find',
					},
				});
				cancel();
			} else {
				Message({ type: 'error', text: t('error') });
			}
		} else {
			Message({ type: 'error', text: t('error') });
		}
	} else {
		console.log('[fail]');
	}
};

const fileList = ref<UploadUserFile[]>([]);

const fileRef = ref();
async function handleFileInput(e: any) {
	// console.log('[handleFileInput]', e);
	const data = e.map((item: any) => {
		return item.url;
	});
	fileList.value = [...data];
}

const shelterList = reactive({
	data: [],
});

const getShelterList = async () => {
	console.log('[getShelterList]');
	const { content } = await getShelter(1, 10000, handler.form.countyId);
	shelterList.data = content.list;
};

onMounted(() => {
	getShelterList();
});
</script>

<style lang="less" scoped></style>
