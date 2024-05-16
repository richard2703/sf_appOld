<template>
    <div class="row w-100 m-0" >
        <div class="row w-100 m-0" v-if="inicio" @click="clickInicio()">
            <div class="row w-100 m-0 px-2">
                <div class="row w-100 m-0 letra-gray4-14">{{calle}}</div>
                <div class="row w-100 m-0 letra-gray3-12">{{colonia[0]}}, {{colonia[1]}}</div>
            </div>
        </div>
        <div class="row w-100 m-0" v-else-if="emit" @click="clickEmit()">
            <div class="row w-100 m-0 px-2">
                <div class="row w-100 m-0 letra-gray4-14">{{calle}}</div>
                <div class="row w-100 m-0 letra-gray3-12">{{colonia[0]}}, {{colonia[1]}}</div>
            </div>
        </div>
        <div class="row w-100 m-0" v-else @click="click()">
            <div class="row w-100 m-0 px-2">
                <div class="row w-100 m-0 letra-gray4-14">{{calle}}</div>
                <div class="row w-100 m-0 letra-gray3-12">{{colonia[0]}}, {{colonia[1]}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
        };
    },
    props: [
        'data',
        'inicio',
        'emit',
    ],
    computed: {
        resultado(){return this.data || {}},
        direccion(){return this.resultado.description || {}},
        info(){return this.resultado.structured_formatting || {}},
        calle(){return this.info.main_text},
        colonia(){return (this.info.secondary_text || '').split(",")},
    },
    methods:{
        click(){
            this.$store.commit('setViajeStateObject',['destino','direccion',this.direccion]);
            this.$store.commit('setViajeStateObject',['destino','calle', this.calle ]);
            this.$emit('input',this.calle);
            this.$emit('click',this.resultado);
        },
        clickInicio(){
            this.$store.commit('setViajeStateObject',['inicio','direccion',this.direccion]);
            this.$store.commit('setViajeStateObject',['inicio','calle', this.calle ]);
            this.$emit('click',this.resultado);
        },
        clickEmit(){
            this.$emit('direccion',[ this.calle, this.direccion ]);
            this.$emit('click',this.resultado);
        },
    },
}
</script>