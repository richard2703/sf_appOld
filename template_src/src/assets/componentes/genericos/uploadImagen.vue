<template>
<div class="w-100 h-100 position-relative">
    <div class="w-100 h-100 border-radius-15px border-gray-lligth-1 overflow-hidden position-relative" :class="`${clase?clase:''}`">

        <imagen clase="object-fit url" :src="url" v-if="url" @click="takePicture()" />
        
        <imagen clase="object-fit url" :src="imagenUrl" v-else-if="create && value" @click="takePicture()" />

        <imagen :class="(padding)?padding:'p-4'" :icono="true" src="user"               v-else-if="user"    @click="takePicture()" />
        <imagen :class="(padding)?padding:'p-0'" :src="null"   :default="true"          v-else-if="def"     @click="takePicture()" />
        <template v-else>
            <div class="row w-100 h-100 m-0 align-items-center">
                <div class="w-60px h-50px mx-auto mt-auto px-1 border-azul1-3 border-radius-10px ">
                    <imagen :class="(padding)?padding:''" :icono="true" src="adda"   @click="takePicture()" />
                </div>
                <div class="row w-100 m-0 pt-1 mb-auto">
                    <div class="row w-100 m-0 justify-content-center text-center letra-azul1-14">Agregar foto</div>
                </div>
            </div>
        </template>

        <button class="button boton-remove" v-if="url"  @click="eliminar()">
            <div class="row justify-content-center">
                <img src="https://socialflow.app/backend/apiv1/iconos/clear.svg" alt="">
            </div>
        </button>
    </div>

    <div class="w-45px h-45px position-absolute top--10px right--10px back-color-blanco border-radius-50 border-amar2-2" v-if="crop && value"  @click="crops()">
        <div class="row w-100 m-0 pt-2px justify-content-center">
            <icono icono="crop" clase="letra-amar2-30" />
        </div>
    </div>

    <template v-if="1">
        <label class="row w-100 m-0 position-absolute top-15px left-0px" v-if="emulador">
            <div class="row w-100 m-0">Input file</div>
            <div class="row w-100 m-0">
                <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" @change="selectPictureWeb">
            </div>
        </label>
    </template>

</div>
</template>
<script>
export default {
    data(){
        return {
            id: _.uniqueId('updloadImg_'),
            url: null,
            imagen_id: null,
            modal: 'selectImagen',
            web: null,
        };
    },
    props:[    
            'value',
            'def',
            'clase',
            'create',
            'crop',
            'user',
            'imagen',
            'padding',
        ],
    computed:{
        emulador(){return typeof device == 'undefined' || device.platform == 'browser' || device.platform == null },
        baseUrl(){ return this.$store.getters.baseUrl; },
        imagenUrl(){return `${this.baseUrl}img/render/${this.value}/500/500/foto.jpg`},
    },
    created() {
        console.log("CON", this.def);
        if(this.imagen){
            this.url = this.imagen;
        }
    },
    mounted() {
        console.log("UPLOAD IMG", this.value, this.imagen);
    },
    methods:{
        crops(){
            this.$emit('crop');
        },
        takePicture(i){
            this.$store.commit('commitFuncion',this.unploadFoto);
            this.$store.commit('openModal',[this.modal]);
        },
        selectPictureWeb(event){
            console.log("event", event.target.files[0], URL.createObjectURL(event.target.files[0]));
            this.web =  event.target.files[0];
            setTimeout(()=>{this.uploadFromWeb(this.web)},1000);
        },
        uploadFromWeb(foto){
            console.log("SUBIENDO FOTO", foto);
            this.$store.dispatch('unploadWebImage',[{},foto,'sync/saveimg']).then(
                res=>{
                    if(res.data){
                        this.url = res.data.url;
                        this.imagen_id = res.data.id;
                        this.$emit('input', this.imagen_id);
                        this.$emit('change', res.data.base);
                    }
                },error=>{});
        },
        unploadFoto(img){
            this.$store.dispatch('saveImagen',img).then(
                res=>{
                    this.url = res.data.url;
                    this.imagen_id = res.data.id;
                    this.$emit('input', this.imagen_id);
                    this.$emit('change', res.data.base);
                },error=>{})
        },
        eliminar(){
            this.url = null;
            this.imagen_id = null;
            this.$emit('input', this.imagen_id);
        },
    },
}
</script>