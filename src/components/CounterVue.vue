<template>
  <div class="">
    <h2>Vue Counter</h2>
    <div class="">{{ count }}</div>
    <div class="">
      <button @click="count++">+</button>
      <button @click="count--">-</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const count = ref(0);
</script>
