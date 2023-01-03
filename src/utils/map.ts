import AMapLoader from '@amap/amap-jsapi-loader';

// lnglatX: number, lnglatY: number
export function geocoder(location: string) {
	if (location) {
		const lnglatX = JSON.parse(location)[0];
		const lnglatY = JSON.parse(location)[1];
		AMapLoader.load({
			key: import.meta.env.VITE_APP_MAP_SEARCH, // 申请好的Web端Key，首次调用 load 时必填
			version: '2.0',
		}).then((AMap) => {
			AMap.plugin('AMap.Geocoder', function () {
				var geocoder = new AMap.Geocoder({
					// city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
					// city: cityCode,
				});

				var lnglat = [lnglatX, lnglatY];

				geocoder.getAddress(lnglat, function (status: string, result: any) {
					if (status === 'complete' && result.info === 'OK') {
						// result为对应的地理位置详细信息
						console.log('[map]', result);
					}
				});
			});
		});
	}
	return '暂无位置信息';
}
