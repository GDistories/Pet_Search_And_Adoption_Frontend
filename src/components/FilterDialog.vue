<template>
	<div>
		<button class="btn gap-2 mx-2 btn-primary" @click="filterHandler.show = true">
			<Icon icon="carbon:audio-console" class="text-2xl" />
			{{ t('filter.filter') }}
		</button>
		<button class="icon-btn mx-2 gap-2" title="reset" @click="handleReset">
			<Icon icon="grommet-icons:power-reset" class="text-2xl" />
		</button>
		<el-dialog
			style="max-height: 70vh; overflow-y: auto"
			v-model="filterHandler.show"
			:title="t('filter.filter')"
			:width="device === 'mobile' ? '80%' : '40%'"
		>
			<div class="flex flex-col items-center">
				<v-form ref="formRef" v-model="filterHandler.form" :rules="rules"
					><v-form-item :label="t('filter.breed')" prop="breed"
						><select v-model="filterHandler.form.breed" class="select select-primary select-bordered flex w-md focus:outline-offset-0">
							<option v-for="item in breed" :key="item.value" :value="item.value">
								{{ item.label }}
							</option>
						</select></v-form-item
					><v-form-item :label="t('filter.sex')" prop="sex"
						><select v-model="filterHandler.form.sex" class="select select-primary select-bordered flex w-md focus:outline-offset-0">
							<option v-for="item in sex" :key="item.value" :value="item.value">
								{{ item.label }}
							</option>
						</select></v-form-item
					><v-form-item :label="t('filter.size')" prop="size"
						><select v-model="filterHandler.form.size" class="select select-primary select-bordered flex w-md focus:outline-offset-0">
							<option v-for="item in size" :key="item.value" :value="item.value">
								{{ item.label }}
							</option>
						</select></v-form-item
					><v-form-item :label="t('filter.color')" prop="color"
						><select v-model="filterHandler.form.color" class="select select-primary select-bordered flex w-md focus:outline-offset-0">
							<option v-for="item in color" :key="item.value" :value="item.value">
								{{ item.label }}
							</option>
						</select></v-form-item
					>
					<v-form-item :label="t('filter.startWeight')" prop="startWeight">
						<input
							v-model="filterHandler.form.startWeight"
							name="startWeight"
							type="text"
							class="input flex input-primary focus:outline-offset-0 input-bordered"
							style="width: 100px" /></v-form-item
					><v-form-item :label="t('filter.endWeight')" prop="endWeight">
						<input
							v-model="filterHandler.form.endWeight"
							name="endWeight"
							type="text"
							class="input flex input-primary focus:outline-offset-0 input-bordered"
							style="width: 100px"
					/></v-form-item>
					<v-form-item :label="t('filter.startAge')" prop="startAge">
						<input
							v-model="filterHandler.form.startAge"
							name="startAge"
							type="text"
							class="input flex min-w-[10px] input-primary focus:outline-offset-0 input-bordered"
							style="width: 100px"
					/></v-form-item>
					<v-form-item :label="t('filter.endAge')" prop="endAge">
						<input
							v-model="filterHandler.form.endAge"
							name="endAge"
							type="text"
							class="input flex min-w-[10px] input-primary focus:outline-offset-0 input-bordered"
							style="width: 100px"
					/></v-form-item>
					<v-form-item :label="t('filter.status')" prop="breed"
						><select v-model="filterHandler.form.status" class="select select-primary select-bordered flex w-md focus:outline-offset-0">
							<option :value="0">pets form users</option>
							<option :value="1">pets from shelter</option>
						</select></v-form-item
					>
					<v-form-item :label="t('filter.city')" prop="countyId">
						<CascadingSelect v-model="filterHandler.form.countyId"></CascadingSelect>
					</v-form-item>
				</v-form>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<button class="btn my-2 btn-primary" @click="filterHandler.submit">{{ t('filter.search') }}</button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useSettingStore } from '~/store/setting';
import { storeToRefs } from 'pinia';
import settingConfig from '~/config/setting.congig';

const settingStore = useSettingStore();
const { device } = storeToRefs(settingStore);

const { breed, sex, size, color } = settingConfig;

const { t } = useI18n();

// const { area, areaChildList, areaGrandList, countyId } = useProvince();
const formRef = ref();
const validateAge = (value: any, Gender: any) => {
	// console.log('[FilterDialog]', value);
	if (filterHandler.form.startAge > filterHandler.form.endAge) return '年龄范围大小有误';
};

const validateWeight = (value: any, Gender: any) => {
	// console.log('[FilterDialog]', value);
	if (filterHandler.form.startWeight > filterHandler.form.endWeight) return '体重范围大小有误';
};
const rules = {
	// countyId: [{ required: true, message: '请选择地区' }],
	endAge: [{ validator: validateAge }],
	startAge: [{ validator: validateAge }],
	endWeight: [{ validator: validateWeight }],
	startWeight: [{ validator: validateWeight }],
	// color: [{ required: true, message: '请选择颜色' }],
	// size: [{ required: true, message: '请选择大小' }],
	// sex: [{ required: true, message: '请选择性别' }],
	// breed: [{ required: true, message: '请选择品种' }],
};
const emit = defineEmits(['submit', 'reset']);

const filterHandler = reactive({
	show: false,
	form: {
		sex: '',
		breed: '',
		size: '',
		color: '',
		countyId: '',
		status: '',
		startAge: 0,
		endAge: 1000,
		startWeight: 0,
		endWeight: 1000,
		startCreateTime: '',
		endCreateTime: '',
	},
	submit: () => {
		if (formRef.value.validateFields()) {
			console.log('[submit]', filterHandler.form);
			emit('submit', filterHandler.form);
			filterHandler.show = false;
			formRef.value.resetFields();
		} else {
			console.log('[fail]');
		}
	},
});

const handleReset = () => {
	emit('reset');
};
</script>

<style lang="less" scoped></style>
