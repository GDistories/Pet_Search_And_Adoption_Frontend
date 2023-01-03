import { useUserStore } from '~/store/user';
import { storeToRefs } from 'pinia';
import { IUser } from '~/service/modules/user/types';
import { shelter_update, user_update } from '~/service/modules/user';
import Message from '~/utils/dom/message';
import { getDate, getUnix } from '~/utils/day';

export default function useProfile() {
	const userStore = useUserStore();
	const { profilePhoto, user, username, isShelter } = storeToRefs(userStore);

	const { t } = useI18n();
	const profileRef = ref();
	const changeProfile = reactive({
		form: {
			username: '',
			password: '',
			email: '',
			phone: '',
			identity: undefined,
			birth: '',
			dob: '',
			gender: '',
			firstName: '',
			lastName: '',
			address: '',
			shelterName: '',
			location: '',
		} as IUser,
		submit: async () => {
			console.log('[profile]submit');
			if (profileRef.value.validateFields()) {
				console.log('[profile]pass');
				// @ts-ignore
        changeProfile.form.dob = getUnix(changeProfile.form.birth);
				const { success } = isShelter.value ? await shelter_update(changeProfile.form) : await user_update(changeProfile.form);
				if (success) {
					console.log('[更新成功]');
					Message({ type: 'success', text: t('res.success') });
					userStore.setUserInfo(changeProfile.form);
					// console.log('[submit]', changeProfile.form);
					profileRef.value.resetFields();
				}
			} else {
				console.log('[profile]fail');
			}
		},
	});
	const location_text = ref('');
	const handleLocation = (val: string, location: any) => {
		console.log('[handleLocation]', location);
		location_text.value = location.address + location.name;
		changeProfile.form.address = location.address + location.name;
		// @ts-ignore
    changeProfile.form.location = val;
	};

	const updateAvatar = async (val: string) => {
		const form = {
			username: username.value,
			profilePhoto: val,
		};
		const { success } = isShelter.value ? await shelter_update(form) : await user_update(form);
		if (success) {
			userStore.setProfilePhoto(val);
		}
	};
	onMounted(() => {
		changeProfile.form = user.value;
		// @ts-ignore
    changeProfile.form.birth = getDate(user.value.dob);
		console.log('[]', changeProfile.form);
	});

	return {
		userStore,
		profilePhoto,
		user,
		username,
		changeProfile,
		profileRef,
		handleLocation,
		location_text,
		updateAvatar,
	};
}
