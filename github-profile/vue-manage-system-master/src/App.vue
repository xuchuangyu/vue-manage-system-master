<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>


<script>
    export default {
        mounted () {
          //发送信息给服务端
            this.$socket.emit('login',{
            username: 'username',
            password: 'password'
            });

           // 接收服务端的信息
            this.sockets.subscribe('relogin', (data) => {
            console.log(data)
            })
        },
    }
</script>

<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>