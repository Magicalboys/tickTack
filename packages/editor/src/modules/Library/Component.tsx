// @flow 
import * as React from 'react';
import {ComponentItem} from '@/dnd/index';
import {ComponentConfig, ComponentConfigState} from '@/types/schema';
import {updateComponentsTree} from '@/store/features/editorSlice';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {useConfigState} from '@/store/features/configSlice';
import {useMemo} from 'react';

const Component = ({onDragging}: { onDragging?: () => void })=> {
    const dispatch = useDispatch();
    const {componentConfig}:ComponentConfigState = useSelector(state => useConfigState(state));
    const onDragEnd = (dropResult: any) =>{
        const component = {
            id: new Date().getTime(),
            name: dropResult.name,
            props: dropResult.props,
            desc: dropResult.desc,
        };
        // 添加 更新 组件树
        dispatch(updateComponentsTree({component, id: dropResult.id}));
    };
    
    // 加载所有组件
    const components = useMemo(() => {
        const component = Object.values(componentConfig)
            // 过滤掉隐藏的组件
            .filter(config => !config.hiddenInMaterial)
            .map((config: ComponentConfig) => {
                return {
                    name: config.name,
                    description: config.desc,
                    order: config.order
                };
            });
        component.sort((x,y) => x.order - y.order);
        return component;
    },[componentConfig]);

    return (
        <div className='component'>
            {components.map(item => <ComponentItem key={item.name} onDragging={onDragging} onDragEnd={onDragEnd} {...item}/>)} 
        </div>
    );
};

export default Component;