import {Input, Select} from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React from 'react';

const MessageSetting = () => {
    return (
        <>
            <FormItem>
                <Select
                    style={{width: 240}}
                    options={[
                        {label: '成功', value: 'success'},
                        {label: '失败', value: 'error'},
                    ]}
                />
            </FormItem>
            <FormItem label="文本" name={['config', 'text']}>
                <Input style={{width: 240}} />
            </FormItem>
        </>
    );
};

export default MessageSetting;