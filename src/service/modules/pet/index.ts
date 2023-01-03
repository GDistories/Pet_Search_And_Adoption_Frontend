import vRequest from '../../index';

import { IDataType } from '../../types';
import { IPet, IFilter, IFoundForm, ISearchForm } from '~/service/modules/pet/types';

export function createPet(pet: IPet) {
	return vRequest.post<IDataType>({
		url: '/insertPet',
		data: pet,
	});
}
export function getPets(curPageNum: number, pageSize: number, form: IFilter) {
	return vRequest.post<IDataType>({
		url: '/getPetListByFilter',
		data: {
			curPageNum: curPageNum,
			pageSize: pageSize,
			filter: form,
		},
	});
}
export function getPetById(id: number) {
	return vRequest.post<IDataType>({
		url: '/getPet',
		data: {
			petId: id,
		},
	});
}
export function updatePet(pet: IPet) {
	return vRequest.post<IDataType>({
		url: '/updatePet',
		data: pet,
	});
}

export function deletePet(id: number) {
	return vRequest.post<IDataType>({
		url: '/deletePet',
		data: {
			petId: id,
		},
	});
}

export function createPetSearch(form: ISearchForm) {
	return vRequest.post<IDataType>({
		url: '/addPetSearch',
		data: form,
	});
}

export function updatePetSearch(search: any) {
	return vRequest.post<IDataType>({
		url: '/updatePetSearch',
		data: search,
	});
}
export function getPetSearchById(id: number) {
	return vRequest.post<IDataType>({
		url: '/getPetSearchByPetSearchId',
		data: {
			petSearchId: id,
		},
	});
}
export function deletePetSearch(id: number) {
	return vRequest.post<IDataType>({
		url: '/deletePetSearch',
		data: {
			petSearchId: id,
		},
	});
}

export function getSearchPets(curPageNum: number, pageSize: number, form: IFilter) {
	return vRequest.post<IDataType>({
		url: '/getSearchPetListByFilter',
		data: {
			curPageNum: curPageNum,
			pageSize: pageSize,
			petSearchFilter: form,
		},
	});
}
export function getMySearchs(username: string, curPageNum: number, pageSize: number) {
	return vRequest.post<IDataType>({
		url: '/getPetSearchListByUsername',
		data: { username: username, curPageNum: curPageNum, pageSize: pageSize },
	});
}

export function createPetFound(form: IFoundForm) {
	return vRequest.post<IDataType>({
		url: '/addPetFound',
		data: form,
	});
}
export function updatePetFound(form: IFoundForm) {
	return vRequest.post<IDataType>({
		url: '/updatePetFound',
		data: form,
	});
}
export function deletePetFound(petFoundId: number) {
	return vRequest.post<IDataType>({
		url: '/deletePetFound',
		data: {
			petFoundId: petFoundId,
		},
	});
}
export function getPetFoundById(id: number) {
	return vRequest.post<IDataType>({
		url: '/getPetFoundByPetFoundId',
		data: {
			petFoundId: id,
		},
	});
}
export function getFindPets(curPageNum: number, pageSize: number, form: IFilter) {
	return vRequest.post<IDataType>({
		url: '/getFoundPetListByFilter',
		data: {
			curPageNum: curPageNum,
			pageSize: pageSize,
			petFoundFilter: form,
		},
	});
}
export function getMyFinds(username: string, curPageNum: number, pageSize: number) {
	return vRequest.post<IDataType>({
		url: '/getFoundPetListByUsername',
		data: { username: username, curPageNum: curPageNum, pageSize: pageSize },
	});
}

export function getWebData() {
	return vRequest.get<IDataType>({
		url: '/getWebsiteStatistics',
	});
}
