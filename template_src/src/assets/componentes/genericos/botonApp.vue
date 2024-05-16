<template>
<div :class="size?size:'w-100'" :id="id">
    <template v-if="outline">
        <template v-if="tipo=='verde'">
            <button class="button boton-app-outline" :disabled="disabled" :class="`${clase} border-${side?`${side}-`:''}radius-${radius}`" @click="$emit('click')">
                <div class="row w-100 m-0 justify-content-center" :class="`${textclass?textclass:''} letra-${(textcolor)?textcolor:'verde4'}-${(fs)?fs:'16'} ${(py)?py:'py-10px'}`">
                    {{texto}}
                </div>
            </button>
        </template>
        <template v-if="tipo=='azul'">
            <button class="button boton-azul-outline" :disabled="disabled" :class="`${clase} border-${side?`${side}-`:''}radius-${radius}`" @click="$emit('click')">
                <div class="row w-100 m-0 justify-content-center" :class="`${textclass?textclass:''} letra-${(textcolor)?textcolor:'azul1'}-${(fs)?fs:'16'} ${(py)?py:'py-10px'}`">
                    {{texto}}
                </div>
            </button>
        </template>
    </template>
    <template v-else-if="tipo=='verde'">
        <button class="button boton-verde" :disabled="disabled" :class="`${clase} border-${side?`${side}-`:''}radius-${radius}`" @click="$emit('click')">
            <div class="row w-100 m-0 justify-content-center" :class="`${textclass?textclass:''} letra-${(textcolor)?textcolor:'blanco'}-${(fs)?fs:'16'} ${(py)?py:'py-10px'}`">
                {{texto}}
            </div>
        </button>
    </template>
    <template v-else-if="tipo=='azul'">
        <button class="button boton-azul" :disabled="disabled" :class="`${clase} border-${side?`${side}-`:''}radius-${radius}`" @click="$emit('click')">
            <div class="row w-100 m-0 justify-content-center" :class="`${textclass?textclass:''} letra-${(textcolor)?textcolor:'blanco'}-${(fs)?fs:'16'} ${(py)?py:'py-10px'}`">
                {{texto}}
            </div>
        </button>
    </template>
    <template v-else-if="tipo=='marino'">
        <button class="button boton-marino" :disabled="disabled" :class="`${clase} border-${side?`${side}-`:''}radius-${radius}`" @click="$emit('click')">
            <div class="row w-100 m-0 justify-content-center" :class="`${textclass?textclass:''} letra-${(textcolor)?textcolor:'blanco'}-${(fs)?fs:'16'} ${(py)?py:'py-10px'}`">
                {{texto}}
            </div>
        </button>
    </template>
    <template v-else-if="tipo=='negro'">
        <button class="button boton-negro" :disabled="disabled" :class="`${clase} border-${side?`${side}-`:''}radius-${radius}`" @click="$emit('click')">
            <div class="row w-100 m-0 justify-content-center" :class="`${textclass?textclass:''} letra-${(textcolor)?textcolor:'blanco'}-${(fs)?fs:'16'} ${(py)?py:'py-10px'}`">
                {{texto}}
            </div>
        </button>
    </template>
    <template v-else-if="tipo=='naranja'">
        <button class="button boton-naranja" :disabled="disabled" :class="`${clase} border-${side?`${side}-`:''}radius-${radius}`" @click="$emit('click')">
            <div class="row w-100 m-0 justify-content-center" :class="`${textclass?textclass:''} letra-${(textcolor)?textcolor:'blanco'}-${(fs)?fs:'16'} ${(py)?py:'py-10px'}`">
                {{texto}}
            </div>
        </button>
    </template>
    <template v-else-if="tipo=='gris'">
        <button class="button boton-gris" :disabled="disabled" :class="`${clase} border-${side?`${side}-`:''}radius-${radius}`" @click="$emit('click')">
            <div class="row w-100 m-0 justify-content-center" :class="`${textclass?textclass:''} letra-${(textcolor)?textcolor:'blanco'}-${(fs)?fs:'16'} ${(py)?py:'py-10px'}`">
                {{texto}}
            </div>
        </button>
    </template>
    <template v-else-if="tipo=='rojo'">
        <button class="button boton-rojo" :disabled="disabled" :class="`${clase} border-${side?`${side}-`:''}radius-${radius}`" @click="$emit('click')">
            <div class="row w-100 m-0 justify-content-center" :class="`${textclass?textclass:''} letra-${(textcolor)?textcolor:'blanco'}-${(fs)?fs:'16'} ${(py)?py:'py-10px'}`">
                {{texto}}
            </div>
        </button>
    </template>
    <template v-else>
    <button class="button boton-app" :disabled="disabled" :class="`${clase} border-${side?`${side}-`:''}radius-${radius}`" @click="$emit('click')">
        <div class="row w-100 m-0 justify-content-center" :class="`${textclass?textclass:''} letra-${(textcolor)?textcolor:'blanco'}-${(fs)?fs:'16'} ${(py)?py:'py-10px'}`">
            {{texto}}
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
            id: _.uniqueId('bb_'),
        };
    },
    props:  [   
                'size',
                'texto',
                'outline',
                'disabled',
                'tipo',
                'clase',
                'side',
                'textclass',
                'textcolor',
                'fs',
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