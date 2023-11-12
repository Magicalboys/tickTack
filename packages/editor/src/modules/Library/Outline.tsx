// @flow 
import {setSelectedComponent, useComponentState} from '@/store/features/editorSlice';
import {Tree} from 'antd';
import * as React from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import './index';
const Outline = () => {
    const dispatch = useDispatch();
    const {componentTree} = useSelector(state => useComponentState(state));
    const componentSelect = ([selectedKey]:any) =>{
        dispatch(setSelectedComponent(selectedKey));
    };
    return (
        <div className='Outline'>
            <Tree
                fieldNames={{title: 'name', key: 'id'}}
                treeData={componentTree as any}
                showLine
                defaultExpandAll
                onSelect={componentSelect}
            />           
        </div>
    );
};

export default Outline;