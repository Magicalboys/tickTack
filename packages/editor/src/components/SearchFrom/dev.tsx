import {useDrop} from '@/dnd/useDrop';
import {CommonComponentProps} from '@/types/schema';
import {Col, Form, Input, Row, Space, Button} from 'antd';
import React,{useMemo} from 'react';

function SearchForm({_id, _name, children, onSearch}: CommonComponentProps) {
    const [form] = Form.useForm();

    const search = (values: any) => {
        onSearch && onSearch(values);
    };

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

    return (
        <div ref={drop} data-component-key={_id} style={{border:canDrop ? '' : '',padding:'16px'}}>
            <Form form={form} onFinish={search}>
                <Row gutter={20}>
                    {
                        searchItems.map((item: any) => {
                            return (
                                <Col key={item.name} span={6}>
                                    <Form.Item data-component-key={item.id} name={item.name} label={item.label}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                            );
                        })
                    }
                    <Col span={6}>
                        <Space>
                            <Button onClick={() => form.submit()} type='primary'>搜索</Button>
                            <Button onClick={() => {form.resetFields(); form.submit();}}>重置</Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default SearchForm;