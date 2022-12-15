import { Convert } from "easy-currencies"

export const formatter = new Intl.NumberFormat('en-US', {
    
    currency: 'VND',
    style: 'currency',
    minimumFractionDigits: 0
  })

  export const formatCurrency = (currency = 0, formatter = "vi-VN") => {
    const format = ["vi-VN", "VND"]
    return currency.toLocaleString(format[0], {
      style: "currency",
      currency: format[1],
    })
  }
  
export  const getAllType = (data) => {
    const type = []
    data.forEach(element => {
        type.push(element.product_type)
    });
    return [...new Set(type)].sort((a,b) => a.length - b.length)
}
export const getAllBrand = (data) => {
    const type = []
    data.forEach(element => {
        type.push(element.product_brand)
    });
    return [...new Set(type)].sort((a,b) => a.length - b.length)
}

export const currenciesConvert = async (vnd) => {
  const convert = await Convert(parseFloat(vnd)).from("VND").to("USD");
  return convert.toFixed(2);
};