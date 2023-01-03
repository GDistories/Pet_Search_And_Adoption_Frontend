import vRequest from '../../index';

import { IDataType } from '../../types';
import { IShelter, IUser, IUserFilter } from '~/service/modules/user/types';

export function user_login(username: string, password: string) {
	return vRequest.post<IDataType>({
		url: '/userLogin',
		data: {
			username: username,
			password: password,
		},
	});
}

export function sendEmail(email: string) {
	return vRequest.post<IDataType>({
		url: '/sendMail',
		data: {
			emailAddress: email,
			usage: 'Registering an account',
		},
	});
}
export function verifyEmailCode(code: string) {
	return vRequest.post<IDataType>({
		url: '/emailCaptcha',
		data: {
			code: code,
		},
	});
}
export function getUserList(curPageNum: number, pageSize: number, form?: IUserFilter) {
	return vRequest.post<IDataType>({
		url: '/userListFilter',
		data: {
			curPageNum: curPageNum,
			pageSize: pageSize,
			filter: form,
		},
	});
}

export function user_register(user: IUser) {
	return vRequest.post<IDataType>({
		url: '/userRegister',
		data: user,
	});
}

export function user_update(user: IUser) {
	return vRequest.post<IDataType>({
		url: '/userUpdate',
		data: user,
	});
}

export function user_updatePassword(username: string, password: string) {
	return vRequest.post<IDataType>({
		url: '/userUpdate',
		data: {
			username: username,
			password: password,
		},
	});
}

export function user_delete(username: string) {
	return vRequest.post<IDataType>({
		url: '/userDelete',
		data: {
			username: username,
		},
	});
}
export function getShelterList(curPageNum: number, pageSize: number, countyId?: number) {
	return vRequest.post<IDataType>({
		url: '/shelterListFilter',
		data: {
			curPageNum: curPageNum,
			pageSize: pageSize,
			filter: {
				countyId: countyId,
			},
		},
	});
}

export function shelter_login(username: string, password: string) {
	return vRequest.post<IDataType>({
		url: '/shelterLogin',
		data: {
			username: username,
			password: password,
		},
	});
}

export function shelter_register(shelter: IShelter) {
	return vRequest.post<IDataType>({
		url: '/shelterRegister',
		data: shelter,
	});
}
export function shelter_update(user: IUser) {
	return vRequest.post<IDataType>({
		url: '/shelterUpdate',
		data: user,
	});
}
export function shelter_delete(username: string) {
	return vRequest.post<IDataType>({
		url: '/shelterDelete',
		data: {
			username: username,
		},
	});
}

export function shelter_updatePassword(username: string, password: string) {
	return vRequest.post<IDataType>({
		url: '/userUpdate',
		data: {
			username: username,
			password: password,
		},
	});
}

export function admin_login(username: string, password: string) {
	return vRequest.post<IDataType>({
		url: '/adminLogin',
		data: {
			username: username,
			password: password,
		},
	});
}
export function resetPass(username: string, newPassword: string, verifyCode: string) {
	return vRequest.post<IDataType>({
		url: '/userResetPassword',
		data: {
			username: username,
			newPassword: newPassword,
			verifyCode: verifyCode,
		},
	});
}
