/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
// src/app/user/page.tsx
import {auth} from '@/auth';
import {useTranslation} from '../i18n';
import {LngTrans} from '../components/LngTrans';

interface Props {
    params:{
      lng: string;
    }
}

export default async function UserPage({params: {lng}}:Props) {

    // 从session中获取登录信息
    const session = await auth();
    const user = session?.user ;
    const {t} = await useTranslation(lng);

    if (!user?.email && !user?.image && !user?.name) {
        return <p>未登录</p>;
    }

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className='w-[70vw] h-[60vh] border flex justify-between p-3 border-black rounded-xl'>
                <div className='flex gap-3'>
                    <img src={user?.image ?? ''} className='rounded-[50%] w-8 h-8'/>
                    <h1>{`${t('username')} : ${user?.name}`}</h1>
                    <h1>{`${t('email')} : ${user?.email}`}</h1>
                </div>
                <div>
                    <LngTrans lng={lng}></LngTrans>
                </div>
            </div>
        </div>
    );
}
