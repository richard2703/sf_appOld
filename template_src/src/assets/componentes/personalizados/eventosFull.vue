<template>
<div class="row w-100 m-0" >
    <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1">
        <div class="row w-100 m-0" @click="click()">

            <div class="w-18vw h-18vw mb-auto mt-2" v-if="a.imagen">
                <imagen :fit="true" clase="border-radius-15px" :create="true" :src="a.imagen" />
            </div>

            <div class="w-18vw h-18vw mb-auto mt-2" v-else >
                <imagen :fit="true" clase="border-radius-15px" src="https://socialflow.app/backend/apiv1/img/b1.png" />
            </div>

            <div class="col my-auto px-0 pl-3">
                <div class="row w-100 m-0 letra-azul1-17 text-capitalize" v-if="debug" >ID #{{a.id}}</div>
                <div class="row w-100 m-0 letra-azul1-17 text-capitalize">{{a.type}}</div>
                <div class="row w-100 m-0 letra-gray4-16">{{a.nombre}}</div>
                <div class="row w-100 m-0 letra-gray3-15 text-capitalize" v-if="a.fecha">{{a.fecha | moment('DD [de] MMMM [del] YYYY')}}</div>
                <div class="row w-100 m-0 letra-gray3-15 text-capitalize" v-if="a.hora">{{[a.hora, 'HH:mm:ss'] | moment('HH:mm [hrs]')}}</div>
                <template v-if="a.tipo == 'party'">
                    <div class="row w-100 m-0 pt-2 letra-gray3-15 text-capitalize" >Fecha de expiración para aceptar:</div>
                    <div class="row w-100 m-0 letra-azul1-15 text-capitalize" >{{[a.expiracion, 'YYYY-MM-DD HH:mm:ss'] | moment('DD [de] MMMM [del] YYYY')}}</div>
                </template>
                <template v-if="a.tipo == 'reunion'">
                    <template v-if="a.cooperacion == 'si'">
                        <div class="row w-100 m-0 pt-2 letra-gray3-15 text-capitalize" >Fecha de expiración para aceptar:</div>
                        <div class="row w-100 m-0 letra-azul1-15 text-capitalize" >{{[a.expiracion, 'YYYY-MM-DD HH:mm:ss'] | moment('DD [de] MMMM [del] YYYY')}}</div>
                    </template>
                </template>
                <div class="row w-100 m-0 pt-2" v-if="a.lista_id" @click="verDeseosLista()">
                    <div class="col-auto px-0 letra-azul1-16 border-b-azul1-1">Ver wishlist de la reunion</div>
                </div>
            </div>

            <div class="col-auto my-auto px-0">
                <div class="row w-100 m-0">
                    <div class="w-50px border-radius-5px back-color-gray0 py-1 justify-content-center text-center" @click=" goChat(a) ">
                        <icono icono="chat" clase="letra-azul1-20 pt-4px" />
                    </div>
                </div>
                <div class="row w-100 m-0 pt-2">
                    <div class="w-50px border-radius-5px back-color-gray0 py-1 justify-content-center text-center" @click=" $store.commit('initEdicionEvento') ">
                        <icono icono="edit" clase="letra-azul1-20 pt-4px" />
                    </div>
                </div>
                <div class="row w-100 m-0 pt-2" >
                    <div class="w-50px border-radius-5px back-color-gray0 py-1 justify-content-center text-center" @click=" eliminar(a) ">
                        <icono icono="delete" clase="letra-azul1-20 pt-4px" />
                    </div>
                </div>
            </div>
        </div>
       
        <div class="row w-100 m-0 pb-3"  >

            <div class="row w-100 m-0 pt-2">
                <div class="row w-100 m-0 letra-gray3-15">Creador</div>
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 px-1 py-1">
                        <div class="w-8vw h-8vw my-auto">
                            <imagen clase="border-radius-50" :src="a.usuario.foto" :fit="true" :user="true" />
                        </div>
                        <div class="col my-auto px-0 pl-2">
                            <div class="row w-100 m-0 letra-gray4-15">{{a.usuario.nombre}}</div>
                            <div class="row w-100 m-0 letra-gray3-13">{{a.usuario.email}}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row w-100 m-0 pt-2" v-if="a.lugar">
                <div class="row w-100 m-0 letra-gray3-15">Lugar</div>
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 px-3 py-2">
                        <!-- <div class="w-10vw h-10vw">
                            <imagen clase="border-radius-50" src="https://socialflow.app/backend/apiv1/imagenes/e1.jpg" :fit="true" />
                        </div> -->
                        <div class="col my-auto px-0 pl-2">
                            <div class="row w-100 m-0 letra-gray4-18">{{a.lugar}}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row w-100 m-0 pt-2" v-if=" a.productos && a.productos.length ">
                <div class="row w-100 m-0 letra-gray3-15">Regalos</div>
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 px-3 py-2" v-for="u of a.productos" :key="u.id">
                      <compProdDesgloce :info="a" :data="u" :tipo="1" :openQrCall="openQr" />
                    </div>
                </div>
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 px-2 pt-1 pb-2 border-t-gray1-1">
                        <div class="col my-auto px-0 pl-2">
                            <div class="row w-100 m-0 letra-gray4-20">Total</div>
                        </div>
                        <div class="col-auto px-0">
                            <div class="row w-100 m-0 letra-azul1-22">{{a.total_regalos | currency}} MXN</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row w-100 m-0 pt-4" v-if=" a.gastos && a.gastos.length ">
                <div class="row w-100 m-0 letra-gray3-15" v-if="a.cooperacion == 'si'">Cooperación</div>
                <div class="row w-100 m-0 letra-gray3-15" v-else >Amenidades</div>
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 px-3 py-2" v-for="u of a.gastos" :key="u.id">
                        <compProdDesgloce :info="a" :data="u" :tipo="1" :openQrCall="openQr" />
                    </div>
                </div>
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 pt-1 pb-2 border-t-gray1-1">
                        <div class="col my-auto px-0 pl-2">
                            <div class="row w-100 m-0 letra-gray4-20">Total</div>
                        </div>
                        <div class="col-auto px-0">
                            <div class="row w-100 m-0 letra-azul1-22">{{a.total_gastos | currency}}</div>
                        </div>
                    </div>
                </div>

                <template  v-if="a.cooperacion == 'si'"> 
                    <div class="row w-100 m-0" v-if="!a.cobrado.length " >
                        <div class="row w-100 m-0">
                            <div class="col-5 px-0 ml-auto" @click=" $store.commit('openModal',['modalConfirmar']) ">
                                <botonApp texto="Enviar Cobro" tipo="azul" radius="30px" />
                            </div>
                        </div>
                    </div>
                </template>

            </div>

            <div class="row w-100 m-0 pt-4" v-if=" a.usuarios && a.usuarios.length ">
                <div class="row w-100 m-0 letra-gray3-15">Usuarios</div>
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 px-1 back-color-azul1">
                        
                        <div class="w-8vw h-8vw my-auto"></div>

                        <div class="col my-auto px-0 pl-2"></div>

                        <div class="w-30 my-auto px-0" v-if="a.tipo == 'party'">
                            <div class="row w-100 m-0 letra-blanco-16 text-capitalize text-center justify-content-center">Cobro</div>
                        </div>
                        
                        <div v-if="a.tipo == 'reunion'" class="col-3 my-auto px-0">
                            <div class="row w-100 m-0 letra-blanco-16 text-capitalize justify-content-center">Invitación</div>
                        </div>
                    </div>

                    <div class="row w-100 m-0 px-1 py-1" >
                        <div class="w-8vw h-8vw my-auto">
                            <imagen clase="border-radius-50" :src="a.usuario.foto" :fit="true" :user="true" />
                        </div>
                        <div class="col my-auto px-0 pl-2">
                            <div class="row w-100 m-0 letra-gray4-15">{{ a.usuario.nombre | truncate(15) }}</div>
                        </div>

                        <div class="w-30 my-auto px-0"  >
                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0 letra-azul1-16 text-capitalize justify-content-center text-center " v-if="!a.miCobro || !a.miCobro.id" >N/A</div>
                                <div class="row w-100 m-0 letra-azul1-16 text-capitalize justify-content-center text-center " v-else-if="a.usuario.cobro.estatus == 'aceptado'" >Pagado</div>
                                <div class="row w-100 m-0 letra-azul1-16 text-capitalize justify-content-center text-center " v-else-if="a.usuario.cobro.estatus == 'pendiente'" >{{a.usuario.cobro.estatus}}</div>
                                <div class="row w-100 m-0 letra-rojo2-16 text-capitalize justify-content-center text-center " v-else >No pagado</div>
                            </div>
                            <div class="row w-100 m-0 letra-azul1-16 text-capitalize justify-content-center text-center " v-if="!a.miCobro || !a.miCobro.id"></div>
                            <div class="row w-100 m-0 letra-azul1-16 text-capitalize justify-content-center text-center " v-else-if="a.usuario.cobro.estatus == 'aceptado'">{{a.usuario.cobro.total | currency}} MXN</div>
                            <div class="row w-100 m-0 letra-azul1-16 text-capitalize justify-content-center text-center " v-else>{{a.usuario.cobro.total | currency}} MXN</div>

                            <div class="row w-100 m-0 pt-3px " v-if="a.miCobro.id && a.miCobro.estatus == 'pendiente'" @click="actulizarCobro(1)">
                                <div class="row w-100 m-0 back-color-azul1 letra-blanco-16 justify-content-center text-center border-radius-5px ">Pagar</div>
                            </div>
                            <div class="row w-100 m-0 pt-3px " v-if="a.miCobro.id && a.miCobro.estatus == 'pendiente'" @click="actulizarCobro(0)">
                                <div class="row w-100 m-0 back-color-rojo letra-blanco-16 justify-content-center text-center border-radius-5px ">Rechazar</div>
                            </div>
                        </div>

                        <div v-if="a.tipo == 'reunion'" class="col-3 mb-auto px-0" >
                            <div class="row w-100 m-0 letra-azul1-16 text-capitalize justify-content-center " >aceptado</div>
                        </div>
                    </div>

                    <div class="row w-100 m-0 px-1 py-1" v-for="u of a.usuarios.filter(s=>s.usuario.id != a.usuario.id)" :key="u.id">
                        <div class="w-8vw h-8vw my-auto">
                            <imagen clase="border-radius-50" :src="u.usuario.foto" :fit="true" :user="true" />
                        </div>
                        <div class="col my-auto px-0 pl-2">
                            <div class="row w-100 m-0 letra-gray4-15">{{u.usuario.nombre | truncate(15)}}</div>
                        </div>

                        <div class="w-30 my-auto px-0"  >
                            <div v-if="a.cooperacion == 'no'" class="row w-100 m-0">
                                 <div class="row w-100 m-0 letra-azul1-18 justify-content-center text-center" >-</div> 
                            </div>
                            <div v-else class="row w-100 m-0">
                                <div class="row w-100 m-0">
                                    <div class="row w-100 m-0 letra-azul1-16 text-capitalize justify-content-center text-center " v-if="u.cobro.estatus == 'aceptado'" >Pagado</div>
                                    <div class="row w-100 m-0 letra-azul1-16 text-capitalize justify-content-center text-center " v-else-if="u.cobro.estatus == 'pendiente'" >{{u.cobro.estatus}}</div>
                                    <div class="row w-100 m-0 letra-rojo2-16 text-capitalize justify-content-center text-center " v-else >No pagado</div>
                                </div>
                                <div class="row w-100 m-0 letra-azul1-16 text-capitalize justify-content-center text-center " v-if="u.cobro.estatus == 'aceptado'">{{u.cobro.total | currency}} MXN</div>
                                <div class="row w-100 m-0 letra-azul1-16 text-capitalize justify-content-center text-center " v-else>{{u.cobro.total | currency}} MXN</div>
                            </div>
                        </div>
                        <div v-if="a.tipo == 'reunion'" class="col-3 mb-auto px-0">
                            <div class="row w-100 m-0 letra-azul1-16 text-capitalize justify-content-center " v-if="u.estatus == 'aceptado'">{{u.estatus}}</div>
                            <div class="row w-100 m-0 letra-azul1-16 text-capitalize justify-content-center " v-else >{{u.estatus}}</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            detalles: false,
        };
    },
    props:[
       'data',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        debug(){return this.$store.getters.deviceready == false; },

        a(){ return this.data || {} },
        miCobro(){ return this.data.miCobro || {} },
        gastos(){ return this.data.gastos || [] },
        total(){
            let t = 0;
            this.a.gastos.map(x=>{
                t = t + Number(x.precio);
            });
            return t;
        },
        totalRegalos(){
            let t = 0;
            this.a.productos.map(x=>{
                t = t + Number(x.precio) * Number(x.cantidad);
            });
            return t;
        },
    },
    methods:{

        click(){
            this.$emit('click');
        },

        openQr(x){
            this.$emit('qr',x);
        },
        
        eliminar(a){
            this.$store.commit('openModal',['modalMensaje']);
            return;
            this.$store.dispatch('postEliminarEvento',a);
            this.router.back();
        },
        
        goChat(x){
            this.router.navigate('/mensajes_grupo');
        },

        verDeseosLista(){
            this.router.navigate('/ver_lista_evento');
        },

        pagar(){
            return;
            let p = {
                id: this.a.id,
                // imagen: 'https://socialflow.app/backend/apiv1/imagenes/rr.jpeg',
                nombre: `Coopera para a la ${this.a.type}: ${this.a.nombre}`,
                precio: this.miCobro.total,
                total: this.miCobro.total,
                eventos_id: this.a.id,
                currency: 'MXN',
                type: 'coopera',
            };

            if(this.a.imagen){
                p.imagen = this.$store.getters.urlImagen(this.a.imagen);
            }
            
            this.$store.commit('cleanCarrito');
            this.$store.commit('addProductoCarrito', p );
            this.$store.commit('setCarritosState',['eventos_id', this.a.id]);
            this.router.navigate('/carrito');
        },

        actulizarCobro(e){
            this.$store.dispatch('postActulizarCobro', [this.a, e]);
        },

        open(x){

        },
        editar(x){

        },
    },
}
</script>