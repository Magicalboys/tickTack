import React from 'react';
import {CommonComponentProps} from '@/types/schema';

function Page({children}: CommonComponentProps) {
    return <div className='p-[24px]' style={{padding: '24px'}}>{children}</div>;
}

export default Page;