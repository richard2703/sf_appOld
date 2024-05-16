<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="row w-100 m-0">
        <div class="row w-100 m-0 justify-content-center letra-appve-18 py-2 px-3" v-if="back">Selecciona la fecha final:</div>
        <div class="row w-100 m-0 justify-content-center letra-gray4-18 py-2 px-3" v-else>Selecciona la fecha de inicio:</div>
        <div class="row w-100 m-0" >
            <div class="row w-100 m-0">
                <div class="row w-100 m-0 letra-verde3-15">Año</div>
                <div class="row w-100 m-0 justify-content-center">
                    <div class="col-auto px-3 py-2 fw-800 text-center border-tl-radius-15px border-bl-radius-15px" @click="year = 2019" :class="`${year=='2019'?'back-color-verde3 letra-blanco-25':'letra-verde3-25'}`">2019</div>
                    <div class="col-auto px-3 py-2 fw-800 text-center border-tr-radius-15px border-br-radius-15px" @click="year = 2020" :class="`${year=='2020'?'back-color-verde3 letra-blanco-25':'letra-verde3-25'}`">2020</div>
                </div>
                <!-- <div class="row w-100 m-0">
                    <div class="col-auto my-auto pl-0 pr-2" @click="lastYear()">
                        <icono icono="chevron_left" clase="letra-verde3-45" />
                    </div>
                    <div class="col my-auto px-0 text-center letra-verde3-30 fw-800">{{year}}</div>
                    <div class="col-auto my-auto pl-0 pr-2" @click="nextYear()">
                        <icono icono="chevron_right" clase="letra-verde3-45" />
                    </div>
                </div> -->
            </div>
            <div class="row w-100 m-0">

                <div class="col-auto px-0 my-auto">
                    <div class="row w-100 m-0" v-for="(m, ind) of meses" :key="ind" @click="month=m.numero" >
                        <div class="row w-100 m-0 letra-verde3-15 px-10px py-8px text-capitalize justify-content-center" 
                            :class="`${(ind == 0)?'border-tr-radius-10px':''} ${(ind == 11)?'border-br-radius-10px':''} ${(month == m.numero)?'':'back-color-amar2'}`">{{m.abr}}</div>
                    </div>
                </div>

                <div class="col px-0 my-auto pl-3">
                    <div class="row w-100 m-0 mb-2">
                        <div class="row w-100 m-0 letra-verde3-15">Dias</div>
                        <div class="row w-100 m-0">
                            <div class="row w-100 m-0 justify-content-start">
                                <div class="w-14 my-auto" v-for="d of dias" :key="d.dia" @click="dia = d.dia; set();" :class="(false)?'back-color-gray0':''">
                                    <div class="row w-100 m-0 justify-content-center border-radius-5px"
                                    :class="(dia == d.dia)?'letra-verde3-18 fw-800 border-verde3-3 py-6px':'letra-gray3-18 py-9px'" >{{d.dia}}</div>
                                </div>
                            </div>
                        </div>
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
    props: [
        'value',
        'back',
        'inicio',
    ],
    data(){
        return {
            year:   moment(this.value, 'YYYY-MM-DD').format('YYYY'),
            month:  moment(this.value, 'YYYY-MM-DD').format('MM'),
            dia:    moment(this.value, 'YYYY-MM-DD').format('DD'),
            incio: null,
        };
    },
    computed: {
        state() {return this.$store.getters.getModal(this.name)},
        meses(){return this.$store.getters.getCatalogo('meses') },
        mes(){return this.meses.find(m=>{return m.numero == this.month}) },
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
        set(){
            let hh = `${this.year}-${this.month}-${this.dia}`;
            if(!moment(`${this.year}-${this.month}-${this.dia}`,'YYYY-MM-DD').isValid()){
                swal("","Selecciona una fecha válida","");
                return;
            }
            if(this.incio){
                if(this.incio > hh){
                    swal("","La fecha final no puede ser menor a la de inicio","");
                    return;
                }
            }
            console.log("SET FINAL", hh);
            this.$emit('input',hh);
            // this.closeModal();
        }
    },
}
</script>