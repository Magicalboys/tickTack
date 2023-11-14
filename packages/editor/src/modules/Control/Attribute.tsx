import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Store} from '@/store';
import {Form, Input} from 'antd';
import {InitialState, updateComponentProps} from '@/store/features/editorSlice';
import {renderFormElement} from './utils';
import './index.less';
import {useConfigState} from '@/store/features/configSlice';
import ComponentEmpty from '@/common/Empty';
function ComponentsAttr() {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const {componentConfig} = useSelector(state => useConfigState(state));
    const {selectedComponent, selectedComponentId}: InitialState = useSelector((state:Store) => state.editorSlice);
    
    useEffect(()=>{
        // 初始化表单
        form.setFieldsValue(selectedComponent?.props);
    },[selectedComponent]);
    
    const valueChange = (changeValue: any) => {
        if(selectedComponentId){
            dispatch(updateComponentProps({selectedComponentId, changeValue}));
        }
    };

    if (!selectedComponent || !selectedComponentId) return <ComponentEmpty/>;
    return (
        <div className='attribute'>
            <Form
                form={form}
                onValuesChange={valueChange}
                labelCol={{span: 8}}
                wrapperCol={{span: 14}}
            >
                <Form.Item label="组件ID">
                    <Input value={selectedComponent.id} disabled />
                </Form.Item>
                <Form.Item label="组件名称">
                    <Input value={selectedComponent.name} disabled />
                </Form.Item>
                {((componentConfig[selectedComponent?.name] || [])?.setter || []).map((setting:any) =>{
                    return (
                        <Form.Item key={setting.name} name={setting.name} label={setting.label}>
                            {renderFormElement(setting)}
                        </Form.Item>
                    );
                })}
            </Form>
        </div>
    );
}

export default ComponentsAttr;