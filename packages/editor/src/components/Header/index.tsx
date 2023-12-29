import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { CounterSliceType } from "@/store";
import "./style.scss";

const Header: React.FC = () => {
  const [preview, setPreview] = useState(false);
  const contentRef = useSelector(
    (state: CounterSliceType) => state.tickTack.ref
  );
  const handlePreview = () => {
    if (contentRef) {
      contentRef.style.width = "100vw";
      contentRef.style.height = "100vh";
      contentRef.style.position = "absolute";
      contentRef.style.zIndex = "999";
      contentRef.style.backgroundColor = "white";
    }
    setPreview(!preview);
  };
  const cancelPreview = () => {
    if (contentRef) {
      contentRef.style.width = "";
      contentRef.style.height = "";
      contentRef.style.position = "";
      contentRef.style.zIndex = "0";
      contentRef.style.backgroundColor = "";
    }
    setPreview(!preview);
  };
  return (
    <>
      <div className="container-header">
        <div className="header-box">
          <div className="session-header header-left">
            <h3>TickTack</h3>
          </div>
          <div className="session-header header-center">
            <Button>PC</Button>
            <Button>mobile</Button>
          </div>
          <div className="session-header header-right">
            {preview ? (
              <Button onClick={cancelPreview}>退出预览</Button>
            ) : (
              <Button onClick={handlePreview}>预览</Button>
            )}
            <Button>退出</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
