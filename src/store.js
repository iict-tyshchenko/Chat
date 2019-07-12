import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const BASE_URI = "http://gitlab.nii-ikt.ru:30080"
const GET_MSG_URI = `${BASE_URI}/msg_get`
const SEND_MSG_URI = `${BASE_URI}/msg_post`

export const store = new Vuex.Store({
    state: {
        email: 'email@email.kz',
        channelId: '1',
        msgs: [],
        lastMsgId: ' ',
        errored: false,
        menuComponent: 'contacts'
    },
    mutations: {
        set_menuComponent: (state, payload) => {
            state.menuComponent = payload
        },
        set_errored: (state, payload) =>{
            state.errored = payload
        },
        set_email: (state, payload) => {
            state.email = payload
        },
        set_channelId: (state, payload) => {
            state.channelId = payload
        },
        set_msgs: (state, payload) => {
            state.msgs = payload
        },
        set_lastMsgId: (state, payload) => {
            state.lastMsgId = payload
        },
    },
    getters: {
        MENUCOMPONENT: state => {
            return state.menuComponent
        },
        ERRORED: state => {
            return state.errored
        },
        EMAIL: state => {
            return state.email
        },
        CHANNELID: state => {
            return state.channelId
        },
        MSGS: state => {
            return state.msgs
        },
        LASTMSGID: state => {
            return state.lastMsgId
        },
    },
    //вызов таймера подгрузки сообщений, после создания экземпляра
    created: {
        timer: setTimeout(function loading() {
            if (store.getters.LASTMSGID > 0) store.dispatch('LOADING_MSG');
            timer: setTimeout(loading, 5000)
        }, 5000)
    },
    actions: {
        //Получение последних 20 сбщ при авторизации
        GET_MSGS: async (context, payload) => {
            await axios
                .get(`${GET_MSG_URI}?type=0&channel_id=${store.getters.CHANNELID}`)
                .then(response => {
                    payload = response.data
                })
                .catch(error => {
                    console.log('Get msgs:', error)
                    context.commit('set_errored', true)
                });
            context.commit('set_msgs', payload)
            store.dispatch('LAST_ID')
        },
        //подгрузка сообщений
        LOADING_MSG: async (context, payload) => {
            await axios
                .get(`${GET_MSG_URI}?type=1&channel_id=${store.getters.CHANNELID}&start=${store.getters.LASTMSGID}`)
                .then(response =>{
                    payload = response.data
                    const info = payload
                    if (info.length === undefined){
                        store.dispatch('LAST_ID')
                    }else{
                        let oldInfo = store.getters.MSGS
                        let newInfo = oldInfo.concat(payload)
                        context.commit('set_msgs', newInfo)
                        store.dispatch('LAST_ID')
                    }
                })
                .catch(error => {
                    console.log('LOADING MSG:', error)
                });
            },
        //получаем id последнего сообщения в store.info
        LAST_ID (context, payload){
            const msgs = store.getters.MSGS
            if(msgs.length !== 0) {
                const lastInMsgs = msgs.length - 1
                const lastMsg = msgs[lastInMsgs]
                payload = lastMsg.id
                context.commit('set_lastMsgId', payload)
            }else{
                payload = 0
                context.commit('set_lastMsgId', payload)
            }
        },
        //отправка сообщения
        SEND_MSG: async (context, sendInfo) => {
            await axios
                .post(`${SEND_MSG_URI}`, sendInfo)
                .catch(error => {
                    console.log('Send info:', error)
                });
        },
    }
});
