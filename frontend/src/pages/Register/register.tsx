import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  DatePicker,
  Upload,
  notification,
  Divider,
} from "antd";
import Style from "./style";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { URL_SERVER } from "../../constant";
import TextArea from "antd/es/input/TextArea";
import type { RcFile } from "antd/es/upload/interface";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import FirebaseServiceClient from "../../configs/firebaseConfig";
import moment from "moment";
const firebaseServiceClient = new FirebaseServiceClient();
interface RegisterFormData {
  username: string;
  password: string;
  information: {
    fname: string;
    lname: string;
    dob: string;
    address: string;
    introduce: string;
    image: string;
  };
}
const Register = () => {
  const [image, setImage] = useState<any>();
  const [imageUrl, setImageUrl] = useState("");
  const [isRegisted, setIsRegisted] = useState(false);
  const [loading, setLoading] = useState(false);
  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  const onFinish = (values: any) => {
    setIsRegisted(false);
    // console.log(moment(values.dob.$d).format("YYYY/MM/DD"));
    // return;
    const uniqueFilename = `${uuidv4()}_${image.name}`;

    const storageRef = ref(firebaseServiceClient.getStorage(), uniqueFilename);

    // 'file' comes from the Blob or File API
    const metadata = {
      contentType: "image/jpeg",
    };
    uploadBytes(storageRef, image, metadata)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
        return getDownloadURL(storageRef);
      })
      .then((downloadURL) => {
        console.log("Download URL:", downloadURL);
        setImageUrl(downloadURL);
        const data: RegisterFormData = {
          username: values.username,
          password: values.password,
          information: {
            fname: values.fname,
            lname: values.lname,
            dob: moment(values.dob.$d).format("YYYY-MM-sDD"),
            address: values.address,
            introduce: values.introduce,
            image: downloadURL,
          },
        };
        console.log(values.dob.$d);

        console.log(data);

        const url_api = URL_SERVER + "/api/user/register";
        axios
          .post(url_api, data)
          .then((response) => {
            const message = response.data.message;
            if (message === "User exits") {
              notification.error({ message: "User exits" });
            } else {
              notification.success({ message: "Completed" });
              setIsRegisted(true);
            }
            console.log(message);
          })
          .catch((error) => {
            console.error(error);
          });
        // Perform any additional actions here, such as updating state or displaying a success message.
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const handleFileUpload = (file: any) => {
    setImage(file);
  };
  return isRegisted ? (
    <Navigate to="/login" />
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
            <h1>Register</h1>
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

          <Form.Item
            className="input"
            label={<span style={{ color: "#fff" }}>First name</span>}
            name="fname"
            wrapperCol={{ span: 24 }}
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
            colon={false}
            required={false}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="input"
            label={<span style={{ color: "#fff" }}>Last name</span>}
            name="lname"
            wrapperCol={{ span: 24 }}
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
            colon={false}
            required={false}
          >
            <Input />
          </Form.Item>
          <Form.Item
            //   label="Date of birth"
            label={<span style={{ color: "#fff" }}>Date of birth</span>}
            name="dob"
          >
            <DatePicker format={"YYYY/MM/DD"} />
          </Form.Item>
          <Form.Item
            className="input"
            label={<span style={{ color: "#fff" }}>Address</span>}
            name="address"
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Please input your address!" }]}
            colon={false}
            required={false}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span style={{ color: "#fff" }}>Introduce</span>}
            name="introduce"
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="image"
            label={<span style={{ color: "#fff" }}>Avatar</span>}
          >
            <Upload
              beforeUpload={(file) => {
                handleFileUpload(file);
                return false; // Prevent automatic upload
              }}
              listType="picture-card"
            >
              <div>
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
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
            <a href="/login">
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

export default Register;
