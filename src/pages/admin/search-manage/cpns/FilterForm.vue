<template>
	<el-card shadow="never" class="w-full mb-4">
		<el-collapse accordion class="w-full">
			<el-collapse-item name="1">
				<template #title> {{ t('filter.filter') }} </template>
				<el-form :inline="true" ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px">
					<el-form-item :label="t('filter.sex')" prop="sex">
						<el-select v-model="ruleForm.sex" :placeholder="t('select')">
							<el-option v-for="item in sex" :label="item.label" :value="item.value" />
						</el-select>
					</el-form-item>
					<el-form-item :label="t('filter.breed')" prop="breed">
						<el-select v-model="ruleForm.breed" :placeholder="t('select')">
							<el-option v-for="item in breed" :label="item.label" :value="item.value" />
						</el-select>
					</el-form-item>
					<el-form-item :label="t('filter.size')" prop="size">
						<el-select v-model="ruleForm.size" :placeholder="t('select')">
							<el-option v-for="item in size" :label="item.label" :value="item.value" />
						</el-select>
					</el-form-item>
					<el-form-item :label="t('filter.color')" prop="color">
						<el-select v-model="ruleForm.color" :placeholder="t('select')">
							<el-option v-for="item in color" :label="item.label" :value="item.value"
						/></el-select>
					</el-form-item>
					<el-form-item :label="t('filter.city')" prop="countyId">
						<el-cascader
							:placeholder="t('select')"
							v-model="ruleForm.countyId"
							:options="area.list"
							:props="{ value: 'adcode', label: 'name', children: 'districts', emitPath: false }"
						/>
					</el-form-item>
					<el-form-item :label="t('filter.startAge')" prop="startAge">
						<el-input v-model="ruleForm.startAge" />
					</el-form-item>
					<el-form-item :label="t('filter.endAge')" prop="endAge">
						<el-input v-model="ruleForm.endAge" />
					</el-form-item>
					<el-form-item :label="t('filter.startWeight')" prop="startWeight">
						<el-input v-model="ruleForm.startWeight" />
					</el-form-item>
					<el-form-item :label="t('filter.endWeight')" prop="endWeight">
						<el-input v-model="ruleForm.endWeight" />
					</el-form-item>
					<el-form-item :label="t('filter.date')">
						<el-date-picker
							v-model="ruleForm.date"
							type="daterange"
							range-separator="-"
							:start-placeholder="t('filter.start_date')"
							:end-placeholder="t('filter.end_date')"
						/>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm(ruleFormRef)">{{ t('confirm.confirm') }}</el-button>
						<el-button @click="resetForm(ruleFormRef)">{{ t('confirm.reset') }}</el-button>
					</el-form-item></el-form
				>
			</el-collapse-item>
		</el-collapse></el-card
	>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import settingConfig from '~/config/setting.congig';
import { useProvince } from '~/hooks/useProvince';
import { getUnix } from '~/utils/day';
const { area } = useProvince();
const { breed, sex, size, color } = settingConfig;
const ruleFormRef = ref<FormInstance>();

const { t } = useI18n();
const ruleForm = reactive({
	sex: '',
	breed: '',
	size: '',
	color: '',
	countyId: '',
	startAge: 0,
	endAge: 100,
	startWeight: 0,
	endWeight: 100,
	startCreateTime: '',
	endCreateTime: '',
	date: '',
});

const rules = reactive<FormRules>({});
const emit = defineEmits(['submit', 'reset']);
const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate((valid, fields) => {
		if (valid) {
			if (ruleForm.date) {
				ruleForm.startCreateTime = getUnix(ruleForm.date[0]);
				ruleForm.endCreateTime = getUnix(ruleForm.date[1]);
			}
			ruleForm.countyId = ruleForm.countyId !== '' ? Number(ruleForm.countyId) : '';
			console.log('filter submit!', ruleForm);

			emit('submit', ruleForm);
		} else {
			console.log('error submit!', fields);
		}
	});
};

const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
	console.log('filter reset!');
	emit('reset');
};
</script>

<style lang="less" scoped></style>
