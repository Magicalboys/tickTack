import React from 'react';
import {ItemType} from '@/types/schema';
import {Space as AntdSpace} from 'antd';
import {useDrop} from 'react-dnd'; 
interface Props {
    // 当前组件的子节点
    children: any;
    // 当前组件的id
    id: number;
}
  
export const Space: React.FC<Props> = ({children, id}) =>{

    const [{canDrop},drop] = useDrop(() => ({
        accept:[ItemType.Button,ItemType.Input,ItemType.Space],
        drop: (_, monitor) => {
            const didDrop = monitor.didDrop();
            if(didDrop) return;
            // 当子组件 落到 Space 位置上时 把 Space 的id返回出去，在子组件拖拽结束事件里就可以拿到这个id。
            return {
                id
            };
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })  
    }));
    
    // TODO:  component-key 需要手动添加
    return <AntdSpace component-key={id} ref={drop} className='space' style={{border: canDrop ? '1px solid #ccc' : ''}}>
        {children?.length ? children : '暂无内容'}
    </AntdSpace>;
};