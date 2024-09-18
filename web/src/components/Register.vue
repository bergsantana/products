<script setup lang="ts">
import { ref } from 'vue';
import {  UserData } from '../services/Auth.service';
import { toast } from 'vue3-toastify';


const registerData = ref<UserData>({
    email: '',
    password: '',
    name: ''
})

const handleSubmit = () => {
    toast('Success!', {
        autoClose: 1000
    })
}

</script>
<template>
    <div>
        <form>
            <label>Name</label>
            <input v-model="registerData.name" />
            <label>E-mail</label>
            <input v-model="registerData.email"/>
            <label>Password</label>
            <input v-model="registerData.password" type="password"/>
    
            <button @click="handleSubmit"></button>
        </form>
    </div>
    </template>