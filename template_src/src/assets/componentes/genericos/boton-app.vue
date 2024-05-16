<template>
<div class="w-100">
    <template v-if="outline">
        <button class="button boton-app-outline" :class="`${clase} border-${side?`${side}-`:''}radius-${radius}`" @click="$emit('click')">
            <div class="row w-100 m-0 justify-content-center " :class="`${small?'letra-app-3-8vw py-5px':'letra-app-4-8vw py-13px'} ${py?py:''}`">
                <span>{{texto}}</span>
            </div>
        </button>
    </template>
    <template v-else-if="tipo=='2'">
        <button class="button boton-appr" :class="`${clase} border-${side?`${side}-`:''}radius-${radius}`" @click="$emit('click')">
            <div class="row w-100 m-0 justify-content-center" :class="`${small?'letra-blanco-3-8vw py-5px':'letra-blanco-4-8vw py-13px'} ${py?py:''}`">
                <span>{{texto}}</span>
            </div>
        </button>
    </template>
    <template v-else-if="tipo=='3'">
        <button class="button boton-appv" :class="`${clase} border-${side?`${side}-`:''}radius-${radius}`" @click="$emit('click')">
            <div class="row w-100 m-0 justify-content-center " :class="`${small?'letra-blanco-3-8vw py-5px':'letra-blanco-4-8vw py-13px'} ${py?py:''}`">
                <span>{{texto}}</span>
            </div>
        </button>
    </template>
    <template v-else>
    <button class="button boton-app" :class="`${clase} border-${side?`${side}-`:''}radius-${radius}`" @click="$emit('click')">
        <div class="row w-100 m-0 justify-content-center " :class="`${small?'letra-blanco-3-8vw py-5px':'letra-blanco-4-8vw py-13px'} ${py?py:''}`">
            <span>{{texto}}</span>
        </div>
    </button>
    </template>
</div>
</template>
<script>
export default {
    data()
    {
        return {
        };
    },
    props:  [   'texto',
                'outline',
                'tipo',
                'small',
                'danger',
                'clase',
                'side',
                'py',
                'radius'
                ],
    computed: 
    {
        state() { return this.$store.getters.getModal(this.name)},
        oferta(){return this.$store.getters.getOferta;}
    },
    created() {
    },
    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },
    },
}
</script>