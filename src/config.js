const APIURL = "https://demo-api.vsdev.space/api/orders_admin/2021-0609";

const orderButtonList = [
  {
    text: "Подробнее",
    color: "",
    event: "more",
  },
  {
    text: "К отгрузке",
    color: "green",
    event: "to_delivery",
  },
  {
    text: "Отменить",
    color: "red",
    event: "cancel",
  }
];

const deliveryButtonList = [
  {
    text: "Отменить",
    color: "red",
    event: "cancel",
  }
]

export default {
  orderButtonList,
  deliveryButtonList,

  getOrderList: () => ({
    url: `${APIURL}/orders`,
    method: "get",
  }),
  getOrderInfo: (id) => ({
    url: `${APIURL}/orders/${id}`,
    method: "get",
  }),
  createDelivery: (id) => ({
    url: `${APIURL}/orders/${id}/delivery`,
    method: "post",
  }),
  cancelOrder: (id) => ({
    url: `${APIURL}/orders/${id}`,
    method: "delete",
  }),
  getDeliveryList: () => ({
    url: `${APIURL}/deliveries`,
    method: "get",
  }),
  cancelDelivery: (id) => ({
    url: `${APIURL}/deliveries/${id}`,
    method: "delete",
  }),
}
