import vRequest from '../../index';

import { IDataType } from '../../types';
import { IAdoptionForm } from '~/service/modules/pet/types';

export function getShelter(curPageNum: number, pageSize: number, countyId: number | string) {
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

export function getShelterByName(curPageNum: number, pageSize: number, search: string) {
	return vRequest.post<IDataType>({
		url: '/shelterSearch',
		data: {
			curPageNum: curPageNum,
			pageSize: pageSize,
			search: search,
		},
	});
}
export function getFoundByShelterId(curPageNum: number, pageSize: number, shelterId: number) {
	return vRequest.post<IDataType>({
		url: '/getFoundPetListByShelterId',
		data: {
			curPageNum: curPageNum,
			pageSize: pageSize,
			shelterId: shelterId,
		},
	});
}

export function getAdoptionByShelterId(curPageNum: number, pageSize: number, shelterId: number | string) {
	return vRequest.post<IDataType>({
		url: '/getShelterAdoptionPetList',
		data: {
			curPageNum: curPageNum,
			pageSize: pageSize,
			shelterId: shelterId,
		},
	});
}
export function addAdoption(form: IAdoptionForm) {
	return vRequest.post<IDataType>({
		url: '/addShelterPet',
		data: form,
	});
}

// export function updateAdoption(form: IAdoptionForm) {
// 	return vRequest.post<IDataType>({
// 		url: '/changeShelterAdoptionPetStatus',
// 		data: form,
// 	});
// }
export function deleteAdoption(shelterPetsId: number) {
	return vRequest.post<IDataType>({
		url: '/deleteShelterPet',
		data: {
			shelterPetsId: shelterPetsId,
		},
	});
}
export function updateStatus(shelterPetsId: number, status: number, username: string) {
	return vRequest.post<IDataType>({
		url: '/changeShelterAdoptionPetStatus',
		data: {
			shelterPetsId: shelterPetsId,
			status: status,
			username: username,
		},
	});
}
