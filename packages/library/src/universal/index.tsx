import { DatabaseOutlined, BranchesOutlined, GoldOutlined } from "@ant-design/icons";
import React from "react";

export const asideMenu: Array<{
    icon: React.ReactNode;
    label: string;
    value: string;
}> = [
    {
        icon: <DatabaseOutlined />,
        label: '组件',
        value: 'UniversalComponent'
    },
    {
        icon: <BranchesOutlined />,
        label: '设置',
        value: 'Setting'
    },
    {
        icon: <GoldOutlined />,
        label: '代码',
        value: 'Code'
    }
] 