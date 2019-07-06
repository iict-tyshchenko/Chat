import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const BASE_URI = "http://gitlab.nii-ikt.ru:30080"
const GET_MSG_URI = `${BASE_URI}/msg_get`
const SEND_MSG_URI = `${BASE_URI}/msg_post`

export const store = new Vuex.Store({
    state: {
        email: 'email2@email.com',
        channelId: '1',
        info: [],
        lastMsgId: '',
        showModal: false,
        errored: false,
    },
    mutations: {
        set_errored: (state, payload) =>{
            state.errored = payload
        },
        set_showModal: (state, payload) =>{
            state.showModal = payload
        },
        set_email: (state, payload) => {
            state.email = payload
        },
        set_channelId: (state, payload) => {
            state.channelId = payload
        },
        set_info: (state, payload) => {
            state.info = payload
        },
        set_lastMsgId: (state, payload) => {
            state.lastMsgId = payload
        },
        set_loadingMsg: (state, payload) => {
            state.info = payload
        }
    },
    getters: {
        ERRORED: state => {
            return state.errored
        },
        SHOWMODAL: state => {
          return state.showModal
        },
        EMAIL: state => {
            return state.email
        },
        CHANNELID: state => {
            return state.channelId
        },
        INFO: state => {
            return state.info
        },
        LASTMSGID: state => {
            return state.lastMsgId
        },
    },
    actions: {
        //Получение последних 20 сбщ при авторизации
        GET_INFO: async (context, payload) => {
            await axios
                .get(`${GET_MSG_URI}?type=0&channel_id=${store.getters.CHANNELID}`)
                .then(response => {
                    payload = response.data
                    console.log(payload)
                })
                .catch(error => {
                    console.log('Get info:', error)
                    context.commit('set_errored', true)
                });
            context.commit('set_info', payload)

            var timer = setInterval(function() {
                store.dispatch('LAST_ID')
                store.dispatch('LOADING_MSG')
            }, 5000);
        },

        LOADING_MSG: async (context, payload) => {
            await axios
                .get(`${GET_MSG_URI}?type=1&channel_id=${store.getters.CHANNELID}&start=${store.getters.LASTMSGID}`)
                .then(response =>{
                    payload = response.data
                    const info = payload
                    if (info.length === undefined){
                        console.log('empty')
                    }else{
                        console.log('not empty:', payload)
                        let oldInfo = store.getters.INFO
                        let newInfo = oldInfo.concat(payload)
                        context.commit('set_info', newInfo)
                    }
                })
                .catch(error => {
                    console.log('LOADING MSG:', error)
                });

            },
        LAST_ID (context, payload){
                const   msgs = store.getters.INFO,
                        lastInMsgs = msgs.length - 1,
                        lastMsg = msgs[lastInMsgs]
                payload = lastMsg.id
                context.commit('set_lastMsgId', payload)
                console.log(payload)
        },
        SEND_INFO: async (context, sendInfo) => {
            await axios
                .post(`${SEND_MSG_URI}`, sendInfo)
                .catch(error => {
                    console.log(error)
                });
        },
    }
});
