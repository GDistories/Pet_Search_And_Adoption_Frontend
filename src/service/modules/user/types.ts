export interface IUser {
	userid?: number;
	username?: string;
	email?: string;
	phone?: string;
	identity?: number | string;
	dob?: string;
	gender?: string;
	firstname?: string;
	lastname?: string;
	address?: string;
	description?: string;
	photo?: string;
	password?: string;
	profilePhoto?: string;
}

export interface IShelter {
	role?: string;
	username: string;
	password: string;
	shelterName?: string;
	address?: string;
	phone?: string;
	email: string;
	profilePhoto?: string;
	location: string;
	countyId: number | string;
}

export interface IUserFilter {
	gender: string;
	startDob: string | number;
	endDob: string | number;
}
