import {ItemType} from '@/types/schema';
import {Table} from 'antd';
import React, {useMemo} from 'react';
import {useDrop} from 'react-dnd';

interface Props {
    id: number;
    children?: any[];
}

const TableDev: React.FC<Props> = ({id, children}) => {

    const [{canDrop}, drop] = useDrop(() => ({
        accept: [ItemType.TableColumn],
        drop: (_, monitor) => {
            const didDrop = monitor.didDrop();
            if (didDrop) {
                return;
            }
      
            return {
                id,
            };
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    }));

    const columns: any = useMemo(() => {
        return React.Children.map(children, (item: any) => {
            return {
                title: (
                    <div style={{margin:'-16px',padding: '12px'}} data-component-key={item.props?.id}>{item.props?.title}</div>
                ),
                dataIndex:item.props?.dataIndex,
            };
        });
    },[children]);
    return (
        <div 
            ref={drop}
            data-component-key={id}
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
