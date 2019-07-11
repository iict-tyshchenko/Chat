<template>
    <div class="land" id="chat">
    <div class="menu">
        <div class="menu-head" >
            <button type="button" class="fas fa-sign-out-alt fa-lg exit" @click="exit()"></button>
            <input type="text" class=" text-dark search" placeholder="Search" v-model="number">
        </div>
        <div class="menu-contacts" >
            <a v-for="channel in channelList">
                <div class="channelBubble" @click="reSelectChannel(channel.number)">
                    <svg class="channelBubbleAvatar">
                        <circle cx="30" cy="30" r="25" fill="#D9D9D9"/>
                        <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="#6c757d" > {{ channel.number }} </text>
                    </svg>
                    <div class="channelBubbleInfo">
                        <i class="fas fa-comment-dots"></i>
                        <p class="channelNumber"> {{ channel.title }} </p>
                        <p class="channelInfo"> info... </p>
                    </div>
                </div>
            </a>
        </div>
    </div>
    <div class="chat">
        <div class="chat-head">
            <p class="channelNumberInHead"> Channel: {{ channel }} </p>
        </div>
        <div class="chat-window" id="chat-window">
            <div class="getError" v-if="errored">
                <p class="error">We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
            </div>
            <div v-for="item in infoList" >
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
    import moment from 'moment'

    export default {
        name: "chat",
        data() {
            return {
                msg: '',
                bubble1: 'chat_bubble1',
                bubble2: 'chat_bubble2',
                number: '',
                channels: [
                    {title: '1st channel', number: '1'},
                    {title: '2nd channel', number: '2'},
                    {title: '3rd channel', number: '3'},
                    {title: '4th channel', number: '4'},
                    {title: '5th channel', number: '5'},
                    {title: '6th channel', number: '6'},
                    {title: '7th channel', number: '7'},
                    {title: '8th channel', number: '8'},
                    {title: '9th channel', number: '9'},
                    {title: '10th channel', number: '10'}
                ]
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
                    console.log(sendInfo)
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
            reSelectChannel(number){
                this.$store.commit('set_channelId', number)
                this.$store.dispatch('GET_MSGS')
            }
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
        computed: {
            errored(){
                return this.$store.getters.ERRORED
            },
            channel(){
                return this.$store.getters.CHANNELID
            },
            //список сообщений
            infoList() {
                return this.$store.getters.MSGS
            },
            //поиск чата в меню
            channelList(){
                var comp = this.number;
                return this.channels.filter(function (elem) {
                    let el = elem.number.toLowerCase();
                    if(comp==='') return true;
                    else return el.indexOf(comp) > -1;
                })
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
    .menu {
        grid-area: 1 / 1 / 2 / 2;
        background-color: #FFFFFF;
        display: grid;
        grid-template-columns: 250px;
        grid-template-rows: 50px 1fr;
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        height: 100vh;
    }

    .menu-head {
        grid-area: 1 / 1 / 1 / 2;
        background-color: #FFFFFF;
        display: grid;
        grid-template-columns: 60px 1fr;
    }
    .exit{
        grid-column-start: 1;
        color: #3D87FF;
        background-color: transparent;
        border-color: transparent;
        box-shadow: none;
        height: 35px;
        align-self: center;
        outline:none !important;
        cursor: pointer;
    }
    .search{
        width: 160px;
        grid-column-start: 2;
        background-color: #D9D9D9;
        border-color: transparent;
        box-shadow: none;
        height: 30px;
        align-self: center;
        border-radius: 3px;
        outline:none;
    }
    .menu-contacts { grid-area: 2 / 1 / 2 / 1; overflow-y:scroll;}
    .channelBubble{
        cursor: pointer;
        display: grid;
        grid-template-columns: 60px 1fr;
    }
    .channelBubbleAvatar{
        grid-column-start: 1;
        height: 60px;
        width: 60px;
    }
    .channelBubbleInfo{
        grid-column-start: 2;
        color: #8A8A8A;
        display: grid;
        grid-template-columns: 20px 1fr;
        grid-template-rows: 30px 30px
    }
    .fa-comment-dots{
        grid-column-start: 1;
        grid-row-start: 1;
        margin-top: 12px;
        justify-self: center;
    }
    .channelNumber{
        grid-column-start: 2;
        grid-row-start: 1;
        font-weight: normal;
        margin: inherit;
        align-self: end;
    }
    .channelInfo{
        display: block;
        grid-column-start: 2;
        grid-row-start: 2;
        align-self: start;
        margin: inherit;
        font-size: 12px;
    }
    a{
        display: block;
        text-decoration: none !important;;
    }
    a:hover{
        background-color: #F0F0F0;
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