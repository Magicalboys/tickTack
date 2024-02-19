// @flow 
import {setVariables, useVariableState} from '@/store/features/variableSlice';
import {MinusCircleOutlined,PlusOutlined} from '@ant-design/icons';
import {Variable} from '@/types/schema';
import {Button, Form, Input, Modal, Select, Space} from 'antd';
import * as React from 'react';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
type Props = {
    open: boolean,
    onCancel: () => void
};
export const DefinedVariable = ({open, onCancel}: Props) => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const {variables} = useSelector(state => useVariableState(state));
    const onFinish = (value: { variables: Variable[]; }) => {
        dispatch(setVariables(value.variables));
        onCancel && onCancel();
    };

    useEffect(()=>{
        if (open) {
            form.setFieldsValue({variables});
        }
    },[open]);

    return (
        <Modal
            open={open}
            title='定义变量'
            destroyOnClose
            onCancel={onCancel}
            onOk={() => { form.submit(); }}

        >
            <Form<{ variables: Variable[] }>
                onFinish={onFinish}
                form={form} 
                initialValues={{variables}}
                autoComplete="off"
            >
                <Form.List name='variables'>
                    {
                        (files,{add,remove}) => (
                            <>
                                {files.map(({key,name,...restFile}) =>(
                                    <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                                        <Form.Item
                                            {...restFile} 
                                            name={[name,'name']}
                                            rules={[{required: true, message: '变量名不能为空'}]}
                                        >
                                            <Input placeholder='变量名'></Input>
                                        </Form.Item>
                                        <Form.Item
                                            {...restFile} 
                                            name={[name,'type']}
                                            rules={[{required: true, message: '类型不能为空'}]}
                                        >
                                            <Select options={[{label: '字符串', value: 'string'}]} placeholder="类型" ></Select>
                                        </Form.Item>
                                        <Form.Item
                                            {...restFile} 
                                            name={[name,'defaultValue']}
                                            rules={[{required: true, message: '默认值不能为空'}]}
                                        >
                                            <Input placeholder='默认值'></Input>
                                        </Form.Item>
                                        <Form.Item
                                            {...restFile} 
                                            name={[name,'remark']}
                                            rules={[{required: true, message: '备注不能为空'}]}
                                        >
                                            <Input placeholder='备注'></Input>
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button
                                        type='dashed'
                                        onClick={() => add({type: 'string'})} block icon={<PlusOutlined />}
                                    >

                                    </Button>
                                </Form.Item>
                            </>
                        )
                    }
                </Form.List>
            </Form>
        </Modal>
    );
};