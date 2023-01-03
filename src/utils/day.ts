import dayjs from 'dayjs';

export function getDate(value: number) {
	if (!value) return null;

	return dayjs.unix(value).format('YYYY-MM-DD');
}

export function getUnix(date: string | Date) {
	return Number(dayjs(date).unix());
}
