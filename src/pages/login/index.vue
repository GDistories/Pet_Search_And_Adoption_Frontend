<template>
	<div class="container mx-auto px-4 md:px-12 pt-6">
		<section class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div class="card bg-base-100 shadow-xl max-w-md w-full space-y-8 shadow-2xl rounded-xl p-6 shadow-primary">
				<div class="tabs flex justify-center tabs-boxed mb-5">
					<a class="tab tab-lg flex-auto" :class="{ 'tab-active': mode }" @click="mode = true">{{ t('login.login_btn') }}</a>
					<a class="tab tab-lg flex-auto" :class="{ 'tab-active': !mode }" @click="mode = false">{{ t('login.register_btn') }}</a>
				</div>
				<div class="card-body text-center">
					<!-- 登录 -->
					<div v-show="mode">
						<v-form ref="loginRef" v-model="loginForm" :rules="loginRules" class="mb-4">
							<v-form-item :label="t('login.role')" prop="role"
								><select v-model="loginForm.role" class="select select-primary select-bordered flex min-w-[10px] focus:outline-offset-0">
									<option value="user">{{ t('login.role_user') }}</option>
									<option value="shelter">{{ t('login.role_shelter') }}</option>
									<option value="admin">{{ t('login.role_admin') }}</option>
								</select> </v-form-item
							><v-form-item :label="t('login.username')" prop="username"
								><input
									v-model="loginForm.username"
									name="username"
									type="text"
									:placeholder="t('login.username_text')"
									class="input flex min-w-[10px] input-primary focus:outline-offset-0 input-bordered"
								/>
							</v-form-item>
							<v-form-item :label="t('login.password')" prop="password">
								<input
									v-model="loginForm.password"
									name="password"
									type="password"
									:placeholder="t('login.password_text')"
									class="input flex min-w-[10px] max-w-xs input-primary focus:outline-offset-0 input-bordered"
								/>
							</v-form-item>
						</v-form>
						<a href="/forgot-password"
							><small class="text-error flex justify-end underline pr-1 mb-4">{{ t('login.password_forgot') }}</small></a
						>
						<button class="btn btn-primary" @click="handleLogin">{{ t('login.submit') }}</button>
					</div>

					<!-- 注册 -->
					<div v-show="!mode">
						<v-form ref="registerRef" v-model="registerForm" :rules="registerRules" class="mb-4">
							<v-form-item :label="t('login.role')" prop="role"
								><select v-model="registerForm.role" class="select select-primary select-bordered flex min-w-[10px] focus:outline-offset-0">
									<option value="user">{{ t('login.role_user') }}</option>
									<option value="shelter">{{ t('login.role_shelter') }}</option>
								</select>
							</v-form-item>
							<v-form-item :label="t('login.username')" prop="username"
								><input
									v-model="registerForm.username"
									name="username"
									type="text"
									:placeholder="t('login.username_text')"
									class="input flex min-w-[10px] input-primary focus:outline-offset-0 input-bordered" /></v-form-item
							><v-form-item :label="t('login.email')" prop="email"
								><input
									v-model="registerForm.email"
									name="email"
									type="email"
									:placeholder="t('login.email_text')"
									class="input flex min-w-[10px] input-primary focus:outline-offset-0 input-bordered"
							/></v-form-item>
							<button type="submit" class="btn btn-primary" @click="verifyEmail.sendCode" style="margin-left: 40px">
								{{ t('login.verify') }}
							</button>
							<v-form-item :label="t('login.password')" prop="password"
								><input
									v-model="registerForm.password"
									name="password"
									type="password"
									:placeholder="t('login.password_text')"
									class="input flex min-w-[10px] max-w-xs input-primary focus:outline-offset-0 input-bordered"
							/></v-form-item>
							<v-form-item :label="t('login.password_check')" prop="password_check"
								><input
									v-model="registerForm.password_check"
									name="password"
									type="password"
									:placeholder="t('login.password_text')"
									class="input flex min-w-[10px] max-w-xs input-primary focus:outline-offset-0 input-bordered" /></v-form-item
							><v-form-item :label="t('login.email_code')" prop="email_code"
								><input
									v-model="registerForm.code"
									name="email code"
									type="text"
									:placeholder="t('login.code_text')"
									class="input flex min-w-[10px] max-w-xs input-primary focus:outline-offset-0 input-bordered"
							/></v-form-item>
							<v-form-item v-if="registerForm.role === 'shelter'" :label="t('login.register_code')" prop="register_code"
								><input
									v-model="registerForm.registerCode"
									name="register Code"
									type="text"
									:placeholder="t('login.code_text')"
									class="input flex min-w-[10px] max-w-xs input-primary focus:outline-offset-0 input-bordered"
							/></v-form-item>
							<v-form-item v-if="registerForm.role === 'shelter'" :label="t('filter.city')" prop="countyId">
								<CascadingSelect v-model="registerForm.countyId"></CascadingSelect>
							</v-form-item>
						</v-form>
						<div class="flex justify-around">
							<button type="submit" class="btn btn-primary" @click="handleRegister">{{ t('login.submit') }}</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import useLogin from './useLogin';
import useRegister from './useRegister';

const { loginRef, loginForm, loginRules, handleLogin } = useLogin();

const { registerRef, registerForm, registerRules, handleRegister, verifyEmail, mode } = useRegister();

const { t } = useI18n();
</script>

<style scoped>
.btn {
	width: 120px;
}
</style>
