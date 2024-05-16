<template>
<div class="row w-100 m-0 p-1px justify-content-center carta border-radius-10px">
    <div class="w-10vw text-right">
        <i class="material-icons letra-gray0-25 my-auto pt-5px pt-ios-9px">search</i>
    </div>
    <div class="col my-auto p-0">

        <div class="row w-100 m-0 position-relative">
            <div class="w-auto position-absolute top-0px right-5px z-200" @click="$emit('input', null)">
                <div class="row h-100 w-100 m-0 pt-ios-3px">
                    <icono icono="clear" :clase=" `letra-gray3-26` " />
                </div>
            </div>
            <input  :id="id" type="text" class="busqueda-input w-100 p-0 pl-1 pr-4 " 
                    :placeholder="holder || 'Buscar ...'" 
                    :value="value" 
                    @input="$emit('input',$event.target.value)" 
                    @change="$emit('change', $event.target.value)"
                    @keyup.enter="enter" >
        </div>
        
    </div>
</div>
</template>
<script>
export default {
    props:  [
        'value',
        'holder',
        'notOffset',
        'scroll',
        'offset',
        'contendorId',
        ],
    data(){
        return {
            id: _.uniqueId('input_'),
            elemento: null,
            android: 1,
        };
    },
    computed:{ 

    },

    mounted() {
        setTimeout(
            ()=>{
                this.elemento = document.getElementById(this.id);
                if(this.elemento){
                    // console.log("---------------> Elemento creado", this.id, this.scroll, this.texto, this.elemento);
                    this.focus();
                }
                let numero = Number(this.id.split("_")[1])+1;
                this.next = document.getElementById('inputF_'+numero);
            },600);
    },

    methods:{

        focus(){
            console.log("OFFSET", !this.notOffset, !this.notOffset);
            if(!this.notOffset){
                console.log("SE CREO EL OFFSET", !this.notOffset);
                if(this.android || this.scroll){
                    $(`#${this.id}`).focus(()=>{
                        // console.log("---------------> FOCUS ELEMTE CREADO", this.id, this.scroll, this.texto, this.elemento);
                        setTimeout(()=>{
                            let xSize = this.offset || 450;
                            // console.log("INTETN SCROLLING", this.contendorId, this.offset, xSize );
                            if(this.contendorId){
                                $(`#${this.contendorId}`).animate({ scrollTop: xSize }, 330);
                            }
                            else{
                                $('.contenedor-page-tabs').animate({ scrollTop: xSize }, 330);
                            }
                        },350);
                    });
                }
            }
        },

        initElemento(){
            if(document.getElementById(this.id)){
                this.elemento = document.getElementById(this.id);
            }
            else{
                setTimeout(this.initElemento, 300);
            }
        },
        enter(){
            if(this.elemento){
                this.elemento.blur();
            }
            this.$emit('enter');
        }
    },
}
</script>