<template>
	<Icon icon="carbon:map" class="text-2xl cursor-pointer" @click="open" />
	<el-drawer v-model="drawer" :title="props.title" direction="ttb" size="80%" :destroy-on-close="true">
		<div id="container"></div>
		<template #footer>
			<div style="flex: auto">
				<el-button type="primary" @click="close">close</el-button>
			</div>
		</template>
	</el-drawer>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import AMapLoader from '@amap/amap-jsapi-loader';

const props = defineProps({
	title: {
		type: String,
	},
	location: {
		type: String,
	},
});

const drawer = ref(false);

const close = () => {
	drawer.value = false;
};
window._AMapSecurityConfig = {
	securityJsCode: import.meta.env.VITE_APP_MAP_SEARCH_KEY,
};

const open = () => {
	drawer.value = true;
	initMap();
};

const map = shallowRef(null);
let AMapObj;
function initMap() {
	AMapLoader.load({
		key: import.meta.env.VITE_APP_MAP_SEARCH, // 申请好的Web端Key，首次调用 load 时必填
		version: '2.0',
		viewMode: '2D', //是否为3D地图模式
		zoom: 20, //初始化地图级别
		center: [105.602725, 37.076636], //初始化地图中心点位置
	}).then((AMap) => {
		AMapObj = AMap;
		map.value = new AMap.Map('container');
		AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
			// 缩放条
			const toolbar = new AMap.ToolBar();
			// 比例尺
			const scale = new AMap.Scale();

			map.value.addControl(toolbar);
			map.value.addControl(scale);
		});

		var marker = new AMap.Marker({
			position: JSON.parse(props.location.replace(/'/g, '"')) ?? [105.602725, 37.076636],
			icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
			anchor: 'bottom-center',
			offset: new AMap.Pixel(0, 0),
		});

		map.value.add(marker);
		map.value.setFitView([marker]);

		marker.setMap(map);

		// 设置鼠标划过点标记显示的文字提示
		marker.setTitle(props.title);

		// 设置label标签
		// label默认蓝框白底左上角显示，样式className为：amap-marker-label
		marker.setLabel({
			direction: 'right',
			offset: new AMap.Pixel(10, 0), //设置文本标注偏移量
			content: "<div class='info'>" + props.title + '</div>', //设置文本标注内容
		});
	});
}
</script>

<style lang="less" scoped>
#container {
	width: 100%;
	height: 90%;
}
</style>
