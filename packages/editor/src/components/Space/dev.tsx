import React from 'react';
import {CommonComponentProps} from '@/types/schema';
import type {SpaceSize} from 'antd/es/space';
import {Space} from 'antd';
import './index.less';
import {useDrop} from '@/dnd/useDrop';
export interface Props {
    // 当前组件的子节点
    children: any;
    // 当前组件的id
    id: number;
      // 当前组件的尺寸
    size: SpaceSize;
    direction: 'horizontal' | 'vertical';
}
  
const SpaceDev = ({children, _id, _name, size, direction}: CommonComponentProps) => {

    const {canDrop, drop} = useDrop(_id, _name);

    // TODO:  data-component-key 需要手动添加
    return <Space
        size={size} 
        direction={direction}
        data-component-key={_id} 
        ref={drop}
        style={{border: canDrop ? '1px solid #a69c9c' : '1px dashed #cac5c5', width: direction === 'vertical' ? '96%' : '',padding: '16px'}}>
        {children?.length ? children : '暂无内容'}
    </Space>;
};

export default SpaceDev;