<template>
  <el-row>
    <el-col :span="22">
	<el-menu :default-active="route.path" class="el-menu-demo" mode="horizontal" :router="true">
		<el-menu-item index="/shelter-admin/find-manage">{{ t('admin.find_manage') }}</el-menu-item>
		<el-menu-item index="/shelter-admin/adoption-manage">{{ t('admin.adoption_manage') }}</el-menu-item>
	</el-menu></el-col>
    <el-col :span="2" class="flex items-center">
      <button class="icon-btn mx-2" :title="t('button.toggle_langs')" @click="toggleLocales()">
        <Icon icon="carbon-language" class="text-2xl" /></button
      ></el-col>
  </el-row>
</template>

<script setup>
const route = useRoute();
import { Icon } from '@iconify/vue';
const { t, availableLocales, locale } = useI18n();


const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales;
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
};
</script>

<style scoped></style>
