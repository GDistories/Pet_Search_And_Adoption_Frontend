import Message from '~/utils/dom/message';
import { user_register, shelter_register, verifyEmailCode } from '~/service/modules/user';
import { sendEmail } from '~/service/modules/user';

export default function useRegister() {
	const { t } = useI18n();

	const registerRef = ref();
	const registerForm = reactive<any>({
		role: 'user',
		username: '',
		email: '',
		password: '',
		password_check: '',
		code: '',
		countyId: '',
		registerCode: '',
	});
	const validatePassword = (value: any, Gender: any) => {
		if (registerForm.password_check !== registerForm.password) return 'password check wrong';
	};
	const registerRules = {
		username: [{ required: true, message: t('login.username_text') }],
		password: [{ required: true, message: t('login.password_text') }],
		password_check: [{ required: true, message: t('login.password_text') }, { validator: validatePassword }],
		email: [
			{ required: true, message: t('login.email_text') },
			{
				pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
				message: t('login.email_right_text'),
			},
		],
	};

	// 邮箱验证码
	const verifyEmail = reactive({
		valid: false,
		sendCode: async () => {
			console.log('[verifyEmail]');
			const pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

			if (pattern.test(registerForm.email)) {
				console.log('[pass]');

				const { success } = await sendEmail(registerForm.email);

				if (success) {
					Message({ type: 'success', text: t('login.already_send') });
				}
				verifyEmail.valid = true;
			} else {
				Message({ type: 'error', text: t('login.email_right_text') });
			}
		},
	});
	// 登录/注册模式
	const mode = ref(true);
	const user = useUserStore();
	const router = useRouter();
	const handleRegister = async () => {
		console.log('[handleRegister]', registerRef.value);
		if (registerRef.value.validateFields()) {
			// 验证邮箱验证码是否有效
			registerForm.username = registerForm.username.toLowerCase();
			const { success: emailCodeValid } = await verifyEmailCode(registerForm.code);
			if (emailCodeValid) {
				// 执行注册操作
				let r_success = false;
				const res = registerForm.role === 'shelter' ? await shelter_register(registerForm) : await user_register(registerForm);
				r_success = res.success;

				if (r_success) {
					Message({ type: 'success', text: t('login.r_success') });
					registerRef.value.resetFields();

					user
						.login(registerForm.username, registerForm.password, registerForm.role)
						.then(() => {
							console.log('[useLogin success]');
							router.push({ path: '/profile', query: { active: 2 } });
						})
						.catch(() => {
							Message({ type: 'error', text: t('login.error') });
						});
				}
			} else {
				Message({ type: 'error', text: t('login.email_code_error') });
			}
		}
	};

	return { registerRef, registerForm, registerRules, handleRegister, verifyEmail, mode };
}
