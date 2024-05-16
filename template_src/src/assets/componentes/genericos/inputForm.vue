<template>
<div class="input-component row w-100 m-0 justify-content-center">
    <div class="col-12 my-auto p-0" v-if="textarea">
        <p :class="`letra-${textcolor?textcolor:'gray3'}-4-1vw m-0 mb-1 pl-1`">{{texto}}</p>
        <textarea :id="id" :type="type" :rows="rows" class="regular-textarea w-100 m-0" :placeholder="placeholder" :maxlength="maxlength" :disabled="disabled" :value="value" @input="update" @change="update" @keyup.enter="enter()"></textarea>
    </div>
    <div class="col-12 my-auto p-0" v-else-if="date">

        <div class="row w-100 m-0" v-if="android">
            <label class="w-100">
                <p :class="`letra-${textcolor?textcolor:'gray3'}-4-1vw m-0 mb-1 pl-1`" v-if="texto">{{texto}}</p>
                <div type="text" class="regular-input w-100 m-0 " v-if="value">{{value | moment('MM/YY')}}</div>
                <div type="text" class="regular-input w-100 m-0 " v-else>{{placeholder}}</div>
                <input :id="id" type="month" class="regular-input-hidden m-0 w-0px h-0px p-0 border-0" :placeholder="placeholder" :value="value" @input="update" @change="update" @keyup.enter="enter()">
            </label>
        </div>

        <div class="row w-100 m-0" v-else >
            <div class="col-6 px-1">
                <p :class="`letra-${textcolor?textcolor:'gray3'}-4-1vw m-0 mb-1 pl-1`">Mes:</p>
                <select class="regular-input w-100 white-space-preline" :id="id" :disabled="disabled" v-model="mes" @change="updateMes" >
                    <option :value="null" selected disabled>{{'Mes'}}</option>
                    <template v-for="e of meses">
                        <option :key="e.numero" :value="e.numero">{{e.numero}}</option>
                    </template>
                </select>
            </div>
            <div class="col-6 px-1">
                <p :class="`letra-${textcolor?textcolor:'gray3'}-4-1vw m-0 mb-1 pl-1`">Año:</p>
                <select class="regular-input w-100 white-space-preline" :id="id" :disabled="disabled" v-model="year" @change="updateYear" >
                    <option :value="null" selected disabled>{{'Año'}}</option>
                    <template v-for="e of years">
                        <option :key="e.numero" :value="e.numero">{{e.numero}}</option>
                    </template>
                </select>
            </div>
        </div>

    </div>

    <div class="col-12 my-auto p-0" v-else-if="password" >
        <p :class="`letra-${textcolor?textcolor:'gray3'}-4-1vw m-0 mb-1 pl-1`" v-if="texto">{{texto}}</p>
        <div class="row w-100 m-0 position-relative">
            <div class="w-auto position-absolute top-6px right-5px z-200" @click="ver = !ver">
                <icono icono="visibility" :clase="`letra-${ver?'rojo2':'gray3'}-26`" />
            </div>
            <input :id="id" :type="ver?'text':'password'" :class="`${input?input:'regular'}-input w-100 m-0 ${password?'pr-26px':''} ${clase?clase:''}`" 
            :placeholder="placeholder" :maxlength="maxlength"  
            :disabled="disabled" :value="value" 
            @input="update" @change="update"  @keypress="keyenter" @keyup.enter="enter()" >
        </div>
    </div>

    <div class="col-12 my-auto p-0" v-else-if="pegado" >
        <p :class="`letra-${textcolor?textcolor:'gray3'}-4-1vw m-0 mb-1 pl-1`" v-if="texto">{{texto}}</p>
        <div class="row w-100 m-0 position-relative">
            <div class="w-auto position-absolute top-9px right-5px z-200" @click="paste">
                <icono icono="attach_file" :clase="`letra-${ver?'rojo2':'gray3'}-26`" />
            </div>
            <input :id="id" type="text" :class="`${input?input:'regular'}-input w-100 m-0 ${pegado?'pr-26px':''} ${clase?clase:''}`" 
            :placeholder="placeholder" :maxlength="maxlength"  
            :disabled="disabled" :value="value" 
            @input="update" @change="update"  @keypress="keyenter" @keyup.enter="enter()" >
        </div>
    </div>

    <div class="col-12 my-auto p-0" v-else >
        <p :class="`letra-${textcolor?textcolor:'gray3'}-4-1vw m-0 mb-1 pl-1`" v-if="texto">{{texto}}</p>
        <input :id="id" :type="type" :class="`${input?input:'regular'}-input w-100 m-0 ${clase}`" :placeholder="placeholder" :maxlength="maxlength"  :disabled="disabled" :value="value" @input="update" @change="update"  @keypress="keyenter" @keyup.enter="enter()" >
    </div>
</div>
</template>

<script>
const moment = require('moment');

export default {
    props:  [
        'value',
        'date',
        'type',
        'input',
        'pegado',
        'password',
        'clase',
        'noNumeros',
        'placeholder',
        'maxlength',
        'disabled',
        'textarea', 
        'rows', 
        'texto' ,
        'offset' ,
        'scroll' ,
        'notOffset' ,
        'contendorId' ,
        'textcolor'
    ],
    data(){
        return {
            id: _.uniqueId('inputF_'),
            modelo: null,
            elemento: null,
            next: null,
            ver: false,
            androide: 0,
            mes: null,
            year: null,
            inicio: Number(moment().format('YYYY')),
            conteo: 10,
        };
    },
    computed:{
        meses(){return this.$store.getters.getCatalogo('meses')},
        android(){ return this.$store.getters.deviceready? device.platform == 'android': 0 },
        years(){
            let a = [];
            for(let x = 0; x <= this.conteo; x++){
                a.push({numero: this.inicio + x});
            }
            return a;
        },
    },
    created() {
        if(this.date){
            if(this.value){
                this.mes = moment(this.value,'YYYY-MM').format('MM');
                this.year = moment(this.value,'YYYY-MM').format('YYYY');
            }
            else{
                this.mes = moment().format('MM');
                this.year = moment().format('YYYY');
                this.$emit('input', `${this.year}-${this.mes}`);
            }
        }
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
        update($event){
            this.$emit('input', $event.target.value);
            this.$emit('change', $event.target.value);
        },

        updateMes($event){
            this.$emit('input', `${this.year}-${this.mes}`);
            // console.log("MES", `${this.year}-${this.mes}`, this.value);
        },
        updateYear($event){
            this.$emit('input', `${this.year}-${this.mes}`);
            // console.log("MES", `${this.year}-${this.mes}`, this.value);
        },

        paste(){
            console.log("PASTING")
            navigator.clipboard.readText().then(texto => {
	            this.$emit('input', (this.value || '') + texto);
            }).catch(error => { });
        },

        enter(){
            if(this.next){
                this.next.focus();
            }
            else {
                this.elemento.blur();
                this.$emit('enter');
            }
        },
        focus(){
            if(!this.notOffset){
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
        
        keyenter(event){
            if(this.type == 'number'){
                // console.log("LENGTH",this.maxlength > event.target.value.length, event.target.value.length)
                if(this.maxlength > event.target.value.length){
                    return true;
                }
                else{
                    event.preventDefault();
                }
            }
            if(this.type == "tel"){
                if( event.keyCode >= 48 && event.keyCode <= 57 ){
                    return true;
                }
                event.preventDefault();
            }
            else if(this.noNumeros){
                if( event.keyCode >= 48 && event.keyCode <= 57 ){
                    event.preventDefault();
                }
                return true;
            }
            return true;
        },
    },
}
</script>