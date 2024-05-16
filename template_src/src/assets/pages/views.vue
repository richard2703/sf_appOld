<template>
    
    <div class="views tabs">    
        <f7-view url="/slider_home" tabActive tab name="login"        class="ios-edges" :iosSwipeBack="false" id="view-login"></f7-view>
        <f7-view url="/inicio"                tab name="usuario"      class="ios-edges" :iosSwipeBack="false" id="view-usuario"></f7-view>
        <!-- <f7-view url="/inicio_chofer"         tab name="chofer"       class="ios-edges" :iosSwipeBack="false" id="view-chofer"></f7-view> -->
        <f7-view url="/scanner"               tab name="scanner"      class="ios-edges" :iosSwipeBack="false" id="view-scanner"></f7-view>
    </div>

</template>
<script>
import { f7Page, f7View } from 'framework7-vue';
    export default{
        components:{
            f7Page,
            f7View,
        },
        data(){
            return{
                open: true,
            } 
        },
        computed: {
        },
        created() {
            this.$store.dispatch('initData', [this.$f7]);
        },
        mounted(){
        },
        methods:{
        }
    }
</script>