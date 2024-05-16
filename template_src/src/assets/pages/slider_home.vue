<template>
  	<f7-page>
		<div class="vista back-color-blanco ">
			<div class="contenedor-page-tabs back-color-blanco" >
				<sliderHome />
			</div>
		</div>
	</f7-page>
</template>
<script>
  import { f7Page } from 'framework7-vue';
  export default {
    components:{
      f7Page,    
    },
    data(){
      return {
        open: true,
      };
    },
    computed:{
        session(){return this.$store.getters.getSession;},
        router(){return this.$store.getters.getRouter;},
    },
    beforeMount(){
        console.log("LOGENADO SLIDER", this.session.token);
        if(this.session.token){
            this.$store.commit('changeViewByTipe');
        }
    },
    mounted(){
      	this.$store.dispatch('initData', [this.$f7]);
    },
    methods:{
    },
  };
</script>
