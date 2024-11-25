<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const TAB_HOME = 0
const TAB_ENGLISH = 1
const TAB_CRYPTO = 2

function handleClick(key: number) {
  switch (key) {
    case TAB_HOME:
      router.push('/')
      break
    case TAB_ENGLISH:
      router.push('/english')
      break
    case TAB_CRYPTO:
      router.push('/crypto')
      break
  }
}
</script>

<template>
  <div class="h-screen flex flex-col">
    <header class="h96px  px-65px flex justify-between items-center  border-b border-solid border-b-black">
      <div class="h-full ">
        <img src="@/assets/img/logo.png" alt="logo" class="h-full">
      </div>
      <div class="grow-1 px-65px">
        <span class="text-2xl mr-10 cursor-pointer" @click="handleClick(TAB_HOME)">主页</span>
        <span class="text-2xl mr-10 cursor-pointer" @click="handleClick(TAB_ENGLISH)">英语</span>
        <span class="text-2xl cursor-pointer" @click="handleClick(TAB_CRYPTO)">加密</span>
      </div>
    </header>
    <!-- <div class=" border-b border-solid border-blue-500 text-amber">
      123
    </div> -->

    <RouterView />
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>
