import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker, InputNumber, Radio, Space } from 'antd';
import moment from 'moment';

const { Option } = Select;

interface TradeFormProps {
  onAddTrade: (trade: any) => void;
  initialValues?: any;
}

const TradeForm: React.FC<TradeFormProps> = ({ onAddTrade, initialValues }) => {
  const [form] = Form.useForm();
  const [riskType, setRiskType] = useState<'percentage' | 'lots'>(initialValues?.riskType || 'percentage');
  const [accountSize, setAccountSize] = useState<number>(initialValues?.accountSize || 10000);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        date: initialValues.date ? moment(initialValues.date) : null,
      });
      setRiskType(initialValues.riskType);
      setAccountSize(initialValues.accountSize);
    }
  }, [initialValues, form]);

  const onFinish = (values: any) => {
    const trade = {
      ...values,
      date: values.date ? values.date.format('YYYY-MM-DD') : null,
      riskType,
      accountSize,
      commission: parseFloat(values.commission) || 0,
    };
    onAddTrade(trade);
    form.resetFields();
  };

  const calculateLotSize = () => {
    const risk = form.getFieldValue('risk');
    const stopLoss = form.getFieldValue('stopLoss');
    if (risk && stopLoss && accountSize) {
      const riskAmount = riskType === 'percentage' ? (accountSize * risk) / 100 : risk * 100000;
      const lotSize = riskAmount / (stopLoss * 10);
      form.setFieldsValue({ positionSize: lotSize.toFixed(2) });
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="date" label="Date" rules={[{ required: true }]}>
        <DatePicker className="w-full" />
      </Form.Item>
      <Form.Item name="symbol" label="Symbol" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="direction" label="Direction" rules={[{ required: true }]}>
        <Select>
          <Option value="Buy">Buy</Option>
          <Option value="Sell">Sell</Option>
        </Select>
      </Form.Item>
      <Form.Item name="entryPrice" label="Entry Price" rules={[{ required: true }]}>
        <InputNumber className="w-full" step={0.00001} />
      </Form.Item>
      <Form.Item name="exitPrice" label="Exit Price">
        <InputNumber className="w-full" step={0.00001} />
      </Form.Item>
      <Form.Item name="status" label="Status" rules={[{ required: true }]}>
        <Select>
          <Option value="Win">Win</Option>
          <Option value="Loss">Loss</Option>
          <Option value="BreakEven">Break Even</Option>
          <Option value="ForcedExit">Forced Exit</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Account Size">
        <InputNumber
          className="w-full"
          value={accountSize}
          onChange={(value) => setAccountSize(value as number)}
        />
      </Form.Item>
      <Form.Item label="Risk Type">
        <Radio.Group value={riskType} onChange={(e) => setRiskType(e.target.value)}>
          <Radio.Button value="percentage">Percentage</Radio.Button>
          <Radio.Button value="lots">Lots</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="risk" label={`Risk (${riskType === 'percentage' ? '%' : 'lots'})`} rules={[{ required: true }]}>
        <InputNumber className="w-full" step={0.01} onChange={calculateLotSize} />
      </Form.Item>
      <Form.Item name="stopLoss" label="Stop Loss (pips)" rules={[{ required: true }]}>
        <InputNumber className="w-full" onChange={calculateLotSize} />
      </Form.Item>
      <Form.Item name="takeProfit" label="Take Profit (pips)">
        <InputNumber className="w-full" />
      </Form.Item>
      <Form.Item name="positionSize" label="Position Size (lots)" rules={[{ required: true }]}>
        <InputNumber className="w-full" step={0.01} />
      </Form.Item>
      <Form.Item name="commission" label="Commission">
        <InputNumber className="w-full" step={0.01} min={0} />
      </Form.Item>
      <Form.Item name="strategy" label="Strategy">
        <Input />
      </Form.Item>
      <Form.Item name="notes" label="Notes">
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            {initialValues ? 'Update Trade' : 'Add Trade'}
          </Button>
          <Button onClick={() => form.resetFields()}>Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default TradeForm;