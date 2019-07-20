<template>
    <div class="settings-body">
        <div class="settings-head" >
            <i class=" profileAvatar fas fa-user-circle"></i>
            <h6 class="profileEmail"> {{ email }} </h6>
        </div>

        <div class="settings-params">
            <a class="contacts" @click="menuContacts()">
                <i class="fas fa-users fa-lg contacts-button"></i>
                <p>Contacts</p>
            </a>
            <a class="settings">
                <i class="fas fa-cogs fa-lg settings-button"></i>
                <p>Settings</p>
            </a>
            <a class="exit" @click="exit()">
                <i class="fas fa-sign-out-alt fa-lg exit-button"></i>
                <p>Exit</p>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "settings",
        data(){
            return {

            }
        },
        computed: {
            email(){
                return this.$store.getters.EMAIL
            },
        },
        methods:{
            exit(){
                this.$router.push('entrance')
            },
            menuContacts(){
                const component = 'contacts'
                this.$store.commit('set_menuComponent', component)
            },
        }
    }
</script>

<style scoped>
    p{
        color: #000000;
        margin: 0px;
        align-self: center;
    }
    a{
        cursor: pointer;
    }
    .profileEmail {
        align-self: center;
        margin: 10px;
    }
    .profileAvatar {
        font-size: 70px;
        margin: 5px;
        align-self: center;
    }
    .settings-body {
        grid-area: 1 / 1 / 2 / 2;
        background-color: #FFFFFF;
        display: grid;
        grid-template-columns: 250px;
        grid-template-rows: 100px 1fr 50px;

        height: 100vh;
    }
    .settings-head {
        grid-area: 1 / 1 / 1 / 2;
        background-color: #3D87FF;
        color: #FFFFFF;
        display: grid;
        grid-template-columns: 70px 1fr;
    }
    .settings-params {
        grid-area: 2 / 1 / 2 / 1;
        display: grid;
        grid-template-rows: 50px 50px 50px 1fr;
    }
    .contacts-button {
        grid-column-start: 1;
        align-self: center;
        text-align: center;
        color:#8A8A8A;
    }
    .contacts {
        grid-row-start: 1;
        display: grid;
        grid-template-columns: 0.5fr 1fr;
    }
    .settings-button {
        grid-column-start: 1;
        align-self: center;
        text-align: center;
        color:#8A8A8A;
    }
    .settings {
        grid-row-start: 2;
        display: grid;
        grid-template-columns: 0.5fr 1fr;
    }
    .exit-button {
        grid-column-start: 1;
        align-self: center;
        text-align: center;
        color:#8A8A8A;
    }
    .exit {
        grid-row-start: 3;
        display: grid;
        grid-template-columns: 0.5fr 1fr;
    }
</style>