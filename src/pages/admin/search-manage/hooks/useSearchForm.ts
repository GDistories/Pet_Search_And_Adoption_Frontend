import { FormInstance } from 'element-plus';
import { ISearch, ISearchForm } from '~/service/modules/pet/types';
import { updatePetSearch } from '~/service/modules/pet';
import Message from '~/utils/dom/message';
import { nextTick } from 'vue';

export function useSearchForm() {
	const ruleFormRef = ref<FormInstance>();
	const { t } = useI18n();
	const formHandler = reactive({
		show: false,
		form: {
			petSearchId: 0,
			petId: 0,
			username: '',
			countyId: '',
			createTime: 0,
		} as ISearchForm,
		cancel: () => {
			ruleFormRef.value?.resetFields();
			formHandler.show = false;
		},
		edit: (search: ISearch) => {
			formHandler.show = true;

			nextTick(() => {
				formHandler.form.petSearchId = search.petSearchId;
				formHandler.form.petId = search.pet.petId ?? 0;
				formHandler.form.username = search.user.username ?? '';
				formHandler.form.countyId = Number(search.countyId);
				formHandler.form.createTime = search.createTime;
			});
		},
		submitForm: async (formEl: FormInstance | undefined, fun: Function) => {
			if (!formEl) return;
			await formEl.validate(async (valid, fields) => {
				if (valid) {
					console.log('submit!');
					formHandler.form.countyId = Number(formHandler.form.countyId);
					const { success } = await updatePetSearch(formHandler.form);
					if (success) {
						Message({ type: 'success', text: t('res.success') });
						fun();
						formHandler.cancel();
					} else {
						console.log('[error]');
						Message({ type: 'error', text: t('res.error') });
					}
				} else {
					console.log('error submit!', fields);
				}
			});
		},
	});
	const rules = {
		countyId: [
			{
				required: true,
				message: 'Please select county',
				trigger: 'change',
			},
		],
	};

	return { ruleFormRef, formHandler, rules };
}
