import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register, resetFormErrors } from "../store/auth/authSlice";
import { assignErrorToInput } from "../store/root/rootService";

const Register = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [registerForm] = Form.useForm();
  const { token, errors } = useSelector((state: any) => state.auth);

  const onFinish = (values: any) => {
    if (values.password === values.confirmPassword) {
      dispatch(register(values));
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (errors.length) {
      assignErrorToInput(registerForm, errors);
      dispatch(resetFormErrors());
    }
  }, [errors, dispatch, registerForm]);

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      id="login-form"
      wrapperCol={{ span: 16 }}
      form={registerForm}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <h3 className="align-center">Register</h3>

      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: "Please input your First Name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "Please input your Last Name!" }]}
      >
        <Input />
      </Form.Item>

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
        label="Confirm Password"
        name="confirmPassword"
        rules={[{ required: true, message: "Please confirm your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button className="align-center" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

      <div className="register-link">
        <Link className="align-center" to={"/login"}>
          Existing User? Login here
        </Link>
      </div>
    </Form>
  );
};

export default Register;
