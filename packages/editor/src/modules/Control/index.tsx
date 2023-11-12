import React from 'react';
import './index.less';
import {Tabs} from 'antd';
import ComponentsAttr from './Attribute';
import ComponentsEvent from './Event';
function Control() {

    return (
        <div className='control'>
            <Tabs
                defaultActiveKey='1'
                centered
                style={{width: '100%'}}
                items={[
                    {
                        label: '属性',
                        key: '1',
                        children: <ComponentsAttr/>,
                    },
                    {
                        label: '事件',
                        key: '2',
                        children: <ComponentsEvent/>,
                    },
                    {
                        label: '外观',
                        key: '3',
                        children: '外观',
                    }
                ]}
                indicatorSize={(origin) => origin + 25}

            />
        </div>
    );
}

export default Control;