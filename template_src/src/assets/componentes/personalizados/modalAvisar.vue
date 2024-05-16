<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" v-if="state">
        <div class="row w-100 m-0px px-3">
            <div class="row w-100 m-0 mt-5 back-color-blanco py-3 border-radius-15px">
                <div class="row w-100 m-0 px-3">
                    <div class="row w-100 m-0 justify-content-center py-2">
                        <div class="col-12 px-1 mt-2 mb-1 text-center">
                            <div class="row w-100 m-0 letra-gray-dark-5-1vw fw-800 justify-content-center">Avisar a contacto:</div>
                        </div>
                        <div class="col-12 px-1 text-center letra-gray3-4-5vw">Ingresa el nombre y el numero de la persona que contactaremos</div>
                    </div>
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0">
                            <div class="col-12 px-1">
                                <inputForm texto="Nombre:" type="text" placeholder="" v-model="form.nombre" />
                            </div>
                            <div class="col-12 px-1 mt-2">
                                <inputForm texto="Telefono:"  type="tel" placeholder="" v-model="form.telefono" :maxlength="10" />
                            </div>
                        </div>
                    </div>
                    <div class="row w-100 m-0 pt-4">
                        <div class="col-6 px-1">
                            <boton-app texto="Salir" :outline="true" @click="cancelar()" ></boton-app>
                        </div>
                        <div class="col-6 px-1">
                            <boton-app texto="Avisar" @click="next()"></boton-app>
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
    data(){
        return {
            name: 'modalAvisar',
            razon: '',
            calificaion:0,
            form: {
                nombre: null,
                telefono: null,
            },
        };
    },
    props: [
        'servicio',
    ],
    computed: {
        state() {return this.$store.getters.getModal(this.name)},
        destino(){return this.servicio.destino || {} },
        chofer(){return this.servicio.chofer || {} },
    },
    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },
        cancelar(){
            this.closeModal();
        },

        next(){
            if(!this.form.nombre || !this.form.telefono){
                swal("","Ingresa nombre y telefono","");
                return;
            }
            let hora = moment(this.servicio.creado,'YYYY-MM-DD HH:mm:ss').add(Number(this.servicio.tiempo), 'seconds').format('HH:mm [hrs] DD/MM/YY');

            let texto = `Hola ${this.form.nombre}, Estoy viajando en Glogar, voy desde ${this.servicio.calle} hacia ${this.destino.calle} en un vehiculo ${ this.chofer.vehiculo || 'Honda Civic' } / ${this.chofer.placas || 'XCV-5647'} con el operador ${this.chofer.nombre}. Mi tiempo estimado de llegada es a las ${hora}`;
            texto = texto.replace(/ /g,'%20')
            // console.log("========>", texto);
            let url = `https://api.whatsapp.com/send?phone=+521${this.form.telefono}&text=${texto}`;
            console.log("CORDOVA OPEN", url);
            try{
              cordova.InAppBrowser.open(url, '_system');
            }catch(e){};
            this.closeModal();
        }
    },
}
</script>







