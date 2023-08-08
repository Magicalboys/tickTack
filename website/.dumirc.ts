import { defineConfig } from 'dumi';
import { features } from './config/feature';
import type { SiteThemeConfig } from "dumi-theme-antd-style";


const themeConfig: SiteThemeConfig = {
  name: '💧TickTack',
  hero: {
    "zh-CN": {
      title: "TickTack - <b>Simplify complex things</b>",
      description:"ticktack - 让复杂的任务变简单",
      actions: [
        {
          type: "primary",
          text: "立即体验",
          link: "/guide",
        },
        {
          text: "Github",
          link: 'https://github.com/Magicalboys/tickTack',
          openExternal: true,
        },
      ],
      features: features,
    },
    "en-US": {
      description: "TickTack - <b>Simplify complex things</b>",
      actions: [
        {
          type: "primary",
          text: "Start",
          link: "/guide-en",
        },
        {
          text: "GitHub",
          link: "/config-en",
        },
      ],
    },
  },
  footer: "",
};

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: '💧TickTack',
    // logo:'https://bkimg.cdn.bcebos.com/pic/71cf3bc79f3df8dc51db8729c811728b461028a7?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U4MA==,g_7,xp_5,yp_5/format,f_auto',
    features
  },
});

