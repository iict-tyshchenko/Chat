import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const BASE_URI = "http://gitlab.nii-ikt.ru:30080"
const GET_MSG_URI = `${BASE_URI}/msg_get`
const SEND_MSG_URI = `${BASE_URI}/msg_post`

export const store = new Vuex.Store({
    state: {
        email: '',
        channelId: '1',
        info: null,
        showModal: true,
        errored: false
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
    },
    actions: {
        GET_INFO: async (context, payload) => { //Получение сообщения
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
        SEND_INFO: async (context, sendInfo) => { //Отправка сообщения
            await axios
                .post(`${SEND_MSG_URI}`, sendInfo)
                .catch(error => {
                    console.log(error)
                });
            store.dispatch('GET_INFO')
        },
    }
});
