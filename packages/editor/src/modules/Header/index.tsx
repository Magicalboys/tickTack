import React, {useState} from 'react';
import {Button} from 'antd';
import './index.less';
import {useDispatch} from 'react-redux';
import {setMode, setSelectedComponent, useComponentState} from '@/store/features/editorSlice';
import {useSelector} from 'react-redux';
import {DefinedVariable} from '../Control/Variable';
function Header() {
    const dispatch = useDispatch();
    const {mode} = useSelector(state => useComponentState(state));
    const [variableVisible, setVariableVisible] = useState(false);
    const handleClick = () => {
        dispatch(setSelectedComponent(null));
        dispatch(setMode('preview'));
    };
    return (
        <div className='header' >
            <h3>Magical editor</h3> 

            <div className='actionButton'>
                {mode === 'edit' && <Button onClick={() => handleClick()} type='primary' >预览</Button>}
                {mode === 'preview' && <Button onClick={() =>dispatch(setMode('edit'))} type='primary' >编辑</Button>}
                <Button onClick={() => setVariableVisible(true) } >定义变量</Button>
                <Button>撤销</Button>
            </div>
        
            <DefinedVariable open={variableVisible} onCancel={() => setVariableVisible(false)}/>
        </div>
    );
}

export default Header;