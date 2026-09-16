<template>
<div>
  <!-- <home-page></home-page>  -->
    <web-header></web-header>
    <router-view></router-view>
    <web-footer></web-footer>
</div>
</template>

<script setup>
import WebFooter from './components/footer/WebFooter.vue';
import WebHeader from './components/header/WebHeader.vue';
import HomePage from './components/pages/HomePage.vue';
</script>