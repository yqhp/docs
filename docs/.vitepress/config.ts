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
          { text: "快速入门", link: "/guide/quick-start" },
          { text: "插件", link: "/guide/plugins" },
          { text: "Coding指南", link: "/guide/coding" },
        ],
      },
      {
        text: "高级特性",
        collapsed: false,
        items: [
          { text: "Page Object", link: "/guide/advanced/page-object" },
          { text: "报告通知", link: "/guide/advanced/report-notification" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/yqhp" }],
  },
});
