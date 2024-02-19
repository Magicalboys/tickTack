import React from 'react';
import {Button, Collapse, Drawer, Space} from 'antd';
import {useRef, useState} from 'react';
import FlowEvent from '../FlowEvent/panel';
import {EditorSlice, updateComponentProps} from '@/store/features/editorSlice';
import {useSelector} from 'react-redux';
import {useConfigState} from '@/store/features/configSlice';
import {useDispatch} from 'react-redux';
import {Store} from '@/store';


const ComponentEvent = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [eventName, setEventName] = useState('');
    const {componentConfig} = useSelector(state => useConfigState(state));
    const {selectedComponent, selectedComponentId}: EditorSlice = useSelector((state:Store) => state.editorSlice);

    const flowEventRef = useRef<any>();

    function save() {
        if (!selectedComponentId) return;
        const value = flowEventRef.current?.save();
        const changeValue = {
            [eventName]: value,
        };
        dispatch(updateComponentProps({selectedComponentId, changeValue}));
        setOpen(false);
    }

    if (!selectedComponent) return null;

    return (
        <div className='px-[12px]'>
            {(componentConfig[selectedComponent.name]?.events || []).map((event: any) => {
                return (
                    <Collapse key={event.name} defaultActiveKey={event.name}>
                        <Collapse.Panel header={event.desc} key={event.name}>
                            <div className='text-center'>
                                <Button
                                    onClick={() => {
                                        setEventName(event.name);
                                        setOpen(true);
                                    }}
                                    type='primary'
                                >
                  设置事件流
                                </Button>
                            </div>
                        </Collapse.Panel>
                    </Collapse>
                );
            })}
            <Drawer
                title="设置事件流"
                width="100vw"
                open={open}
                zIndex={1005}
                onClose={() => { setOpen(false); }}
                extra={(
                    <Space>
                        <Button
                            type='primary'
                            onClick={save}
                        >
              保存
                        </Button>
                        <Button
                            onClick={() => { setOpen(false); }}
                        >
              取消
                        </Button>
                    </Space>
                )}
                push={false}
                destroyOnClose
                // styles={{body: {padding: 0}}}
            >
                <FlowEvent flowData={selectedComponent?.props?.[eventName]} ref={flowEventRef} />
            </Drawer>
        </div>
    );
};




export default ComponentEvent;