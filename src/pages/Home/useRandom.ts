import { getAdoptionByShelterId, getShelter } from '~/service/modules/shelter';
import { IPet } from '~/service/modules/pet/types';

export function useRandom() {
	const list = reactive({
		loading: false,
		data: [] as Array<IPet>,
	});

	onMounted(async () => {
		refresh();
	});

	const initData = async () => {
		list.loading = true;
		const { success, content } = await getShelter(1, 20, '');
		if (success) {
			const randomIndex = Math.round(Math.random() * content.list.length);
			const shelterId = content.list[randomIndex].shelterId;
			await getList(shelterId);
		}
	};

	const getList = async (shelterId: number) => {
		const { content } = await getAdoptionByShelterId(1, 3, shelterId);
		if (content.length <= 0) {
			initData();
		} else {
			list.data = content.list.length > 3 ? content.list.slice(0, 4) : content.list;
			list.loading = false;
		}
	};

	const refresh = () => {
		initData();
	};
	return {
		list,
		refresh,
	};
}
