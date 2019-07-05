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
        set_msg: (state, payload) => {
            const infoMas = state.info
            infoMas.push(payload)
        },
        set_lastMsgId: (state, payload) => {
            state.lastMsgId = payload
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
        }
    },
    actions: {
        //Получение последних 20 сбщ при авторизации
        GET_INFO: async (context, payload) => {
            await axios
                .get(`${GET_MSG_URI}?type=0&channel_id=${store.getters.CHANNELID}`)
                .then(response => {
                    payload = response.data
                })
                .catch(error => {
                    console.log(error)
                    context.commit('set_errored', true)
                });
            context.commit('set_info', payload)
        },
        //id последнего сообщения
        GET_LAST_ID: async (context, payload) => {
            await axios
            .get(`${GET_MSG_URI}?type=0&channel_id=${store.getters.CHANNELID}`)
                .then(response => {
                    const msgs = response.data
                    const lastInMsgs = msgs.length - 1
                    const lastMsg = msgs[lastInMsgs]
                    payload = lastMsg.id
                })
                .catch(error => {
                    console.log(error)
                });
            context.commit('set_lastMsgId', payload)
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
