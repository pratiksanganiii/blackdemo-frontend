import React, { useEffect } from "react";

import { Button, Checkbox, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login, resetFormErrors } from "../store/auth/authSlice";
import { LoginPayloadProps } from "../store/auth/authTypes";
import { Link, useNavigate } from "react-router-dom";
import { assignErrorToInput } from "../store/root/rootService";

const Login: React.FC = () => {
  const { user, errors } = useSelector((state: any) => state.auth);
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [loginForm] = Form.useForm();

  const onFinish = (values: LoginPayloadProps) => {
    dispatch(login(values));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (Array.isArray(errors) && errors.length) {
      assignErrorToInput(loginForm, errors);
      dispatch(resetFormErrors());
    }
  }, [errors, dispatch, loginForm]);

  return (
    <Form
      form={loginForm}
      name="basic"
      labelCol={{ span: 8 }}
      id="login-form"
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <h3 className="align-center">Login</h3>
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
        <Checkbox className="align-center">Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button className="align-center" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <div className="register-link">
        <Link className="align-center" to={"/register"}>
          New User? Register here
        </Link>
      </div>
    </Form>
  );
};

export default Login;
