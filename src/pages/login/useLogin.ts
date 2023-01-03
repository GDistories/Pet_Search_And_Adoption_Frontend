import Message from '~/utils/dom/message';

export default function useLogin() {
	const user = useUserStore();

	const { t } = useI18n();
	const loginForm = reactive({
		role: 'user',
		username: '',
		password: '',
	});
	const loginRules = {
		role: [{ required: true, message: t('login.role_text') }],
		username: [{ required: true, message: t('login.username_text') }],
		password: [{ required: true, message: t('login.password_text') }],
	};

	const loginRef = ref();
	const router = useRouter();

	const handleLogin = async () => {
		if (loginRef.value.validateFields()) {
			console.log('[pass]');
			user
				.login(loginForm.username.toLowerCase(), loginForm.password, loginForm.role)
				.then(() => {
					console.log('[useLogin success]');
					router.push('/home');
				})
				.catch(() => {
					Message({ type: 'error', text: t('login.error') });
				});
		} else {
			console.log('[fail]');
		}
	};

	return { loginRef, loginForm, loginRules, handleLogin };
}
