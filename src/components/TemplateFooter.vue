<template>
  <footer class="footer">
    <span>Жаворонков Александр Арсеньевич, 211-321</span>
    <div class="button-wrapper">
      <p>Scroll to top</p>
      <button @click="toTop">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M11 20V7.825l-5.6 5.6L4 12l8-8 8 8-1.4 1.425-5.6-5.6V20Z"/></svg>
      </button>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'template-footer',
  methods: {
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }
}
</script>
<style scoped>
  .footer {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    border-top: 1px solid var(--primary-color);
    color: var(--primary-color);;
  }

  .button-wrapper {
    display: flex;
    gap: 10px;
    align-items: center;
  }
</style>
