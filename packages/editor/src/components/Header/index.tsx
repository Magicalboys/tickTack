import React from "react";
import { Button } from "antd";
import "./style.scss";

const Header: React.FC = () => {
    return <>
        <div className="container-header">
            <div className="header-box">
                <div className="session-header header-left">
                    <h3>TickTack 可视化编辑器</h3>
                </div>
                <div className="session-header header-center">
                    <Button>icon</Button>
                    <Button>icon</Button>
                </div>
                <div className="session-header header-right">
                    <Button>预览</Button>
                    <Button>退出</Button>
                </div>
            </div>
        </div>
    </>
}

export default Header;