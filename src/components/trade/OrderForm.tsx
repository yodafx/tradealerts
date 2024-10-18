import React from 'react';
import { Form, Input, Button, Select, InputNumber, Typography, App } from 'antd';
import { placeOrder } from '../../services/mt4Api';

const { Title } = Typography;
const { Option } = Select;

interface OrderFormProps {
  disabled: boolean;
}

const OrderForm: React.FC<OrderFormProps> = ({ disabled }) => {
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const onFinish = async (values: any) => {
    if (disabled) {
      message.error('Trading is currently unavailable');
      return;
    }

    try {
      const response = await placeOrder(values);
      if (response.status) {
        message.success('Order placed successfully');
        form.resetFields();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error('Error placing order');
    }
  };

  return (
    <div>
      <Title level={4} className="text-white mb-4">Place Order</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="symbol"
          label="Symbol"
          rules={[{ required: true, message: 'Please select a symbol' }]}
        >
          <Select disabled={disabled}>
            <Option value="EURUSD">EUR/USD</Option>
            <Option value="GBPUSD">GBP/USD</Option>
            <Option value="USDJPY">USD/JPY</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="volume"
          label="Volume"
          rules={[{ required: true, message: 'Please input the volume' }]}
        >
          <InputNumber min={0.01} step={0.01} disabled={disabled} />
        </Form.Item>
        <Form.Item
          name="stopLoss"
          label="Stop Loss"
        >
          <InputNumber disabled={disabled} />
        </Form.Item>
        <Form.Item
          name="takeProfit"
          label="Take Profit"
        >
          <InputNumber disabled={disabled} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={disabled}>
            Place Order
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderForm;