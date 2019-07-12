<template>
    <div class="settings-body">
        <div class="settings-head" >
            <button type="button" class="fas fa-align-justify fa-lg back" @click="menuContacts()"></button>
        </div>

        <div class="settings-params" >

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
        methods:{
            menuContacts(){
                const component = 'contacts'
                this.$store.commit('set_menuComponent', component)
            },
        }
    }
</script>

<style scoped>
    .settings-body {
        grid-area: 1 / 1 / 2 / 2;
        background-color: #FFFFFF;
        display: grid;
        grid-template-columns: 250px;
        grid-template-rows: 50px 1fr;
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        height: 100vh;
    }
    .settings-head {
        grid-area: 1 / 1 / 1 / 2;
        background-color: #FFFFFF;
        display: grid;
        grid-template-columns: 60px 1fr;
    }
    .settings-params { grid-area: 2 / 1 / 2 / 1;}
    .back{
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
</style>