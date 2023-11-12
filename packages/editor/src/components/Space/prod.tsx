import {Space} from 'antd';
import type {SpaceSize} from 'antd/es/space';
import React from 'react';

interface Props {
  // 当前组件的子节点
  children: any;
  // 当前组件的id
  id: number;
  // 当前组件的尺寸
  size: SpaceSize;
  direction: 'horizontal' | 'vertical';
}

const SpaceProd: React.FC<Props> = ({children, size, direction}) => {


    return (
        <Space
            direction={direction}
            size={size}
            style={{width: direction === 'vertical' ? '100%' : ''}}
        >
            {children}
        </Space>
    );
};

export default SpaceProd;