<template>
	<el-card class="w-full mb-4" shadow="never">
		<el-form :inline="true" ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px">
			<el-form-item :label="t('user.gender')" prop="gender">
				<el-select v-model="ruleForm.gender" :placeholder="t('select')">
					<el-option label="Male" value="Male" />
					<el-option label="Female" value="Female" />
				</el-select>
			</el-form-item>
			<el-form-item :label="t('user.dob')" prop="birth">
				<el-date-picker
					v-model="ruleForm.birth"
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
		></el-card
	>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { getUnix } from '~/utils/day';

const { t } = useI18n();
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
	gender: '',
	birth: '',
});

const rules = reactive<FormRules>({});
const emit = defineEmits(['submit', 'reset']);
const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate((valid, fields) => {
		if (valid) {
			console.log('submit!');
			const obj = {
				gender: ruleForm.gender,
				startDob: ruleForm.birth[0] ? getUnix(ruleForm.birth[0]) : '',
				endDob: ruleForm.birth[1] ? getUnix(ruleForm.birth[1]) : '',
			};
			console.log('[obj]', obj);
			emit('submit', obj);
		} else {
			console.log('error submit!', fields);
		}
	});
};

const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();

	emit('reset');
};
</script>

<style lang="less" scoped></style>
