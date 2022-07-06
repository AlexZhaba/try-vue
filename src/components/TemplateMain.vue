<template>
  <main class="main">
    <main-wrapper
        :title="'Заказы'"
        :loading="orderLoading"
        @reload="this.updateOrders()"
    >
      <template #="ctx">
        <data-container
            v-for="order of orders"
            :id="order.id"
            :key="order.id"
            :buttonList="orderButtonList"
            :order="order"
            @more="getOrderMore($event)"
            @to_delivery="setOrderToDelivery($event)"
            @cancel="cancelOrder($event)"
            :draggable="true"
        ></data-container>
      </template>
    </main-wrapper>
    <main-wrapper
        :title="'Отгрузки'"
        :loading="deliveryLoading"
        @to_delivery="setOrderToDelivery($event)"
        :reloadLeft="true"
        @reload="this.updateDeliveries()"
    >
      <template #="ctx">
        <data-container
            v-for="delivery of deliveries"
            :id="delivery.id"
            :key="delivery.id"
            :delivery="delivery"
            :buttonList="deliveryButtonList"
            :draggable="false"
            @cancel="cancelDelivery($event)"
        ></data-container>
      </template>
    </main-wrapper>
    <Teleport to="body">
      <order-modal
          :isOpenModal="isOpenModal"
          @close="isOpenModal = false"
          :model="selectedItem"
          @to_delivery="setOrderToDelivery($event)"
          @cancel="cancelOrder($event)"
      />
    </Teleport>
  </main>
</template>
<script>

import MainWrapper from "@/components/MainWrapper";
import DataContainer from "@/components/DataContainer";
import OrderModal from "@/components/order-modal";
import config from "../config";

export default {
  name: 'template-main',
  components: {
    OrderModal,
    DataContainer,
    MainWrapper,
  },

  methods: {
    async makeRequestWithUpdate({ url, method }) {
      this.deliveryLoading = true;
      this.orderLoading = true;
      fetch(url, {
        method,
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .then(() => this.updateAll())
    },
    getOrderMore(event) {
      console.log(event);
      fetch(config.getOrderInfo(event.id).url)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            this.selectedItem = data;
            this.isOpenModal = true;
          })
    },
    setOrderToDelivery(event) {
      console.log(event.id);
      this.makeRequestWithUpdate(config.createDelivery(event.id))
    },
    cancelOrder(event) {
      this.makeRequestWithUpdate(config.cancelOrder(event.id))
    },
    cancelDelivery(event) {
      console.log(event.id)
      this.makeRequestWithUpdate(config.cancelDelivery(event.id))
    },
    updateOrders() {
      this.orderLoading = true;
      fetch(config.getOrderList().url)
          .then(response => response.json())
          .then(data => this.orders = data)
          .then(() => this.orderLoading = false);
    },
    updateDeliveries() {
      this.deliveryLoading = true;
      fetch(config.getDeliveryList().url)
          .then(response => response.json())
          .then(data => this.deliveries = data)
          .then(() => this.deliveryLoading = false)
    },
    updateAll() {
      this.updateOrders();
      this.updateDeliveries();
    }
  },

  data() {
    return {
      orderLoading: true,
      deliveryLoading: true,
      orders: null,
      deliveries: null,
      selectedItem: null,
      isOpenModal: false,
    }
  },

  computed: {
    console() {
      return console;
    }
  },

  beforeCreate() {
    this.orderButtonList = config.orderButtonList;
    this.deliveryButtonList = config.deliveryButtonList;
  },

  mounted() {
    this.updateAll();
  }
}
</script>
<style scoped>
  .main {
    padding: 20px 20px;
    display: flex;
    gap: 20px;
  }

  @media (max-width: 1000px) {
    .main {
      flex-direction: column;
    }
  }
</style>
