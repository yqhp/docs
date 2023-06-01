import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/docs/", // https://vitepress.dev/reference/site-config github地址为https://yqhp.github.io/docs/，需要配置base
  title: "yqhp",
  description: "",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Home", link: "/" }],

    sidebar: [
      {
        text: "入门指南",
        collapsed: false,
        items: [
          { text: "简介", link: "/guide/what-is-yqhp" },
          { text: "部署", link: "/guide/deploy" },
          { text: "设备接入agent", link: "/guide/device-connected-to-agent" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/yqhp" }],
  },
});
