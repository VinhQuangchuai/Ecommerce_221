import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {getPayment} from "../../api/product"
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
import { Convert } from "easy-currencies";

// import "./index.css";
const { Option } = Select;
const initialFvalues = {
  name: "",
  phone: "",
  email: "",
  address: "",
  ward: "",
  district: "",
  province: "",
};

const initialProvince = [
  {
    ProvinceId: 269,
    ProvinceName: "Lào Cai",
  },
  {
    ProvinceId: 270,
    ProvinceName: "Hà Giang",
  },
];

const currenciesConvert = async (vnd) => {
  const convert = await Convert(parseFloat(vnd)).from("VND").to("USD");
  return convert;
};

export const Checkout = () => {
  const [value, setValue] = useState(initialFvalues);
  const [provinces, setProvinces] = useState(initialProvince);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [shippingFee, setShippingFee] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

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

  const handleChangeProvince = async (provinceId) => {
    value.province = provinceId;
    console.log(provinceId);

    if (provinceId === 0) {
      setDistricts([]);
      setWards([]);
    } else {
      await axios
        .get(
          `https://online-gateway.ghn.vn/shiip/public-api/master-data/district`,
          {
            headers: {
              token: "c6109bdb-6597-11ed-9dc6-f64f768dbc22",
            },
            params: {
              province_id: provinceId,
            },
          }
        )
        .then((res) => {
          setDistricts(res.data.data);
        });
    }
  };

  const handleChangeDistrict = async (districtId) => {
    value.district = districtId;
    console.log(districtId);

    if (districtId === 0) {
      setWards([]);
    } else {
      await axios
        .get(
          "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",
          {
            headers: {
              token: "c6109bdb-6597-11ed-9dc6-f64f768dbc22",
            },
            params: {
              district_id: districtId,
            },
          }
        )
        .then((res) => {
          setWards(res.data.data);
        });
    }
  };

  const handleChangeWard = async (wardId) => {
    value.ward = wardId;
    console.log(wardId);
    let shipService = [];
    await axios
      .get(
        "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services",
        {
          headers: {
            token: "c6109bdb-6597-11ed-9dc6-f64f768dbc22",
          },
          params: {
            shop_id: 3457944,
            from_district: 1452,
            to_district: value.district,
          },
        }
      )
      .then((res) => {
        shipService = res.data.data;
        console.log(shipService);
      });

    await axios
      .get(
        "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
        {
          headers: {
            token: "c6109bdb-6597-11ed-9dc6-f64f768dbc22",
            shop_id: 3457944,
          },
          params: {
            service_id: shipService[0].service_id,
            insurance_value: 50000,
            coupon: null,
            to_ward_code: value.ward,
            to_district_id: value.district,
            from_district_id: 1452,
            weight: 500,
            length: 30,
            width: 30,
            height: 50,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data.total);
        currenciesConvert(res.data.data.total).then((res) => {
          setShippingFee(res.toFixed(2));
        });
      });
  };

  const onPayment = (e) => {
    console.log(parseFloat(total));
    console.log(parseFloat(shippingFee));
    console.log(parseFloat(total) + parseFloat(shippingFee));
    // const data = JSON.stringify({
    //   amount: parseFloat(total) + parseFloat(shippingFee),
    // });
    // const config = {
    //   method: "post",
    //   url: "https://hcmut-e-commerce.herokuapp.com/api/payment",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: data,
    // };

    getPayment({amount: parseFloat(total) + parseFloat(shippingFee)})
      .then((res) => {
        console.log(res.data);
        window.location.replace(res.data);
        // Swal.fire({
        //   title: "Proceed to Checkout",
        //   text: "Thank you for your order!",
        //   icon: "success",
        //   confirmButtonText: "OK",
        // }).then((result) => {
        //   navigate("/");
        // });
      })
      .catch((err) => {
        Swal.fire({
          title: "Payment Failed",
          text: "There is some error in payment process",
          icon: "error",
          confirmButtonText: "Close",
        });
        console.log(err);
      });
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  useEffect(() => {
    const getProvinces = async () => {
      const config = {
        method: "get",
        url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
        headers: {
          token: "c6109bdb-6597-11ed-9dc6-f64f768dbc22",
        },
      };
      axios(config).then((res) => {
        console.log(res.data);
        setProvinces(res.data.data);
      });
    };
    getProvinces();
    provinces.map((province) => console.log(province));
  }, []);

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
            name="city"
            label="City"
            rules={[
              {
                required: true,
                message: "Please select province!",
              },
            ]}
          >
            <Select
              placeholder="Select a province"
              onChange={(value) => handleChangeProvince(value)}
            >
              {provinces.map((province, index) => (
                <Option key={index} value={province.ProvinceID}>
                  {province.ProvinceName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="district"
            label="District"
            rules={[
              {
                required: true,
                message: "Please select district!",
              },
            ]}
          >
            <Select
              placeholder="Select a district"
              onChange={(value) => handleChangeDistrict(value)}
            >
              {districts.map((district, index) => (
                <Option key={index} value={district.DistrictID}>
                  {district.DistrictName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="ward"
            label="Ward"
            rules={[
              {
                required: true,
                message: "Please select city!",
              },
            ]}
          >
            <Select
              placeholder="Select ward"
              onChange={(value) => handleChangeWard(value)}
            >
              {wards.map((ward, index) => (
                <Option key={index} value={ward.WardCode}>
                  {ward.WardName}
                </Option>
              ))}
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
            <span className="font-medium text-gray-400">{shippingFee}</span>
          </div>
          <div className="flex justify-between border-b-2 py-6">
            <span className="text-base font-medium">Total</span>
            <span className="text-base font-medium text-blue-500">
              ${parseFloat(total) + parseFloat(shippingFee)}
            </span>
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
          onClick={onPayment}
          className=" bg-blue-500 text-white font-bold text-lg p-2 rounded-xl hover:bg-blue-400 mt-10 w-[300px] h-[50px] mx-auto"
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};
