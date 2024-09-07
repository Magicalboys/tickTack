// src/app/page.tsx
import {locales} from '@/config';
import {useTranslation} from './i18n';
import Link from 'next/link';

interface Props {
    params:{
      lng: string;
    }
}

// 添加静态路由
export async function generateStaticParams() {
    return locales.map((lng) => ({lng}));
}
  
export default async function Home({params: {lng}}:Props) {
    const {t} = await useTranslation(lng);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {/* <form
                action={async () => {
                    'use server';
                    // 登录完成后，重定向到 user 页面
                    await signIn('github', {redirectTo:  '/user'});
                }}
            > */}
            {/* <Button htmlType='submit'>{t('login')}</Button> */}
            <Link href={`${lng}/user`}>{t('login')}</Link>
            <LngTrans lng={lng}></LngTrans>
            {/* </form> */}
        </main>
    );
}
