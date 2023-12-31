import { message } from "antd";

export const useMessage = ({
    type,
    text,
  }: {
    type: "success" | "info" | "error" | "warning";
    text: string;
  }) => {
    const [messageApi, contextHolder] = message.useMessage();
  
    const info = () => {
      messageApi.open({
        type: type,
        content: text,
      });
    };
  
    return [info, contextHolder];
  };