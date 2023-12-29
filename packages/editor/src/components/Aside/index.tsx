import { Fragment, useState } from "react";
import { Divider, Empty, Popover, message } from "antd";
import { SmallDashOutlined } from "@ant-design/icons";
import classnames from "classnames";
import Setting from "./setting";
import UniversalComponent from "./UniversalComponent";
import Code from "./code";
import Tree from './componentTree/index';
import "./style.scss";

const Aside: React.FC = () => {
  const list: Array<{
    icon: React.ReactNode;
    label: string;
    value: string;
  }> = [
    { icon: "组件", label: "组件", value: "UniversalComponent" },
    { icon: "代码", label: "代码", value: "Code" },
    { icon: "设置", label: "系统设置", value: "Setting" },
    { icon: "大纲", label: "组件大纲", value: "Tree" },
  ];
  const [param, setParam] = useState("UniversalComponent");

  return (
    <>
      <div className="tt-aside">
        {/* 左侧的aside图标 */}
        <div className="tt-menu-aside">
          {list ? (
            list.map((item, index) => {
              return (
                <Fragment key={String(index) + item.value}>
                  <Popover
                    placement="right"
                    content={item.label}
                    trigger="hover"
                  >
                    <div
                      onClick={() => setParam(item.value)}
                      className={classnames("tt-menu-aside-item", {
                        [`btn-active`]: item.value === param,
                      })}
                    >
                      {item.icon}
                    </div>
                  </Popover>
                </Fragment>
              );
            })
          ) : (
            <Empty />
          )}
        </div>
        {/* 右侧的内容区 */}
        <div className="tt-menu-content">
          <div className="tt-menu-content-header">
            <span>{list.find((v) => v.value === param)?.label}</span>
            <span
              className="tt-menu-content-header-icon"
              onClick={() => {
                message.warning("功能暂未实现！");
              }}
            >
              <SmallDashOutlined />
            </span>
          </div>
          <Divider style={{ marginTop: "12px" }}></Divider>
          <div className="tt-menu-content-base">
            {list &&
              list.map((item, index) => {
                if (param === item.value) {
                  switch (param) {
                    case "UniversalComponent":
                      return (
                        <UniversalComponent key={index}></UniversalComponent>
                      );
                    case "Setting":
                      return <Setting key={index}></Setting>;
                    case "Code":
                      return <Code key={index}></Code>;
                    case "Tree": 
                      return <Tree key={index}></Tree>
                    default:
                      return "";
                  }
                }
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Aside;
