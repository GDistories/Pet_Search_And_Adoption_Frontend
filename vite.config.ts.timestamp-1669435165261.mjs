// vite.config.ts
import path from "path";
import { defineConfig } from "file:///D:/project/pet-search-and-adoption-frontend/node_modules/vite/dist/node/index.js";
import Preview from "file:///D:/project/pet-search-and-adoption-frontend/node_modules/vite-plugin-vue-component-preview/out/index.js";
import Vue from "file:///D:/project/pet-search-and-adoption-frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Pages from "file:///D:/project/pet-search-and-adoption-frontend/node_modules/vite-plugin-pages/dist/index.mjs";
import generateSitemap from "file:///D:/project/pet-search-and-adoption-frontend/node_modules/vite-ssg-sitemap/dist/index.js";
import Layouts from "file:///D:/project/pet-search-and-adoption-frontend/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import Components from "file:///D:/project/pet-search-and-adoption-frontend/node_modules/unplugin-vue-components/dist/vite.mjs";
import AutoImport from "file:///D:/project/pet-search-and-adoption-frontend/node_modules/unplugin-auto-import/dist/vite.js";
import Markdown from "file:///D:/project/pet-search-and-adoption-frontend/node_modules/vite-plugin-vue-markdown/dist/index.mjs";
import { VitePWA } from "file:///D:/project/pet-search-and-adoption-frontend/node_modules/vite-plugin-pwa/dist/index.mjs";
import VueI18n from "file:///D:/project/pet-search-and-adoption-frontend/node_modules/@intlify/vite-plugin-vue-i18n/lib/index.mjs";
import Inspect from "file:///D:/project/pet-search-and-adoption-frontend/node_modules/vite-plugin-inspect/dist/index.mjs";
import LinkAttributes from "file:///D:/project/pet-search-and-adoption-frontend/node_modules/markdown-it-link-attributes/index.js";
import Shiki from "file:///D:/project/pet-search-and-adoption-frontend/node_modules/markdown-it-shiki/dist/index.mjs";
import { ElementPlusResolver } from "file:///D:/project/pet-search-and-adoption-frontend/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import IconsResolver from "file:///D:/project/pet-search-and-adoption-frontend/node_modules/unplugin-icons/dist/resolver.mjs";
import Icons from "file:///D:/project/pet-search-and-adoption-frontend/node_modules/unplugin-icons/dist/vite.mjs";
var __vite_injected_original_dirname = "D:\\project\\pet-search-and-adoption-frontend";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__vite_injected_original_dirname, "src")}/`
    }
  },
  server: {
    watch: {
      usePolling: true
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(__vite_injected_original_dirname, "src/assets/styles/base.less")}";`
      }
    }
  },
  plugins: [
    Preview(),
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true
    }),
    Pages({
      extensions: ["vue", "md"]
    }),
    Layouts(),
    AutoImport({
      imports: ["vue", "vue-router", "vue-i18n", "vue/macros", "@vueuse/head", "@vueuse/core"],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/composables", "src/store"],
      vueTemplate: true,
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "src/components.d.ts",
      resolvers: [
        IconsResolver({
          enabledCollections: ["ep"]
        }),
        ElementPlusResolver()
      ]
    }),
    Icons(),
    Markdown({
      wrapperClasses: "prose prose-sm m-auto text-left",
      headEnabled: true,
      markdownItSetup(md) {
        md.use(Shiki, {
          theme: {
            light: "vitesse-light",
            dark: "vitesse-dark"
          }
        });
        md.use(LinkAttributes, {
          matcher: (link) => /^https?:\/\//.test(link),
          attrs: {
            target: "_blank",
            rel: "noopener"
          }
        });
      }
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "safari-pinned-tab.svg"],
      manifest: {
        name: "Vitesse",
        short_name: "Vitesse",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    }),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__vite_injected_original_dirname, "locales/**")]
    }),
    Inspect()
  ],
  test: {
    include: ["test/**/*.test.ts"],
    environment: "jsdom",
    deps: {
      inline: ["@vue", "@vueuse", "vue-demi"]
    }
  },
  ssgOptions: {
    script: "async",
    formatting: "minify",
    onFinished() {
      generateSitemap();
    }
  },
  ssr: {
    noExternal: ["workbox-window", /vue-i18n/]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXHBldC1zZWFyY2gtYW5kLWFkb3B0aW9uLWZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXHBldC1zZWFyY2gtYW5kLWFkb3B0aW9uLWZyb250ZW5kXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9wcm9qZWN0L3BldC1zZWFyY2gtYW5kLWFkb3B0aW9uLWZyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgUHJldmlldyBmcm9tICd2aXRlLXBsdWdpbi12dWUtY29tcG9uZW50LXByZXZpZXcnO1xyXG5pbXBvcnQgVnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XHJcbmltcG9ydCBQYWdlcyBmcm9tICd2aXRlLXBsdWdpbi1wYWdlcyc7XHJcbmltcG9ydCBnZW5lcmF0ZVNpdGVtYXAgZnJvbSAndml0ZS1zc2ctc2l0ZW1hcCc7XHJcbmltcG9ydCBMYXlvdXRzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1sYXlvdXRzJztcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnO1xyXG5pbXBvcnQgTWFya2Rvd24gZnJvbSAndml0ZS1wbHVnaW4tdnVlLW1hcmtkb3duJztcclxuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSc7XHJcbmltcG9ydCBWdWVJMThuIGZyb20gJ0BpbnRsaWZ5L3ZpdGUtcGx1Z2luLXZ1ZS1pMThuJztcclxuaW1wb3J0IEluc3BlY3QgZnJvbSAndml0ZS1wbHVnaW4taW5zcGVjdCc7XHJcbmltcG9ydCBMaW5rQXR0cmlidXRlcyBmcm9tICdtYXJrZG93bi1pdC1saW5rLWF0dHJpYnV0ZXMnO1xyXG4vLyBpbXBvcnQgVW5vY3NzIGZyb20gXCJ1bm9jc3Mvdml0ZVwiO1xyXG5pbXBvcnQgU2hpa2kgZnJvbSAnbWFya2Rvd24taXQtc2hpa2knO1xyXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJztcclxuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSAndW5wbHVnaW4taWNvbnMvcmVzb2x2ZXInO1xyXG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG5cdHJlc29sdmU6IHtcclxuXHRcdGFsaWFzOiB7XHJcblx0XHRcdCd+Lyc6IGAke3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKX0vYCxcclxuXHRcdH0sXHJcblx0fSxcclxuXHRzZXJ2ZXI6IHtcclxuXHRcdHdhdGNoOiB7XHJcblx0XHRcdHVzZVBvbGxpbmc6IHRydWUsXHJcblx0XHR9LFxyXG5cdH0sXHJcblx0Y3NzOiB7XHJcblx0XHRwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcblx0XHRcdGxlc3M6IHtcclxuXHRcdFx0XHRqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcclxuXHRcdFx0XHRhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCIke3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvYXNzZXRzL3N0eWxlcy9iYXNlLmxlc3MnKX1cIjtgLFxyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cdHBsdWdpbnM6IFtcclxuXHRcdFByZXZpZXcoKSxcclxuXHJcblx0XHRWdWUoe1xyXG5cdFx0XHRpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwubWQkL10sXHJcblx0XHRcdHJlYWN0aXZpdHlUcmFuc2Zvcm06IHRydWUsXHJcblx0XHR9KSxcclxuXHJcblx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vaGFubm9lcnUvdml0ZS1wbHVnaW4tcGFnZXNcclxuXHRcdFBhZ2VzKHtcclxuXHRcdFx0ZXh0ZW5zaW9uczogWyd2dWUnLCAnbWQnXSxcclxuXHRcdH0pLFxyXG5cclxuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9Kb2huQ2FtcGlvbkpyL3ZpdGUtcGx1Z2luLXZ1ZS1sYXlvdXRzXHJcblx0XHRMYXlvdXRzKCksXHJcblxyXG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLWF1dG8taW1wb3J0XHJcblx0XHRBdXRvSW1wb3J0KHtcclxuXHRcdFx0aW1wb3J0czogWyd2dWUnLCAndnVlLXJvdXRlcicsICd2dWUtaTE4bicsICd2dWUvbWFjcm9zJywgJ0B2dWV1c2UvaGVhZCcsICdAdnVldXNlL2NvcmUnXSxcclxuXHRcdFx0ZHRzOiAnc3JjL2F1dG8taW1wb3J0cy5kLnRzJyxcclxuXHRcdFx0ZGlyczogWydzcmMvY29tcG9zYWJsZXMnLCAnc3JjL3N0b3JlJ10sXHJcblx0XHRcdHZ1ZVRlbXBsYXRlOiB0cnVlLFxyXG5cdFx0XHRyZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG5cdFx0fSksXHJcblxyXG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzXHJcblx0XHRDb21wb25lbnRzKHtcclxuXHRcdFx0Ly8gYWxsb3cgdG8gYXV0b2xvYWQgbWFya2Rvd24gY29tcG9uZW50cyB1bmRlciBgLi9zcmMvY29tcG9uZW50cy9gXHJcblx0XHRcdGV4dGVuc2lvbnM6IFsndnVlJywgJ21kJ10sXHJcblx0XHRcdC8vIGFsbG93IGF1dG8gaW1wb3J0IGFuZCByZWdpc3RlciBjb21wb25lbnRzIHVzZWQgaW4gbWFya2Rvd25cclxuXHRcdFx0aW5jbHVkZTogWy9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC9cXC5tZCQvXSxcclxuXHRcdFx0ZHRzOiAnc3JjL2NvbXBvbmVudHMuZC50cycsXHJcblx0XHRcdHJlc29sdmVyczogW1xyXG5cdFx0XHRcdEljb25zUmVzb2x2ZXIoe1xyXG5cdFx0XHRcdFx0ZW5hYmxlZENvbGxlY3Rpb25zOiBbJ2VwJ10sXHJcblx0XHRcdFx0fSksXHJcblx0XHRcdFx0RWxlbWVudFBsdXNSZXNvbHZlcigpLFxyXG5cdFx0XHRdLFxyXG5cdFx0fSksXHJcblxyXG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3Vub2Nzc1xyXG5cdFx0Ly8gc2VlIHVub2Nzcy5jb25maWcudHMgZm9yIGNvbmZpZ1xyXG5cdFx0Ly8gVW5vY3NzKCksXHJcblxyXG5cdFx0Ly8gSWNvbnNcclxuXHRcdEljb25zKCksXHJcblxyXG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3ZpdGUtcGx1Z2luLXZ1ZS1tYXJrZG93blxyXG5cdFx0Ly8gRG9uJ3QgbmVlZCB0aGlzPyBUcnkgdml0ZXNzZS1saXRlOiBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdml0ZXNzZS1saXRlXHJcblx0XHRNYXJrZG93bih7XHJcblx0XHRcdHdyYXBwZXJDbGFzc2VzOiAncHJvc2UgcHJvc2Utc20gbS1hdXRvIHRleHQtbGVmdCcsXHJcblx0XHRcdGhlYWRFbmFibGVkOiB0cnVlLFxyXG5cdFx0XHRtYXJrZG93bkl0U2V0dXAobWQpIHtcclxuXHRcdFx0XHQvLyBodHRwczovL3ByaXNtanMuY29tL1xyXG5cdFx0XHRcdG1kLnVzZShTaGlraSwge1xyXG5cdFx0XHRcdFx0dGhlbWU6IHtcclxuXHRcdFx0XHRcdFx0bGlnaHQ6ICd2aXRlc3NlLWxpZ2h0JyxcclxuXHRcdFx0XHRcdFx0ZGFyazogJ3ZpdGVzc2UtZGFyaycsXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdG1kLnVzZShMaW5rQXR0cmlidXRlcywge1xyXG5cdFx0XHRcdFx0bWF0Y2hlcjogKGxpbms6IHN0cmluZykgPT4gL15odHRwcz86XFwvXFwvLy50ZXN0KGxpbmspLFxyXG5cdFx0XHRcdFx0YXR0cnM6IHtcclxuXHRcdFx0XHRcdFx0dGFyZ2V0OiAnX2JsYW5rJyxcclxuXHRcdFx0XHRcdFx0cmVsOiAnbm9vcGVuZXInLFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSxcclxuXHRcdH0pLFxyXG5cclxuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS92aXRlLXBsdWdpbi1wd2FcclxuXHRcdFZpdGVQV0Eoe1xyXG5cdFx0XHRyZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcclxuXHRcdFx0aW5jbHVkZUFzc2V0czogWydmYXZpY29uLnN2ZycsICdzYWZhcmktcGlubmVkLXRhYi5zdmcnXSxcclxuXHRcdFx0bWFuaWZlc3Q6IHtcclxuXHRcdFx0XHRuYW1lOiAnVml0ZXNzZScsXHJcblx0XHRcdFx0c2hvcnRfbmFtZTogJ1ZpdGVzc2UnLFxyXG5cdFx0XHRcdHRoZW1lX2NvbG9yOiAnI2ZmZmZmZicsXHJcblx0XHRcdFx0aWNvbnM6IFtcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0c3JjOiAnL3B3YS0xOTJ4MTkyLnBuZycsXHJcblx0XHRcdFx0XHRcdHNpemVzOiAnMTkyeDE5MicsXHJcblx0XHRcdFx0XHRcdHR5cGU6ICdpbWFnZS9wbmcnLFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0c3JjOiAnL3B3YS01MTJ4NTEyLnBuZycsXHJcblx0XHRcdFx0XHRcdHNpemVzOiAnNTEyeDUxMicsXHJcblx0XHRcdFx0XHRcdHR5cGU6ICdpbWFnZS9wbmcnLFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0c3JjOiAnL3B3YS01MTJ4NTEyLnBuZycsXHJcblx0XHRcdFx0XHRcdHNpemVzOiAnNTEyeDUxMicsXHJcblx0XHRcdFx0XHRcdHR5cGU6ICdpbWFnZS9wbmcnLFxyXG5cdFx0XHRcdFx0XHRwdXJwb3NlOiAnYW55IG1hc2thYmxlJyxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XSxcclxuXHRcdFx0fSxcclxuXHRcdH0pLFxyXG5cclxuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9pbnRsaWZ5L2J1bmRsZS10b29scy90cmVlL21haW4vcGFja2FnZXMvdml0ZS1wbHVnaW4tdnVlLWkxOG5cclxuXHRcdFZ1ZUkxOG4oe1xyXG5cdFx0XHRydW50aW1lT25seTogdHJ1ZSxcclxuXHRcdFx0Y29tcG9zaXRpb25Pbmx5OiB0cnVlLFxyXG5cdFx0XHRpbmNsdWRlOiBbcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2xvY2FsZXMvKionKV0sXHJcblx0XHR9KSxcclxuXHJcblx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdml0ZS1wbHVnaW4taW5zcGVjdFxyXG5cdFx0Ly8gVmlzaXQgaHR0cDovL2xvY2FsaG9zdDozMzMzL19faW5zcGVjdC8gdG8gc2VlIHRoZSBpbnNwZWN0b3JcclxuXHRcdEluc3BlY3QoKSxcclxuXHRdLFxyXG5cclxuXHQvLyBodHRwczovL2dpdGh1Yi5jb20vdml0ZXN0LWRldi92aXRlc3RcclxuXHR0ZXN0OiB7XHJcblx0XHRpbmNsdWRlOiBbJ3Rlc3QvKiovKi50ZXN0LnRzJ10sXHJcblx0XHRlbnZpcm9ubWVudDogJ2pzZG9tJyxcclxuXHRcdGRlcHM6IHtcclxuXHRcdFx0aW5saW5lOiBbJ0B2dWUnLCAnQHZ1ZXVzZScsICd2dWUtZGVtaSddLFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cclxuXHQvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdml0ZS1zc2dcclxuXHRzc2dPcHRpb25zOiB7XHJcblx0XHRzY3JpcHQ6ICdhc3luYycsXHJcblx0XHRmb3JtYXR0aW5nOiAnbWluaWZ5JyxcclxuXHRcdG9uRmluaXNoZWQoKSB7XHJcblx0XHRcdGdlbmVyYXRlU2l0ZW1hcCgpO1xyXG5cdFx0fSxcclxuXHR9LFxyXG5cclxuXHRzc3I6IHtcclxuXHRcdC8vIFRPRE86IHdvcmthcm91bmQgdW50aWwgdGhleSBzdXBwb3J0IG5hdGl2ZSBFU01cclxuXHRcdG5vRXh0ZXJuYWw6IFsnd29ya2JveC13aW5kb3cnLCAvdnVlLWkxOG4vXSxcclxuXHR9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5VCxPQUFPLFVBQVU7QUFDMVUsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sU0FBUztBQUNoQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxxQkFBcUI7QUFDNUIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sY0FBYztBQUNyQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sYUFBYTtBQUNwQixPQUFPLG9CQUFvQjtBQUUzQixPQUFPLFdBQVc7QUFDbEIsU0FBUywyQkFBMkI7QUFDcEMsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxXQUFXO0FBbEJsQixJQUFNLG1DQUFtQztBQW9CekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsU0FBUztBQUFBLElBQ1IsT0FBTztBQUFBLE1BQ04sTUFBTSxHQUFHLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDdkM7QUFBQSxFQUNEO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTixZQUFZO0FBQUEsSUFDYjtBQUFBLEVBQ0Q7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNKLHFCQUFxQjtBQUFBLE1BQ3BCLE1BQU07QUFBQSxRQUNMLG1CQUFtQjtBQUFBLFFBQ25CLGdCQUFnQixZQUFZLEtBQUssUUFBUSxrQ0FBVyw2QkFBNkI7QUFBQSxNQUNsRjtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQUEsRUFDQSxTQUFTO0FBQUEs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
