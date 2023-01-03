import { defineStore } from 'pinia';

export const useSettingStore = defineStore('setting', {
	persist: true,
	state: () => ({
		device: 'desktop',
	}),
	actions: {
		toggleDevice(device: string) {
			this.device = device;
		},
	},
});
