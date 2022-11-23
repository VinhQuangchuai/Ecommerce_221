import React from "react";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import "./style.css";
const { Option } = Select;

export const Checkout = () => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      sm: {
        span: 24,
      },
    },
    wrapperCol: {
      sm: {
        span: 24,
      },
    },
  };
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="flex flex-row w-full justify-center my-20">
      <div className="mr-5">
        <h1 className="text-3xl font-semibold">Billing details</h1>
        <Form
          {...formItemLayout}
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Row>
            <Col span={12}>
              <Form.Item
                name="firstname"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastname"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your last name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="country"
            label="Country"
            rules={[
              {
                required: true,
                message: "Please select country!",
              },
            ]}
          >
            <Select placeholder="Select a country">
              <Option value="vietnam">Viet Nam</Option>
              <Option value="singapore">Singapore</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="street"
            className="street-input"
            label="Street Address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Input placeholder="House number and street name" />
          </Form.Item>

          <Form.Item name="apartment">
            <Input placeholder="Apartment, suite, unit etc. (optional)" />
          </Form.Item>

          <Form.Item
            name="town"
            label="Town/City"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Row>
            <Col span={12}>
              <Form.Item
                name="state"
                label="State/County"
                rules={[
                  {
                    required: true,
                    message: "Please input your state/country!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="postcode"
                label="Postcode/Zip"
                rules={[
                  {
                    required: true,
                    message: "Please input your postcode/Zip!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="create_account" valuePropName="checked">
            <Checkbox>Create an account?</Checkbox>
          </Form.Item>

          <h2 className="text-2xl font-semibold">Additional information</h2>

          <Form.Item name="note" label="Order notes">
            <Input.TextArea
              maxLength={100}
              placeholder="Notes about your order, e.g. special notes for delivery."
              rows={4}
            />
          </Form.Item>

          <Form.Item name="ship_to" valuePropName="checked">
            <Checkbox>Ship to a different address?</Checkbox>
          </Form.Item>
        </Form>
      </div>
      <div className="flex flex-col justify-start">
        <h1 className="text-3xl font-semibold">Your order</h1>
        <div className="orderInfo w-[450px] bg-gray-100 p-10">
          <div className="flex justify-between border-b-2 pb-6">
            <span className="text-base font-medium">Product</span>
            <span className="text-base font-medium">Total</span>
          </div>
          <div className="border-b-2 py-6">
            <div className="flex justify-between ">
              <span className="text-gray-400 font-medium">Product x 10</span>
              <span className="text-gray-400 font-medium">$429</span>
            </div>
            <div className="flex justify-between ">
              <span className="text-gray-400 font-medium">Product x 10</span>
              <span className="text-gray-400 font-medium">$429</span>
            </div>
          </div>
          <div className="flex justify-between border-b-2 py-6">
            <span className="text-base font-medium">Shipping</span>
            <span className="font-medium text-gray-400">Free shipping</span>
          </div>
          <div className="flex justify-between border-b-2 py-6">
            <span className="text-base font-medium">Total</span>
            <span className="text-base font-medium text-blue-500">$429</span>
          </div>
          <div className="py-6">
            <p className="text-base font-medium">Direct bank transfer</p>
            <p className="font-medium text-gray-400 ml-2">
              Please send a check to Store Name
            </p>
            <p className="text-base font-medium">Check payments</p>
            <p className="text-base font-medium">Cash on delivery</p>
          </div>
        </div>
        <button
          onClick={() => {
            console.log(form.getFieldsValue());
          }}
          className=" bg-blue-500 text-white font-bold text-lg p-2 rounded-xl hover:bg-blue-400 mt-10 w-[300px] h-[50px] mx-auto"
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

