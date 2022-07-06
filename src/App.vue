<template>
  <template-header />
  <template-main />
  <template-footer />
</template>

<script>
import TemplateHeader from "@/components/TemplateHeader";
import TemplateMain from "@/components/TemplateMain";
import TemplateFooter from "@/components/TemplateFooter";

export default {
  name: 'App',
  components: {
    TemplateFooter,
    TemplateMain,
    TemplateHeader,
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --primary-color: #000;
    --secondary-color: #FFF;
  }

  [theme="dark"] {
    --primary-color: #FFF;
    --secondary-color: #000;
  }

  body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    background: var(--secondary-color);
  }
  #app {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
  }
</style>
