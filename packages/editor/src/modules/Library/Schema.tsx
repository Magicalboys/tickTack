// @flow 
import {Store} from '@/store';
import {EditorSlice, updateAllComponentProps} from '@/store/features/editorSlice';
import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

const Schema: React.FC<any> = () => {

    const editorOptions: any = {
        lineNumbers: 'off',
        selectOnLineNumbers: false,
        automaticLayout: true,
        overviewRulerLanes: 0, // 关闭缩略图
        scrollbar: {
            verticalScrollbarSize: 0, // 关闭垂直滚动条
            horizontalScrollbarSize: 0, // 关闭水平滚动条
            verticalSliderSize: 0, // 关闭垂直滑块
            horizontalSliderSize: 0, // 关闭水平滑块
            vertical: 'hidden', // 隐藏垂直滚动条和缩略图
            horizontal: 'hidden', // 隐藏水平滚动条和缩略图
        },
    };
    const dispatch = useDispatch();
    const {selectedComponent,selectedComponentId}: EditorSlice = useSelector((state:Store) => state.editorSlice);
    const handleEditorChange = (changeValueJson: string) => {
        const changeValue = JSON.parse(changeValueJson);
        dispatch(updateAllComponentProps({selectedComponentId, changeValue}));
    };
    return (
        <div className='schema'>
            <MonacoEditor
                width="100%"
                height="100%"
                language="json"
                theme="vs-dark"
                options={editorOptions}
                onChange={handleEditorChange}
                value={JSON.stringify(selectedComponent, null, 2)}
            />
        </div>
    );
};

export default Schema;