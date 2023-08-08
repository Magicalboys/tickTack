import { defineConfig } from 'dumi';
import { features } from './config/feature';
import type { SiteThemeConfig } from "dumi-theme-antd-style";



export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: '💧TickTack',
    
    // logo:'💧',
    features,
    socialLinks:{
      github:'https://github.com/Magicalboys/tickTack'
    }
  },
});

