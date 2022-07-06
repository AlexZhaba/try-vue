<script>
  export default {
    data() {
      return {
        keydownCallback: null,
      }
    },
    props: {
      isOpenModal: Boolean,
      model: Object,
    },
    computed: {
      totalPrice() {
        let sum = 0;
        this.model.basket_items.forEach(item => sum += item.price);
        return sum;
      }
    },
    mounted() {
      this.keydownCallback = () => {
       this.$emit("close");
      };
      document.addEventListener("keydown", this.keydownCallback)
    },
    unmounted() {
      document.removeEventListener("keydown", this.keydownCallback)
    }
  }
</script>

<template>
  <div v-if="isOpenModal" class="modal-wrapper" @click="this.$emit('close')">
    <div class="modal-container" @click.stop="">
      <div class="modal__header">
        <span>Заказ #{{ model.id }}</span>
        <button @click="this.$emit('close')" class="modal__close">

          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z"/></svg>
        </button>
      </div>
      <div class="modal__body">
        <span class="modal__title">Корзина</span>
        <div class="basket">
          <div class="basket__item" v-for="item of model.basket_items" :key="item.name">
            <span class="basket__item--text">{{ item.name }}</span>
            <span class="basket__item--quantity">{{ item.quantity }} шт</span>
            <span class="basket__item--price">{{ item.price }} руб</span>
          </div>
        </div>
        <div class="modal__total">
          <span class="modal__total--name">Итого: </span>
          <span class="modal__total--price">{{ totalPrice }} руб</span>
        </div>
        <div class="button-wrapper">
          <button
              class="button"
              style="color: green"
              @click="this.$emit('to_delivery', this.$props.model), this.$emit('close')">
            К отгрузке
          </button>
          <button
              class="button"
              style="color: red"
              @click="this.$emit('cancel', this.$props.model), this.$emit('close')">
            Отменить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .modal-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-color);
  }

  .modal-container {
    width: 600px;
    min-height: 100px;
    background: var(--secondary-color);
    border: 2px solid var(--primary-color);
    padding: 20px;
    text-align: center;
  }

  .modal__header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .modal__close {
    position: absolute;
    border: 1px solid var(--primary-color);
    right: 0;
    background: var(--secondary-color);
    padding: 5px;
    cursor: pointer;
  }

  .modal__title {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .modal__body {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .modal__total {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
  }

  .modal__total--name {
    font-size: 20px;
    margin-right: 10px;
    line-height: 20px;
  }

  .modal__total--price {
    margin-right: 10px;
    line-height: 16px;
    /*transform: translateY(1.5px);*/
  }

  .basket {
    width: 100%;
  }

  .basket__item {
    width: 100%;
    min-height: 40px;
    border: 2px solid var(--primary-color);
    border-bottom: none;
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  .basket__item--text {
    flex: 8;
    text-align: start;
  }

  .basket__item--quantity {
    flex: 1;
  }

  .basket__item--price {
    flex: 3;
    text-align: end;
  }

  .basket__item:last-child {
    border-bottom: 2px solid var(--primary-color);
  }

  .modal__close svg {
    display: block;
    fill: var(--primary-color);

  }

  .button-wrapper {
    display: flex;
    gap: 40px;
    width: 100%;
    margin-top: 20px;
  }

  .button {
    flex: 1;
    padding: 7px 10px;
    font-size: 20px;
    border: 2px solid var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--secondary-color);
    cursor: pointer;
  }
</style>
