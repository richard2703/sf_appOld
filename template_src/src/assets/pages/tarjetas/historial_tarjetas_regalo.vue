    <template>
        <f7-page id="inicio" >
            <modalQr v-if="codigo" :qr="codigo" :data="x" @cancel="codigo = null" />
            <modalQr v-else :qr="qr" :data="last"  />

            <div class="vista" v-vistak>
                <div v-if="$store.getters.deviceIos"  @click="$store.dispatch('scrollBottom','historilaccom')" class="w-45px h-45px border-radius-50 position-absolute bottom-8 right-44 opacity-7 back-color-gray1 justify-content-center text-center align-content-center z-index-10000 ">
                    <icono icono="keyboard_arrow_down" clase="letra-blanco-45 pt-1px" />
                </div>

                <nav-bar tipo="inicio" :backs="true" :title="'Tarjetas de regalo'" :right="false" />
                <div id="historilaccom" class="contenedor-page">
                <div class="row w-100 m-0">

                    <div class="row w-100 m-0" v-for="a of historial " :key="a.id">
                        <tarjetaRegaloComponent :data="a" @open="openQr" />
                    </div>
                                        
                </div>
                    
                </div>
            </div>
        </f7-page>
    </template>
<script>
import { f7Page } from 'framework7-vue';
const moment = require('moment');

    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                codigo: null,
                x: {},
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            historial(){return this.$store.getters.userStateArray('misTarjetas') || []; },
            last(){return (([...this.historial][0] || {}).productos || []).find(x=>{return x.producto.tipo=='servicio'}) || {} },
            qr(){ return this.last.code || null },
        },
        mounted() {
            console.log("ASASAS", this.last, [...this.historial][0]);
        },
        methods:{
            nuevo(id){
                this.$store.commit('setUsuarioData',['lista', id]);
                this.router.navigate('/regalos_listas');
            },
            openQr(a, user_id = null){
                this.codigo = a.code; 
                this.x = a;
                if(user_id){
                    this.x.notQr = true;
                }
                else{
                    this.x.notQr = false;
                }
                console.log("XXXXY", user_id, this.x);
                this.$store.commit('openModal',['modalQr'])
            },
            
        }
    }
</script>