import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Style from "./style";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { URL_SERVER } from "../../constant";
interface LoginFormData {
  username: string;
  password: string;
}
const Login = () => {
  const [isLogin, SetIsLogin] = useState(false);
  const onFinish = (values: any) => {
    const data: LoginFormData = {
      username: values.username,
      password: values.password,
    };
    const url_api = URL_SERVER + "/api/user/login";
    axios
      .post(url_api, data)
      .then((response) => {
        const message = response.data.message;
        console.log(message);
        if (message === "Login complete") {
          document.cookie = response.data.id;
          console.log(document.cookie);

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
    // console.log("Failed:", errorInfo);
  };

  return isLogin ? (
    <Navigate to="/message" />
  ) : (
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
