import React, { useEffect, useState } from "react";
import { generateCode } from "./component/generateCode";
import { useSelector } from "react-redux";
import ShowCode from "./component/showCode";

// const worker = new Worker("../../../../../util/worker.ts");

const CodeBox: React.FC = () => {
  const contentData = useSelector((state) => state.tickTack.contentData);
  const [code, setCode] = useState<string>(generateCode(contentData));

  // useEffect(() => {
  //   const code = generateCode(contentData);
  //   setCode(code);
  //   // worker.postMessage(code);
  //   console.log("Message posted to worker");
  // }, [contentData]);

  // useEffect(() => {
  //   worker.onmessage = function (e) {
  //     console.log(e.data, "e.datae.data");
  //     setCode(e.data);
  //   };
  // }, []);

  return (
    <>
      <ShowCode codeJson={code}></ShowCode>
    </>
  );
};

export default CodeBox;
