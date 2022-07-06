<template>
  <section class="section"
           @dragover.prevent
           @drop.prevent="drop"
  >
    <div class="section__header">
      {{ title }}
      <button class="section__reload"
              :style="reloadLeft ? {left: '20px'} : {right: '20px'}"
              @click="this.$emit('reload')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M14.8 16.2 11 12.4V7h2v4.6l3.2 3.2ZM12 21q-1.875 0-3.512-.712-1.638-.713-2.85-1.926-1.213-1.212-1.926-2.85Q3 13.875 3 12t.712-3.513q.713-1.637 1.926-2.85 1.212-1.212 2.85-1.925Q10.125 3 12 3q2.05 0 3.888.875Q17.725 4.75 19 6.35V4h2v6h-6V8h2.75q-1.025-1.4-2.525-2.2Q13.725 5 12 5 9.075 5 7.038 7.037 5 9.075 5 12q0 2.925 2.038 4.962Q9.075 19 12 19q2.625 0 4.587-1.7Q18.55 15.6 18.9 13h2.05q-.375 3.425-2.937 5.712Q15.45 21 12 21Z"/></svg>
      </button>
    </div>
    <slot name="default"></slot>
    <Transition name="fade">
      <div class="loading" v-if="loading">
        <div class="loader4"></div>
      </div>
    </Transition>
  </section>
</template>
<script>
export default {
  name: 'main-wrapper',
  props: {
    title: String,
    loading: Boolean,
    reloadLeft: Boolean,
  },

  methods: {
    drop(e) {
      console.log("DROP", e);
      const card_id = e.dataTransfer.getData("card_id");

      this.$emit("to_delivery", { id: card_id })
      // const card = document.getElementById(card_id);
      // card.style.display = "flex";
      // e.target.appendChild(card)
    }
  },

  mounted() {
    // console.log(this.buttonList);
  }
}
</script>
<style>
  .section {
    border: 1px solid var(--primary-color);
    padding-bottom: 50px;
    flex: 1;
    color: var(--primary-color);
    position: relative;
  }

  .loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .section__header {
    width: 100%;
    min-height: 40px;
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid var(--primary-color);
    position: relative;
  }

  .section__reload {
    cursor: pointer;
    width: 35px;
    height: 35px;
    background: var(--secondary-color);
    border: 1px solid var(--primary-color);
    position: absolute;
    /*right: 20px;*/
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .section__reload svg {
    display: block;
    fill: var(--primary-color);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .loader4 {
    width:45px;
    height:45px;
    display:inline-block;
    padding:0px;
    border-radius:100%;
    border:5px solid;
    border-top-color: var(--primary-color);
    border-bottom-color:rgba(255,255,255, 0.3);
    border-left-color: var(--primary-color);
    border-right-color:rgba(255,255,255, 0.3);
    -webkit-animation: loader4 1s ease-in-out infinite;
    animation: loader4 1s ease-in-out infinite;
  }
  @keyframes loader4 {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
  }
  @-webkit-keyframes loader4 {
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(360deg);}
  }


  @keyframes loader-05 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

</style>
