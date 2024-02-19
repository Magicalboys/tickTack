import {getComponentById} from '@/modules/Content/utils';
import {useConfigState} from '@/store/features/configSlice';
import {useComponentState, setSelectedComponent, deleteComponent} from '@/store/features/editorSlice';
import {DeleteOutlined} from '@ant-design/icons';
import {Dropdown, Popconfirm, Space} from 'antd';
import React, {forwardRef, useEffect, useImperativeHandle, useMemo, useState} from 'react';
import {createPortal} from 'react-dom';
import {useSelector, useDispatch} from 'react-redux';

interface Props {
  // 容器class
  containerClassName: string,
  // 相对容器class
  offsetContainerClassName: string
}

// 封装选中遮罩组件  
const SelectedMask = ({containerClassName, offsetContainerClassName}: Props, ref: any) =>{
    const dispatch = useDispatch();
    const [position, setPosition] = useState({
        top: 0, 
        left: 0,
        width: 0,
        height: 0,
        toolsTop: 0,
        toolsLeft: 0
    });
    const {componentConfig} = useSelector(state => useConfigState(state)); 
    const {selectedComponent,selectedComponentId, componentTree} = useSelector(state => useComponentState(state));

    // 更新位置
    const updatePosition = () => {
        if (!selectedComponentId) return;
        // 获取容器
        const container = document.querySelector(`.${offsetContainerClassName}`);
        if (!container) return;
        // 获取被选中的组件
        const node = document.querySelector(`[data-component-key="${selectedComponentId}"]`);
        if (!node) return;
        // 获取节点位置
        const {top,left,width,height} = node.getBoundingClientRect();
        // 获取容器位置
        const {top: containerTop, left: containerLeft} = container.getBoundingClientRect();
        // 计算工具栏位置
        let toolsTop = top - containerTop + container.scrollTop;
        let toolsLeft = left - containerLeft + width;

        if (toolsTop <= 0){
            toolsTop -= -30;
            toolsLeft -= 10;
        }
        // 更新位置
        setPosition({
            top: top - containerTop + container.scrollTop,
            left: left - containerLeft + container.scrollTop,
            width,
            height,
            toolsTop,
            toolsLeft
        });
    };

    // 获取当前组件的父组件
    const parentComponents = useMemo(() => {
        const parentComponents = [];
        let component = selectedComponent;
        while (component?.parentId) {
            component = getComponentById(component.parentId, componentTree);
            parentComponents.push(component);
        }
        return parentComponents;
    },[selectedComponent]);

    const deleteHandle = () => {
        dispatch(deleteComponent({componentId: selectedComponentId}));
        setSelectedComponent(null);
    };

    useEffect(() => {
        updatePosition();
    }, [selectedComponentId]);

    // 对外暴露更新位置方法
    useImperativeHandle(ref, () => ({updatePosition,}));

    return createPortal((
        <>
            <div style={{
                position: 'absolute',
                left: position.left,
                top: position.top,
                backgroundColor: 'rgba(66, 133, 244, 0.2)',
                border: '1px solid rgb(66, 133, 244)',
                pointerEvents: 'none',
                width: position.width,
                height: position.height,
                zIndex: 1,
                borderRadius: 4,
                boxSizing: 'border-box',
            }}/>
            <div
                style={{
                    position: 'absolute',
                    left: position.toolsLeft,
                    right: position.toolsTop,
                    fontSize: '14px',
                    color: '#ff4d4f',
                    zIndex: 11,
                    display: (!position.width || position.width < 10) ? 'none' : 'inline',
                    transform: 'translate(-100%, -100%)',
                }}
            >
                <Space>
                    <Dropdown
                        menu={{
                            items: parentComponents.map(item => ({
                                key: item?.id || '',
                                label: item?.desc || item?.name,
                            })),
                            onClick: (({key}) => setSelectedComponent(Number(key)))
                        }}
                        placement='bottomRight'
                        disabled={parentComponents.length === 0}
                    >
                        <div
                            style={{
                                padding: '0 8px',
                                backgroundColor: '#1890ff',
                                borderRadius: 4,
                                color: '#fff',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {componentConfig[selectedComponent?.name || '']?.desc}
                        </div>
                    </Dropdown>
                    {+(selectedComponent || 0) !== 1 && (
                        <div style={{padding: '0 8px', backgroundColor: '#1890ff'}}>
                            <Popconfirm
                                title="确认删除？"
                                overlayClassName='min-w-130px'
                                okText={<div className="delete-confirm-btn" style={{padding: '0 7px'}}>确认</div>}
                                cancelText={<div className="delete-confirm-btn" style={{padding: '0 7px'}}>取消</div>}
                                onConfirm={deleteHandle}
                                // getPopupContainer={n => n.parentNode}
                                placement="bottomRight"
                                okButtonProps={{style: {padding: 0}}}
                                cancelButtonProps={{style: {padding: 0}}}
                            >
                                <DeleteOutlined
                                    style={{color: '#fff'}}
                                />
                            </Popconfirm>
                        </div>
                    )}
                </Space>
            </div>
        </>
    ),document.querySelector(`.${containerClassName}`)!);
};

export default forwardRef(SelectedMask);
