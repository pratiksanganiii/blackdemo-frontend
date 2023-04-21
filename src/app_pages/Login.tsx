import React, { useEffect } from "react";

import { Button, Checkbox, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth/authSlice";
import { LoginPayloadProps } from "../store/auth/authTypes";
import { useNavigate } from "react-router-dom";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const Login: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values: LoginPayloadProps) => {
    dispatch(login(values));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      id="login-form"
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
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
  );
};

export default Login;
