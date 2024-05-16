<template>
<div class="row w-100 m-0 position-relative" @click="completar()" >

  <template>
    <div class="row w-100 m-0 pb-3" :class="lecCompleta?'back-color-blanco':'back-color-gray00'" v-if="a.typex=='1'" >
        <div class="row w-100 m-0 px-3 py-2 " >
            <div class="row w-100 m-0 py-2 border-b-gray0-1" >
                <div class="col my-auto px-0 pl-3">
                    <div class="row w-100 m-0 letra-azul1-18" :class="lecCompleta?'':'fw-600 font-italic'" >Pedido ID #{{a.pedido.id}}</div>
                    <div class="row w-100 m-0 letra-azul1-18" v-if="debug">Compra directa</div>
                    <div class="row w-100 m-0 " :class="lecCompleta?'':'fw-600 font-italic'">
                        <div class="col px-0 letra-gray4-17">Fecha:</div>
                        <div class="col-auto px-0 letra-azul1-19 fw-800">{{[a.pedido.created, 'YYYY-MM-DD HH:mm:ss'] | moment('DD/MM/YY')}}</div>
                    </div>
                    <div class="row w-100 m-0 " :class="lecCompleta?'':'fw-600 font-italic'">
                        <div class="col px-0 letra-gray4-17">Total:</div>
                        <div class="col-auto px-0 letra-gray4-19 fw-800">{{a.pedido.total | currency}}</div>
                    </div>
                    <div class="row w-100 m-0 " v-if="a.para_usuarios_id">
                        <div class="col px-0 letra-gray4-17">Para:</div>
                        <div class="col-auto px-0 letra-gray4-19 text-capitalize">{{a.para_usuario.nombre}}</div>
                    </div>
                    <!-- <div class="row w-100 m-0 letra-azul1-16 fw-600 justify-content-end text-right" v-if="a.por_qr == '1'" 
                            @click=" $store.commit('openModal',['modalQr']) ">Ver QR</div> -->
                </div>
            </div>
            <div class="row w-100 m-0"></div>
            <div class="row w-100 m-0 px-3 pt-3">
                <div class="row w-100 m-0 py-1">
                    <div class="w-10vw h-10vw mb-auto">
                        <imagen clase="border-radius-5px" :fit="true" :src="a.imagen" v-if="a.imagen" />
                        <imagen clase="border-radius-5px" :fit="true" src="https://socialflow.app/backend/apiv1/imagenes/p1.png" v-else />
                    </div>
                    <div class="col my-auto px-0 pl-3">
                        <div class="row w-100 m-0 letra-azul1-18">{{a.nombre}}</div>
                        <div class="row w-100 m-0 letra-gray4-18 fw-800" v-if="Number(a.iva)">{{a.precio * 1.16 | currency}}</div>
                        <div class="row w-100 m-0 letra-gray4-18 fw-800" v-else >{{a.precio | currency}}</div>
                    </div>
                </div>

                <div class="row w-100 m-0" v-if="a.estatus == 'entregado'">
                    <div class="row w-100 m-0">
                        <div class="col-auto px-0 letra-gray4-18">Entregado</div>
                    </div>
                    <div class="row w-100 m-0" >
                        <div class="col px-0 letra-gray3-16">Fecha de canje:</div>
                        <div class="col-auto px-0 letra-azul1-17 fw-600">{{ a.fecha_entrega | timestamp}}</div>
                    </div>
                </div>

                <div class="row w-100 m-0 pt-2 pb-1 letra-azul1-16 fw-600 justify-content-end text-right" 
                        @click=" openQr(a, a.code, session.id != a.pedido.usuarios_id) ">
                    <botonApp size="w-30vw" texto="Ver QR" tipo="azul" radius="30px" py="py-5px" />
                </div>
            </div>
            <div class="row w-100 m-0 px-3 border-t-gray0-1" v-if="a.partner && a.partner.id">
                <div class="row w-100 m-0 pt-2">
                    <div class="row w-100 m-0 letra-gray3-18">Establecimiento</div>
                </div>
                <div class="row w-100 m-0 pb-1">
                    <div class="col my-auto px-0">
                        <div class="row w-100 m-0 letra-azul1-18 fw-800">{{a.partner.tradename}}</div>
                        <div class="row w-100 m-0 letra-gray4-16 ">Direccion: {{a.partner.street}} {{a.partner.num_int}}</div>
                    </div>
                </div>
            </div>
        </div>
   </div>
  </template>

  <template>
    <div class="row w-100 m-0 pb-3 " :class="lecCompleta?'back-color-blanco':'back-color-gray00'" v-if="a.typex=='1.1'" >
        <div class="row w-100 m-0 px-3 py-2 " >
            <div class="row w-100 m-0 py-2 border-b-gray0-1" >
                <div class="col my-auto px-0 pl-3">
                    <!-- <div class="row w-100 m-0 letra-azul1-18">1.1 </div> -->
                    <div class="row w-100 m-0 letra-azul1-18" :class="lecCompleta?'':'fw-600 font-italic'" >Pedido ID #{{a.id}}</div>
                    <div class="row w-100 m-0 letra-azul1-18" v-if="debug">Regalo en pedido directo</div>
                    <div class="row w-100 m-0 ">
                        <div class="col px-0 letra-gray4-17" :class="lecCompleta?'':'fw-600 font-italic'" >Fecha:</div>
                        <div class="col-auto px-0 letra-azul1-19 fw-800" :class="lecCompleta?'':'fw-600 font-italic'" >{{[a.created, 'YYYY-MM-DD HH:mm:ss'] | moment('DD/MM/YY')}}</div>
                    </div>
                    <div class="row w-100 m-0 " :class="lecCompleta?'':'fw-600 font-italic'">
                        <div class="col px-0 letra-gray4-17">Total:</div>
                        <div class="col-auto px-0 letra-gray4-19 fw-800">{{a.total | currency}}</div>
                    </div>
                    <!-- <div class="row w-100 m-0 " v-if="a.para_usuarios_id">
                        <div class="col px-0 letra-gray4-17">Para:</div>
                        <div class="col-auto px-0 letra-gray4-19 text-capitalize">{{a.nombre}}</div>
                    </div> -->
                    <!-- <div class="row w-100 m-0 letra-azul1-16 fw-600 justify-content-end text-right" v-if="a.por_qr == '1'" 
                                @click=" $store.commit('openModal',['modalQr']) ">Ver QR</div> -->
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
                        <div class="row w-100 m-0 letra-gray4-18 ">
                            <div class="col-auto px-0">{{p.precio | currency}}  </div>
                            <div class="col px-0 pl-2">x{{p.cantidad }}</div>
                            <div class="col-auto px-0 fw-800">{{p.total | currency}} {{ p.producto.currency }}</div>
                        </div>
                    </div>
                </div>
                <div v-if="p.tipo_entrega != 'domicilio'" class="row w-100 m-0 pt-2 pb-2 letra-azul1-16 fw-600 justify-content-end text-right" 
                        @click=" openQr({...p, ...p.producto}, p.code, session.id != a.usuarios_id) ">
                    <botonApp size="w-30vw" texto="Ver QR." tipo="azul" radius="30px" py="py-5px" />
                </div>
                
                <div v-if="p.tipo_entrega != 'domicilio'" class="row w-100 m-0">
                    <div class="row w-100 m-0 px-3 " v-if="p.producto && p.producto.partner && p.producto.partner.id" >
                        <div class="row w-100 m-0 pt-2">
                            <div class="row w-100 m-0 letra-gray3-18">Establecimiento</div>
                            <div class="row w-100 m-0 letra-azul1-18 fw-800">{{p.producto.partner.tradename}}</div>
                        </div>
                        <sucursalesProductos :data="p.producto" />
                    </div>
                   
                </div>
            </div>

        </div>
   </div>
  </template>
  <div class="row w-100 m-0"  v-if="a.typex=='2'">
    <!-- <div class="row w-100 m-0 mb-3 back-color-blanco" v-for="a of regalos " :key="a.id"> -->
    <div class="row w-100 m-0 pb-3" :class="lecCompleta?'back-color-blanco':'back-color-gray00'"  >
         <div class="row w-100 m-0 px-3 py-2" >
             <div class="row w-100 m-0 py-2 border-b-gray0-1" >
                 <div class="col my-auto px-0 pl-3">

                     <div class="row w-100 m-0 letra-azul1-18">Pedido ID #{{a.id}}</div>
                     
                     <div class="row w-100 m-0 ">
                         <div class="col px-0 letra-gray4-17">{{a.type}}:</div>
                         <div class="col-auto px-0 letra-gray4-19 fw-800 text-capitalize">{{a.nombre}}</div>
                     </div>

                     <div class="row w-100 m-0 ">
                         <div class="col px-0 letra-gray4-17">Fecha:</div>
                         <div class="col-auto px-0 letra-azul1-19 fw-800">{{[a.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('DD/MM/YY')}}</div>
                     </div>
                    
                      <div class="row w-100 m-0 " v-if="a.total" >
                         <div class="col px-0 letra-gray4-17">Total:</div>
                         <div class="col-auto px-0 letra-gray4-19 fw-800">{{a.total | currency}}</div>
                     </div>
                 </div>
             </div>
             <div class="row w-100 m-0"></div>

             <div class="row w-100 m-0 px-3 pt-3" >
                 <div class="row w-100 m-0 border-b-gray0-1" v-for="x of a.productos" :key="x.id">
                     <div class="row w-100 m-0 py-1">
                         <div class="w-10vw h-10vw mb-auto">
                             <imagen clase="border-radius-5px" :fit="true" :src="x.imagen" v-if="x.imagen" />
                             <imagen clase="border-radius-5px" :fit="true" src="https://socialflow.app/backend/apiv1/imagenes/p1.png" v-else />
                         </div>
                         <div class="col my-auto px-0 pl-3">
                             <div class="row w-100 m-0 letra-azul1-18">{{x.nombre}}</div>
                             <div class="row w-100 m-0 letra-gray4-18 fw-800">{{x.precio | currency}}</div>
                         </div>
                     </div>
                     <div class="row w-100 m-0 pb-1 letra-azul1-16 fw-600 justify-content-end text-right" v-if="x.producto.tipo == 'servicio'" 
                            @click=" openQr(x, x.code, true)" >
                        <botonApp size="w-30vw" texto="Ver QR" tipo="azul" radius="30px" py="py-5px" />
                     </div>
                 </div>
             </div>
             
         </div>
    </div>
</div>
  <template>
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

        openQr(a, c, regalo = false){
            if(this.callback){
                this.callback(a, c, regalo);
            }
        },
    },
}
</script>