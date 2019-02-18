const formatMoney = value => {
  let v = value.toString().split(".");

  if (!v[1] || v[1].length === 1) v[1] = `${v[1] || "0"}0`;
  return `R$ ${v.join(",")}`;
};

export default formatMoney;