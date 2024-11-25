<script setup lang="ts">
import cryptoJs from 'crypto-js'
import localforage from 'localforage'
import { computed, onMounted, ref, watch } from 'vue'

// 明文手机号
const phoneNumDES = ref('')
const phoneNumAES = ref('')
// 密钥
const inputKeyDES = ref('')
const inputKeyAES = ref('')
// 加密结果
const encryptedDESValue = computed(() => {
  return phoneNumDES.value ? encryptDES(phoneNumDES.value) : ''
})

const encryptedAESValue = computed(() => {
  return phoneNumAES.value ? encryptAES(phoneNumAES.value) : ''
})

function getIv() {
  const bytes = [1, 2, 3, 4, 5, 6, 7, 8]
  let str = ''
  for (let i = 0; i < bytes.length; i++) {
    let k = bytes[i].toString(16)
    if (k.length === 1)
      k = `0${k}`
    str += `%${k}`
  }
  return decodeURI(str)
}

function encryptDES(plaintext: string) {
  const key = cryptoJs.enc.Utf8.parse(inputKeyDES.value)
  const ivHex = cryptoJs.enc.Utf8.parse(getIv())
  const encrypted = cryptoJs.DES.encrypt(plaintext, key, {
    iv: ivHex,
    mode: cryptoJs.mode.CBC,
    padding: cryptoJs.pad.Pkcs7,
  })
  return encrypted.toString()
}

function encryptAES(plaintext: string) {
  const keyHex = cryptoJs.enc.Utf8.parse('rCnXFNJVeBAIzhji')
  const iv = cryptoJs.enc.Utf8.parse('wNSOYIB1k1DjY5lA')
  const encrypted = cryptoJs.AES.encrypt(plaintext, keyHex, {
    iv, // iv偏移量
    mode: cryptoJs.mode.CBC,
    padding: cryptoJs.pad.Pkcs7,
  })

  return encrypted.toString()
}

// 监听value，key变化，并使用localforage保存
watch(phoneNumDES, () => {
  localforage.setItem('crypto_value_des', phoneNumDES.value)
})
watch(phoneNumAES, () => {
  localforage.setItem('crypto_value_aes', phoneNumAES.value)
})
watch(inputKeyDES, () => {
  localforage.setItem('crypto_key_des', inputKeyDES.value)
})
watch(inputKeyAES, () => {
  localforage.setItem('crypto_key_aes', inputKeyAES.value)
})

onMounted(() => {
  localforage.getItem('crypto_value_des').then((value: unknown) => {
    phoneNumDES.value = value as string
  })
  localforage.getItem('crypto_value_aes').then((value: unknown) => {
    phoneNumAES.value = value as string
  })
  localforage.getItem('crypto_key_des').then((value: unknown) => {
    inputKeyDES.value = value as string
  })
  localforage.getItem('crypto_key_aes').then((value: unknown) => {
    inputKeyAES.value = value as string
  })
})
</script>

<template>
  <h1 class="text-2xl font-bold ml-24 mt-24">
    普通加密
  </h1>
  <div class="w-1/2 mx-auto">
    <el-input v-model="phoneNumDES" class="w-1/2 mx-auto mt-10" color="white" variant="outline" placeholder="明文手机号" />
    <el-input v-model="inputKeyDES" class="w-1/2 mx-auto mt-2" color="white" variant="outline" placeholder="密钥" />
  </div>

  <div class="w-1/2 mx-auto mt-4">
    加密结果: {{ encryptedDESValue }}
  </div>

  <h1 class="text-2xl font-bold ml-24 mt-24">
    AES加密
  </h1>
  <div class="w-1/2 mx-auto">
    <el-input v-model="phoneNumAES" class="w-1/2 mx-auto mt-10" color="white" variant="outline" placeholder="明文手机号" />
    <el-input v-model="inputKeyAES" class="w-1/2 mx-auto mt-2" color="white" variant="outline" placeholder="密钥" />
  </div>

  <div class="w-1/2 mx-auto mt-4">
    加密结果: {{ encryptedAESValue }}
  </div>
</template>

<style scoped>

</style>
