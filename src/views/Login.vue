<template>
    <div>
       <login-component msg="login"/> 
    </div>
</template>

<script>
import loginComponent from './components/loginComponent.vue'
export default {
    name:'login',
    components:{
        loginComponent
    }
}
</script>