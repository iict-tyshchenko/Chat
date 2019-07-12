<template>
    <div class="contacts-body">
        <div class="contacts-head" >
            <button type="button" class="fas fa-align-justify fa-lg exit" @click="exit()"></button>
            <input type="text" class=" text-dark search" placeholder="Search" v-model="number">
        </div>
        <div class="contacts-channels" >
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
</template>

<script>
    export default {
        name: "contacts",
        data() {
            return{
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
        methods:{
            exit(){
                this.$router.push('entrance')
            },
            reSelectChannel(number){
                this.$store.commit('set_channelId', number)
                this.$store.dispatch('GET_MSGS')
            }
        },
        computed:{
            //поиск чата в меню
            channelList(){
                var comp = this.number;
                return this.channels.filter(function (elem) {
                    let el = elem.number.toLowerCase();
                    if(comp==='') return true;
                    else return el.indexOf(comp) > -1;
                })
            }
        }

    }
</script>

<style>
    .contacts-body {
        grid-area: 1 / 1 / 2 / 2;
        background-color: #FFFFFF;
        display: grid;
        grid-template-columns: 250px;
        grid-template-rows: 50px 1fr;
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        height: 100vh;
    }

    .contacts-head {
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
    .contacts-channels { grid-area: 2 / 1 / 2 / 1; overflow-y:scroll;}
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
</style>