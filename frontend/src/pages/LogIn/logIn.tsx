import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Style from "./style";
import axios from "axios";
import { redirect } from "react-router-dom";
interface LoginFormData {
  username: string;
  password: string;
}
const Login = () => {
  const [isLogin, SetIsLogin] = useState(false);
  const onFinish = (values: any) => {
    console.log("Success:", values);
    const data: LoginFormData = {
      username: values.username,
      password: values.password,
    };

    axios
      .post("/api/user/login", data)
      .then((response) => {
        const message = response.data.message;
        if (message == "Login complete") {
          SetIsLogin(true);
          return;
        } else {
          SetIsLogin(false);
          return;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Style>
      <div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Style>
  );
};

export default Login;
