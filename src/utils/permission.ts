import { storeToRefs } from 'pinia';
import Message from '~/utils/dom/message';
export function checkPermission() {
	const userStore = useUserStore();
	const { token } = storeToRefs(userStore);

	function isLogin() {
		console.log('[isLogin]', token.value);
		return new Promise<void>(async (resolve, reject) => {
			if (!token.value) {
				console.log('[不存在token]');
				Message({ type: 'warning', text: 'Please log in first! The page will jump to login page after 3s' });

				setTimeout("window.location.href = '/login'", 3000);
				reject();
			}
			resolve();
		});
	}

	return {
		isLogin,
	};
}
