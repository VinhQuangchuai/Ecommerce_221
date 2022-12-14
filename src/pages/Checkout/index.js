import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {getPayment, sendMail} from "../../api/product"
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

import "./style.css";
import { ConsoleSqlOutlined } from "@ant-design/icons";
const { Option } = Select;
const initialFvalues = {
  lname: "",
  fname: "",
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
  const [values, setValues] = useState(initialFvalues);
  const [provinces, setProvinces] = useState(initialProvince);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [shippingFee, setShippingFee] = useState(0);
  const [total, setTotal] = useState(0);

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

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })

  }

  const handleChangeProvince = value => {
    setValues({
      ...values,
      "province": value
    }
      
    )

    if (value === 0) {
      setDistricts([]);
      setWards([]);
    } else {
      axios
        .get(
          `https://online-gateway.ghn.vn/shiip/public-api/master-data/district`,
          {
            headers: {
              token: "c6109bdb-6597-11ed-9dc6-f64f768dbc22",
            },
            params: {
              province_id: value,
            },
          }
        )
        .then((res) => {
          setDistricts(res.data.data);
        });
    }


  };

  const handleChangeDistrict = async (districtId) => {
    
    setValues({
      ...values,
      "district": districtId
    })

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
    setValues({
      ...values,
      "ward": wardId
    })
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
            to_district: values.district,
          },
        }
      )
      .then((res) => {
        shipService = res.data.data;
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
            to_ward_code: values.ward,
            to_district_id: values.district,
            to_province_name: values.province,
            from_district_id: 1452,
            weight: 200,
            length: 20,
            width: 20,
            height: 20,
          },
        }
      )
      .then((res) => {
        currenciesConvert(res.data.data.total).then((res) => {
          setShippingFee(res.toFixed(2));
        });
      });
  };

  const onPayment = (e) => {
    // console.log(parseFloat(total));
    // console.log(parseFloat(shippingFee));
    // console.log(parseFloat(total) + parseFloat(shippingFee));


    getPayment({amount: parseFloat(total) + parseFloat(shippingFee)})
      .then((res) => {
        console.log(res.data);
        window.location.replace(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // const data = JSON.stringify({
    //   to_name: lname + " " + fname,
    //   to_phone: phone,
    //   to_address: address,
    //   to_ward_code: value.ward,
    //   to_district_id: value.district,
    //   weight: 200,
    //   length: 20,
    //   width: 20,
    //   height: 20,
    //   service_type_id: 2,
    //   payment_type_id: 1,
    //   required_note: "KHONGCHOXEMHANG",
    //   items: 

    // })
    
    // const config = {
    //   "method": "get",
    //   "url": "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
    //   "headers": {
    //     "content-type": "application/json",
    //     "ShopId": "121071",
    //     "Token": "95e7f4b0-7ba2-11ed-a2ce-1e68bf6263c5"
    //   },
    // }



    const data = {
      "email": values.email,
      "subject": "Xac nhan don hang",
      "body": `Khách hàng ${values.lname + " " + values.fname} số điện thoại ${values.phone} đã mua hàng tại shop.\n \ Đơn hàng của bạn đã được thanh toán thành công và đang được đóng gói để gửi đi.\n \ Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất. \n \ Cảm ơn bạn đã tin tưởng và mua hàng tại shop của chúng tôi.`
    }

    sendMail(data)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  }

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
  }, []);

  return (
    <div className="flex flex-row w-full justify-center my-20">
      <div className="mr-5">
        <h1 className="text-3xl font-semibold mb-4">Billing details</h1>
        <Form
          {...formItemLayout}
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Row>
            <Col span={12} className="first-name">
              <Form.Item
                name="fname"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                  },
                ]}
                onChange={handleChange}
              >
                <Input name="fname"/>
              </Form.Item>
            </Col>
            <Col span={12} className="last-name">
              <Form.Item
                name="lname"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your last name!",
                  },
                ]}
                onChange={handleChange}
              >
                <Input name="lname" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="province"
            label="province"
            rules={[
              {
                required: true,
                message: "Please select province!",
              },
            ]}
          >
            <Select
              placeholder="Select a province"
              onChange={handleChangeProvince}
              name="province"
            >
              {provinces.map((province, index) => (
                <Option key={index} name="province" value={province.ProvinceID}>
                  {province.ProvinceName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="district"
            label="district"
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
            name="address"
            className="address"
            label="address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
            onChange = {handleChange}
          >
            <Input name="address" placeholder="House number and street name" />
          </Form.Item>

          <Form.Item name="apartment">
            <Input placeholder="Apartment, suite, unit etc. (optional)" />
          </Form.Item>

          <Row>
            <Col span={12} className="phone">
              <Form.Item
                name="phone"
                label="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
                onChange={handleChange}
              >
                <Input name="phone"/>
              </Form.Item>
            </Col>
            <Col span={12} className="email">
              <Form.Item
                name="email"
                label="email"
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
                onChange={handleChange}
              >
                <Input name="email"/>
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
        <h1 className="text-3xl font-semibold mb-4">Your order</h1>
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
