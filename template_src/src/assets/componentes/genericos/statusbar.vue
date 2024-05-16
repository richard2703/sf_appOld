<template>
<div class="status_bar row w-100 m-0 h-18px" v-if="show"></div>
</template>
<script>
export default {
    data(){
        return {
            ios: true,
        };
    },
    props:  [ ],
    computed:{
        login(){ return this.$store.getters.getRuta.url == '/login' || this.$store.getters.getRuta.url == '/slider_home'; },
        view(){return this.$store.getters.getView == 'login'},
        show(){
            if(this.view){
                return false;
            }
            if(this.login){
                return false;
            }
            return true;
        }
    },
    created() {
        console.log("SATSUS BAR", this.login, this.$store.getters.getRuta.url);
        document.addEventListener("deviceready", ()=>{
            this.ios = device.platform == 'iOS';
        }, false);
    },
    methods:{
    },
}
</script>