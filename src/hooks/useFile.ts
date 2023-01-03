import { uploadFile } from '~/service/modules/file';
import { UploadProps } from 'element-plus';
import Message from '~/utils/dom/message';
import localCache from '~/utils/cache';

export default function useFile() {
	const handleUpload = () => {
		const upload = document.createElement('input');
		//设置type为file
		upload.type = 'file';
		//类型
		upload.accept = 'image/png, image/jpeg';
		//添加onchange事件
		upload.onchange = setFile;
		//模拟点击
		upload.click();
	};

	const imgUrl = ref('No Image Upload');
	const setFile = async (e: any) => {
		//获取文件
		const file = e.path[0].files[0];
		console.log('[file]', e);
		//将其放入formdata中方便上传
		const formData = new FormData();
		formData.append('file', file);
		console.log('[setFile]', formData);
		const { success, content } = await uploadFile(formData);
		if (success) {
			// const ImgUrl = content;

			// console.log('[setFile]', ImgUrl);
			// //构建Image对象方便获取其宽高
			// const img = new Image();
			// img.src = ImgUrl;
			imgUrl.value = content;
		}
	};
	const upload = import.meta.env.VITE_APP_BASE_UPLOAD;

	const headers = {
		ContentType: 'multipart/form-data', // 设置Content-Type类型为multipart/form-data
		token: localCache.getCache('token'),
	};
	const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
		if (rawFile.type !== 'image/jpeg') {
			Message({ type: 'error', text: 'Avatar picture must be JPG format!' });
			return false;
		} else if (rawFile.size / 1024 / 1024 > 2) {
			Message({ type: 'error', text: 'Avatar picture size can not exceed 2MB!' });
			return false;
		}
		return true;
	};
	return {
		imgUrl,
		handleUpload,
		setFile,

		upload,
		headers,
		beforeAvatarUpload,
	};
}
