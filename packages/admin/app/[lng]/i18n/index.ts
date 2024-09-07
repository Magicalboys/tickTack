import {createInstance} from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import {initReactI18next} from 'react-i18next/initReactI18next';
import {locales, defaultLocale} from '@/config';

// 定义一个异步函数，用于初始化i18next实例
const initI18next = async (lng = defaultLocale, ns = 'basic') => {
    const i18nInstance = createInstance();
    await i18nInstance
        // 使用resourcesToBackend插件，根据语言和命名空间动态导入翻译资源
        .use(initReactI18next)
        .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
        .init({
            // debug: true,
            supportedLngs: locales,
            fallbackLng: defaultLocale,
            lng,
            fallbackNS: 'basic',
            defaultNS: 'basic',
            ns
        });
    return i18nInstance;
};

export async function useTranslation(lng:string, ns?: string, options: any = {} ) {
    const i18nextInstance = await initI18next(lng, ns);
    return {
        t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
        i18n: i18nextInstance
    };
}
