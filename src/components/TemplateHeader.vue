<template>
  <header id="header">
    <h1>Панель администратора заказов на Vue.js</h1>
    <div class="toggle" @click="clickToggle" ref="toggle">
      <div class="toggle__wrapper">
        <span>on</span>
        <span>off</span>
        <div class="toggle__circle"></div>
      </div>
    </div>
  </header>
</template>
<script>
  export default {
    name: 'template-header',
    data() {
      return {
        theme: localStorage.getItem("theme"),
      }
    },
    methods: {
      clickToggle() {
        this.theme = this.theme === 'dark' ? '' : 'dark';
        localStorage.setItem("theme", this.theme);
        document.documentElement.setAttribute("theme", this.theme)
      }
    },
    mounted() {
      document.documentElement.setAttribute("theme", this.$data.theme);
      if (this.theme === "dark") {
        this.$refs.toggle.classList.add("toggle--active");
      } else this.$refs.toggle.classList.remove("toggle--active");
    },
    watch: {
      theme() {
        if (this.theme === "dark") {
          this.$refs.toggle.classList.add("toggle--active");
        } else this.$refs.toggle.classList.remove("toggle--active");
      }
    }
  }
</script>
<style scoped>
  #header {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid var(--primary-color);
    position: relative;
    color: var(--primary-color);
  }

  .toggle {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    cursor: pointer;
  }

  .toggle__wrapper {
    position: relative;
    height: 40px;
    width: 90px;
    padding: 0 10px;
    margin-right: 20px;
    border-radius: 20px;
    border: 2px solid var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
  }

  .toggle__circle {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    background: var(--primary-color);
    border-radius: 50%;
    transition: .2s all;
  }

  .toggle--active .toggle__circle {
    right: 0;
    left: auto;
  }

  h1 {
    font-size: 26px;
  }

  @media (max-width: 1000px) {
    h1 {
      font-size: 20px;
    }
  }
</style>
