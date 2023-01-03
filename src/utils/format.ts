export function getFileList(val: string) {
	if (val) {
		return JSON.parse(decodeURI(val).replace(/'/g, '"'));
	}
	return [];
}

export function getFileHttp(val: String) {
	if (!val) return null;
	return import.meta.env.VITE_APP_BASE_IMG + val;
}

export function getFirstFileHttp(val: string) {
	if ((val ?? '') === '' || val === '[]') return undefined;
	return getFileHttp(getFileList(val)[0]);
}
export function getFileType(fileName: string) {
	// 后缀获取
	let suffix: string = '';
	// 获取类型结果
	let result: any;
	try {
		const fileArr = fileName.split('.');
		suffix = fileArr[fileArr.length - 1];
	} catch (err) {
		suffix = '';
	}
	// fileName无后缀返回 false
	if (!suffix) {
		return false;
	}
	suffix = suffix.toLocaleLowerCase();
	// 图片格式
	const imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
	// 进行图片匹配
	result = imglist.find((item) => item === suffix);
	if (result) {
		return 'image';
	}
	// 匹配 视频
	const videolist = ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v'];
	result = videolist.find((item) => item === suffix);
	if (result) {
		return 'video';
	}
	// 匹配 音频
	const radiolist = ['mp3', 'wav', 'wmv'];
	result = radiolist.find((item) => item === suffix);
	if (result) {
		return 'radio';
	}
	// 其他 文件类型
	return 'other';
}
