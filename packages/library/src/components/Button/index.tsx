import React from 'react';
import {Button} from 'antd';

interface Props {
    value: string;
    type: 'link' | 'text' | 'default' | 'primary' | 'dashed' ;
}
function MyButton(data: Props) {
    const {value, type} = data;
    return (
        <Button type={type}>
            {value}
        </Button>
    );
}

export default MyButton;