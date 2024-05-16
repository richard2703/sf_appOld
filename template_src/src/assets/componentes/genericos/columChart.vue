<template >
<div class="row w-100 m-0">
    <div class="row w-100 m-0">
        <div class="row w-100 m-0 px-0 pt-2 ">
            <div class="row w-100 m-0 h-50vh" :id="id"></div>
        </div>
        <div class="row w-100 m-0 pl-3 justify-content-center">
            <div class="row w-100 m-0 pl-30px pr-10px justify-content-center">
                <div class="col px-0 pl-2">
                    <!-- <div class="row w-100 m-0 justify-content-center">
                        <div class="h-30px w-30px back-color-verde3"></div>
                    </div> -->
                    <div class="row w-100 m-0 justify-content-center letra-negro1-16 text-capitalize">alimentos</div>
                    <div class="row w-100 m-0 justify-content-center letra-verde3-20 fw-800">{{porcentaje(cuenta.total_venta,cuenta.total_alimentos)}}%</div>
                    <div class="row w-100 m-0 justify-content-center letra-verde3-18">{{cuenta.total_alimentos | currency}}</div>
                </div>
                <div class="col px-0">
                    <!-- <div class="row w-100 m-0 justify-content-center">
                        <div class="h-30px w-30px back-color-amar2"></div>
                    </div> -->
                    <div class="row w-100 m-0 justify-content-center letra-negro1-16 text-capitalize">bebidas</div>
                    <div class="row w-100 m-0 justify-content-center letra-verde3-20 fw-800">{{porcentaje(cuenta.total_venta,cuenta.total_bebidas)}}%</div>
                    <div class="row w-100 m-0 justify-content-center letra-verde3-18">{{cuenta.total_bebidas | currency}}</div>
                </div>
                <div class="col px-0">
                    <!-- <div class="row w-100 m-0 justify-content-center">
                        <div class="h-30px w-30px back-color-verde4"></div>
                    </div> -->
                    <div class="row w-100 m-0 justify-content-center letra-negro1-16 text-capitalize">Otros</div>
                    <div class="row w-100 m-0 justify-content-center letra-verde3-20 fw-800">{{porcentaje(cuenta.total_venta,cuenta.total_otros_alimentos)}}%</div>
                    <div class="row w-100 m-0 justify-content-center letra-verde3-18">{{cuenta.total_otros_alimentos | currency}}</div>
                </div>
            </div>
        </div>
    </div>
</div> 
</template>
<script>
export default {
    data(){
        return {
            id: _.uniqueId('columchart_'),
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
                {x: "Alimentos", value: Number(this.cuenta.total_alimentos), fill:'#2c786c',},
                {x: "Bebidas", value: Number(this.cuenta.total_bebidas), fill:'#f6a81d',},
                {x: "Otros", value: Number(this.cuenta.total_otros_alimentos), fill:'#004445',},
            ];
            //ventas 
            let chart = anychart.column();
            let series = chart.column(data);
            chart.container(this.id);
            // chart.legend(false);
            chart.labels(false);
            chart.xAxis().labels(false);
            // chart.selected(false);
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
