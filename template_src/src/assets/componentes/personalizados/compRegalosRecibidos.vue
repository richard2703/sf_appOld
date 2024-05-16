<template>
<div class="row w-100 m-0 position-relative" @click="completar()" >

  <template>
    <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1" >
        <div class="row w-100 m-0 py-2 border-b-gray0-1" >
            <div class="col my-auto px-0 pl-3">
                <div class="row w-100 m-0 letra-azul1-18" :class="lecCompleta?'':'fw-600 font-italic'"  >Pedido ID #{{a.id}}</div>
                <div class="row w-100 m-0 " :class="lecCompleta?'':'fw-600 font-italic'" >
                    <div class="col px-0 letra-gray4-17">Fecha:</div>
                    <div class="col-auto px-0 letra-azul1-19 fw-800">{{[a.created, 'YYYY-MM-DD HH:mm:ss'] | moment('DD/MM/YY')}}</div>
                </div>
                <!-- <div class="row w-100 m-0 ">
                    <div class="col px-0 letra-gray4-17">Total:</div>
                    <div class="col-auto px-0 letra-gray4-19 fw-800">{{a.total | currency}}</div>
                </div> -->
                <div class="row w-100 m-0 " :class="lecCompleta?'':'fw-600 font-italic'"  v-if="a.para_usuarios_id">
                    <div class="col px-0 letra-gray4-17">De:</div>
                    <div class="col-auto px-0 letra-gray4-19 text-capitalize">{{a.usuario.nombre}}</div>
                </div>
                <div class="row w-100 m-0 py-2" :class="lecCompleta?'':'fw-600 font-italic'"  v-if="a.productos.some(x=>{return x.tipo_entrega == 'domicilio'})" >
                    <div class="col my-auto px-0 letra-gray4-17">Direccion de envio:</div>
                    <div class="col-auto my-auto px-0 letra-azul1-14 border-b-azul1-1" v-if="!a.usuarios_domicilios_id" @click="set(a)">Selecciona direccion de envio</div>
                    <div class="col-auto my-auto px-0 letra-azul1-14" v-else>{{a.direccion.calle}}</div>
                </div>
            </div>
        </div>
        <div class="row w-100 m-0"></div>
        <div class="row w-100 m-0 px-3 mb-5 border-b-gray0-1" v-for="p of a.productos" :key="p.id">
            <div class="row w-100 m-0">
                <div class="w-10vw h-10vw mb-auto mt-2">
                    <imagen clase="border-radius-5px" :fit="true" :src="p.imagen" v-if="p.imagen" />
                    <imagen clase="border-radius-5px" :fit="true" src="https://socialflow.app/admin/apiv1/imagenes/p1.png" v-else />
                </div>
                <div class="col my-auto px-0 pl-3">
                    <div class="row w-100 m-0 letra-azul1-18">{{p.nombre}}</div>
                    <div class="row w-100 m-0 pb-1">
                        <div class="col-auto px-0 letra-gray4-17 ">Tipo entrega: </div>
                        <div class="col-auto px-0 letra-azul1-17 fw-600 text-capitalize " v-if="p.tipo_entrega == 'qr'">QR</div>
                        <div class="col-auto px-0 letra-azul1-17 fw-600 text-capitalize " v-else>{{p.tipo_entrega}}</div>
                    </div>
                    <!-- <div class="row w-100 m-0 letra-gray4-18 " >
                        <div class="col-auto px-0">{{p.precio | currency}}  </div>
                        <div class="col px-0 pl-2">x{{p.cantidad }}</div>
                        <div class="col-auto px-0 fw-800">{{p.total | currency}} {{ p.producto.currency }}</div>
                    </div> -->
                </div>
            </div>
            <template v-if="p.tipo_entrega == 'qr'" >
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 pt-2 pb-2 letra-azul1-16 fw-600 justify-content-end text-right" @click=" openQr(p, p.code) ">
                        <botonApp size="w-30vw" texto="Ver QR" tipo="azul" radius="30px" py="py-5px" />
                    </div>

                    <div class="row w-100 m-0 px-3 " v-if="p.producto && p.producto.partner && p.producto.partner.id" >
                        <div class="row w-100 m-0 pt-2">
                            <div class="row w-100 m-0 letra-gray3-18">Establecimiento</div>
                            <div class="row w-100 m-0 letra-azul1-18 fw-800">{{p.producto.partner.tradename}}</div>
                        </div>
                        <sucursalesProductos :data="p.producto" />
                    </div>
                </div>
            </template>

        </div>
        
    </div>
  </template>
   
</div>
</template>
<script>
export default {

    data(){
        return {
            tab: null,
            
        };
    },
    props:  [
        'data',
        'data',
        'vista',
        'callback'
    ],
    computed: {
        deve(){return this.$store.getters.deve;},
        debug(){return this.$store.getters.deviceready == false; },

        router(){return this.$store.getters.getRouter;},
        session(){return this.$store.getters.getSession;},

        dx(){return this.data || {};},
        a(){return this.data || {};},

        prelecturas(){return this.$store.getters.getCatalogo('notificacionesPreLeidasVista') },
        preLec(){return this.prelecturas.some(s=>s.vista == this.vista && s.valor == this.dx.id ) },
        lecCompleta(){return this.prelecturas.some(s=>s.vista == this.vista && s.valor == this.dx.id && s.completa ) }

    },

    mounted(){
        console.log("REU REGALO ACTIVE", this.a );
        this.preleer();
    },

    methods:{
        preleer(id){

            let d = {
                id:     this.dx.id,
                creado: this.dx.creado,
            };
            if(!this.preLec){
                this.$store.dispatch('postLeerNotification',[ this.dx.id, this.dx.creado, 1, this.vista ]);
            }
        },

        completar(){
            this.$emit('click', this.dx);
            console.log("COMPLETANDO LECTURA");
            let d = {
                id:     this.dx.id,
                creado: this.dx.creado,
            };
            if(!this.lecCompleta){
                this.$store.dispatch('postLeerNotification',[ this.dx.id, this.dx.creado, 5, this.vista ]);
            }
        },

        set(a){
            this.$store.commit('setUsuarioData',['regalo',a.id]);
            this.router.navigate('/seleccionar_domicilio');
        },

        openQr(a,c){
            if(this.callback){
                this.callback(a, c);
            }
        },
    },
}
</script>