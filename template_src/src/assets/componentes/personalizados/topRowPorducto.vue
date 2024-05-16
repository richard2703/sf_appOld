<template>
<div class="row w-100 m-0">
    <div class="row w-100 m-0 py-3" v-if="galeria && galeria.length" >
        <div class="row w-100 m-0" >
            <scollX :cantidad="1" :paginado="true" >
                <div class="swiper-slide w-auto" v-for="p of galeria" :key="p.id">
                    <div class="row w-100vw m-0" >
                        <imagen class="h-max-50vh overflow-hidden" :fit="true" :src="p.imagen" />
                    </div>
                </div>
            </scollX>
        </div>
    </div>
    <div class="row w-100 m-0 px-3 py-3" v-else-if="producto.imagen" >
        <imagen class="h-max-50vh  overflow-hidden border-radius-10px " :fit="true" :src="producto.imagen" />
    </div>

    <div class="row w-100 m-0 px-3 py-3">
        <!-- <div class="row w-100 m-0 letra-gray3-16 justify-content-center">Compra mejor con SocialFlow</div> -->
        <div class="row w-100 m-0">
            <div class="row w-100 m-0">
                <div class="col-auto my-auto px-0 letra-gray4-21 fw-600">{{producto.nombre}}</div>
            </div>
            <div class="row w-100 m-0">
                <div class="col-auto my-auto mr-auto px-0 letra-gray4-25" v-if="producto.iva == '1'">{{producto.precio | currency}} {{producto.currency}} + IVA</div>
                <div class="col-auto my-auto mr-auto px-0 letra-gray4-25" v-else >{{producto.precio | currency}} {{producto.currency}}</div>
            </div>
            <div class="row w-100 m-0">
                <div class="col-auto my-auto ml-auto px-0 letra-azul1-25" v-if="producto.iva == '1'">{{ Number(producto.total)  | currency}} {{producto.currency}}</div>
            </div>

            <div class="row w-100 m-0 pt-3 mt-1 letra-gray3-16 text-justify white-space-preline">{{producto.descripcion}}</div>

            <div class="row w-100 m-0 pt-3 mb-2 border-b-gray01-1"></div>
            
            <div class="row w-100 m-0 letra-gray3-25">Información general</div>
            <div class="row w-100 m-0 pt-2 " v-if="producto.partner && producto.partner.id" @click="verPart(producto.partner)">
                <div class="row w-100 m-0 letra-gray4-17">Partner</div>
                <div class="row w-100 m-0 letra-gray3-18">{{producto.partner.tradename }}</div>
            </div>

            <div class="row w-100 m-0 pt-3" >
                <sucursalesProductos :data="producto" :showCats="1" />
            </div>


        </div>
    </div>

    <div class="row w-100 m-0 py-2 px-3 justify-content-end">
        <div class="col-auto px-0">
            <!-- <botonApp tipo="azul" texto="Agregar a wishlists" radius="30px" @click="router.navigate('/agregar_alista')"/> -->
            <!-- <botonApp tipo="azul" texto="Agregar a wishlists" radius="30px" @click="$store.commit('openModal',['modalLista'])"/> -->
        </div>
    </div>
    <template v-if="!notRelated">
        <div class="row w-100 m-0 px-3 pb-5">
            <div class="row w-100 m-0 mb-3 border-b-gray01-1"></div>
            <div class="row w-100 m-0 " v-if="productos && productos.length" >
                <div class="row w-100 m-0 letra-gray3-19 px-3">Productos relacionados</div>
                <div class="row w-100 m-0">
                    <scollX >
                        <div class="swiper-slide w-auto" v-for="p of productos" :key="p.id">
                            <cardProducto :data="p" />
                        </div>
                    </scollX>
                </div>
            </div>
        </div>
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
        'data',
        'index',   
        'full',
        'notRelated',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        deve(){return this.$store.getters.deve;},

        producto(){return this.data || {}},
        session(){return this.$store.getters.getSession;},
        cambioIva(){return this.$store.getters.catalogoGetObject('cambioIva');},
        producto(){return this.$store.getters.catalogoGetFind('productos','producto') || {}},
        galeria(){return this.producto.galeria || []},
        productos(){return this.$store.getters.getCatalogo('productos').filter(
            w=>{ return  w.id != this.producto.id && (w.category_id == this.producto.category_id || w.subcategory_one_id == this.producto.subcategory_one_id ||  w.partner_id == this.producto.partner_id ) }).filter(
                        (x,y)=>{return y < 10 });},
    },
    methods:{
        click(){
           
        },
        verPart(p){
            this.$store.commit('setUsuarioData',['partner', p.id]);
            this.router.navigate('/detalle_partner');
        },
    },
}
</script>