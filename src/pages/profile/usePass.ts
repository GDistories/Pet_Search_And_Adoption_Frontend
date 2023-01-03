import { resetPass, shelter_login, shelter_updatePassword, user_login, user_updatePassword } from '~/service/modules/user';
import Message from '~/utils/dom/message';
import { storeToRefs } from 'pinia';
export default function usePass() {
	const validatePass = (value: any, rules: any) => {
		if (value !== changePass.form.new_password) {
			return "Two inputs don't match!";
		}
	};

	const { t } = useI18n();
	const passRules = {
		check_password: [{ required: true, message: 'Please enter the password again to confirm' }, { validator: validatePass }],
		new_password: [{ required: true, message: 'Please enter a new password' }],
		old_password: [{ required: true, message: 'Please enter the old password' }],
		username: [{ required: true, message: 'Please enter the username' }],
	};
	const passRef = ref();

	const userStore = useUserStore();
	const { username, isShelter, isAdmin } = storeToRefs(userStore);

	const changePass = reactive({
		form: {
			username: '',
			old_password: '',
			new_password: '',
			check_password: '',
		},
		submit: async () => {
			if (passRef.value.validateFields()) {
				const { success } = isShelter.value
					? await shelter_login(username.value, changePass.form.old_password)
					: await user_login(username.value, changePass.form.old_password);

				if (success) {
					const { success } = isShelter.value
						? await shelter_updatePassword(username.value, changePass.form.new_password)
						: await user_updatePassword(username.value, changePass.form.new_password);
					if (success) {
						Message({ type: 'success', text: t('res.success') });
						passRef.value.resetFields();
					}
				} else {
					Message({ type: 'error', text: t('login.pass_wrong') });
				}
			} else {
				console.log('[profile]fail');
			}
		},
	});

	return {
		isAdmin,
		isShelter,
		passRules,
		passRef,
		changePass,
	};
}
