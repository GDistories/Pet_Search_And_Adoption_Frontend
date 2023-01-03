<template>
	<div>
		<el-button v-if="props.createShow" @click="formHandler.show = true">{{ t('button.create') }}</el-button>
		<el-dialog class="text-left" v-model="formHandler.show" @close="formHandler.resetForm(ruleFormRef)">
			<el-form ref="ruleFormRef" :model="formHandler.form" :rules="rules" label-width="120px">
				<el-form-item :label="t('pet.nickname')" prop="nickname"> <el-input v-model="formHandler.form.nickname" /> </el-form-item>
				<el-form-item :label="t('pet.sex')" prop="sex">
					<el-select v-model="formHandler.form.sex" :placeholder="t('select')">
						<el-option v-for="item in sex" :label="item.label" :value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item :label="t('pet.age')" prop="age">
					<el-input v-model.number="formHandler.form.age" />
				</el-form-item>
				<el-form-item :label="t('pet.breed')" prop="breed">
					<el-select v-model="formHandler.form.breed" :placeholder="t('select')">
						<el-option v-for="item in breed" :label="item.label" :value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item :label="t('pet.size')" prop="size">
					<el-select v-model="formHandler.form.size" :placeholder="t('select')">
						<el-option v-for="item in size" :label="item.label" :value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item :label="t('pet.color')" prop="color">
					<el-select v-model="formHandler.form.color" :placeholder="t('select')">
						<el-option v-for="item in color" :label="item.label" :value="item.value"
					/></el-select>
				</el-form-item>
				<el-form-item :label="t('pet.feature')" prop="feature">
					<el-input v-model="formHandler.form.feature" type="textarea" autosize />
				</el-form-item>
				<el-form-item :label="t('pet.petIdNum')" prop="petIdNum">
					<el-input v-model="formHandler.form.petIdNum" />
				</el-form-item>
				<el-form-item :label="t('pet.weight')" prop="weight"> <el-input v-model.number="formHandler.form.weight" /> </el-form-item>
				<el-form-item :label="t('pet.picture')">
					<upload-file ref="fileRef" mode="admin" :list="fileList" @input="handleFileInput"></upload-file>
				</el-form-item>
				<el-form-item :label="t('pet.isFound')" prop="isFound">
					<el-select v-model="formHandler.form.isFound" :placeholder="t('select')">
						<el-option label="is found" :value="0" />
						<el-option label="not found" :value="1" />
					</el-select>
				</el-form-item>
				<el-form-item v-if="countyShow" :label="t('filter.city')" prop="countyId">
					<el-cascader
						:placeholder="t('select')"
						v-model="formHandler.form.countyId"
						:options="area.list"
						:show-all-levels="false"
						:props="{ value: 'adcode', label: 'name', children: 'districts', emitPath: false }"
						@change="getShelterList"
					/>
				</el-form-item>
				<template v-if="props.shelterShow">
					<el-form-item :label="t('pet.status')" prop="status">
						<el-select v-model="formHandler.form.status" :placeholder="t('select')">
							<el-option :label="t('pet.status_0')" :value="0" />
							<el-option :label="t('pet.status_1')" :value="1" />
						</el-select>
					</el-form-item>
					<el-form-item v-if="formHandler.form.status === 1" :label="t('search.shelter')" prop="shelterId">
						<el-select v-model="formHandler.form.shelterId" :placeholder="t('select')">
							<el-option v-for="item in shelter.list" :label="item.shelterName ?? ''" :value="item.shelterId" />
						</el-select> </el-form-item
				></template>
				<el-form-item v-if="props.adpotShow" :label="t('pet.status')" prop="status">
					<el-select v-model="formHandler.form.status" :placeholder="t('select')">
						<el-option :label="t('admin.status_0')" :value="0" />
						<el-option :label="t('admin.status_1')" :value="1" />
					</el-select>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="formHandler.cancel">{{ t('confirm.cancel') }}</el-button>
					<el-button type="primary" @click="formHandler.submitForm(ruleFormRef, getPetList)"> {{ t('confirm.confirm') }} </el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { FormInstance, UploadUserFile } from 'element-plus';
import { IPet } from '~/service/modules/pet/types';
import { createPet, updatePet } from '~/service/modules/pet';
import Message from '~/utils/dom/message';
import { getFileList } from '~/utils/format';
import { storeToRefs } from 'pinia';
import { defineProps, nextTick, reactive } from 'vue';
import { useProvince } from '~/hooks/useProvince';
import settingConfig from '~/config/setting.congig';
import { getShelter } from '~/service/modules/shelter';

const { t } = useI18n();
const props = defineProps({
	createShow: {
		type: Boolean,
		default: true,
	},
	countyShow: {
		type: Boolean,
		default: true,
	},
	shelterShow: {
		type: Boolean,
		default: false,
	},
	adpotShow: {
		type: Boolean,
		default: false,
	},
});
const { area } = useProvince();

const { breed, sex, size, color } = settingConfig;

const ruleFormRef = ref<FormInstance>();

const fileList = ref<UploadUserFile[]>([]);

const fileRef = ref();
async function handleFileInput(e: any) {
	const data = e.map((item: any) => {
		return item.url;
	});
	fileList.value = [...data];
}

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const emit = defineEmits(['afterSubmit']);
const formHandler = reactive({
	show: false,
	form: {
		petId: null,
		sex: '',
		age: '',
		breed: '',
		size: '',
		color: '',
		picture: '',
		feature: '',
		petIdNum: '',
		weight: '',
		identity: 1,
		isFound: 1,
		status: '',
		countyId: '',
		shelterId: undefined,
	},
	cancel: () => {
		formHandler.resetForm(ruleFormRef.value);
		formHandler.show = false;
	},

	submitForm: async (formEl: FormInstance | undefined) => {
		if (!formEl) return;
		await formEl.validate(async (valid, fields) => {
			if (valid) {
				formHandler.form.picture = encodeURI(JSON.stringify(fileList.value).toString());

				if (formHandler.form.petId) {
					await updatePet(formHandler.form).then((res) => {
						if (res.success) {
							Message({ type: 'success', text: t('res.success') });
							formHandler.show = false;

							emit('afterSubmit', { type: 'update', form: formHandler.form });
							formHandler.cancel();
						}
					});
				} else {
					const { success, content } = await createPet(formHandler.form);
					if (success) {
						// Message({ type: 'success', text: t("res.success") });
						formHandler.show = false;
						emit('afterSubmit', { type: 'create', form: formHandler.form, petId: content });
						formHandler.cancel();
					}
				}
			} else {
				console.log('error submit!', fields);
			}
		});
	},
	resetForm: (formEl: FormInstance | undefined) => {
		if (!formEl) return;
		formEl.resetFields();
		fileRef.value.clearAll();
	},
});
const rules = {
	nickname: [{ required: true, message: t('rules.nickname'), trigger: 'blur' }],
	sex: [
		{
			required: true,
			message: t('rules.sex'),
			trigger: 'change',
		},
	],
	status: [
		{
			required: true,
			message: t('rules.status'),
			trigger: 'change',
		},
	],
	breed: [
		{
			required: true,
			message: t('rules.breed'),
			trigger: 'change',
		},
	],
	color: [
		{
			required: true,
			message: t('rules.color'),
			trigger: 'change',
		},
	],
	size: [
		{
			required: true,
			message: t('rules.size'),
			trigger: 'change',
		},
	],
	age: [
		{ type: 'number', message: t('rules.age') },
		{
			pattern: /^[1-9]\d*$/, //正则校验不用字符串
			message: t('rules.number'),
			trigger: 'blur',
		},
	],
	weight: [
		{
			required: true,
			message: t('rules.weight'),
			trigger: 'blur',
		},
		{ type: 'number', message: t('rules.number') },
		{
			pattern: /^[1-9]\d*$/, //正则校验不用字符串
			message: t('rules.number'),
			trigger: 'blur',
		},
	],
	isFound: [
		{
			required: true,
			message: t('rules.isFound'),
			trigger: 'change',
		},
	],
	countyId: [
		{
			required: true,
			message: t('rules.countyId'),
			trigger: 'change',
		},
	],
};

const editPet = (pet: IPet, form?: any) => {
	console.log('[editPet]', form);
	formHandler.show = true;

	nextTick(() => {
		formHandler.form = { ...pet };
		if (form && form.countyId) {
			formHandler.form.countyId = form.countyId.toString();
		}
		if (form && (form.status === 0 || form.status === 1)) {
			formHandler.form.status = form.status;
			if (form.status === 1) {
				getShelterList();
			}
		}
		if (form && form.shelterId) {
			formHandler.form.shelterId = form.shelterId;
		}
		fileList.value = [...getFileList(pet.picture)];
	});
};
defineExpose({ editPet });

const shelter = reactive({
	list: [],
});
const getShelterList = async () => {
	// console.log('[getSheleterList]', operationForm.shelter_countyId);

	const { content } = await getShelter(1, 1000, Number(formHandler.form.countyId));
	shelter.list = content.list;
};
</script>

<style lang="less" scoped></style>
