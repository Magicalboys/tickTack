import {useDrop} from '@/dnd/useDrop';
import {CommonComponentProps} from '@/types/schema';
import {Table} from 'antd';
import React, {useMemo} from 'react';

const TableDev = ({_id, _name, children}: CommonComponentProps) => {

    const {canDrop, drop} = useDrop(_id, _name);

    const columns: any = useMemo(() => {
        return React.Children.map(children, (item: any) => {
            return {
                title: (
                    <div style={{margin:'-16px',padding: '12px'}} 
                        data-component-key={item.props?.id}
                    >{item.props?.title}</div>
                ),
                dataIndex:item.props?.dataIndex,
            };
        });
    },[children]);

    return (
        <div 
            ref={drop}
            data-component-key={_id}
            style={{border: canDrop ? '1px solid #ccc' : 'none', width: '100%'}}>
            <Table
                columns={columns}
                dataSource={[]}
                pagination={false}
            />
        </div>
    );
};

export default TableDev;
