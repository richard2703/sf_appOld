<template>
    <img :class="`h-100 w-100 ${clase?clase:''} ${fit?'object-fit':''}`" :id="`img_${id}`"  :src="imagen" :alt="`alt_${id}`" @click="showImage()">
</template>
<script>
export default {
    data(){
        return {
            id: _.uniqueId('img_'),
            img: null,
            load: null,
            height: null,
            width: null,
            galeria: [],
            imgDefault: this.$store.getters.syncObj('defaultImg'),
        };
    },
    props:[    
            'src',
            'fit',
            'create',
            'fullsize',
            'default',
            'user',
            'perfil',
            'logo',
            'general',
            'icono',
            'formato',
            'clase',
            'show',
        ],
    computed:{
        session(){return this.$store.getters.getSession;},
        baseUrl(){ return this.$store.getters.baseUrl; },
        imagenUrl(){return `${this.baseUrl}img/directRender/${this.src}/400/400/foto.jpg`},
        imagenUrlFull(){return `${this.baseUrl}img/directRender/${this.src}/foto.jpg`},
        imagen(){
            if(this.logo) {
                if(this.logo == 3){
                    return `https://socialflow.app/backend/apiv1/imagenes/ro1.png`;
                }
                return `https://socialflow.app/backend/apiv1/imagenes/lo.svg`;
            }
            if(this.icono) {
                if(this.formato){
                    return `https://socialflow.app/backend/apiv1/iconos/${this.src}.${this.formato}`;
                }
                return `https://socialflow.app/backend/apiv1/iconos/${this.src}.svg`;
            }
            if(this.perfil) {
                if(this.session.foto && this.session.foto != '0'){
                    return this.session.foto;
                }
                return 'https://socialflow.app/backend/apiv1/images/perfil.png';
            }
            if(this.src && this.src != '0'){
                if(this.create){
                    if(this.fullsize){
                        return this.imagenUrlFull;
                    }
                    return this.imagenUrl;
                }
                return this.src;
            }
            if(this.user){
                return 'https://socialflow.app/backend/apiv1/images/perfil.png';
            }
            if(this.default){
                if(this.default == 1){
                    return this.imgDefault;
                }
                return this.imgDefault;
            }
            return this.imgDefault;
        },

    },
    created() {
        // this.getDatos();
    },
    methods:{
        getDatos(){
            this.load = document.createElement('img');
            this.load.src = this.src;
            if(this.load){
                this.load.onload = ()=>{
                    this.height = this.load.height*5;
                    this.width = this.load.width*5;
                };
            }
        },
        showImage(){
            if(this.show){
                if(this.height && this.width){
                    if(this.src){
                        this.$store.dispatch('showImage',[this.imagen,this.height, this.width]);
                    }
                }
            }
            else{
                this.$emit('click');
            }
        }
    },
}
</script>