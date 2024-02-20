import React, {useState} from 'react';
import {Button} from 'antd';
import './index.less';
import {useDispatch} from 'react-redux';
import {deleteComponent, redo, setMode, setSelectedComponent, undo, useComponentState} from '@/store/features/editorSlice';
import {useSelector} from 'react-redux';
import {DefinedVariable} from '../FlowEvent/SettingPanel/Action/Variable';
import {DeleteOutlined, RedoOutlined, UndoOutlined} from '@ant-design/icons';
function Header() {
    const dispatch = useDispatch();
    const {mode} = useSelector(state => useComponentState(state));
    const [variableVisible, setVariableVisible] = useState(false);
    const {selectedComponentId} = useSelector(state => useComponentState(state));

    const handleClick = () => {
        dispatch(setSelectedComponent(null));
        dispatch(setMode('preview'));
    };
    return (
        <div className='header' >
            <h3>Magical editor</h3>
            <div>
                <Button onClick={() => dispatch(undo()) } ><UndoOutlined /></Button>
                <Button onClick={() => dispatch(redo()) } ><RedoOutlined /></Button>
                <Button onClick={() => dispatch(deleteComponent({componentId: selectedComponentId})) } ><DeleteOutlined /></Button>
            </div> 
            <div className='actionButton'>
                <Button onClick={() => setVariableVisible(true) } >定义变量</Button>
                {mode === 'edit' && <Button onClick={() => handleClick()} type='primary' >预览</Button>}
                {mode === 'preview' && <Button onClick={() =>dispatch(setMode('edit'))} type='primary' >编辑</Button>}
            </div>
            <DefinedVariable open={variableVisible} onCancel={() => setVariableVisible(false)}/>
        </div>
    );
}

export default Header;