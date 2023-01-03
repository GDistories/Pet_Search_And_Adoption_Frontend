interface SettingConfig {
	breed: Array<IOption>;
	sex: Array<IOption>;
	size: Array<IOption>;
	color: Array<IOption>;
}
interface IOption {
	label: string;
	value: string;
}

const settingConfig: SettingConfig = {
	breed: [
		{
			label: 'dog',
			value: 'dog',
		},
		{
			label: 'cat',
			value: 'cat',
		},
		{
			label: 'pig',
			value: 'pig',
		},
		{
			label: 'fox',
			value: 'fox',
		},
		{
			label: 'turtle',
			value: 'turtle',
		},
		{
			label: 'rabbit',
			value: 'rabbit',
		},
		{
			label: 'parrot',
			value: 'parrot',
		},
		{
			label: 'dove',
			value: 'dove',
		},
		{
			label: 'other',
			value: 'other',
		},
	],
	sex: [
		{
			label: 'male',
			value: 'M',
		},
		{
			label: 'female',
			value: 'F',
		},
		{
			label: 'unknown',
			value: 'U',
		},
	],
	size: [
		{
			label: 'large',
			value: 'L',
		},
		{
			label: 'medium',
			value: 'M',
		},
		{
			label: 'small',
			value: 'S',
		},
	],
	color: [
		{
			label: 'black',
			value: 'black',
		},
		{
			label: 'white',
			value: 'white',
		},
		{
			label: 'gray',
			value: 'gray',
		},
		{
			label: 'red',
			value: 'red',
		},
		{
			label: 'orange',
			value: 'orange',
		},
		{
			label: 'yellow',
			value: 'yellow',
		},
		{
			label: 'green',
			value: 'green',
		},
		{
			label: 'blue',
			value: 'blue',
		},
		{
			label: 'purple',
			value: 'purple',
		},
		{
			label: 'pink',
			value: 'pink',
		},
		{
			label: 'brown',
			value: 'brown',
		},
		{
			label: 'gold',
			value: 'gold',
		},
		{
			label: 'mauve',
			value: 'mauve',
		},
		{
			label: 'other',
			value: 'other',
		},
	],
};

export default settingConfig;
