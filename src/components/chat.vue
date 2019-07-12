<template>
    <div class="land" id="chat">
        <contacts></contacts>
<!--        <settings></settings>-->
    <div class="chat">
        <div class="chat-head">
            <p class="channelNumberInHead"> Channel: {{ channel }} </p>
        </div>
        <div class="chat-window" id="chat-window">
            <div class="getError" v-if="errored">
                <p class="error">We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
            </div>
            <div v-for="item in msgsList" >
                <div :class="[item.login === $store.state.email ?  bubble1 : bubble2]" >
                    <div class="login" >{{ item.login }}:</div>
                    {{ item.message }}
                    <div class="time"> {{ item.date | format}} </div>
                </div>
            </div>
        </div>
        <form action="" class="chat-send" @submit="send">
            <input type="text" class="form-control text-dark" style="background-color:transparent; border-color:transparent; box-shadow: none;" placeholder="Write a message..." v-model="msg">
            <button type="submit" class="fas fa-envelope send fa-lg"></button>
        </form>
    </div>
    </div>
</template>

<script>
    import Settings from './settings.vue'
    import Contacts from './contacts.vue'
    import moment from 'moment'

    export default {
        name: "chat",
        data() {
            return {
                msg: '',
                bubble1: 'chat_bubble1',
                bubble2: 'chat_bubble2'
            }
        },
        filters: {
            format: function(value) {
                if (value) {
                    moment.locale('ru');
                    return moment(String(value)).format('LT l')
                }
            }
        },
        methods: {
            send(e){
                const sendInfo = {
                    login: this.$store.getters.EMAIL,
                    channel_id: this.$store.getters.CHANNELID,
                    message: this.msg,
                };
                if(!this.msg || !this.login || !this.channel_id){
                    console.log('Error: message/email not found')
                    e.preventDefault()
                }else{
                    this.$store.dispatch('SEND_MSG', sendInfo)
                    this.msg = ''
                    e.preventDefault()
                }
                e.preventDefault()
            },
            scrollToEnd() {
                const window = this.$el.querySelector("#chat-window");
                window.scrollTop = window.scrollHeight;
            },
            exit(){
                this.$router.push('entrance')
            },
        },
        updated: function () {
            this.scrollToEnd();
        },
        //проверяем залогинился ли пользователь
        beforeMount(){
            if(!this.$store.getters.EMAIL || !this.$store.getters.CHANNELID){
                this.exit()
            }
        },
        components: {
            settings: Settings,
            contacts: Contacts
        },
        computed: {
            errored(){
                return this.$store.getters.ERRORED
            },
            channel(){
                return this.$store.getters.CHANNELID
            },
            //список сообщений
            msgsList() {
                return this.$store.getters.MSGS
            }
        },
        mounted() {
            this.$store.dispatch('GET_MSGS')
        },
    }

</script>

<style>
    .land{
        margin: 0;
        display: grid;
        grid-template-columns: 250px 1fr;
        grid-template-rows: 1fr;
        background-color: #D9D9D9 !important;
        grid-column-gap: 2px;
    }
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
    ::-webkit-scrollbar{width:0px}
    ::-webkit-scrollbar-thumb{border-radius:4px;-webkit-box-shadow:inset 0 0 0 0px #074AA2;}
</style>