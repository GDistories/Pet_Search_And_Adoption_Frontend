import type { FormInstance, FormRules } from 'element-plus';
import Message from '~/utils/dom/message';
import { IShelter } from '~/service/modules/shelter/types';
import { shelter_register, shelter_update } from '~/service/modules/user';
import { nextTick } from 'vue';

export function useShelterForm() {
	const ruleFormRef = ref<FormInstance>();
	const { t } = useI18n();
	const formHandler = reactive({
		show: false,
		form: {
			username: '',
			password: '',
			email: '',
			phone: '',
			address: '',
			profilePhoto: '',
			location: '',
			countyId: '',
			registerCode: '',
			shelterName: '',
		} as IShelter,
		edit: (shelter: any) => {
			formHandler.show = true;

			nextTick(() => {
				formHandler.form = { ...shelter };
				formHandler.form.countyId = shelter.countyId.toString();
			});
		},
		submitForm: async (formEl: FormInstance | undefined, fun: Function) => {
			console.log('[submitForm]', formEl);
			if (!formEl) return;
			await formEl.validate(async (valid, fields) => {
				if (valid) {
					console.log('submit!');
					formHandler.form.countyId = Number(formHandler.form.countyId);
					// @ts-ignore
          const { success } = formHandler.form.shelterId ? await shelter_update(formHandler.form) : await shelter_register(formHandler.form);
					if (success) {
						Message({ type: 'success', text: t('res.success') });
						formHandler.resetForm(formEl);
						fun();
					}
				} else {
					console.log('error submit!', fields);
				}
			});
		},
		resetForm: (formEl: FormInstance | undefined) => {
			if (!formEl) return;
			formEl.resetFields();
			delete formHandler.form['shelterId'];
			formHandler.show = false;
		},
	});

	const handleLocation = (val: string, location: any) => {
		console.log('[handleLocation]', location);
		formHandler.form.address = location.address + location.name;
		formHandler.form.location = val;
	};
	const rules = reactive<FormRules>({
		username: [{ required: true, message: 'Please username', trigger: 'blur' }],
		password: [{ required: true, message: 'Please input password', trigger: 'blur' }],
		shelterName: [{ required: true, message: 'Please input shelterName', trigger: 'blur' }],
		registerCode: [{ required: true, message: 'Please input registerCode', trigger: 'blur' }],
		email: [
			{ required: true, message: 'Please input email', trigger: 'blur' },
			{
				pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
				message: 'Email address format is incorrect',
				trigger: 'blur',
			},
		],
		phone: [
			{ required: true, message: 'Please input phone', trigger: 'blur' },
			{
				pattern: /^\d+$/,
				message: 'The phone number format is incorrect',
				trigger: 'blur',
			},
		],
		countyId: [{ required: true, message: 'Please select city', trigger: 'change' }],
	});

	return { ruleFormRef, formHandler, rules, handleLocation };
}
