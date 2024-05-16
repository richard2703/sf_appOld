<template>
    <div class="row w-100 m-0">
        <div class="row w-100 m-0">
            <div v-for="(a,w) of mesArray" :key="w" class="row w-100 m-0 mt-3 back-color-blanco ">
                <div class="row w-100 m-0 px-3 pt-3 position-relative">
                    <div class="row w-100 m-0" >
                        <div class="row w-100 m-0 mb-2">
                            <div class="row w-100 m-0">
                                <div v-if="0" class="col-auto my-auto pl-0 pr-2" @click="lastMonth()">
                                    <icono icono="chevron_left" clase="letra-rojo-45" />
                                </div>
                                <div class="col my-auto px-0 text-center letra-rojo-21 fw-800 text-capitalize">{{a.mesL}} {{a.year}}</div>
                                <div v-if="0" class="col-auto my-auto pl-0 pr-2" @click="nextMonth()">
                                    <icono icono="chevron_right" clase="letra-rojo-45" />
                                </div>
                            </div>
                        </div>
                        <div class="row w-100 m-0 mb-2">
                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0 justify-content-start">
                                    <div class="w-14 my-auto" v-for="(x,iy) of semana" :key="iy">
                                        <div class="row w-100 m-0 justify-content-center border-radius-30px letra-azulapp-19 fw-800 py-9px">{{x}}</div>
                                    </div>
                                </div>
                                <div class="row w-100 m-0 justify-content-start">
                                    <div class="w-14 my-auto " v-for="d of predias(a.year, a.mes)" :key="d.id">
                                        <div class="row w-100 m-0 justify-content-center border-radius-30px letra-blanco-17 py-9px" >{{dia}}</div>
                                    </div>
                                    <div class="w-14 my-auto position-relative" v-for="d of dias(a.year, a.mes)" :key="d.dia" 
                                        @click="set(d.dia,a.mes,a.year); " :class="(validarFecha(d.dia,a.mes,a.year))?'back-color-azul1 border-radius-50px':''">

                                        <div class="row w-100 m-0  justify-content-center "
                                        :class="(validarFecha(d.dia,a.mes,a.year))?'letra-blanco-17 fw-800 border-app-3 py-6px': evento(d.dia, a.mes, a.year)?'letra-rojo-17 py-9px border-b-rojo-1': 'letra-gray3-17 py-9px'" >{{d.dia}}</div>

                                        <div class="w-12px h-12px back-color-rojo border-radius-50 position-absolute top-3px right-3px z-10000000" v-if=" evento(d.dia, a.mes, a.year) "></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>
<script>
const moment = require('moment');
const meses = [
    {numero: '01', mes: 'Enero', dias: 31},
    {numero: '02', mes: 'Febrero', dias: 28},
    {numero: '03', mes: 'Marzo', dias: 31},
    {numero: '04', mes: 'Abril', dias: 30},
    {numero: '05', mes: 'Mayo', dias: 31},
    {numero: '06', mes: 'Junio', dias: 30},
    {numero: '07', mes: 'Julio', dias: 31},
    {numero: '08', mes: 'Agosto', dias: 31},
    {numero: '09', mes: 'Septiembre', dias: 30},
    {numero: '10', mes: 'Octubre', dias: 31},
    {numero: '11', mes: 'Noviembre', dias: 30},
    {numero: '12', mes: 'Diciembre', dias: 31},
];

export default {
    props: [
        'value',
        'fecha',
        'talento',
        'data',
        'datax',
        'total',
    ],
    data(){
        return {
            name: 'modalFecha',
            year: moment(this.value,'YYYY-MM-DD').format('YYYY'),
            month: moment(this.value,'YYYY-MM-DD').format('MM'),
            valor: moment().format('YYYY-MM-DD'),
            dia: moment(this.value,'YYYY-MM-DD').format('DD'),
            semana: ['D','L','M','M','J','V','S'],
        };
    },
    computed: {
        tot(){return this.total || 6},
        eventos(){ return this.data || [] },
        eventosx(){ return this.datax || [] },
        evento(){
            return (dia, mes, year) =>{
                return this.eventos.some(x=>{return x.fecha == moment(`${year}-${mes}-${dia}`, 'YYYY-MM-DD' ).format( 'YYYY-MM-DD' ) }) || 
                this.eventosx.some(x=>{return x.evento.fecha == moment(`${year}-${mes}-${dia}`, 'YYYY-MM-DD' ).format( 'YYYY-MM-DD' ) })
            }
        },

        validarFecha(){
            return (d,m,a)=>{
                if(`${a}-${m}-${d}`== this.value){
                    return 1;
                }
                return 0;
            };
        },

        meses(){return this.$store.getters.getCatalogo('meses') },
        mes(){return this.meses.find(m=>{return m.numero == this.month}) },
        mesArray(){
            let a = [];
            for(let i = 0; i < this.tot; i++){
                const m = moment(this.valor,'YYYY-MM-DD').add(i, 'months');
                const x = {
                    mes: m.format('MM'), 
                    mesL: m.format('MMMM'), 
                    year: m.format('YYYY'),
                };
                a.push(x);
            }
            // console.log("ARRA", a);
            return a;
        },
       
        predias(){
            return (year,month)=>{
                let d = [];
                let m = moment(`${year}-${month}-${1}`,'YYYY-MM-D');
                for(let x = 0; x < m.day(); x++){
                    d.push({dia: x, id: _.uniqueId('x_')});
                }
                // console.log("Preduas", m.day());
                return d;
            }
        },

        dias(){
            return (year,month)=>{
                let d = [];
                const mf = meses.find(s=>s.numero == month);
                for(let i = 1; i <= mf.dias; i++){
                    let m = moment(`${year}-${month}-${i}`,'YYYY-MM-D');
                    d.push({m:m, dia: m.format('DD'), numero: m.day()});
                }
                if(this.mes.numero == '02'){
                    if(moment(`${year}-${month}-${29}`,'YYYY-MM-DD').isValid()){
                        d.push({dia: '29', numero: moment(`${year}-${month}-${29}`,'YYYY-MM-DD').day()});
                    }
                }
                return d;
            }
        },
        diaSemana(){
            return moment(`${this.year}-${this.month}-${this.dia}`,'YYYY-MM-DD').day();
        },
    },
    mounted() {
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
            let m = moment(`${this.month}-${this.year}`,'MM-YYYY').subtract(1,'months');
            this.month = m.format('MM');
            this.year = m.format('YYYY');
        },

        nextMonth(){
            let m = moment(`${this.month}-${this.year}`,'MM-YYYY').add(1,'months');
            this.month = m.format('MM');
            this.year = m.format('YYYY');
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

        set(d,m,y){
            let hh = `${y}-${m}-${d}`;
            if(!moment(`${y}-${m}-${d}`,'YYYY-MM-DD').isValid()){
                swal("","Selecciona una fecha válida","");
                return;
            }
            console.log("SET FINAL", hh);
            this.$emit('input',hh);
        }
    },
}
</script>