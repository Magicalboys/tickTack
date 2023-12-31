import { message } from "antd";

export type MessageType = "success" | "info" | "error" | "warning";
export const useMessage = ({
    type,
    text,
  }: {
    type: MessageType;
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