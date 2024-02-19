import React from 'react';
import {useDrop} from '@/dnd/useDrop';
import {CommonComponentProps} from '@/types/schema';

function Page({children, _id, _name}: CommonComponentProps) {

    const {canDrop, drop} = useDrop(_id, _name);

    return (
        <div
            data-component-key={_id}
            className='p-[24px] h-[100%] box-border'
            style={{
                border: canDrop ? '1px solid blue' : 'none', padding: '5px',
                boxSizing: 'border-box', height: '100%'
            }}
            ref={drop}
        >
            {children}
        </div>
    );
}

export default Page;