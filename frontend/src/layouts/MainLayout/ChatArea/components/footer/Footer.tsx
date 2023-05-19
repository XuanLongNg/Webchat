import { Button, Form, Input } from "antd";
import { message } from "../../../../../types/firebase";
import Style from "./style";

const Footer = (props: any) => {
  // console.log("Message", props);
  const client = props.client;
  const onFinish = (values: any) => {
    const data: message = {
      sender: props.sender,
      time: new Date().toString(),
      body: values.message,
    };
    // console.log(data);

    client
      .sendMessage(props.recipient, data)
      .then()
      .catch((err: any) => console.log(err));
    // console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Style>
      <Form
        name="basic"
        labelCol={{ span: 32 }}
        wrapperCol={{ span: 32 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="inline"
      >
        <Form.Item
          wrapperCol={{ span: 32 }}
          name="message"
          rules={[{ required: true, message: "Enter your message!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Style>
  );
};
export default Footer;
