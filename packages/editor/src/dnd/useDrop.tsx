import {useDrop as useDndDrop} from 'react-dnd';
import {getAcceptDrop} from './util';

export const useDrop = (id: number, componentName: string) => {
    const acceptItem = getAcceptDrop(componentName);
    const [{canDrop}, drop] = useDndDrop(() => ({
        accept: acceptItem,
        drop: (_, monitor) => {
            const didDrop = monitor.didDrop();
            if (didDrop) {
                return;
            }
            // 当子组件 落到 父组件 位置上时 把 父组件 的id返回出去，在子组件拖拽结束事件里就可以拿到这个id。
            // 这样就可以根据 父组件 的id 找到父组件，然后把子组件 添加到父组件的children里。
            return {
                id,
            };
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));
  
    return {
        drop,
        canDrop,
    };
};