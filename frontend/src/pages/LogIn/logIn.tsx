import React, { useState } from "react";
import { Button, Form, Input, notification, Divider } from "antd";
import Style from "./style";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { URL_SERVER } from "../../constant";
interface LoginFormData {
  username: string;
  password: string;
}

type NotificationType = "success" | "error";

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
          localStorage.id = response.data.id;
          console.log(localStorage.id);
          notification.success({
            message: "Login complete",
          });
          SetIsLogin(true);
          return;
        } else {
          notification.error({
            message: "User or password incorrect",
          });
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
    <Navigate to="/" />
  ) : (
    <Style>
      <div className="container">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item className="container-header d-flex justify-content-center align-items-center">
            <h1>Login</h1>
          </Form.Item>
          <Form.Item
            className="input"
            label={<span style={{ color: "#fff" }}>Username</span>}
            name="username"
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Please input your username!" }]}
            colon={false}
            required={false}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="input"
            label={<span style={{ color: "#fff" }}>Password</span>}
            name="password"
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Please input your password!" }]}
            colon={false}
            required={false}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button className="btn" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Divider style={{ borderColor: "white", color: "white" }}>
              or
            </Divider>
            <a href="/register">
              <Button className="btn" type="primary">
                Register
              </Button>
            </a>
          </Form.Item>
        </Form>
      </div>
    </Style>
  );
};

export default Login;
