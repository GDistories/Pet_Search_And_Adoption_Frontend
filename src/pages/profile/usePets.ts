import { getMyFinds, getMySearchs } from '~/service/modules/pet';
import { useUserStore } from '~/store/user';
import { storeToRefs } from 'pinia';

export function usePets() {
	const drawer = ref(false);
	const mode = ref('');
	const userStore = useUserStore();
	const { username } = storeToRefs(userStore);
	const table = reactive({
		find: [],
		search: [],
	});

	const open = (type: string) => {
		mode.value = type;
		console.log('[open]', mode.value);
		drawer.value = true;
	};

	onMounted(() => {
		getMyFindTable();
		getMySearchTable();
	});
	const getMyFindTable = async () => {
		const { success, content } = await getMyFinds(username.value, 1, 1000);
		if (success) {
			table.find = content.petList;
		}
	};
	const getMySearchTable = async () => {
		const { success, content } = await getMySearchs(username.value, 1, 1000);
		if (success) {
			table.search = content.petList;
		}
	};
	return {
		drawer,
		table,
		open,
		mode,
		getMyFindTable,
		getMySearchTable,
	};
}
