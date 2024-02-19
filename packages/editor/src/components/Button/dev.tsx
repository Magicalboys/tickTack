import React from 'react';
import {Button} from 'antd';
import {CommonComponentProps} from '@/types/schema';

const ButtonDev = ({_id, type, text}: CommonComponentProps) => {
    return (
        <Button data-component-key={_id} type={type}>{text}</Button>
    );   
};

export default (ButtonDev);