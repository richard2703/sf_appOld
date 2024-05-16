<template>
<div class="row w-100 m-0" >
    <template v-if="tipo==1">
        <div class="row w-100 m-0">
            <div class="w-10vw h-10vw my-auto">
                <imagen clase="border-radius-10px" :src="u.imagen" :fit="true" />
            </div>
            <div class="col my-auto px-0 pl-2">
                <div class="row w-100 m-0 letra-gray4-14">{{u.nombre}}</div>
            </div>
        </div>
        <div class="row w-100 m-0">
        <div class="row w-100 m-0">
            <div class="col px-0 letra-gray3-13">Precio: </div>
            <div class="col-auto my-auto px-0">
                <div class="row w-100 m-0 letra-azul1-14">{{u.precio | currency}} MXN</div>
            </div>
        </div>
        
        <template v-if="Number(u.envio)" >
            <div class="row w-100 m-0">
                <div class="col px-0 letra-gray3-13">Envio: </div>
                <div class="col-auto my-auto px-0">
                    <div class="row w-100 m-0 letra-azul1-14">{{ (Number(u.envio) / Number(u.cantidad)) | currency}} MXN</div>
                </div>
            </div>
        </template>
        
        <template>
            <div class="row w-100 m-0">
                <div class="col px-0 letra-gray3-13">Cantidad: </div>
                <div class="col-auto my-auto px-0">
                    <div class="row w-100 m-0 letra-azul1-14">x{{u.cantidad}}</div>
                </div>
            </div>
        </template>
        <template>
            <div class="row w-100 m-0">
                <div class="col px-0 letra-gray3-13">Subtotal: </div>
                <div class="col-auto my-auto px-0">
                    <div class="row w-100 m-0 letra-azul1-14 fw-600">{{( Number(u.precio) * Number(u.cantidad) + Number(u.envio) ) | currency}} MXN</div>
                </div>
            </div>
        </template>
        <!-- <template v-if="Number(u.iva)" > -->
        <template>
            <div class="row w-100 m-0">
                <div class="col px-0 letra-gray3-13">Iva: </div>
                <div class="col-auto my-auto px-0">
                    <div class="row w-100 m-0 letra-azul1-14">{{ ( Number(u.iva) ) | currency}} MXN</div>
                </div>
            </div>
        </template>
        <template v-if="Number(u.envio_iva)" >
            <div class="row w-100 m-0">
                <div class="col px-0 letra-gray3-13">Iva Envio: </div>
                <div class="col-auto my-auto px-0">
                    <div class="row w-100 m-0 letra-azul1-14">{{u.envio_iva | currency}} MXN</div>
                </div>
            </div>
        </template>
        <template>
            <div class="row w-100 m-0">
                <div class="col px-0 letra-gray3-13">Total: </div>
                <div class="col-auto my-auto px-0">
                    <div class="row w-100 m-0 letra-azul1-15 fw-800">{{u.total | currency}} MXN</div>
                </div>
            </div>
        </template>
        </div>
        <template v-if="0 && a.externo == 'no'" >
            <div class="row w-100 m-0 pt-2 pb-2 letra-azul1-14 fw-600 justify-content-end text-right" v-if="u.producto.tipo == 'servicio'" @click=" openQr(u) ">
                <botonApp size="w-30vw" texto="Ver QR" tipo="azul" radius="30px" py="py-5px" />
            </div>
        </template>
    </template>

    <template v-if="tipo==2">
        <div class="row w-100 m-0">
            <div class="w-10vw h-10vw my-auto">
                <imagen clase="border-radius-10px" :src="u.imagen" :fit="true" />
            </div>
            <div class="col my-auto px-0 pl-2">
                <div class="row w-100 m-0 letra-gray4-14">{{u.nombre}}</div>
            </div>
        </div>
        <div class="row w-100 m-0">

        <div class="row w-100 m-0 pt-2">
            <div class="col px-0 letra-gray3-13">Estatus: </div>
            <div class="col-auto my-auto px-0 text-capitalize ">
                <div class="row w-100 m-0 letra-rojo-14" v-if="u.estatus == 'cancelado'">{{u.estatus }} </div>
                <div class="row w-100 m-0 letra-azul1-14" v-else >{{u.estatus }} </div>
            </div>
        </div>

        <div class="row w-100 m-0">
            <div class="col px-0 letra-gray3-13">Precio: </div>
            <div class="col-auto my-auto px-0">
                <div class="row w-100 m-0 letra-azul1-14">{{u.precio | currency}} MXN</div>
            </div>
        </div>
        
        <template v-if="Number(u.costo_envio)" >
            <div class="row w-100 m-0">
                <div class="col px-0 letra-gray3-13">Envio: </div>
                <div class="col-auto my-auto px-0">
                    <div class="row w-100 m-0 letra-azul1-14">{{ (Number(u.costo_envio) / Number(u.cantidad)) | currency}} MXN</div>
                </div>
            </div>
        </template>
        
        <template>
            <div class="row w-100 m-0">
                <div class="col px-0 letra-gray3-13">Cantidad: </div>
                <div class="col-auto my-auto px-0">
                    <div class="row w-100 m-0 letra-azul1-14">x{{u.cantidad}}</div>
                </div>
            </div>
        </template>
        <template>
            <div class="row w-100 m-0">
                <div class="col px-0 letra-gray3-13">Subtotal:</div>
                <div class="col-auto my-auto px-0">
                    <div class="row w-100 m-0 letra-azul1-14 fw-600">{{( Number(u.precio) * Number(u.cantidad) + Number(u.costo_envio || 0) ) | currency}} MXN</div>
                </div>
            </div>
        </template>
        <template v-if="Number(u.iva_envio)" >
            <div class="row w-100 m-0">
                <div class="col px-0 letra-gray3-13">Iva Envio: </div>
                <div class="col-auto my-auto px-0">
                    <div class="row w-100 m-0 letra-azul1-14">{{u.iva_envio | currency}} MXN</div>
                </div>
            </div>
        </template>
        <template>
            <div class="row w-100 m-0">
                <div class="col px-0 letra-gray3-13">Iva: </div>
                <div class="col-auto my-auto px-0">
                    <div class="row w-100 m-0 letra-azul1-14">{{ ( Number(u.iva_subtotal) ) | currency}} MXN</div>
                </div>
            </div>
        </template>
       
        <template>
            <div class="row w-100 m-0">
                <div class="col px-0 letra-gray3-13">Total: </div>
                <div class="col-auto my-auto px-0">
                    <div class="row w-100 m-0 letra-azul1-15 fw-800">{{u.total | currency}} MXN</div>
                </div>
            </div>
        </template>
        </div>
        <template v-if="0 && a.externo == 'no'" >
            <div class="row w-100 m-0 pt-2 pb-2 letra-azul1-14 fw-600 justify-content-end text-right" v-if="u.producto.tipo == 'servicio'" @click=" openQr(u) ">
                <botonApp size="w-30vw" texto="Ver QR" tipo="azul" radius="30px" py="py-5px" />
            </div>
        </template>
    </template> 

    <template v-if="tipo==3">
        <div class="row w-100 m-0">
        <div class="row w-100 m-0">
            <div class="col px-0 letra-gray3-13">Precio: </div>
            <div class="col-auto my-auto px-0">
                <div class="row w-100 m-0 letra-azul1-14">{{u.precio | currency}} MXN</div>
            </div>
        </div>
        
        <template v-if="Number(u.costo_envio)" >
            <div class="row w-100 m-0">
                <div class="col px-0 letra-gray3-13">Envio: </div>
                <div class="col-auto my-auto px-0">
                    <div class="row w-100 m-0 letra-azul1-14">{{ (Number(u.costo_envio) / Number(u.cantidad)) | currency}} MXN</div>
                </div>
            </div>
        </template>
        <template v-if="Number(u.envio)" >
            <div class="row w-100 m-0">
                <div class="col px-0 letra-gray3-13">Envio:</div>
                <div class="col-auto my-auto px-0">
                    <div class="row w-100 m-0 letra-azul1-14">{{ (Number(u.envio) / Number(u.cantidad)) | currency}} MXN</div>
                </div>
            </div>
        </template>
        
        <template>
            <div class="row w-100 m-0">
                <div class="col px-0 letra-gray3-13">Cantidad: </div>
                <div class="col-auto my-auto px-0">
                    <div class="row w-100 m-0 letra-azul1-14">x{{u.cantidad}}</div>
                </div>
            </div>
        </template>

        <template v-if="Number(u.costo_envio)" >
            <div class="row w-100 m-0">
                <div class="col px-0 letra-gray3-13">Subtotal:</div>
                <div class="col-auto my-auto px-0">
                    <div class="row w-100 m-0 letra-azul1-14 fw-600">{{( Number(u.precio) * Number(u.cantidad) + Number(u.costo_envio || 0) ) | currency}} MXN</div>
                </div>
            </div>
        </template>
        <template v-else-if="Number(u.envio)" >
            <div class="row w-100 m-0">
                <div class="col px-0 letra-gray3-13">Subtotal:</div>
                <div class="col-auto my-auto px-0">
                    <div class="row w-100 m-0 letra-azul1-14 fw-600">{{( Number(u.precio) * Number(u.cantidad) + Number(u.envio || 0) ) | currency}} MXN</div>
                </div>
            </div>
        </template>
        <template v-else >
            <div class="row w-100 m-0">
                <div class="col px-0 letra-gray3-13">Subtotal:</div>
                <div class="col-auto my-auto px-0">
                    <div class="row w-100 m-0 letra-azul1-14 fw-600">{{ ( Number(u.precio) * Number(u.cantidad) ) | currency}} MXN</div>
                </div>
            </div>
        </template>

        <template v-if="Number(u.envio_iva)" >
            <div class="row w-100 m-0">
                <div class="col px-0 letra-gray3-13">Iva Envio: </div>
                <div class="col-auto my-auto px-0">
                    <div class="row w-100 m-0 letra-azul1-14">{{u.envio_iva | currency}} MXN</div>
                </div>
            </div>
        </template>
        <template v-if="Number(u.iva_subtotal)">
            <div class="row w-100 m-0">
                <div class="col px-0 letra-gray3-13">Iva: </div>
                <div class="col-auto my-auto px-0">
                    <div class="row w-100 m-0 letra-azul1-14">{{ ( Number(u.iva_subtotal) ) | currency}} MXN</div>
                </div>
            </div>
        </template>
        <template v-else-if="Number(u.iva)">
            <div class="row w-100 m-0">
                <div class="col px-0 letra-gray3-13">Iva: </div>
                <div class="col-auto my-auto px-0">
                    <div class="row w-100 m-0 letra-azul1-14">{{ ( Number(u.iva) ) | currency}} MXN</div>
                </div>
            </div>
        </template>
        <template v-else >
            <div class="row w-100 m-0">
                <div class="col px-0 letra-gray3-13">Iva: </div>
                <div class="col-auto my-auto px-0">
                    <div class="row w-100 m-0 letra-azul1-14">{{ 0  | currency}} MXN</div>
                </div>
            </div>
        </template>
       
        <template>
            <div class="row w-100 m-0">
                <div class="col px-0 letra-gray3-13">Total: </div>
                <div class="col-auto my-auto px-0">
                    <div class="row w-100 m-0 letra-azul1-15 fw-800">{{u.total | currency}} MXN</div>
                </div>
            </div>
        </template>
        </div>
        <template v-if="0 && a.externo == 'no'" >
            <div class="row w-100 m-0 pt-2 pb-2 letra-azul1-14 fw-600 justify-content-end text-right" v-if="u.producto.tipo == 'servicio'" @click=" openQr(u) ">
                <botonApp size="w-30vw" texto="Ver QR" tipo="azul" radius="30px" py="py-5px" />
            </div>
        </template>
    </template>
</div>
</template>
<script>
export default {
    data(){
        return {
        };
    },
    props:[
       'info',
       'data',
       'tipo',
       'openQrCall',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        session(){return this.$store.getters.getSession;},
        
        ix(){return this.info || {} },
        a(){return this.ix || {} },

        dx(){return this.data || {} },
        u(){return this.dx || {} },
    },
    mounted() {
    },

    methods:{
        openQr(){
            if(this.openQrCall){
                this.openQrCall(this.u);
            }

        }
    },
}
</script>