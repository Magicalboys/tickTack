import {SettingOutlined} from '@ant-design/icons';
import {Value} from '@/types/schema';
import {Input} from 'antd';
import React, {useState} from 'react';
import VariableModalTable from '../VariableModalTable';

interface Props {
    value?: Value;
    onChange?: (value: Value) => void;
}

const SettingFormInput = ({value, onChange}:Props) => {
    const [visible, setVisible] = useState(false);
    const staticChange = (e: any) =>{
        onChange && onChange({
            type: 'static',
            value: e?.target?.value,
        });
    };
    
    const variableChange = (record: any) =>{
        onChange && onChange({
            type: 'variable',
            value: record.name,
        });
        setVisible(false);
    };

    return (
        <div>
            <Input 
                disabled={value?.type === 'variable'}
                value={(value?.type === 'static' || !value) ? value?.value : ''}
                onChange={staticChange}
                style={{width: '125px', marginRight: '5px'}}
            />
            <SettingOutlined
                onClick={() => setVisible(true)}
                style={{color: value?.type === 'variable' ? 'blue' : ''}}
            />
            <VariableModalTable
                open={visible}
                onCancel={() => setVisible(false)}
                onSelect={variableChange}
            />
        </div>
    );
};

export default SettingFormInput;