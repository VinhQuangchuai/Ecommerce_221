import "./style.css";
import React, { useEffect } from "react";
import { ProductContext } from "../../components/Context";
import { formatter } from "../../ultil";
import { voucherlist } from "../CartPage";
import { useState } from "react";
import { formatCurrency, currenciesConvert } from "../../ultil";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";
import { getPayment, sendMail } from "../../api/product";
import axios from "axios";


export const PayPage = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [shipFee, setShipFee] = useState(0);
    const [provinceSelected, setProvinceSelected] = useState("");
    const [districtSelected, setDistrictSelected] = useState("");
    const [wardSelected, setWardSelected] = useState("");
  const [transInfo, setTransInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    province: "",
    district: "",
    ward: "",
    curent: "off",
  });

  const navigate = useNavigate();

  const [voucher, setVoucher] = useState();
  const [current, setCurrent] = useState("off");
  const [role, setRole] = useState(false);

  const getItemList = (cart) => {
    return cart.payment.map((i) => {
        return {
            name: i.product.product_name, 
            quantity: i.quantity
        }
    })
  }
  const total = (cart) => {
    var total = 0;
    cart.payment.forEach(
      (i) => (total += Number(i.product.product_present_price))
    );

    console.log(total);
    return total;
  };

  const getTotal = (cart) => {
    var sum = 0;
    voucherlist.forEach((i) => {
      if (i.code === voucher) {
        sum -= i.price;
      }
    });
    console.log(cart.payment);
    sum += shipFee + total(cart);
    return sum;
  };

  const handleChangeProvince = (e) => {
    // console.log(e.target.value);
    // console.log(e.target.options[e.target.selectedIndex].text);
    setProvinceSelected(e.target.options[e.target.selectedIndex].text);
    setTransInfo({
      ...transInfo,
      province: e.target.value,
    });

    if (e.target.value === 0) {
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
              province_id: e.target.value,
            },
          }
        )
        .then((res) => {
          setDistricts(res.data.data);
        });
    }
  };

  const handleChangeDistrict = (e) => {
    console.log(e.target.value);
    setDistrictSelected(e.target.options[e.target.selectedIndex].text);
    setTransInfo({
      ...transInfo,
      district: e.target.value,
    });

    if (e.target.value === 0) {
      setWards([]);
    } else {
      axios
        .get(
          "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",
          {
            headers: {
              token: "c6109bdb-6597-11ed-9dc6-f64f768dbc22",
            },
            params: {
              district_id: e.target.value,
            },
          }
        )
        .then((res) => {
          setWards(res.data.data);
        });
    }
  };

  const handleChangeWards = async (e) => {
    setWardSelected(e.target.options[e.target.selectedIndex].text);
    setTransInfo({
      ...transInfo,
      wards: e.target.value,
    });

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
            to_district: transInfo.district,
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
            to_ward_code: transInfo.ward,
            to_district_id: transInfo.district,
            to_province_name: transInfo.province,
            from_district_id: 1452,
            weight: 200,
            length: 20,
            width: 20,
            height: 20,
          },
        }
      )
      .then((res) => {
        // currenciesConvert(res.data.data.total).then((res) => {
        //   setShipFee(res.toFixed(2));
        // });
        setShipFee(res.data.data.total);
      });
  };

  const handleDelete = (cart, item) => {
    cart.setPayment(
      cart.payment.filter(
        (i) => i.product.product_name !== item.product.product_name
      )
    );
  };

  const handleClick = async (cart) => {
    if (role) {
      //   alert("Mua hàng thành công");
      const totalFee = await currenciesConvert(getTotal(cart) + shipFee);
      console.log(totalFee);

      getPayment({ amount: totalFee })
        .then((res) => {
          // console.log(res.data);
          // window.open(res.a, "_blank");dat
          if (res.data.status == 'success') {
            window.location.assign(res.data.link);
          }
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

        var data = JSON.stringify({
            "to_name": transInfo.name,
            "to_phone": transInfo.phone,
            "to_address": transInfo.address,
            "to_ward_name": wardSelected,
            "to_district_name": districtSelected,
            "to_province_name": provinceSelected,
            "weight": 200,
            "length": 20,
            "width": 20,
            "height": 20,
            "service_type_id": 2,
            "payment_type_id": 1,
            "required_note": "KHONGCHOXEMHANG",
            "Items": getItemList(cart)
        })
      
        var config = {
            method: 'post',
            url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create',
            headers: { 
                'ShopId': '121071', 
                'Token': '95e7f4b0-7ba2-11ed-a2ce-1e68bf6263c5', 
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })

        const mail = {
            "email": transInfo.email,
            "subject": "Xác nhận đơn hàng",
            "body": `Khách hàng ${transInfo.name} số điện thoại ${transInfo.phone} đã mua hàng tại shop.\n \ Đơn hàng của bạn đã được thanh toán thành công và đang được đóng gói để gửi đi.\n \ Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất. \n \ Cảm ơn bạn đã tin tưởng và mua hàng tại shop của chúng tôi.`
        }
        sendMail(mail)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))

      cart.setToOrdered({
        data: cart.payment,
        info: transInfo,
        time: moment(),
        totalprice: getTotal(cart),
      });
      cart.setCart(cart.tmpcart);
      cart.setPayment([]);
      setRole(false);
      navigate("/cart");
    }
  };

  const handleChange = () => {
    setRole(!role);
  };

  useEffect(() => {
    const getProvinces = () => {
      const config = {
        method: "get",
        url:
          "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
        headers: {
          token: "c6109bdb-6597-11ed-9dc6-f64f768dbc22",
        },
      };
      axios(config).then((res) => {
        setProvinces(res.data.data);
      });
    };

    getProvinces();

    
  }, []);
  return (
    <ProductContext.Consumer>
      {(cart) => (
        <div className="paypage-wrapper">
          <div className="paypage">
            <div className="row">
              <div className="col-7 row">
                <span className="pay-span">
                  Vui lòng nhập thông tin giao hàng{" "}
                </span>
                <div className="col-6 user-infor">
                  <div>
                    <span>Họ và tên</span>
                    <input
                      type="text"
                      placeholder="Họ và tên"
                      onChange={(e) =>
                        setTransInfo({ ...transInfo, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <span>Số điện thoại</span>
                    <input
                      type="text"
                      placeholder="Số điện thoại"
                      onChange={(e) =>
                        setTransInfo({ ...transInfo, phone: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <span>Email</span>
                    <input
                      type="text"
                      placeholder="Email"
                      onChange={(e) =>
                        setTransInfo({ ...transInfo, email: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-6 user-infor">
                  <div>
                    <span>Địa chỉ nhận hàng</span>
                    <input
                      type="text"
                      placeholder="Vui lòng nhập địa chỉ của bạn"
                      onChange={(e) =>
                        setTransInfo({ ...transInfo, address: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <span>Tỉnh/ Thành phố</span>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={handleChangeProvince}
                    >
                      {/* <option selected>Vui lòng chọn tỉnh/ thành phố</option>
                      <option value="123">
                        Thành phố Hồ Chí Minh
                      </option> */}
                      <option selected>Vui lòng chọn tỉnh/ thành phố</option>
                      {provinces.map((province, index) => {
                        return (
                          <option value={province.ProvinceID}>
                            {province.ProvinceName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <span>Quận/ Huyện</span>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={handleChangeDistrict}
                    >
                      {/* <option selected>Vui lòng chọn quận/ huyện</option>
                      <option value="Thủ Đức">Thủ Đức</option> */}
                      <option selected>Vui lòng chọn quận/ huyện</option>
                      {districts.map((district, index) => {
                        return (
                          <option key={index} value={district.DistrictID}>
                            {district.DistrictName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <span>Phường/ Xã</span>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={handleChangeWards}
                    >
                      {/* <option selected>Vui lòng chọn phường/ xã</option>
                      <option value="Linh Trung">Linh Trung</option>
                      <option value="Linh Tây">Linh Tây</option>
                      <option value="Linh Đông">Linh Đông</option> */}
                      <option selected>Vui lòng chọn phường/ xã</option>
                      {wards.map((ward, index) => {
                        return (
                          <option key={index} value={ward.WardCode}>
                            {ward.WardName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div>
                  <span className="pay-span">Gói hàng</span>
                  {cart.payment.length > 0 &&
                    cart.payment.map((i, index) => (
                      <div className="cart-item" key={index}>
                        <div className="cart-select" style={{ width: "100%" }}>
                          <div className="select-checkbox pay-check">
                            <img
                              src={`https://hcmut-e-commerce.herokuapp.com/${i.product.product_image01}`}
                              alt=""
                              className="product-thumbnail"
                            />
                            <div className="cart_product-info">
                              <span>{i.product.product_name}</span>
                              <span>{i.product.product_brand}</span>
                              <span className="discount-info">
                                Tiết kiệm{" "}
                                {formatCurrency(
                                  i.product.product_old_price -
                                    i.product.product_present_price
                                )}
                              </span>
                            </div>
                            <div className="cart_product-quantity paypage-price">
                              <div className="product-detail__line3 paypage-price">
                                <p className="product-detail__line3-discount">
                                  {formatter.format(
                                    i.product.product_present_price
                                  )}
                                </p>
                                {i.product.product_present_price && (
                                  <p className="product-detail__line3-current">
                                    {formatter.format(
                                      i.product.product_old_price
                                    )}
                                  </p>
                                )}
                              </div>
                            </div>
                            <span>Số lượng: {i.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="col-5 pay-bill">
                <div
                  className={`payment-choose ${transInfo.curent === "off" &&
                    "pay-active"}`}
                  onClick={() => setTransInfo({ ...transInfo, curent: "off" })}
                >
                  <img src="https://lzd-img-global.slatic.net/g/tps/tfs/TB1ZP8kM1T2gK0jSZFvXXXnFXXa-96-96.png_2200x2200q75.jpg_.webp" />
                  <span>Thanh toán khi nhận hàng</span>
                </div>
                <div
                  className={`payment-choose ${transInfo.curent === "on" &&
                    "pay-active"}`}
                  onClick={() => setTransInfo({ ...transInfo, curent: "on" })}
                >
                  <img src="https://lzd-img-global.slatic.net/g/tps/tfs/TB1Iey_osKfxu4jSZPfXXb3dXXa-96-96.png_2200x2200q75.jpg_.webp" />
                  <span>Thanh toán qua PayPal</span>
                </div>
                <span>Thông tin đơn hàng</span>
                <div className="cart-detail">
                  <span>Tạm tính ({cart.payment.length} sản phẩm)</span>
                  <span>{formatCurrency(total(cart))}</span>
                </div>
                <div className="cart-detail">
                  <span>Phí vận chuyển</span>
                  <span>{formatCurrency(shipFee)}</span>
                </div>
                <div className="cart-detail">
                  <span>Chọn mã giảm giá</span>
                </div>
                <div className="input-group mb-3">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setVoucher(e.target.value)}
                  >
                    <option value="">Không sử dụng</option>
                    {voucherlist.map((i, index) => (
                      <option key={index} value={i.code}>
                        {i.code}
                      </option>
                    ))}
                  </select>
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    id="button-addon2"
                  >
                    Áp dụng
                  </button>
                </div>
                <div className="cart-detail" style={{ paddingBottom: "16px" }}>
                  <strong>Tổng cộng</strong>
                  <strong>{formatCurrency(getTotal(cart))}</strong>
                </div>

                <div className="role-check">
                  <input
                    type="checkbox"
                    checked={role}
                    onChange={handleChange}
                  />
                  <span>Tôi đồng ý với các chính sách của Abelo.</span>
                  <Link to="/policy">
                    <span className="role">Xem chính sách</span>
                  </Link>
                </div>

                <button
                  className="btn btn-warning"
                  style={{ width: "100%" }}
                  onClick={() => handleClick(cart)}
                >
                  Đặt hàng
                </button>

                <Link to="/cart">
                  <button
                    className="btn btn-primary"
                    style={{ marginTop: "10px", width: "100%" }}
                  >
                    Quay lại giỏ hàng
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </ProductContext.Consumer>
  );
};
