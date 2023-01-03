import path from 'path';
import { defineConfig } from 'vite';
import Preview from 'vite-plugin-vue-component-preview';
import Vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import generateSitemap from 'vite-ssg-sitemap';
import Layouts from 'vite-plugin-vue-layouts';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Markdown from 'vite-plugin-vue-markdown';
import { VitePWA } from 'vite-plugin-pwa';
import VueI18n from '@intlify/vite-plugin-vue-i18n';
import Inspect from 'vite-plugin-inspect';
import LinkAttributes from 'markdown-it-link-attributes';

import { viteMockServe } from 'vite-plugin-mock';
import Shiki from 'markdown-it-shiki';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	base: '/',
	build: {
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
	},
	resolve: {
		alias: {
			'~/': `${path.resolve(__dirname, 'src')}/`,
		},
		extensions: ['.ts', '.js', '.mjs'],
	},
	server: {
		watch: {
			usePolling: true,
		},
		proxy: {
			// 接口地址代理
			'/pet': {
				target: 'http://111.229.100.125', // 接口的域名
				secure: false, // 如果是https接口，需要配置这个参数
				changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
				rewrite: (path) => path.replace(/^\/pet/, ''),
			},
			'/map': {
				target: 'https://restapi.amap.com/v3/config', // 接口的域名
				secure: false, // 如果是https接口，需要配置这个参数
				changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
				rewrite: (path) => path.replace(/^\/map/, ''),
			},
		},
	},
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
				additionalData: `@import "${path.resolve(__dirname, 'src/assets/styles/base.less')}";`,
			},
		},
	},
	plugins: [
		Preview(),

		Vue({
			include: [/\.vue$/, /\.md$/],
			reactivityTransform: true,
		}),

		// https://github.com/hannoeru/vite-plugin-pages
		Pages({
			extensions: ['vue', 'md'],
		}),

		// https://github.com/JohnCampionJr/vite-plugin-vue-layouts
		Layouts(),

		// https://github.com/antfu/unplugin-auto-import
		AutoImport({
			imports: ['vue', 'vue-router', 'vue-i18n', 'vue/macros', '@vueuse/head', '@vueuse/core'],
			dts: 'src/auto-imports.d.ts',
			dirs: ['src/composables', 'src/store'],
			vueTemplate: true,
			resolvers: [ElementPlusResolver()],
		}),

		// https://github.com/antfu/unplugin-vue-components
		Components({
			// allow to autoload markdown components under `./src/components/`
			extensions: ['vue', 'md'],
			// allow auto import and register components used in markdown
			include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
			dts: 'src/components.d.ts',
			resolvers: [
				IconsResolver({
					enabledCollections: ['ep'],
				}),
				ElementPlusResolver(),
			],
		}),

		viteMockServe({
			mockPath: './src/server/mock',
			supportTs: false,
		}),

		// Icons
		Icons(),

		// https://github.com/antfu/vite-plugin-vue-markdown
		// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
		Markdown({
			wrapperClasses: 'prose prose-sm m-auto text-left',
			headEnabled: true,
			markdownItSetup(md) {
				// https://prismjs.com/
				md.use(Shiki, {
					theme: {
						light: 'vitesse-light',
						dark: 'vitesse-dark',
					},
				});
				md.use(LinkAttributes, {
					matcher: (link: string) => /^https?:\/\//.test(link),
					attrs: {
						target: '_blank',
						rel: 'noopener',
					},
				});
			},
		}),

		// https://github.com/antfu/vite-plugin-pwa
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
			manifest: {
				name: 'Vitesse',
				short_name: 'Vitesse',
				theme_color: '#ffffff',
				icons: [
					{
						src: '/pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: '/pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: '/pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
			},
		}),

		// https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
		VueI18n({
			runtimeOnly: true,
			compositionOnly: true,
			include: [path.resolve(__dirname, 'locales/**')],
		}),

		// https://github.com/antfu/vite-plugin-inspect
		// Visit http://localhost:3333/__inspect/ to see the inspector
		Inspect(),
	],

	// https://github.com/vitest-dev/vitest
	test: {
		include: ['test/**/*.test.ts'],
		environment: 'jsdom',
		deps: {
			inline: ['@vue', '@vueuse', 'vue-demi'],
		},
	},

	// https://github.com/antfu/vite-ssg
	ssgOptions: {
		script: 'async',
		formatting: 'minify',
		onFinished() {
			generateSitemap();
		},
	},

	ssr: {
		noExternal: ['element-plus', 'workbox-window', /vue-i18n/],
	},
});
