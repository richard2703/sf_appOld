<template>
<div class="row w-100 m-0">
    <template v-if="showCats">
        <div class="row w-100 m-0" v-if="producto.cat">
            <div class="row w-100 m-0 letra-gray4-17">Categorias:</div>
            <div class="row w-100 m-0 letra-gray3-18">{{producto.cat}}</div>
        </div>
        <div class="row w-100 m-0 pt-2" v-if="producto.subs.sub1 || producto.subs.sub2 || producto.subs.sub3">
            <div class="row w-100 m-0 letra-gray4-17">Subcategorias:</div>
            <div class="row w-100 m-0 letra-gray3-18">{{producto.subs.sub1}} {{producto.subs.sub2?`, ${producto.subs.sub2}`:''}} {{producto.subs.sub3?`, ${producto.subs.sub3}`:''}}</div>
        </div>
    </template>
    
    <template v-if="producto.partner && producto.partner.id">
        <template v-if="producto.sucursales && producto.sucursales.length">
            <div class="row w-100 m-0 pt-4">
                <div class="row w-100 m-0 letra-gray3-19">
                    <div class="col px-0">Sucursales</div>
                    <div class="col-auto" @click="show = !show">
                        <icono icono="expand_less" clase="letra-gray3-30" v-if="show" />
                        <icono icono="expand_more" clase="letra-gray3-30" v-else />
                    </div>
                </div>
                <div class="row w-100 m-0" v-if="show">
                    <div class="row w-100 m-0" v-for="(s,i) of sucursales" :key="s.id" >
                        <div class="col-auto px-0">
                            <div class="row w-100 m-0 pr-1 letra-gray3-18 fw-600">{{i+1}}.</div>
                        </div>
                        <div class="col px-0">
                            <div class="row w-100 m-0 letra-gray4-17">{{s.name}}</div>
                            <div class="row w-100 m-0 letra-gray3-17">{{s.address}} {{s.num_ext}} {{s.num_int?`Interior ${s.num_int}`:''}} {{s.neighborhood?`Col ${s.neighborhood},`:''}} {{s.ciudad?`${s.ciudad},`:''}} {{s.estado?`${s.estado},`:''}}</div>
                            <div class="row w-100 m-0 letra-gray3-17" >
                                <div class="col-auto px-0 border-b-gray1-1" @click="search(s)">Ver en el mapa</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template v-else>
            <div class="row w-100 m-0 pt-3 letra-gray4-17">Ubicación:</div>
            <div class="row w-100 m-0 letra-gray3-18">{{partner.street}} {{partner.num_ext}} {{partner.num_int?`Interior ${partner.num_int}`:''}} {{partner.neighborhood?`Col ${partner.neighborhood},`:''}} {{partner.ciudad?`${partner.ciudad},`:''}} {{partner.estado?`${partner.estado},`:''}}</div>
            <div class="row w-100 m-0 letra-gray3-17" >
                <div class="col-auto px-0 border-b-gray1-1" @click="search(partner)">Ver en el mapa</div>
            </div>
        </template>
    </template>
</div>
</template>
<script>
export default {
    data(){
        return {
            show: true,
        };
    },
    props:[
        'data',
        'showCats',
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        producto(){return this.data || {}},
        partner(){return this.data.partner || {}},
        sucursales(){return this.producto.sucursales || [] },

    },
    methods:{
        click(){
            console.log("THIS", this.tipo);
        },
        search(s){
            let url = "https://maps.google.com/?q=";
            url = `${url}${s.street || s.address} ${s.num_ext} ${s.neighborhood} ${s.ciudad} ${s.estado}`;
            console.log("BUSACR MAPRS", url);
            url = url.replace(/ /g,'%20')
            this.$store.dispatch('openBrowser', url);
        }
    },
}
</script>