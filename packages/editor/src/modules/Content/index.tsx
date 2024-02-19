import React, {useEffect, useRef} from 'react';
import './index.less';
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
    
    // 通过监听 点击事件 获取当前被选中组件的 id
    const createMask = (e:any) => {
        // 事件被触发后 返回包含事件流中元素的对象数组
        const path = e.composedPath();
        for (let i = 0 ; i < path.length ; i ++){
            const node = path[i];
            if (node.getAttribute){
                // 查找 被触发的事件流里面 key 为 component-key 的 组件
                // 即为 当前 被选中的 组件
                if (node.getAttribute('data-component-key')){
                    const componentId = node.getAttribute('data-component-key');
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
        <div className='content'>
            <React.Suspense fallback="loading...">
                {renderComponents(componentTree,componentConfig, variables)}
            </React.Suspense>
            {selectedComponentId && 
                <SelectedMask
                    containerClassName='select-mask-container'
                    offsetContainerClassName='content'
                    ref={selectedMaskRef}
                />}
            <div className='select-mask-container'/>
        </div>
    );
};

export default Content;