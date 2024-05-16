<template>
<div class="row w-100 m-0 desgloce-carrito-componete">
<div class="row w-100 m-0 px-3">
    <div class="row w-100 m-0" v-if="false" >
        <div class="row w-100 m-0">
            <div class="col-auto px-0 ml-auto" @click="t='mxn'">
                <div class="row w-100 m-0 px-2 py-1 border-radius-5px" :class="t=='mxn'?'back-color-azul1 border-azul1-1 letra-blanco-16':'border-azul1-1 letra-azul1-16'">MXN</div>
            </div>
            <div class="col-auto px-0 pl-2" @click="t='usd'">
                <div class="row w-100 m-0 px-2 py-1 border-radius-5px" :class="t=='usd'?'back-color-azul1 border-azul1-1 letra-blanco-16':'border-azul1-1 letra-azul1-16'">USD</div>
            </div>
        </div>
    </div>

    <div class="row w-100 m-0 border-t-gray0-1" v-if="showSpecialField">

        <div class="row w-100 m-0 pt-3" v-if="!confirm">
            <div class="row w-100 m-0" >

                <div class="col px-0 letra-gray3-18">¿Es una compra para un tercero?</div>
                <div class="col-auto px-2 letra-gray3-18" @click="set('si')">
                    <div class="row w-100 m-0 carta px-3 py-1 " :class="externo==1?'back-color-azul1 letra-blanco-16':' back-color-fondo3 letra-gray2-16'" >Si</div>
                </div>
                <div class="col-auto px-0 letra-gray3-18" @click="set('no')">
                    <div class="row w-100 m-0 carta px-3 py-1 " :class="externo==0?'back-color-azul1 letra-blanco-16':' back-color-fondo3 letra-gray2-16'" >No</div>
                </div>
            </div>
            <div class="row w-100 m-0 pt-2 " v-if="externo==1" >
                <div class="row w-100 m-0 letra-gray3-15">Si tu haces un regalo, hazlo de corazón, sin esperar de vuelta que te hagan uno también.</div>
            </div>
        </div>

        
        <div class="row w-100 m-0" v-if="externo==1" >
            <div class="row w-100 m-0 pt-3 pb-2" v-if="usuario && usuario.id">

                <div class="row w-100 m-0 px-2" v-if="confirm" >
                    <div class="row w-100 m-0 letra-gray3-18">Regalo para:</div>
                    <div class="row w-100 m-0 py-2" >
                        <div class="w-12vw h-12vw">
                            <imagen :clase="`border-radius-50 border-${usuario.nivel}-3`" :src="usuario.foto" :fit="true" :user="true" />
                        </div>
                        <div class="col my-auto px-0 pl-3">
                            <div class="row w-100 m-0 letra-gray4-20 fw-600 ">{{usuario.nombre}}</div>
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0 px-2 py-2 border-gray0-1 border-radius-5px" v-else >
                    <div class="w-15vw h-15vw">
                        <imagen :clase="`border-radius-50 border-${usuario.nivel}-4`" :src="usuario.foto" :fit="true" :user="true" />
                    </div>
                    <div class="col my-auto px-0 pl-3">
                        <div class="row w-100 m-0 letra-gray4-18">{{usuario.nombre}}</div>
                    </div>
                    <div class="col-auto px-0 my-auto" @click="borrar()">
                        <icono icono="cancel" clase="letra-azul1-30 pt-1px" />
                    </div>
                </div>
                
            </div>
            
            <div class="row w-100 m-0 pb-2" v-else>
                <template v-if="confirm" >
                    <div class="row w-100 m-0 pt-2" v-if="!usuario || !usuario.id">
                        <div class="row w-100 m-0 letra-gray3-18">Invitación enviada a:</div>
                        <div class="row w-100 m-0 letra-gray4-18 fw-600">{{emailUser}}</div>
                    </div>
                </template>
                <template v-else >
                    <div class="row w-100 m-0 pt-2">
                        <inputForm texto="" input="form" :offset="800" :scroll="true"  type="email" placeholder="Busca por nombre o correo" v-model="email" />
                    </div>
                </template>
                <div class="row w-100 m-0 px-2 py-2 border-gray1-1 border-radius-10px" v-for="a of opcion" :key="a.id" @click="select(a)" >
                    <div class="w-13vw h-13vw ">
                        <imagen :clase="`border-radius-50 border-${a.nivel || 'silver'}-4`" :src="a.foto" :fit="true" :user="true" />
                    </div>
                    <div class="col my-auto px-0 pl-3">
                        <div class="row w-100 m-0 letra-gray4-18 fw-600 ">{{a.nombre}}</div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>


        <div class="row w-100 m-0 " v-if="productos.find(x=>{return x.currency == 'USD'})" >
            <div class="col my-auto px-0 letra-gray3-16">Subtotal:</div>
            <div class="col-auto my-auto px-0 letra-gray3-18">{{data.subtotal / cambioUSD | currency}} USD</div>
        </div>
        <template v-if="t=='mxn'" > 
            <div class="row w-100 m-0" v-if="productos.find(x=>{return x.currency == 'USD'})">
                <div class="col my-auto px-0 letra-gray3-16">Conversion a pesos: (MXN)</div>
                <div class="col-auto my-auto px-0 letra-gray3-18">{{data.subtotal | currency}} MXN</div>
            </div>
            <div class="row w-100 m-0" v-else >
                <div class="col my-auto px-0 letra-gray3-16">Subtotal: </div>
                <div class="col-auto my-auto px-0 letra-gray3-18">{{data.presubtotal | currency}} MXN</div>
            </div>
            <template v-if="data.cupon && data.cupon.id" >
                <div class="row w-100 m-0"  >
                    <div class="col my-auto px-0 letra-gray3-16">Descuento: </div>
                    <div class="col-auto my-auto px-0 letra-gray3-18">{{data.descuento_total | currency}} MXN</div>
                </div>
                <div class="row w-100 m-0" >
                    <div class="col my-auto px-0 letra-gray3-16">Subtotal: </div>
                    <div class="col-auto my-auto px-0 letra-gray3-18">{{data.subtotal | currency}} MXN</div>
                </div>
            </template>
            <template v-else-if="session && session.descuento" >
                <div class="row w-100 m-0"  >
                    <div class="col my-auto px-0 letra-gray3-16">Descuento: </div>
                    <div class="col-auto my-auto px-0 letra-gray3-18">{{data.descuento_total | currency}} MXN</div>
                </div>
                <div class="row w-100 m-0" >
                    <div class="col my-auto px-0 letra-gray3-16">Subtotal: </div>
                    <div class="col-auto my-auto px-0 letra-gray3-18">{{data.subtotal | currency}} MXN</div>
                </div>
            </template>
            <div class="row w-100 m-0">
                <div class="col my-auto px-0 letra-gray3-16">IVA del producto:</div>
                <div class="col-auto my-auto px-0 letra-gray3-18">{{data.iva | currency}} MXN</div>
            </div>
            <div class="row w-100 m-0">
                <div class="col my-auto px-0 letra-gray3-16">Costo envió:</div>
                <div class="col-auto my-auto px-0 letra-gray3-18">{{data.costoEnvio | currency}} MXN</div>
            </div>
            <div class="row w-100 m-0">
                <div class="col my-auto px-0 letra-gray3-16">IVA del costo de envió:</div>
                <div class="col-auto my-auto px-0 letra-gray3-18">{{ data.ivaEnvio | currency}} MXN</div>
            </div>
            <div class="row w-100 m-0">
                <div class="col my-auto px-0 letra-gray3-16">Total:</div>
                <div class="col-auto my-auto px-0 letra-gray3-18">{{ data.total | currency}} MXN</div>
            </div>
        </template>
        <template v-if="t=='usd'" > 
                <div class="row w-100 m-0">
                <div class="col my-auto px-0 letra-gray3-16">Costo envio:</div>
                <div class="col-auto my-auto px-0 letra-gray3-18">{{ (data.costoEnvio / cambioUSD) | currency}} USD</div>
            </div>
            <div class="row w-100 m-0">
                <div class="col my-auto px-0 letra-gray3-16">IVA:</div>
                <div class="col-auto my-auto px-0 letra-gray3-18">{{ (data.iva / cambioUSD) | currency}} USD</div>
            </div>
            <div class="row w-100 m-0">
                <div class="col my-auto px-0 letra-gray3-16">Total:</div>
                <div class="col-auto my-auto px-0 letra-gray3-18">{{ (data.total / cambioUSD) | currency}} USD</div>
            </div>
        </template>
        <div class="row w-100 m-0 pb-2">
            <div class="col my-auto px-0 letra-gray3-16">Tiempo de envio:</div>
            <div class="col-auto my-auto px-0 letra-gray3-18">{{ data.tiempo }} dias</div>
        </div>

        <div class="row w-100 m-0">
            <div class="row w-100 m-0 pb-2 ">
                <template v-if="cupon && cupon.id">
                    <div class="row w-100 m-0" v-if="!confirm">
                        <div class="row w-100 m-0 py-1 border-azul1-1 border-radius-15px px-3">
                            <div class="row w-100 m-0 letra-gray3-15">Cupón:</div>
                            <div class="row w-100 m-0">
                                <div class="col px-0 pt-3px letra-azul1-18 fw-600 ">{{cupon.codigo}}</div>
                                <div class="col-auto px-0 pt-1px"  @click="$store.commit('setCupon',{})" >
                                    <icono clase="letra-azul1-30" icono="close" />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
    
                <template v-else >
                    <div class="row w-100 m-0 letra-azul1-18" v-if="!show" >
                        <div class="col-auto px-0 px-1 mx-auto border-b-azul1-1" @click="show = true">Agregar cupon</div>
                    </div>
                    <div class="row w-100 m-0 pt-3" v-else @click="paste">
                        <div class="row w-100 m-0">
                            <div class="col-9 px-1">
                                <inputForm type="text" input="form" :pegado="1" placeholder="Agregar cupon" v-model="codigo" :notOffset="true" @enter="getCupon()" />
                            </div>
                            <div class="col-3 my-auto pl-0 pr-1">
                                <botonApp tipo="azul" :outline="1" @click="getCupon()" texto="Agregar" radius="35px" />
                            </div>
                        </div>
                    </div>
                </template>
               
            </div>
        </div>



        <div class="row w-100 m-0 justify-content-center px-1 py-2 pt-3 pb-ios-65px" v-if="!confirm">
            <div class="row w-100 m-0">
                <div class="w-30 px-0">
                    <botonApp tipo="azul" :outline="1" @click="codigo = null" texto="Limpiar" radius="35px" />
                </div>
                <div class="col px-0 pl-2">
                    <botonApp tipo="azul" texto="Comprar" radius="35px" @click="next()"/>
                </div>
            </div>
            
        </div>
        <div class="row w-100 m-0 pb-5" v-if="!confirm">
            <div class="row w-100 m-0 pb-1 px-1 letra-gray3-15 justify-content-center text-center">En caso de que el producto, servicio o experiencia este expresado en moneda extranjera, SOCIALFLOW convertirá a moneda nacional mexicana (MXN) dicho importe antes de proceder al cobro.</div>
        </div>
        <div class="row w-100 m-0 pb-4" v-if="!confirm"></div>
    </div>
</div>
</template>
<script>
export default {
    props:[
        'confirm',
        'showSpecialField',
    ],
    data(){
        return{
            t: 'mxn',
            email: null,
            codigo: null,
            show: 1,
        } 
    },
    computed: {
        router(){return this.$store.getters.getRouter;},
        session(){return this.$store.getters.getSession;},
        cambioIva(){return this.$store.getters.catalogoGetObject('cambioIva');},
        cambioUSD(){return this.$store.getters.catalogoGetObject('cambioUSD');},
        externo(){return this.$store.getters.carritoObject('externo');},
        emailUser(){return this.$store.getters.carritoObject('email');},
        usuario(){return this.$store.getters.carritoObject('usuario') || {};},
        data(){return this.$store.getters.carritoObject('desgloce') || {};},
        cupon(){return this.data.cupon || {};},
        restaurante(){return this.$store.getters.restaurantesFindId('restaurantes',this.data.restaurantes_id) || {} ;},
        productos(){return this.data.carrito || [];},
        domicilio(){return this.$store.getters.carritoFind('domicilios','domicilio');},

        usuarios(){return this.$store.getters.userStateArray('usuarios');},
        match(){
            if(this.email){
                // return this.usuarios.filter(s=>{return s.nombre.toLowerCase().includes(this.email.toLowerCase()) || s.email.toLowerCase().includes(this.email.toLowerCase()) }).filter((y,i)=> i < 1 );
                return this.usuarios.filter(s=>{return s.nombre.toLowerCase().includes(this.email.toLowerCase()) });
            }
            return []
        },
        opcion(){
            // return _.orderBy(this.match.filter((y,i)=> i < 5 ), ['nombre'], ['asc']);
            return this.match.sort((a,b)=>{
                // console.log("sorting", a.nombre, a.nombre.toLowerCase().indexOf(this.email.toLowerCase()), b.nombre, b.nombre.toLowerCase().indexOf(this.email.toLowerCase()))
                return a.nombre.toLowerCase().indexOf(this.email.toLowerCase()) - b.nombre.toLowerCase().indexOf(this.email.toLowerCase())
            }).filter((y,i)=> i < 5 );
        },
    },
    methods:{
        next(){
            if(!this.session.token){
                this.$store.commit('openModal',['modalSession']);
                return;
            }
            console.log("EXTERNADNDO", this.externo);
            if(this.externo){
                if(!this.usuario || !this.usuario.id){
                    if(!this.email){
                        swal("","Ingresa un correo para enviar el regalo o el nombre del usuario de socialflow","");
                        return;
                    }
                    else if(this.email){
                        this.$store.commit('setCarritosState',['email', this.email ]);
                        this.$emit('input', this.email);
                        this.$emit('open');
                        return;
                    }
                    // swal("","Selecciona el usuario para la compra","");
                    // return;
                }
            }

            if(0){
                if( !( this.productos.every(s=>s.type_iva == '2') || this.productos.every(s=> !s.iva || s.type_iva == '1' ) ) ){
                    swal("","No puedes facturar dos productos con IVA diferente","");
                    return;
                }
            }

            console.log("compra",this.productos)
            // return;

            if(this.data.total){
                this.router.navigate('/confirmacion_carrito');
            }
        },

        paste(){
            console.log("PASTING")
            navigator.clipboard.readText().then(texto => {
	            console.log("Aquí tenemos el texto: ", texto);
            }).catch(error => { });
        },

        set(a){
            console.log("AAAA", a);
            if(a=='no'){
                this.$store.commit('setCarritosState',['externo', 0]);
                this.$store.commit('setCarritosState',['para_usuarios_id', null]);
                this.$store.commit('setCarritosState',['usuario', {}]);
            }else{
                this.$store.commit('setCarritosState',['externo', 1]);
            }
        },
        borrar(){
            this.$store.commit('setCarritosState',['para_usuarios_id', null]);
            this.$store.commit('setCarritosState',['usuario', {}]);
        },
        select(a){
            this.$store.commit('setCarritosState',['para_usuarios_id', a.id]);
            this.$store.commit('setCarritosState',['usuario', a]);
            this.email = null;
        },
        getCupon(){
            if(this.codigo){
                this.$store.dispatch('postAgregarCupon',this.codigo);
            }
        }
    },
}
</script>