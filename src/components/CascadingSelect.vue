<template>
	<div class="flex flex-col">
		<select v-model="selectedProvince" @change="onProvinceChange" class="select select-primary max-w-xs mb-4">
			<option v-for="province in provinces" :key="province.adcode" :value="province.adcode">{{ province.name }}</option>
		</select>
		<select v-model="selectedCity" @change="onCityChange" class="select select-primary max-w-xs mb-4">
			<option v-for="city in cities" :key="city.adcode" :value="city.adcode">{{ city.name }}</option>
		</select>
		<select v-model="selectedCounty" @change="onCountyChange" class="select select-primary max-w-xs mb-4">
			<option v-for="county in counties" :key="county.adcode" :value="county.adcode">{{ county.name }}</option>
		</select>
	</div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
const props = defineProps({
	modelValue: {
		type: Number,
	},
});
interface ICity {
	adcode: string;
	center: string;
	citycode: any;
	districts: Array<ICity>;
	level: string;
	name: string;
}
// 定义省市县数据
const provinces = ref([] as Array<ICity>);
const cities = ref([] as Array<ICity>);
const counties = ref([] as Array<ICity>);

// 定义选中的省市县
const selectedProvince = ref('');
const selectedCity = ref('');
const selectedCounty = ref('');

const changeFlag = ref(true);
// 当省份发生变化时，更新城市和县区的数据
function onProvinceChange() {
	changeFlag.value = false;
	const province = provinces.value.find((p) => p.adcode === selectedProvince.value);
	emit('update:modelValue', Number(province.adcode));
	cities.value = province.districts;
	selectedCity.value = '';
	selectedCounty.value = '';
	counties.value = [];
}

// 当城市发生变化时，更新县
function onCityChange() {
	changeFlag.value = false;
	const city = cities.value.find((c) => c.adcode === selectedCity.value);
	emit('update:modelValue', Number(city.adcode));
	counties.value = city.districts;
	selectedCounty.value = '';
}

// 当县区发生变化时，执行相应的回调函数
function onCountyChange() {
	changeFlag.value = false;
	const county = counties.value.find((c) => c.adcode === selectedCounty.value);
	// 触发组件外部的回调函数
	emit('update:modelValue', Number(county.adcode));
}

const emit = defineEmits(['update:modelValue']);

// 在组件初始化时，设置省市县数据和选中的省市县
watch(
	() => props.modelValue,
	() => {
		console.log('[]', props.modelValue, changeFlag.value);
		if (props.modelValue && changeFlag.value) {
			console.log('[watch]', props.modelValue);
			const select = getParentChain(provinces.value, props.modelValue.toString(), 'adcode', 'districts');
			if (select && select.length > 0) {
				selectedProvince.value = select[0];
				onProvinceChange();

				selectedCity.value = select[1];
				onCityChange();

				selectedCounty.value = select[2];
			}
		}
	},
	{ deep: true }
);

onMounted(async () => {
	changeFlag.value = true;
	if (!localStorage.getItem('AREA')) {
		console.log('[不存在数据]');
		await getAreaList();
	} else {
		console.log('[存在数据]');
		provinces.value = JSON.parse(localStorage.getItem('AREA') || '');
	}
});
const key = import.meta.env.VITE_APP_MAP_LOCATION;
const url = import.meta.env.VITE_APP_BASE_MAP_URL;

function getAreaList() {
	fetch(url + `/district?key=${key}&keywords=&subdistrict=3&extensions=base`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		mode: 'cors',
	}).then(async (res) => {
		res = await res.json();
		if (res.status === '1') {
			provinces.value = res.districts[0];
			localStorage.setItem('AREA', JSON.stringify(res.districts[0].districts));
		}
	});
}

/**
 * 多级联动，根据最后一级的值获取联动数组
 * @param list 多级联动数组
 * @param value 最后一级的值
 * @param value_name
 * @param children_name
 * @returns {Array}
 */
function getArrayByLastValue(list: Array<any>, value: any, value_name = 'value', children_name = 'children') {
	if (list.length > 0) {
		for (const item of list) {
			if (item[children_name] && item[children_name].length > 0) {
				// 存在子孩子则继续递归
				const data: any = getArrayByLastValue(item[children_name], value, value_name, children_name);
				if (data && data.length > 0) {
					return [item[value_name], ...data];
				}
			} else if (item[value_name] === value) {
				// 返回值
				return [value];
			}
		}
	}

	return [];
}

function getParent(array: Array<any>, value: any, prop_name = 'value', children_name = 'children') {
	console.log('[getParent]', array, value);
	for (let i = 0; i < array.length; i++) {
		if (array[i][prop_name] === value) {
			return [array[i][prop_name]];
		}
		if (array[i][children_name]) {
			let result = getParent(array[i][children_name], value, prop_name, children_name);
			if (result) {
				return result;
			}
		}
	}
	return null;
}

function getParentChain(array: Array<any>, value: any, prop_name = 'value', children_name = 'children') {
	// console.log('[getParentChain]', value);

	for (let i = 0; i < array.length; i++) {
		if (array[i][prop_name] === value) {
			return [array[i][prop_name]];
		}
		if (array[i][children_name]) {
			let result = getParentChain(array[i][children_name], value, prop_name, children_name);
			if (result) {
				return [array[i][prop_name], ...result];
			}
		}
	}
	return null;
}

/**
 * 多级联动，根据最后一级的值返回选中的对象
 * @param list
 * @param value
 * @param value_name
 * @param children_name
 */
function getObjectByLastValue(list: Array<any>, value: any, value_name = 'value', children_name = 'children') {
	if (list.length > 0) {
		for (const item of list) {
			if (item[children_name] && item[children_name].length > 0) {
				// 存在子孩子则继续递归
				const data = getObjectByLastValue(item[children_name], value, value_name, children_name);

				if (data && JSON.stringify(data) !== '{}') {
					const object = Object.assign({}, item);
					object[children_name] = data;

					return object;
				}
			} else if (item[value_name] === value) {
				// 返回值
				return item;
			}
		}
	}

	return {};
}
</script>
