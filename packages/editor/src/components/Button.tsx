import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Button as Btn} from 'antd';

const Button = (props: any,ref: any) => {

    const [loading, setLoading] = useState(false);
    const {width,height} = props;
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
        <Btn style={{width: width + 'px',height: height + 'px'}} loading={loading} {...props}>{props.text}</Btn>
    );
};

export default forwardRef(Button);