import React, {useEffect, useRef} from 'react';
import './index.less';
import {useDrop} from 'react-dnd';
import {ItemType} from '@/types/schema';
import {useDispatch, useSelector} from 'react-redux';
import {renderComponents} from './utils';
import {setSelectedComponent, useComponentState} from '@/store/features/editorSlice';
import SelectedMask from '@/common/SelectedMask';
import {useVariableState} from '@/store/features/variableSlice';
import {useConfigState} from '@/store/features/configSlice';

const Content = () => {
    const dispatch = useDispatch();
    const selectedMaskRef = useRef<any>(null);
    const {componentConfig} = useSelector(state => useConfigState(state)); 
    const {componentTree, selectedComponentId} = useSelector((state) => useComponentState(state));
    const {variables} = useSelector(state => useVariableState(state));
    const [{canDrop}, drop] = useDrop(() => ({
        accept:[
            ItemType.Button,
            ItemType.Input,
            ItemType.Space,
            ItemType.Select
        ],
        drop: (_, monitor) => {
            const didDrop = monitor.didDrop();
            if(didDrop)return;
            return {
                id: 0,
            };
        },
        collect: (monitor) =>({
            canDrop: monitor.canDrop(),
        })
    }));

    // 通过监听 点击事件 获取当前被选中组件的 id
    const createMask = (e:any) => {
        // 事件被触发后 返回包含事件流中元素的对象数组
        const path = e.composedPath();
        for (let i = 0 ; i < path.length ; i ++){
            const node = path[i];
            if (node.getAttribute){
                // 查找 被触发的事件流里面 key 为 component-key 的 组件
                // 即为 当前 被选中的 组件
                if (node.getAttribute('component-key')){
                    const componentId = node.getAttribute('component-key');
                    dispatch(setSelectedComponent(componentId));
                    return;
                }
            }
        }
    };

    useEffect(() => {
        let container = document.querySelector('.content');

        // 监听画布元素
        if (container){
            container.addEventListener('click',createMask,true);
        }

        // 清除监听
        return () => {
            container = document.querySelector('.content');
            if (container){
                container.removeEventListener('click',createMask,true);
            }
        };
    },
    [componentTree]);

    // 组件改变后，重新渲染遮罩
    useEffect(() => {
        if (selectedMaskRef?.current) {
            selectedMaskRef.current.updatePosition();
        }
    }, [componentTree]);

    return (
        <div className='content' ref={drop} style={{border: canDrop ? '1px solid #0f53f0' : ''}}>
            <React.Suspense fallback="loading...">
                {renderComponents(componentTree,componentConfig, variables)}
            </React.Suspense>
            {selectedComponentId && 
                <SelectedMask
                    componentId={selectedComponentId}
                    containerClassName='select-mask-container'
                    offsetContainerClassName='content'
                    ref={selectedMaskRef}
                />}
            <div className='select-mask-container'/>
        </div>
    );
};

export default Content;