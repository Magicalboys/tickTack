import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Store} from '@/store';
import {EditorSlice, updateComponentProps} from '@/store/features/editorSlice';
import {Collapse, Input, Select, TreeSelect} from 'antd';
import {Component} from '@/types/schema';
import {getComponentById} from '@/modules/Content/utils';
import {useConfigState} from '@/store/features/configSlice';
import ComponentEmpty from '@/common/Empty';
function ComponentsEvent() {
    const dispatch = useDispatch();
    const {componentConfig} = useSelector(state => useConfigState(state));
    const [curSelectedComponent,setCurSelectedComponent] = useState<Component|null>();
    const {selectedComponent, selectedComponentId,componentTree}: EditorSlice = useSelector((state:Store) => state.editorSlice);

    // 事件类型
    const eventTypeChange = (eventName: string, value: string) => {
        if (!selectedComponentId) return ;
        const changeValue = {
            [eventName]: {
                type: value
            }
        };
        dispatch(updateComponentProps({selectedComponentId,changeValue}));
    };

    // 消息类型 改变
    const messageTypeChange = (eventName: string , value: string) => {
        if (!selectedComponentId) return;
        const changeValue = {
            [eventName]: {
                ...selectedComponent?.props?.[eventName],
                config:{
                    ...selectedComponent?.props?.[eventName]?.config,
                    type: value,
                }
            }
        };
        dispatch(updateComponentProps({selectedComponentId,changeValue}));
    };

    //消息文本 改变
    const messageTextChange = (eventName: string , value: string) => {
        if (!selectedComponentId) return;
        const changeValue = {
            [eventName]: {
                ...selectedComponent?.props?.[eventName],
                config:{
                    ...selectedComponent?.props?.[eventName]?.config,
                    text: value,
                }
            }
        };
        dispatch(updateComponentProps({selectedComponentId,changeValue}));
    };

    // 修改选中组件
    const componentChange = (eventName: string, value: number) => {
        if (!selectedComponentId) return ;
        setCurSelectedComponent(getComponentById(value,componentTree));
        const changeValue = {
            [eventName]: {
                ...selectedComponent?.props?.[eventName],
                config:{
                    ...selectedComponent?.props?.[eventName]?.config,
                    componentId: value,
                }
            }
        };
        dispatch(updateComponentProps({selectedComponentId,changeValue}));
    };

    // 触发的方法
    const componentMethodChange = (eventName: string, value: string) => {
        if (!selectedComponentId) return ;
        const changeValue = {
            [eventName]: {
                ...selectedComponent?.props?.[eventName],
                config:{
                    ...selectedComponent?.props?.[eventName]?.config,
                    method: value,
                }
            }
        };
        dispatch(updateComponentProps({selectedComponentId,changeValue}));
    };

    if (!selectedComponent) return <ComponentEmpty/>;

    return (
        <div className='event'>
            {(componentConfig[selectedComponent.name]?.events || []).map((setting:any) => {
                return (
                    <Collapse key={setting.name} defaultActiveKey={setting.name}>
                        <Collapse.Panel header={setting.desc} key={setting.name}>
                            <div className='' style={{display: 'flex', alignItems: 'center', gap: 10}}>
                                <div>动作：</div>
                                <div>
                                    <Select
                                        style={{width: 160}}
                                        options={[
                                            {label: '显示提示', value:'showMessage'},
                                            {label: '组件方法', value:'componentFunction'},
                                            {label: '设置变量', value: 'SetVariable'},
                                        ]}
                                        value={selectedComponent?.props?.[setting.name]?.type}
                                        onChange={(value) => eventTypeChange(setting.name, value)}
                                    />
                                </div>
                            </div>
                            {selectedComponent?.props?.[setting.name]?.type === 'showMessage' &&
                            (<div style={{display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10}}>
                                <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                                    <div>类型：</div>
                                    <div>
                                        <Select
                                            style={{width: 160}}
                                            options={[
                                                {label: '成功', value: 'success'},
                                                {label: '失败', value: 'error'},
                                            ]}
                                            onChange={(value) => messageTypeChange(setting.name, value)}
                                            value={selectedComponent?.props?.[setting.name]?.config?.type}
                                        />
                                    </div>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                                    <div>文本：</div>
                                    <div>
                                        <Input
                                            style={{width: 160}}
                                            onChange={(e) => messageTextChange(setting.name, e.target.value)}
                                            value={selectedComponent?.props?.[setting.name]?.config?.text }
                                        />
                                    </div>
                                </div>
                            </div>)}
                            {selectedComponent?.props?.[setting.name]?.type === 'componentFunction' &&
                            <div style={{display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10}}>
                                <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                                    <div>组件：</div>
                                    <div>
                                        <TreeSelect
                                            style={{width: 160}}
                                            treeData={componentTree}
                                            
                                            fieldNames={{
                                                label: 'name',
                                                value: 'id',
                                            }}
                                            onChange={(id) => componentChange(setting.name, id)}
                                            value={selectedComponent?.props?.[setting.name]?.config?.componentId}
                                        />
                                    </div>
                                </div>
                                {componentConfig[curSelectedComponent?.name || '']?.methods && (
                                    <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                                        <div>方法：</div>
                                        <div>
                                            <Select
                                                style={{width: 160}}
                                                options={componentConfig[curSelectedComponent?.name || ''].methods.map(
                                                    (method:any) => ({label: method.label, value: method.name})
                                                )}
                                                value={selectedComponent?.props?.[setting.name]?.config?.method}
                                                onChange={(value) => componentMethodChange(setting.name, value)}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            }
                        </Collapse.Panel>
                    </Collapse>
                );
            })}
        </div>
    );
}

export default ComponentsEvent;