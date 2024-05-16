<template >
<div class="row w-100 m-0">
    <div class="row w-100 m-0">
        <div class="row w-100 m-0 px-0 pt-2 ">
            <div class="row w-100 m-0 h-50vh" :id="id"></div>
        </div>
        <div class="row w-100 m-0 px-3 justify-content-center">
            <div class="col px-0">
                <div class="row w-100 m-0 justify-content-center">
                    <div class="h-30px w-30px back-color-verde3"></div>
                </div>
                <div class="row w-100 m-0 justify-content-center letra-negro1-16">Efectivo</div>
                <div class="row w-100 m-0 justify-content-center letra-verde3-20 fw-800">{{porcentaje(cuenta.total_venta,cuenta.total_efectivo)}}%</div>
                <div class="row w-100 m-0 justify-content-center letra-verde3-18">{{cuenta.total_efectivo | currency}}</div>
            </div>
            <div class="col px-0">
                <div class="row w-100 m-0 justify-content-center">
                    <div class="h-30px w-30px back-color-amar2"></div>
                </div>
                <div class="row w-100 m-0 justify-content-center letra-negro1-16">Tarjeta</div>
                <div class="row w-100 m-0 justify-content-center letra-verde3-20 fw-800">{{porcentaje(cuenta.total_venta,cuenta.total_tarjeta)}}%</div>
                <div class="row w-100 m-0 justify-content-center letra-verde3-18">{{cuenta.total_tarjeta | currency}}</div>
            </div>
            <div class="col px-0">
                <div class="row w-100 m-0 justify-content-center">
                    <div class="h-30px w-30px back-color-verde4"></div>
                </div>
                <div class="row w-100 m-0 justify-content-center letra-negro1-16">Otros</div>
                <div class="row w-100 m-0 justify-content-center letra-verde3-20 fw-800">{{porcentaje(cuenta.total_venta,cuenta.total_otros)}}%</div>
                <div class="row w-100 m-0 justify-content-center letra-verde3-18">{{cuenta.total_otros | currency}}</div>
            </div>
        </div>
    </div>
</div> 
</template>
<script>
export default {
    data(){
        return {
            id: _.uniqueId('piechart_'),
            modelo: null,
        };
    },
    props: [],
    computed: {
        sucursal(){return this.$store.getters.SurcusalesFind('sucursales','sucursal') || {}},
        data(){return this.$store.getters.SurcusalesObject('cuentas') },
        cuenta(){return this.data.cuentas || {} },
        areas(){return this.data.ventaPorAreaRestaurant || [] },
    },
    mounted() {
        this.init();
    },
    methods:{
        init(){
            var data = [
                {x: "Efectivo", value: Number(this.cuenta.total_efectivo), fill:'#2c786c', selected: true},
                {x: "Tarjeta", value: Number(this.cuenta.total_tarjeta), fill:'#f6a81d',},
                {x: "Otros", value: Number(this.cuenta.total_otros), fill:'#004445',},
            ];
            //ventas 
            let chart = anychart.pie(data);
            chart.container(this.id);
            chart.outline(false);
            chart.legend(false);
            chart.selected(false);
            chart.draw();
        },
        porcentaje(total, cantidad){
            if(total && cantidad){
                return Math.round(Number(cantidad) * 100 / Number(total));
            }
            return 0;
        }
    },
}
</script>
