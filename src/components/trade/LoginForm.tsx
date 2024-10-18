import React from 'react';
import { Form, Input, Button } from 'antd';

interface LoginFormProps {
  onLogin: (credentials: { account_id: string; password: string; server: string }) => void;
  disabled: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, disabled }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    onLogin(values);
  };

  return (
    <Form form={form} layout="inline" onFinish={onFinish}>
      <Form.Item
        name="account_id"
        rules={[{ required: true, message: 'Please input your account ID!' }]}
      >
        <Input placeholder="Account ID" disabled={disabled} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder="Password" disabled={disabled} />
      </Form.Item>
      <Form.Item
        name="server"
        rules={[{ required: true, message: 'Please input your server!' }]}
      >
        <Input placeholder="Server" disabled={disabled} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={disabled}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;