<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" v-if="state">
        <div class="row w-100 m-0px px-3 h-max-95vh scroll-y">
            <div class="row w-100 m-0 mt-3 back-color-blanco pb-3 border-radius-15px">
                <div class="row w-100 m-0 px-3 pt-3 position-relative">
                    <div class="w-auto position-absolute top-0px right-5px" @click="closeModal()">
                        <icono icono="cancel" clase="letra-app-45" />
                    </div>
                    <div class="row w-100 m-0 justify-content-center letra-gray4-18 py-2">Selecciona la fecha:</div>
                    <div class="row w-100 m-0" >
                        <div class="row w-100 m-0 mb-2">
                            <div class="row w-100 m-0 letra-app-15">Año</div>
                            <div class="row w-100 m-0">
                                <!-- <div class="col-auto my-auto pl-0 pr-2" @click="lastYear()">
                                    <icono icono="chevron_left" clase="letra-app-45" />
                                </div> -->
                                <div class="col my-auto px-0 text-center letra-app-30 fw-800">{{year}}</div>
                                <!-- <div class="col-auto my-auto pl-0 pr-2" @click="nextYear()">
                                    <icono icono="chevron_right" clase="letra-app-45" />
                                </div> -->
                            </div>
                        </div>
                        <div class="row w-100 m-0 mb-2">
                            <div class="row w-100 m-0 letra-azulapp-15">Mes</div>
                            <div class="row w-100 m-0">
                                 <div class="col-auto my-auto pl-0 pr-2" @click="lastMonth()">
                                    <icono icono="chevron_left" clase="letra-azulapp-45" />
                                </div>
                                <div class="col my-auto px-0 text-center letra-azulapp-25 fw-800">{{mes.mes}}</div>
                                <div class="col-auto my-auto pl-0 pr-2" @click="nextMonth()">
                                    <icono icono="chevron_right" clase="letra-azulapp-45" />
                                </div>
                            </div>
                        </div>
                        <div class="row w-100 m-0 mb-2">
                            <div class="row w-100 m-0 letra-app-15">Dias</div>
                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0 justify-content-start">
                                    <div class="w-14 my-auto" v-for="(x,iy) of semana" :key="iy">
                                        <div class="row w-100 m-0 justify-content-center border-radius-30px letra-azulapp-19 fw-800 py-9px">{{x}}</div>
                                    </div>
                                </div>
                                <div class="row w-100 m-0 justify-content-start">
                                    <div class="w-14 my-auto" v-for="d of predias" :key="d.id" @click="dia = d.dia">
                                        <div class="row w-100 m-0 justify-content-center border-radius-30px letra-blanco-17 py-9px" >{{dia}}</div>
                                    </div>
                                    <div class="w-14 my-auto" v-for="d of dias" :key="d.dia" @click="dia = d.dia" :class="(ocupado(d.numero))?'back-color-gray0':''">
                                        <div class="row w-100 m-0  justify-content-center  border-radius-30px"
                                        :class="(dia == d.dia)?'letra-app-17 fw-800 border-app-3 py-6px':'letra-gray3-17 py-9px'" >{{d.dia}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 letra-gray3-13" v-show="ocupado(this.diaSemana)">*Estas seleccionado un horario donde el afiliado no esta disponible.</div>
                    </div>
                    <div class="row w-100 m-0 pt-3 px-2">
                        <boton-app texto="Seleccionar" @click="set()" radius="30px" />
                    </div>
                </div>
            </div>
        </div>
    </div>


</transition>
</template>
<script>
const moment = require('moment');
export default {
    props: ['value','fecha','talento'],
    data(){
        return {
            name: 'modalFecha',
            year: moment(this.value,'YYYY-MM-DD').format('YYYY'),
            month: moment(this.value,'YYYY-MM-DD').format('MM'),
            dia: moment(this.value,'YYYY-MM-DD').format('DD'),
            semana: ['D','L','M','M','J','V','S'],
        };
    },
    computed: {
        state() {return this.$store.getters.getModal(this.name)},
        meses(){return this.$store.getters.getCatalogo('meses') },
        mes(){return this.meses.find(m=>{return m.numero == this.month}) },
        predias(){
            let d = [];
            let m = moment(`${this.year}-${this.month}-${1}`,'YYYY-MM-D');
            for(let x = 0; x < m.day(); x++){
                d.push({dia: x, id: _.uniqueId('x_')});
            }
            console.log("Preduas", m.day());
            return d;
        },
        dias(){
            let d = [];
            for(let i = 1; i <= this.mes.dias; i++){
                let m = moment(`${this.year}-${this.month}-${i}`,'YYYY-MM-D');
                d.push({m:m, dia: m.format('DD'), numero: m.day()});
            }
            if(this.mes.numero == '02'){
                if(moment(`${this.year}-${this.month}-${29}`,'YYYY-MM-DD').isValid()){
                    d.push({dia: '29', numero: moment(`${this.year}-${this.month}-${29}`,'YYYY-MM-DD').day()});
                }
            }
            return d;
        },
        diaSemana(){
            return moment(`${this.year}-${this.month}-${this.dia}`,'YYYY-MM-DD').day();
        },
    },
    mounted() {
        console.log( "MODAL FECHAS",this.talento );
    },
    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },
        lastYear(){
            if(Number(this.year) > 2020){
                this.year = Number(this.year) - 1;
            }
        },
        nextYear(){
            this.year = Number(this.year) + 1;
        },
        lastMonth(){
            this.month = moment(this.month,'MM').subtract(1,'months').format('MM');
        },
        nextMonth(){
            this.month = moment(this.month,'MM').add(1,'months').format('MM');
        },
        ocupado(dia){
             if(this.talento){
                if(this.talento.dias && this.talento.dias.length){
                     if(this.talento.dias.find(d=>{return Number(d.numero) == dia }) != undefined){
                        if(this.talento.dias.find(d=>{return Number(d.numero) == dia }).horarios.find(h=>{ return h.estatus == 'libre' })){
                            return false;
                        }
                        return true;
                    }
                    return false;
                }
                return false;
            }
            return false;
        },
        set(){
            let hh = `${this.year}-${this.month}-${this.dia}`;
            if(!moment(`${this.year}-${this.month}-${this.dia}`,'YYYY-MM-DD').isValid()){
                swal("","Selecciona una fecha válida","");
                return;
            }
            console.log("SET FINAL", hh);
            this.$emit('input',hh);
            this.closeModal();
        }
    },
}
</script>