import { Form, Input } from "antd";
import { message } from "../../../../../types/firebase";
import Style from "./style";
import Button from "../../../../../utils/button";
import { SendOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";

const Footer = ({
  client,
  sender,
  recipient = undefined,
}: {
  client: any;
  sender: string;
  recipient: string | undefined;
}) => {
  const [inputValue, setInputValue] = useState("");
  const onClick = async () => {
    if (!inputValue) return;
    const data: message = {
      sender: sender,
      time: new Date().toString(),
      body: inputValue,
    };
    try {
      setInputValue("");
      await client.sendMessage(recipient, data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  const handleEnterKeyPress = (e: any) => {
    if (e.key === "Enter") {
      // Gọi hàm xử lý gửi dữ liệu ở đây
      onClick();
    }
  };
  return (
    <Style className="d-flex justify-content-center align-items-center">
      <Input
        className="input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleEnterKeyPress}
      />
      <Button
        type="primary"
        htmlType="submit"
        content={<SendOutlined rev="" />}
        className="btn-submit"
        onClick={onClick}
      />
    </Style>
  );
};
export default Footer;
