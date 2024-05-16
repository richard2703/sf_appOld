<template>
<div class="w-100">
    <div class="w-100 position-relative" >
        <p class=" m-0 mb-1 pl-1" :class="`letra-${color?color:'gray3'}-16`" >{{texto}}</p>
        <p class=" m-0 pl-1" :class="`letra-${color?color:'gray3'}-14`" v-if="extraText" >{{extraText}}</p>
        <select class="regular-input w-100 white-space-preline" 
                @change="$emit('input',$event.target.value); $emit('change',$event.target.value)" 
                v-model="modelo" 
                :disabled="disabled" 
        >
            <option :value="null" selected :disabled="(nulo)?false:true" >{{placeholder || 'Selecciona uno'}}</option>
            <template v-for="(e, x) of opciones"  >
                <option :key="x" :value="e[llave || 'id']">{{e[nombre || 'nombre']}}</option>
            </template>
        </select>
        <div class="w-auto position-absolute bottom-0px right-0px" @click="remove()" v-if="cancel && modelo">
            <icono icono="close" clase="letra-gray-30" />
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            modelo: null,
        };
    },
    props: [   
                'texto',
                'extraText',
                'color',
                'nulo',
                'opciones',
                'value',
                'nombre',
                'llave',
                'cancel',
                'placeholder',
                'disabled'
            ],
    computed: {
    },
    created() {
        this.modelo = this.value;
    },
    methods:{
        remove(){
            this.$emit('input',null);
            this.modelo = null;
        }
    },
}
</script>