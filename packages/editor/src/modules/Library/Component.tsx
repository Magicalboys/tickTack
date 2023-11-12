// @flow 
import * as React from 'react';
import {ComponentItem} from '@/dnd/index';
import {ComponentConfig, ComponentConfigState} from '@/types/schema';
import {updateComponentsTree} from '@/store/features/editorSlice';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {useConfigState} from '@/store/features/configSlice';
import {useMemo} from 'react';

const Component = () => {
    const dispatch = useDispatch();
    const {componentConfig}:ComponentConfigState = useSelector(state => useConfigState(state));
    const onDragEnd = (dropResult: any) =>{
        const component = {
            id: new Date().getTime(),
            name: dropResult.name,
            props: dropResult.props,
        };
        // 添加 更新 组件树
        dispatch(updateComponentsTree({component, id: dropResult.id}));
    };
    
    const components = useMemo(() => {
        const component = Object.values(componentConfig).map((config: ComponentConfig) => {
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
            {/* <ComponentItem onDragEnd={onDragEnd} description= '按钮' name={ItemType.Button}/>
            <ComponentItem onDragEnd={onDragEnd} description='间距' name={ItemType.Space}/>
    <ComponentItem onDragEnd={onDragEnd} description='选择' name={ItemType.Select}/> */}
            {components.map(item => <ComponentItem key={item.name} onDragEnd={onDragEnd} {...item}/>)} 
        </div>
    );
};

export default Component;