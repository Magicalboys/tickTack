import { Fragment, useState } from "react";
import menu from "../../../i18/CN.json";
import { jsonToArr } from "../../../util/jsonToObj";
import Setting from "./setting/index";
import UniversalComponent from "./UniversalComponent/index";
import Code from "./code/index";
import "./style.scss";

const Aside: React.FC = () => {
  const list = jsonToArr(menu.MenuSet);
  const [param, setParam] = useState("UniversalComponent");

  // 函数区
  const chooseShow = (param: string) => {
    return (
      <>
        {list.map((item) => {
          if (param === item.key) {
            if (param === "UniversalComponent") {
              return (
                <>
                  <UniversalComponent></UniversalComponent>
                </>
              );
            } else if (param === "Setting") {
              return (
                <>
                  <Setting></Setting>
                </>
              );
            } else if (param === "Code") {
              return (
                <>
                  <Code></Code>
                </>
              );
            }
          }
        })}
      </>
    );
  };

  const chooseParam = (toParam: string) => {
    console.log(toParam);
    setParam(toParam);
  };

  // 组件区
  const MenuData =
    list !== null ? (
      list.map((item, index) => {
        return (
          <Fragment key={String(index) + item.value}>
            <div
              onClick={() => chooseParam(item.key)}
              className='container-menu-item'
            >
              {item.value}
            </div>
          </Fragment>
        );
      })
    ) : (
      <div>kong</div>
    );

  return (
    <>
      <div className='container-aside'>
        <div className='container-menu'>{MenuData}</div>
        <div>{chooseShow(param)}</div>
      </div>
    </>
  );
};

export default Aside;
