<template>
<div class="row w-100 m-0 py-3 px-3">
    <div :id="id" class="row w-100 m-0 justify-content-center">
        <div class="w-15vw h-15vw mx-auto" @click="face()">
            <imagen :icono="true" src="face" />
        </div>
        
        <div class="w-15vw  h-15vw mx-auto" @click="insta()" >
            <imagen :icono="true" src="instagram" />
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            id: _.uniqueId('share_')
        };
    },
    props: ['titulo','texto','boton'],
    
    created() {
    },

    mounted() {
        console.log("SOCIAL SOCIAL SOCIAL", jsSocials );
        // this.init();
    },

    methods:{
        face(){
            let x = "https://www.facebook.com/sharer/sharer.php?app_id=113869198637480&display=popup&sdk=joey&u=https://socialflow.app/#/";
            this.$store.dispatch('openBrowser',x);
        },

        insta(){
            let x = "https://www.instagram.com/sharer/sharer.php?app_id=113869198637480&display=popup&sdk=joey&u=https://socialflow.app/#/"
            this.$store.dispatch('openBrowser',x);
        },

        init(){
            $(`#${this.id}`).jsSocials({
            showLabel: false,
            showCount: false,
            shares: [
                {
                    share: "facebook",
                    logo: "fab fa-facebook",
                    css: "color-blanco",
                    shareIn: "blank",
                },
                {
                    share: "twitter",
                    logo: "fab fa-twitter",
                    css: "color-blanco",
                    shareIn: "blank",
                },
                {
                    share: "email",
                    css: "color-blanco",
                    shareIn: "blank",
                },
                {
                    share: "linkedin",
                    logo: "fab fa-linkedin",
                    css: "color-blanco",
                    shareIn: "blank",
                },
                {
                    share: "whatsapp",
                    logo: "fab fa-whatsapp",
                    css: "color-blanco",
                    shareIn: "blank",
                },
                //  "facebook", 
                //  "googleplus", 
                //  "whatsapp"
                ]
        });
        }
    },
}
</script>