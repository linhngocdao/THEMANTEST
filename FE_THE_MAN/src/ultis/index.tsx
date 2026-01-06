export const formatCurrency = (currency: number) => {
  const tempCurrency = +currency;
  return tempCurrency.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
};




export const formatCurrencys = (currency: number) => {
  const tempCurrency = +currency;
  const a = tempCurrency.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
  const b = a.slice(0, a.indexOf("VND"));
  return b;
};

export const formatDate = (dateString: any) => {
  const date = new Date(dateString);

  const formatDate =
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const seconds =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

  return `${formatDate}/${month}/${date.getFullYear()} ${hours}:${minutes}:${seconds}`;
};

export const formatDateGHN = (stringg: any) => {
  const ti = stringg;

  const year = ti?.slice(0, 4);
  const month = ti?.slice(5, 7);
  const day = ti?.slice(8, 10);
  const hour = ti?.slice(11, 13);
  const min = ti?.slice(14, 16);
  const dateg = day + " Tháng " + month + "," + year;
  const hours = hour + " Giờ " + min + " Phút ";
  var bo = {
    dateg,
    hours,
  };
  return bo;
};
