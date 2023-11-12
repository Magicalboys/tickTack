import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Button} from 'antd';

const ButtonProd = (props: any,ref: any) => {

    const [loading, setLoading] = useState(false);
    useImperativeHandle(ref, 
        () => {
            return {
                startLoading: () => {
                    setLoading(true);
                },
                endLoading : () =>{
                    setLoading(false);
                }
            };
        },[]
    );
    return (
        <Button loading={loading} {...props}>{props.text}</Button>
    );
};

export default forwardRef(ButtonProd);