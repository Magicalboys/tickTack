import React from 'react';
import {Button} from 'antd';

const ButtonDev = (props: any) => {
    return (
        <Button data-component-key={props.id} type={props.type}>{props.text}</Button>
    );   
};

export default (ButtonDev);