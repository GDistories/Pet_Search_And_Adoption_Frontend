<template>
	<div class="container mx-auto px-4 md:px-12 pt-6">
		<div class="register__PawHubContainer_form">
			<h1 class="text-5xl font-bold font-amatic mb-4">{{ t('login.reset_password') }}</h1>
			<div v-if="!verifyEmail.valid" class="register__form">
				<div class="mb-3">
					<div class="flex items-center">
						<v-form ref="resetRef" v-model="reset.form" :rules="rules">
							<v-form-item :label="t('login.email')" prop="email"
								><input
									v-model="reset.form.email"
									name="email"
									type="email"
									:placeholder="t('login.email_text')"
									class="input flex min-w-[10px] input-primary focus:outline-offset-0 input-bordered"
							/></v-form-item>
							<button class="btn" @click="verifyEmail.sendCode" style="margin-left: 125px">
								{{ t('login.verify') }}
							</button>
							<v-form-item :label="t('login.email_code')" prop="code"
								><input
									v-model="reset.form.code"
									name="email code"
									type="text"
									:placeholder="t('login.code_text')"
									class="input flex min-w-[10px] max-w-xs input-primary focus:outline-offset-0 input-bordered" /></v-form-item
							><v-form-item :label="t('login.username')" prop="username"
								><input
									v-model="reset.form.username"
									name="username"
									type="text"
									:placeholder="t('login.username_text')"
									class="input flex min-w-[10px] input-primary focus:outline-offset-0 input-bordered"
							/></v-form-item>
							<v-form-item :label="t('password.new_password')" prop="new_password"
								><input
									v-model="reset.form.new_password"
									name="password"
									type="password"
									:placeholder="t('password.new_password_text')"
									class="input flex min-w-[10px] max-w-xs input-primary focus:outline-offset-0 input-bordered"
								/>
							</v-form-item>
							<v-form-item :label="t('password.check_password')" prop="check_password"
								><input
									v-model="reset.form.check_password"
									name="password"
									type="password"
									:placeholder="t('password.check_password_text')"
									class="input flex min-w-[10px] max-w-xs input-primary focus:outline-offset-0 input-bordered"
								/>
							</v-form-item>
						</v-form>
					</div>
				</div>
				<button class="btn btn-primary" @click="submit" style="margin-left: 120px">{{ t('login.submit') }}</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Message from '~/utils/dom/message';
import { resetPass, sendEmail } from '~/service/modules/user';
const { t } = useI18n();
const resetRef = ref();
const reset = reactive({
	form: {
		email: '',
		code: '',
		username: '',
		new_password: '',
		check_password: '',
	},
});
const validatePass = (value: any, rules: any) => {
	if (value !== reset.form.new_password) {
		return "Two inputs don't match!";
	}
};

const rules = {
	check_password: [{ required: true, message: 'Please enter the password again to confirm' }, { validator: validatePass }],
	new_password: [{ required: true, message: 'Please enter a new password' }],
	username: [{ required: true, message: 'Please enter the username' }],
	code: [{ required: true, message: 'Please enter your email verification code' }],
};
// 邮箱验证码
const verifyEmail = reactive({
	valid: false,
	sendCode: async () => {
		console.log('[verifyEmail]');
		const pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

		if (pattern.test(reset.form.email)) {
			console.log('[pass]');

			const { success } = await sendEmail(reset.form.email);

			if (success) {
				Message({ type: 'success', text: t('login.already_send') });
			}
		} else {
			Message({ type: 'error', text: t('login.email_right_text') });
		}
	},
});
const router = useRouter();
const submit = async () => {
	if (resetRef.value.validateFields()) {
		const { success } = await resetPass(reset.form.username, reset.form.new_password, reset.form.code);
		if (success) {
			Message({ type: 'success', text: t('res.success') });
			resetRef.value.resetFields();

			setTimeout(async () => {
				await router.push('/login');
			}, 3000);
		}
	}
};
</script>

<style lang="less" scoped></style>
