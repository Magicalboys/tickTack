import {ItemType} from '@/types/schema';
import {Col, Form, Input, Row, Space, Button} from 'antd';
import React,{FC, useMemo} from 'react';
import {useDrop} from 'react-dnd';
interface Props {
    id: string;
    onSearch?: (value: string) => void;
    children?: (values: any) => void;
} 

const SearchForm: FC<Props> = ({id,children,onSearch}) => {
    const [form] = Form.useForm();

    const search = (values: any) => {
        onSearch && onSearch(values);
    };

    const [{canDrop}, drop] = useDrop(() => ({
        accept: [ItemType.SearchFormItem],
        drop: (_, monitor) => {
            if (monitor.didDrop()) {
                return;
            }
            return {
                id
            };
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

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
        <div ref={drop} data-component-key={id} style={{border:canDrop ? '1px solid #ccc' : 'none',width:'100%',height:'60px'}}>
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
};

export default SearchForm;