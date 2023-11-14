import React from 'react';
import {ItemType} from '@/types/schema';
import type {SpaceSize} from 'antd/es/space';
import {Space} from 'antd';
import {useDrop} from 'react-dnd'; 
import './index.less';
interface Props {
    // 当前组件的子节点
    children: any;
    // 当前组件的id
    id: number;
      // 当前组件的尺寸
    size: SpaceSize;
    direction: 'horizontal' | 'vertical';
}
  
const SpaceDev: React.FC<Props> = ({children, id, size, direction}) =>{

    const [{canDrop},drop] = useDrop(() => ({
        accept:[
            ItemType.Button,
            ItemType.Input,
            ItemType.Space,
            ItemType.Form,
            ItemType.Table,
            ItemType.SearchFrom
        ],
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
    
    // TODO:  data-component-key 需要手动添加
    return <Space
        size={size} 
        direction={direction}
        data-component-key={id} 
        ref={drop}
        style={{border: canDrop ? '1px solid #a69c9c' : '', width: direction === 'vertical' ? '96%' : '',padding: '16px'}}>
        {children?.length ? children : '暂无内容'}
    </Space>;
};

export default SpaceDev;