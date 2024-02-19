import React from 'react';
import {useDrag} from 'react-dnd';
import './index.less';
import {useSelector} from 'react-redux';
import {useConfigState} from '@/store/features/configSlice';
interface ComponentItemProps {
    // 组件名称
    name: string,
    // 组件描述
    description: string,
    // 拖拽结束回调
    onDragEnd: any,
    // 拖拽中回调
    onDragging?: () => void 
}
export const ComponentItem: React.FC<ComponentItemProps> = ({name, description, onDragEnd}) => {
    const {componentConfig} = useSelector(state => useConfigState(state));
    const [{isDragging}, drag] = useDrag(() =>({
        type: name,
        // 拖拽过程中
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
        // 拖拽结束
        end: (_, monitor) =>{
            const dropResult = monitor.getDropResult();

            if (!dropResult) return;
            
            // 设置组件初始值
            let props: any = {};

            const defaultProps = componentConfig?.[name]?.defaultProps;
      
            if (defaultProps) {
                if (typeof defaultProps === 'function') {
                    props = defaultProps();
                } else {
                    props = defaultProps || {};
                }
            }

            onDragEnd && onDragEnd({
                name,
                props,
                desc: description,
                ...dropResult
            });
        },
    }));

    const opacity = isDragging ? 0.4 : 1;
    
    return (
        <div ref={drag} className='componentItem' style={{opacity}}>
            {description}
        </div>
    );
};
