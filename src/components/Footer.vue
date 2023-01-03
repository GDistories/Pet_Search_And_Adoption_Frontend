<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-grow place-content-center footer p-10 bg-primary text-secondary-content mt-10">
    <p>
      © 2022 {{ t('web-title') }}
    </p>
  </div>

</template>
