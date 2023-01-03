import type { FormInstance, FormRules } from 'element-plus';
import Message from '~/utils/dom/message';
import { user_register, user_update } from '~/service/modules/user';
import { IUser } from '~/service/modules/user/types';
import { getUnix } from '~/utils/day';
import { nextTick } from 'vue';
import { t } from '~/i18n';

export function useUserForm() {
	const ruleFormRef = ref<FormInstance>();
	const { t } = useI18n();
	const formHandler = reactive({
		show: false,
		form: {
			userId: undefined,
			username: '',
			password: '',
			email: '',
			phone: '',
			identity: '',
			dob: undefined,
			birth: '',
			gender: '',
			firstName: '',
			lastName: '',
			address: '',
			profilePhoto: '',
		} as IUser,
		create: () => {
			formHandler.show = true;
		},
		resetForm: (formEl: FormInstance | undefined) => {
			if (!formEl) return;
			formHandler.form.userId = undefined;
			formHandler.form.dob = undefined;
			formEl.resetFields();
			formHandler.show = false;
		},
		edit: (user: any) => {
			formHandler.show = true;
			nextTick(() => {
				formHandler.form = { ...user };
			});
		},
		submitForm: async (formEl: FormInstance | undefined, fun: Function) => {
			if (!formEl) return;
			await formEl.validate(async (valid, fields) => {
				if (valid) {
					console.log('submit!');
					formHandler.form.dob = getUnix(formHandler.form.birth);

					const { success } = formHandler.form.userId ? await user_update(formHandler.form) : await user_register(formHandler.form);
					if (success) {
						formHandler.show = false;
						Message({ type: 'success', text: t('res.success') });
						fun();

						formHandler.resetForm(formEl);
					}
				} else {
					console.log('error submit!', fields);
				}
			});
		},
	});
	const rules = reactive<FormRules>({
		username: [{ required: true, message: 'Please username', trigger: 'blur' }],
		password: [{ required: true, message: 'Please input password', trigger: 'blur' }],
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
	});

	return { ruleFormRef, formHandler, rules };
}
