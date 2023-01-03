interface IRule {
	len: number;
	max: number;
	min: number;
	message: string;
	pattern: string;
	type: string;
	required: boolean;
	validator: any;
}

export const validator = (value: any, rules: Array<IRule>) => {
	const result = []; // 保存校验信息
	rules.forEach((rule: IRule) => {
		let msg = '';
		const {
			len = 0, // 字段长度
			max = 0, // 最大长度
			min = 0, // 最小长度
			message = '', // 校验文案
			pattern = '', // 正则表达式校验
			type = 'string', // 类型
			required = false, // 是否必填
			validator, // 自定义函数
		}: IRule = rule;
		if (required && (value ?? '') === '') {
			msg = message || '请输入';
		}
		// typeValidator: 校验类型
		if (type === 'string' && typeValidator(value) && value) {
			const length = String(value).length || 0;
			// lengthValidator: 校验长度
			msg = lengthValidator(length, min, max, len, message);
		}
		if (pattern) {
			const isReg = typeValidator(pattern, 'RegExp');
			if (!isReg) {
				msg = '正则校验规则不正确';
			}
			if (!pattern.test(value)) {
				msg = message || '请输入正确的值';
			}
		}
		if (validator && typeof validator === 'function') {
			msg = validator(value, rules);
		}
		if (msg) {
			result.push(msg);
		}
	});
	return result;
};
// typeValidator: 类型校验函数，比较粗糙~~~
const baseTypes = ['string', 'number', 'boolean'];
const typeValidator = (value, type = 'string') => {
	if (baseTypes.includes(type)) {
		const valueType = typeof value;
		return baseTypes.includes(valueType);
	} else if (type === 'array') {
		return Array.isArray(value);
	} else if (type === 'email') {
		const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
		return reg.test(value);
	} else if (type === 'RegExp') {
		return value instanceof RegExp;
	}
};
// lengthValidator: 长度校验函数
const lengthValidator = (length: number, min: number, max: number, len: number, message: string) => {
	if (len && len !== length) {
		return message || `请输入${len}个字符`;
	}
	if (min && length < min) {
		return message || `至少输入${min}个字符`;
	}
	if (max && length > max) {
		return message || `最多输入${max}个字符`;
	}
	if (min && max && (length < min || length > max)) {
		return message || `请输入${min} ~ ${max}个字符`;
	}
	return '';
};
