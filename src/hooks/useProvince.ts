export function useProvince() {
	interface ICity {
		adcode: string;
		center: string;
		citycode: any;
		districts: Array<ICity>;
		level: string;
		name: string;
	}
	const area = reactive({
		list: [] as Array<ICity>,
		value: [0, 0, 0],
	});

	const areaChildList = computed(() => {
		const parent = area.list[area.value[0]] || { districts: [] };
		return parent.districts;
	});

	const areaGrandList = computed(() => {
		const index1 = area.value[0];
		const index2 = area.value[1];
		if (area.list.length > 0) {
			const parent = area.list[index1].districts[index2] || { districts: [] };
			return parent.districts;
		}
		return [];
	});

	const countyId = computed(() => {
		const index1 = area.value[0];
		const index2 = area.value[1];
		const index3 = area.value[1];

		return Number(area.list[index1].districts[index2].districts[index3].adcode);
	});
	onMounted(() => {
		if (!localStorage.getItem('AREA')) {
			console.log('[不存在数据]');
			initMap();
		} else {
			console.log('[存在数据]');
			area.list = JSON.parse(localStorage.getItem('AREA') || '');
		}
	});

	const key = import.meta.env.VITE_APP_MAP_LOCATION;
	const url = import.meta.env.VITE_APP_BASE_MAP_URL;

	const initMap = async () => {
		fetch(url + `/district?key=${key}&keywords=&subdistrict=3&extensions=base`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			mode: 'cors',
		}).then(async (res) => {
			res = await res.json();
			if (res.status === '1') {
				area.list = response.districts[0];
				localStorage.setItem('AREA', JSON.stringify(response.districts[0].districts));
			}
		});
	};

	return {
		area,
		areaChildList,
		areaGrandList,
		countyId,
		initMap,
	};
}
