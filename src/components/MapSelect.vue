<template>
	<Icon icon="carbon:map" class="text-2xl cursor-pointer" @click="open" />
	<el-drawer v-model="drawer" :title="props.title" direction="ttb" size="80%" :destroy-on-close="true">
		<div class="map-wrapper">
			<div id="container"></div>
			<div class="search-box">
				<el-autocomplete
					v-model="keyword"
					:fetch-suggestions="handleSearch"
					:trigger-on-focus="false"
					clearable
					placeholder="输入城市+关键字搜索"
					@select="handleSelect"
					style="width: 300px"
				/>
				<!--<el-button @click="confirm">确定该地点</el-button>-->
			</div>
		</div>
		<template #footer>
			<div style="flex: auto">
				<el-button type="primary" @click="confirm">confirm</el-button>
			</div>
		</template>
	</el-drawer>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import AMapLoader from '@amap/amap-jsapi-loader';

const props = defineProps({
	modelValue: {
		type: Object,
		default() {
			return {};
		},
	},
	location: {
		type: String,
	},
});

window._AMapSecurityConfig = {
	securityJsCode: import.meta.env.VITE_APP_MAP_SEARCH_KEY,
};

const drawer = ref(false);

const close = () => {
	drawer.value = false;
};
const open = () => {
	drawer.value = true;
	initMap();
};

const emit = defineEmits(['getLocation', 'update:modelValue']);
const map = shallowRef(null);

// 地点
const location = computed({
	get() {
		return props.modelValue;
	},
	set(val) {
		emit('update:modelValue', val);
	},
});

// const location = ref(null);
watch(location, (val) => {
	if (val.longitude && val.latitude) {
		drawMarker();
	}
});
const keyword = ref('');
let placeSearch, AMapObj, marker, geocoder;
function initMap() {
	AMapLoader.load({
		key: import.meta.env.VITE_APP_MAP_SEARCH,
		version: '2.0',
		viewMode: '2D', //是否为3D地图模式
	}).then((AMap) => {
		AMapObj = AMap;
		map.value = new AMap.Map('container');
		// 添加点击事件
		map.value.on('click', onMapClick);
		if (location.value.longitude) {
			drawMarker();
		}
		AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.Geolocation', 'AMap.PlaceSearch', 'AMap.Geocoder'], () => {
			// 缩放条
			const toolbar = new AMap.ToolBar();
			// 比例尺
			const scale = new AMap.Scale();
			// 定位
			const geolocation = new AMap.Geolocation({
				enableHighAccuracy: true, //是否使用高精度定位，默认:true
				timeout: 10000, //超过10秒后停止定位，默认：5s
				position: 'RT', //定位按钮的停靠位置
				buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
				zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
			});
			geocoder = new AMap.Geocoder({
				city: '全国',
			});
			map.value.addControl(geolocation);
			map.value.addControl(toolbar);
			map.value.addControl(scale);
			placeSearch = new AMap.PlaceSearch({
				map: map.value,
				city: '',
				pageSize: 30, // 单页显示结果条数
				pageIndex: 1, // 页码
				citylimit: false, // 是否强制限制在设置的城市内搜索
				autoFitView: true,
			});
		});
	});
}

// 搜索地图
function handleSearch(queryString, cb) {
	// console.log('[handleSearch]', queryString);
	placeSearch.search(queryString, (status, result) => {
		// console.log('[placeSearch]', status, result);
		if (result && typeof result === 'object' && result.poiList) {
			const list = result.poiList.pois;
			list.forEach((item) => {
				item.value = item.name;
				item.label = item.name;
			});
			cb(list);
		} else {
			cb([]);
		}
	});
}
// 点击地图
function onMapClick(e) {
	const { lng, lat } = e.lnglat;
	// 逆地理编码
	geocoder.getAddress([lng, lat], (status, result) => {
		if (status === 'complete' && result.info === 'OK') {
			const { addressComponent, formattedAddress } = result.regeocode;
			let { city, province, district } = addressComponent;
			if (!city) {
				// 直辖市
				city = province;
			}
			location.value = {
				longitude: lng,
				latitude: lat,
				address: formattedAddress,
				zone: [province, city, district],
			};
		}
	});
}
const pos = ref([]);
const position = reactive({});
// 点击搜索项
function handleSelect(item) {
	console.log('[handleSelect]', item);
	const { lng, lat } = item.location;
	position.value = item;
	location.value = {
		longitude: lng,
		latitude: lat,
	};
	pos.value = [lng, lat];
	map.value.setZoomAndCenter(16, [lng, lat]);
}
// 绘制地点marker
function drawMarker(val) {
	const { longitude, latitude } = location.value || val;
	if (marker) {
		marker.setMap(null);
	}
	marker = new AMapObj.Marker({
		position: new AMapObj.LngLat(longitude, latitude),
		anchor: 'bottom-center',
	});
	map.value.add(marker);
	map.value.setZoomAndCenter(16, [longitude, latitude]);
}
const router = useRouter();
const route = useRoute();
function confirm() {
	emit('getLocation', JSON.stringify(pos.value), position.value);
	drawer.value = false;
}
</script>

<style lang="less" scoped>
.map-wrapper {
	position: relative;
	width: 100%;
	height: 100%;
	#container {
		width: 100%;
		height: 100%;
	}
	.search-box {
		position: absolute;
		top: 10px;
		left: 10px;
		z-index: 1;
		display: flex;
		align-items: center;
	}
}
</style>
