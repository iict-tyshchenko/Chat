<template>
        <div class="entrance-background">
            <div class="entrance">
                <div class="entrance-head">
                    <i class="fas fa-comments" ></i>
                </div>
                <div class="entrance-body">
                    <form novalidate="true" @submit="checkForm">
                        <div class="form-row ">
                            <div class="col-8">
                                <label for="email" class="text-dark"> {{ label }} </label>
                                <label for="email" class="text-danger" v-for="error in errors"> {{ error }} </label>
                                <input class="form-control" placeholder="Enter email" type="email" name="email" id="email" v-model="email">
                            </div>
                            <div class="form-group col-3" >
                                <label for="channelSelect" class="text-dark">Channel</label>
                                <select id="channelSelect" class="form-control" v-model="channel">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                </select>
                            </div>
                        </div>
                        <div class="text-center" >
                            <input type="submit" value="sign in" class="btn btn-light btn-sm" >
                        </div>
                    </form>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        name: "entrance",
        data() {
            return {
                errors: [],
                label: 'Email'
            }
        },
        computed:{
            channel: {
                set (value) {
                    this.$store.commit('set_channelId', value)
                    this.$store.dispatch('GET_INFO')
                },
                get () {
                    return this.$store.getters.CHANNELID
                }
            },
            email:{
                set (value) {
                    this.$store.commit('set_email', value)
                },
                get() {
                    return this.$store.getters.EMAIL
                }
            }
        },
        methods:{
            checkForm(i) {
                this.label = '';
                this.errors = [];
                if(!this.email) {
                    this.errors.push("Please enter email")
                } else if(!this.validEmail(this.email)) {
                    this.errors.push("Please enter valid email")
                }
                if(!this.errors.length){
                    this.label = 'Email'
                    this.$router.push('/')
                    i.preventDefault()
                }
                i.preventDefault();
            },
            validEmail(email) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email)
            }
        }
    }
</script>

<style>
    .entrance-background {
        background-color: #D9D9D9 !important;
        display: grid;
        grid-template-columns: 1fr 500px 1fr;
        height: 100vh;
    }
    .entrance {
        background-color: #FFFFFF !important;
        grid-column-start: 2;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 50px 1fr 1fr 50px;
    }
    .entrance-head{
        grid-area: 2 / 1 / 2 / 1;
        align-self: center;
        justify-self: center;
    }
    .fa-comments{
        font-size: 125px;
        color: #3D87FF;
    }
    .entrance-body{
        grid-area: 3 / 1 / 3 / 1;
        justify-self: center;
    }
    .form-row{
        position: center;
    }
</style>