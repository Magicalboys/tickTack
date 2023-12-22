import React, { useState } from "react";
import { generateCode } from "./component/generateCode";
import { useSelector } from "react-redux";
import { storeData } from "@tickTack/types/src/store";
import ShowCode from "./component/showCode";

// const worker = new Worker("../../../../../util/worker.ts");

const CodeBox: React.FC = () => {
  const contentData = useSelector(
    (state: Record<string, storeData>) => state.tickTack.contentData
  );
  const [code] = useState<string>(generateCode(contentData));

  // useEffect(() => {
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
