<template>
    <f7-page id="menu">
    <nav-bar tipo="inicio" :backs="true" :title="'Acerca de'"></nav-bar>
    <div class="contenedor-page padding-bottom-20">
        <div class="row w-100 m-0 back-color-blanco">
            <div class="row w-100 m-0 py-2 justify-content-center">
                <div class="col-11 text-justify" >
                    <div class="row w-100 m-0 p-0 letra-gray-dark2-4-5vw">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis maxime hic impedit aut sint officiis vel optio explicabo quibusdam, numquam facilis blanditiis repellendus dolorum nisi, labore obcaecati, fugit est veniam.
                    Deserunt tenetur nulla necessitatibus maiores nihil consequatur laudantium hic autem unde illo, incidunt ipsam voluptas, soluta, sed tempora repellendus enim nesciunt corrupti vitae atque consectetur? Totam illo eligendi eum voluptatum?
                    Accusantium libero quam, optio quos soluta inventore veniam iste a sint eveniet, tempora illo rerum nesciunt, vitae aliquid? Numquam ratione quis aperiam beatae reiciendis deserunt ab explicabo, facilis harum! Doloribus?
                    Voluptatem reiciendis incidunt magni obcaecati deserunt nobis accusamus cum pariatur nulla alias optio, architecto ipsa quidem magnam enim voluptates exercitationem sit dolor doloremque deleniti, tempore, rerum repellendus sint sed. Voluptas?
                    Aliquid magni distinctio enim esse aliquam at cum, debitis nostrum culpa quam doloribus minus amet alias reiciendis praesentium asperiores dolorum necessitatibus quos assumenda dolorem, nam ipsam. Odit dolorem doloremque tenetur!
                    At provident eveniet doloribus neque inventore alias. Officiis, distinctio? Enim beatae omnis aliquid ullam exercitationem voluptate quae magnam explicabo in laboriosam quam, dolor, labore nesciunt sunt hic deserunt facilis! Aliquid?</div>
                </div>
            </div>
        </div>
    </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
import Swiper from 'swiper';
import g from '../js/general';
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                promos_slider: null,
                categorias_slider: null
            } 
        },
        computed: {
        },
        mounted(){
        },
        methods:{
            goTo(ruta)
            {
                this.$f7.views.principal.router.navigate(ruta);
            },
            goToDetelle()
            {
                this.goTo('/mensajes_chat');
            }
        }
    }
</script>