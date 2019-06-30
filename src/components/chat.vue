<template>
    <div class="chat" id="chat">
        <div class="chat-head">
            <p class="channelNumberInHead"> Channel: {{ this.$store.getters.CHANNELID }} </p>
        </div>
        <div class="chat-window" >
            <div class="getError" v-if="this.$store.getters.ERRORED">
                <p class="error">We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
            </div>
            <div v-for="item in infoList">
                <div :class="[item.login === $store.state.email ?  bubble1 : bubble2]" >
                    <div class="login" >{{ item.login }}:</div>
                    {{ item.message }}
                    <div class="time"> {{ item.date }} </div>
                </div>
            </div>
        </div>
        <form action="" class="chat-send" @submit="send">
            <input type="text" class="form-control text-dark" style="background-color:transparent; border-color:transparent; box-shadow: none;" placeholder="Write a message..." v-model="msg">
            <button type="submit" class="fas fa-envelope send fa-lg"></button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "chat",
        data() {
            return {
                msg: '',
                bubble1: 'chat_bubble1',
                bubble2: 'chat_bubble2',
            }
        },
        methods: {
            send: function(e){ //Собирает информацию и отправляет в хранилище
                const sendInfo = {
                    login: this.$store.getters.EMAIL,
                    channel_id: this.$store.getters.CHANNELID,
                    message: this.msg
                };
                if(!this.msg){ //Если поле ввода не заполненно, вернуть ошибку
                    console.log('Error: message not found')
                    e.preventDefault()
                }else{ //Иначе отправляем данные в SEND_INFO
                    this.$store.dispatch('SEND_INFO', sendInfo)
                    console.log(sendInfo)
                    this.msg = '' //Очищаем поле после отправки сообщения
                    e.preventDefault()
                }
                e.preventDefault()
            }
        },
        computed: {
            infoList() {
                return this.$store.getters.INFO
            },
        },
        mounted() {
            this.$store.dispatch('GET_INFO')
        },
    }
</script>

<style>
    .chat {
        grid-area: 1 / 2 / 2 / 3;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 50px 1fr 35px;
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        height: 100vh;
    }

    .chat-head {
        grid-area: 1 / 1 / 2 / 3;
        background-color: #FFFFFF;
        color: #3D87FF;
    }
    .channelNumberInHead{
        margin-top: 11px;
        margin-left: 11px;
    }

    .chat-send {
        grid-area: 3 / 1 / 4 / 3;
        background-color: #FFFFFF;
        align-self: end;
        display: grid;
        grid-template-columns: 1fr 50px;
        grid-template-rows: 35px;
    }
    .send{
        color: #3D87FF;
        background-color: transparent;
        border-color: transparent;
        box-shadow: none;
        align-self: center;
        outline:none !important;
        cursor: pointer;
    }
    .chat-window {
        grid-area: 2 / 1 / 3 / 3;
        background-color: #D9D9D9;
        overflow-y: scroll;
    }
    .getError{
        padding:5px;
        margin-top:10%;
        margin-left: 25%;
        width: 50%;
        font-size: 13px;
        border-radius: 5px 5px 5px 5px;
        border-color: red;
        background-color: #F0F0F0;
    }
    .error{
        margin: 0px;
        text-align: center;
        color: darkorange;
    }
    .chat_bubble1,.chat_bubble2{
        padding:10px;
        margin:13px 8px;
        width: 50%;
        font-size: 13px;
        border-radius: 5px 5px 5px 0;
    }
    .login{
        color: #3D87FF;
        margin-bottom:2px;
    }
    .time{
        color: #3D87FF;
        text-align: end;
    }

    .chat_bubble1{
        position: relative;
        background-color: #F0F0F0;
    }

    .chat_bubble1:after{
        content: '';
        position: absolute;
        border-style: solid;
        border-width: 5px 8px 0 0;
        border-color: transparent #F0F0F0;
        margin-top: -5px;
        left: -8px;
        top: 100%;
    }
    .chat_bubble2{
        position: relative;
        background-color: #FFFFFF;
    }
    .chat_bubble2:after{
        content: '';
        position: absolute;
        border-style: solid;
        border-width: 5px 8px 0 0;
        border-color: transparent #FFFFFF;
        margin-top: -5px;
        left: -8px;
        top: 100%;
    }
</style>