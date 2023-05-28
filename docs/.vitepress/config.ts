import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
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
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/yqhp" }],
  },
});
