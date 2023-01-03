import { defineStore } from 'pinia';
import { IUser } from '~/service/modules/user/types';
import { user_login, shelter_login, admin_login } from '~/service/modules/user';
import localCache from '~/utils/cache';

export const useUserStore = defineStore('user', {
	persist: {
		storage: sessionStorage,
	},
	state: () => ({
		isLogin: ref(false),
		isShelter: ref(false),
		isAdmin: ref(false),
		token: ref(''),
		username: ref(''),
		profilePhoto: ref(''),
		user: reactive({}),
	}),
	actions: {
		_setIsLogin(isLogin: boolean) {
			this.isLogin = isLogin;
		},
		_setIsShelter(isShelter: boolean) {
			this.isShelter = isShelter;
		},
		_setToken(token: string) {
			this.token = token;
		},
		_setIsAdmin(isAdmin: boolean) {
			this.isAdmin = isAdmin;
		},
		_setUsername(username: string) {
			this.username = username;
		},
		_setProfilePhoto(profilePhoto: string) {
			this.profilePhoto = profilePhoto;
		},
		_setUser(user: IUser) {
			this.user = user;
		},
		setUserInfo(user: IUser) {
			this._setUser(user);
		},
		setProfilePhoto(profilePhoto: string) {
			this._setProfilePhoto(profilePhoto);
		},
		async login(username: string, password: string, role: string) {
			return new Promise<void>(async (resolve, reject) => {
				console.log('[user]', role);
				let success = false;
				let token = '';
				switch (role) {
					case 'user': {
						await user_login(username, password)
							.then((res) => {
								success = res.success;
								token = res.message;

								this._setUser(res.content);
								this._setProfilePhoto(res.content.profilePhoto);
							})
							.catch((error) => {
								reject(error);
							});
						break;
					}
					case 'shelter': {
						await shelter_login(username, password)
							.then((res) => {
								success = res.success;
								token = res.message;

								this._setUser(res.content);
							})
							.catch((error) => {
								reject(error);
							});
						break;
					}
					case 'admin':
						await admin_login(username, password)
							.then((res) => {
								success = res.success;
								// result = res.content;
								token = res.message;
							})
							.catch((error) => {
								reject(error);
							});
						break;
				}
				if (success) {
					this._setIsLogin(true);
					this._setUsername(username);

					this._setToken(token);
					localCache.setCache('token', token);

					this._setIsAdmin(role === 'admin');
					this._setIsShelter(role === 'shelter');
					resolve();
				}
			});
		},
		async logout() {
			this._setIsLogin(false);
			this._setIsShelter(false);
			this._setIsAdmin(false);
			this._setToken('');
			this._setProfilePhoto('');
			localCache.clearCache();

			window.location.href = '/login';
		},
	},
});
