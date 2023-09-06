import { Fragment, useState } from "react";
import { Empty } from "antd";
import classnames from "classnames";
import menu from "../../../i18/CN.json";
import { jsonToArr } from "../../../util/jsonToObj";
import Setting from "./setting";
import UniversalComponent from "./UniversalComponent";
import Code from "./code";
import "./style.scss";

const Aside: React.FC = () => {
  const list = jsonToArr(menu.MenuSet);
  const [param, setParam] = useState("UniversalComponent");

  // 函数区
  const chooseShow = (param: string) => {
    return (
      <>
        {list.map((item, index) => {
          if (param === item.key) {
            switch (param) {
              case "UniversalComponent":
                return <UniversalComponent key={index}></UniversalComponent>;
              case "Setting":
                return <Setting key={index}></Setting>;
              case "Code":
                return <Code key={index}></Code>;
              default:
                return "";
            }
          }
        })}
      </>
    );
  };

  // 组件区
  const MenuData =
    list !== null ? (
      list.map((item, index) => {
        return (
          <Fragment key={String(index) + item.value}>
            <div
              onClick={() => setParam(item.key)}
              className={classnames(
                { [`btn-${param}`]: item.key === param },
                "container-menu-item"
              )}
            >
              {item.value}
            </div>
          </Fragment>
        );
      })
    ) : (
      <Empty />
    );

  return (
    <>
      <div className="container-aside">
        <div className="container-menu">{MenuData}</div>
        <div>{chooseShow(param)}</div>
      </div>
    </>
  );
};

export default Aside;
