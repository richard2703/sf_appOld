<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_loader w-100 m-0 p-0 justify-content-center" v-if="state">
        <div class="row w-100 m-0px mt-10vh px-5 justify-content-center">
        <div class="row w-100 m-0px px-5 justify-content-center">
            <div class="row w-100 m-0  py-3 border-radius-15px justify-content-center">
                <div class="my-auto text-center px-3" :class="{'col-12':!landscape, 'col-5':landscape}">
                    <imagen :logo="true" :blanco="true" />
                </div>
                <div class="col-12 p-0 my-auto text-center">
                    <div class="lds-css ng-scope text-center"><div style="width:100%;height:100%" class="lds-ellipsis mx-auto"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div></div>
                </div>

                <!-- <div class="row w-100 m-0 justify-content-center pt-3">
                  <sliderLoader />
                </div>
                <div class="row w-100 m-0 justify-content-center pt-3">
                  <div class="col-12 px-0 letra-verde3-14 text-center">Estamos obteniendo tu información, esto puede tomar un momento...</div>
                </div> -->

            </div>
        </div>
        </div>
    </div>


</transition>
</template>
<script>
export default {
    data(){
        return {
            name: 'loader',
            landscape: false,
        };
    },
    props: [],
    computed: {
        state() {return this.$store.getters.getModal(this.name)},
    },
    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },
    },
}
</script>
<style>

 .lds-ellipsis {
    position: relative;
  }
  .lds-ellipsis > div {
    position: absolute;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
  }
  .lds-ellipsis div > div {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #f00;
    position: absolute;
    top: 100px;
    left: 32px;
    -webkit-animation: lds-ellipsis 1.3s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    animation: lds-ellipsis 1.3s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
  }
  .lds-ellipsis div:nth-child(1) div {
    -webkit-animation: lds-ellipsis2 1.3s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    animation: lds-ellipsis2 1.3s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    background: #262a65;
  }
  .lds-ellipsis div:nth-child(2) div {
    -webkit-animation-delay: -0.65s;
    animation-delay: -0.65s;
    background: #262a65;
  }
  .lds-ellipsis div:nth-child(3) div {
    -webkit-animation-delay: -0.325s;
    animation-delay: -0.325s;
    background: #262a65;
  }
  .lds-ellipsis div:nth-child(4) div {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
    background: #262a65;
  }
  .lds-ellipsis div:nth-child(5) div {
    -webkit-animation: lds-ellipsis3 1.3s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    animation: lds-ellipsis3 1.3s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
    background: #262a65;
  }
  .lds-ellipsis {
    width: 65px !important;
    height: 65px !important;
    -webkit-transform: translate(-32.5px, -32.5px) scale(0.325) translate(32.5px, 32.5px);
    transform: translate(-32.5px, -32.5px) scale(0.325) translate(32.5px, 32.5px);
  }

</style>