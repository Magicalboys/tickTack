import {useDrop} from '@/dnd/useDrop';
import {CommonComponentProps} from '@/types/schema';
import {Form as AntdForm, Input} from 'antd';
import React, {useMemo} from 'react';

const Form = ({_id, _name, children, onSearch}: CommonComponentProps) => {

    const [form] = AntdForm.useForm();

    const {canDrop, drop} = useDrop(_id, _name);

    const searchItems = useMemo(() => {
        return React.Children.map(children, (item: any) => {

            return {
                label: item.props?.label,
                name: item.props?.name,
                type: item.props?.type,
                id: item.props?.id,
            };
        });
    }, [children]);

    const search = (values: any) => {
        onSearch && onSearch(values);
    };

    if (!children?.length) {
        return (
            <div
                data-component-key={_id}
                ref={drop}
                style={{border: canDrop ? '1px solid #e71515' : '1px solid #ccc', textAlign:'center',width:'97%',padding:'10px'}}
            >
        暂无内容
            </div>
        );
    }


    return (
        <div ref={drop} data-component-key={_id} style={{border: canDrop ? '1px solid #e71515' : '1px solid #ccc', width:'97%',padding:'10px'}}>
            <AntdForm labelCol={{span: 5}} wrapperCol={{span: 18}} form={form} onFinish={search}>
                {searchItems.map((item: any) => {
                    return (
                        <AntdForm.Item key={item.name} data-component-key={item.id} name={item.name} label={item.label} >
                            <Input />
                        </AntdForm.Item>
                    );
                })}
            </AntdForm>
        </div >
    );
};

export default Form;