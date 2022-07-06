<template>
  <div class="container"
       :id="id"
       :draggable="draggable"
       @dragstart="dragStart"

       :style="{ cursor: draggable ? 'grab' : 'default' }"
  >
    <span v-if="order">Заказ #{{ id }}</span>
    <span v-if="delivery">Отгрузка #{{ id }}</span>
    <span v-if="order" class="container__right">{{ order.total }} руб.</span>
    <span v-if="delivery" class="container__left">Заказ #{{ delivery.order_id }}</span>
    <span v-if="delivery" class="container__right">{{ delivery.delivery_date }}</span>
    <button class="button"
            @click="isOpenList = !isOpenList"
            v-click-outside="() => isOpenList = false"
    >
      <div></div>
      <div></div>
      <div></div>
    </button>
    <div class="button__list" v-if="isOpenList">
      <div class="list__item" v-for="item in buttonList"
           :key="item.text"
           :style="{color: item.color}"
           @click.stop="onListClick(item)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'data-container',

  props: {
    id: Number,
    buttonList: Array,
    draggable: Boolean,
    delivery: Object,
    order: Object,
  },

  methods: {
    onListClick(item) {
      this.$emit(item.event, this.$props)
      this.isOpenList = false;
    },
    dragStart(e) {
      // const { target } = e;
      e.dataTransfer.setData("card_id", this.id);

      // setTimeout(() => {
        // target.style.display = "none";
      // }, 0);
    }
  },

  data() {
    return {
      isOpenList: false,
    }
  },

  mounted() {
    console.log(this.buttonList)
  }
}
</script>

<style scoped>
  .container {
    margin: 0 20px;
    margin-top: 20px;
    width: calc(100% - 40px);
    padding: 10px 20px;
    font-size: 20px;
    border: 1px solid var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  .container__left {
    flex: 1;
    text-align: start;
    margin-left: 20px;
    font-size: 14px;
  }

  .container__right {
    flex: 1;
    text-align: end;
    margin-right: 20px;
  }

  .button {
    width: 35px;
    height: 35px;
    background: var(--secondary-color);
    border: 1px solid var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-size: 50px;
  }

  .button__list {
    position: absolute;
    top: calc(100% + 10px);
    z-index: 10;
    right: -1px;
    background: var(--secondary-color);
    border: 1px solid var(--primary-color);
    min-width: 150px;
    font-size: 16px;
    /*height: 50px;*/
  }

  .list__item {
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--primary-color);
    cursor: pointer;
    color: var(--primary-color);
  }

  .list__item:last-child {
    border-bottom: none;
  }

  .button:hover {
    cursor: pointer;
  }

  .button > div {
    height: 4px;
    width: 4px;
    background: var(--primary-color);
  }
</style>
