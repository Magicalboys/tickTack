// @flow 
import React from 'react';
import {Tabs} from 'antd';
import './index.less';
import Component from './Component';
import Schema from './Schema';
import Outline from './Outline';
import styled from '@emotion/styled';

const {TabPane} = Tabs;

const StyledTabs = styled(Tabs)`
    width: 30px;
    padding: 0px;
    margin: 0px;
`;

const StyledTabPane = styled(TabPane)`
    padding: 0px !important;
    margin: 0px;
`;
const Library = () => {
    return (
        <div className='library'>
            <StyledTabs tabPosition={'left'} >
                <StyledTabPane tab="组件" key="1">
                    <Component />
                </StyledTabPane>
                <TabPane tab="大纲" key="2">
                    <Outline />
                </TabPane>
                <TabPane tab="源码" key="3">
                    <Schema/>
                </TabPane>
            </StyledTabs>
        </div>
    );
};
export default Library;