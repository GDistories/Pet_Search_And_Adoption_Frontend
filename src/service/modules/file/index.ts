import axios from 'axios';
export function uploadFile(file: FormData) {
	return axios
		.post(import.meta.env.VITE_APP_BASE_UPLOAD, {
			data: file,
		})
		.then((res) => {
      return res.data;
    })
		.catch((err) => console.log(err));
}
