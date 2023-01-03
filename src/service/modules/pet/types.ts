import { IUser } from '~/service/modules/user/types';

export interface IPet {
	petId?: number;
	nickname: string;
	sex: string;
	age?: number;
	breed: string;
	size: string;
	color: string;
	picture: string;
	feature: string;
	petIdNum: string;
	weight?: number;
	identity?: number;
	isFound?: number;
	countyId?: number | string;
	status?: number;
	shelterId?: number;
}

export interface IFilter {
	sex?: string;
	breed?: string;
	size?: string;
	color?: string;
	countyId?: number | string;
	startAge?: number;
	endAge?: number;
	startWeight?: number;
	endWeight?: number;
	startCreateTime?: number;
	endCreateTime?: number;
}

export interface ISearch {
	petSearchId: number;
	pet: IPet;
	user: IUser;
	countyId: number | string;
	createTime: number;
}

export interface ISearchForm {
	petSearchId?: number;
	petId: number;
	username: string;
	countyId: number | string;
	createTime: number;
}

export interface IFound {
	petFoundId: number;
	pet: IPet;
	user: IUser;
	countyId: number | string;
	createTime: number;
	status: number;
	shelterId?: number;
}
export interface IFoundForm {
	petFoundId?: number;
	petId: number;
	username: string;
	countyId: number | string;
	createTime: number;
	status: number;
	shelterId?: number;
	shelter_countyId?: number;
}

export interface IAdoption {
	shelterPetsId: number;
	shelterId: number;
	pet: IPet;
	status: number;
	createTime: number;
}

export interface IAdoptionForm {
	shelterPetsId: number;
	shelterId: number;
	petId: number;
	status: number;
	createTime: number;
}
