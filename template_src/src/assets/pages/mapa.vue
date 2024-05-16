<template>
    <f7-page id="mapa">
        <div class="row w-100 m-0 opciones-mapa p-2">
            <div class="col-1 p-0 mt-5px" @click="closeMapa()">
                <img class="w-100 h-100" src="../iconos/clear.svg" alt="">
            </div>
            <div class="col-1 letra-blanco-3-1vw">{{ofertas.length}}</div>
        </div>
        <div class="row w-100 m-0 position-absolute" v-show="mapa.vista=='actividades'">
            <div id="mundo_actividades" class="mapa-mundo w-100"></div>
             <div class="row h-15vw w-15vw border-radius-50 overflow-hidden position-absolute boton-localizacion" :class="{'active':mark_actividad && mapa.vista=='actividades'}">
                <button class="button boton-blanco-redondo p-0" @click="centerMapPos()">
                    <div class="row w-100 m-0 p-14px">
                        <img class="w-100 h-100" src="../iconos/loc.svg" alt="pin-loc">
                    </div>
                </button>
            </div>
            <div class="row w-100 m-0 position-absolute input-busqueda justify-content-center row-eq-height">
               <div class="col-10 my-auto back-color-blanco input">
                    <input type="email" class="busqueda-input w-100 m-0" placeholder="Buscar ..." v-model="busqueda" @input="searchPlaces()" @focus="activeSearch = true">
                </div>
                <div class="col-10 back-color-blanco mt-2 input px-1">
                    <div class="row m-0 w-100">
                        <!-- <div class="col-2 p-0 my-auto letra-gray-dark-2-8vw">Tipo:</div>
                        <div class="col-4 letra-gray-dark-2-8vw pl-0 pr-1 py-1">
                            <select class="regular-input w-100" v-model="trabajo_tipo" @change="marcarOfertas()">
                                <option :key="0" :value="null">Todos</option>
                                <template v-for="e of tipos">
                                    <option :key="e.id" :value="e.id">{{e.nombre}}</option>
                                </template>
                            </select>
                        </div> -->
                        <div class="col-2 col-3 my-auto letra-gray-dark-2-8vw">Categoria:</div>
                        <div class="col-4 col-9 letra-gray-dark-2-8vw pl-0 pr-1 py-1">
                            <select class="regular-input w-100" v-model="cat" @change="marcarOfertas(ofertas)">
                                <option :key="0" :value="null">Todas</option>
                                <template v-for="e of categorias">
                                    <option :key="e.id" :value="e.id">{{e.nombre}}</option>
                                </template>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <transition
                name="custom"
                enter-active-class="animated fadeIn faster"
                leave-active-class="animated fadeOut faster">
                <div class="row w-100 m-0 h-100 position-absolute busqueda-resultados-filtro overflow-hidden" v-if="activeSearch">
                    <div class="row w-100 m-0 opciones-mapa p-2">
                        <div class="col-1 p-0 mt-5px" @click="closeBusqueda()">
                            <img class="w-100 h-100" src="../iconos/clear_gray.svg" alt="">
                        </div>
                    </div>
                    <div class="col-12 scroll-y">
                        <template v-for="l of lugares">
                            <button type="button" :key="l.id" class="button button-outline button-raised button-active-gray button-noborder p-0 h-auto white-space-preline" @click="selectPlace(l.description)">
                                <div class="row w-100 m-0 py-2 px-1 border-b-gray-light-1 letra-gray-dark2-4-1vw" >
                                    <div class="col-1 px-3px my-auto">
                                        <img class="w-100 h-100" src="../iconos/pin_drop.svg" alt="">
                                    </div>
                                    <div class="col-11 text-left px-2 my-auto">{{l.description}}</div>
                                </div>
                            </button>
                        </template>
                    </div>
                </div>
            </transition>
        </div>
<!-- ----------------------------- USUARIOS ------------------------------------------------- -->
        <div class="row w-100 m-0 position-relative" v-show="mapa.vista=='usuarios'">
            <div id="mundo_usuarios" class="mapa-mundo w-100"></div>
            <div class="row h-15vw w-15vw border-radius-50 overflow-hidden position-absolute boton-localizacion" :class="{'active':mark_usuario && mapa.vista=='usuarios'}">
                <button class="button boton-blanco-redondo p-0" @click="centerMapPos()">
                    <div class="row w-100 m-0 p-14px">
                        <img class="w-100 h-100" src="../iconos/loc.svg" alt="pin-loc">
                    </div>
                </button>
            </div>
            <div class="row w-100 m-0 position-absolute input-busqueda justify-content-center row-eq-height">
               <div class="col-10 my-auto back-color-blanco input">
                    <input type="email" class="busqueda-input w-100 m-0" placeholder="Buscar ..." v-model="busqueda" @input="searchPlaces()" @focus="activeSearch = true">
                </div>
            </div>
            <transition
                name="custom"
                enter-active-class="animated fadeIn faster"
                leave-active-class="animated fadeOut faster">
                <div class="row w-100 m-0 h-100 position-absolute busqueda-resultados overflow-hidden" v-if="activeSearch">
                    <div class="row w-100 m-0 opciones-mapa p-2">
                        <div class="col-1 p-0 mt-5px" @click="closeBusqueda()">
                            <img class="w-100 h-100" src="../iconos/clear_gray.svg" alt="">
                        </div>
                    </div>
                    <div class="col-12 scroll-y">
                        <template v-for="l of lugares">
                            <button type="button" :key="l.id" class="button button-outline button-raised button-active-gray button-noborder p-0 h-auto white-space-preline" @click="selectPlace(l.description)">
                                <div class="row w-100 m-0 py-2 px-1 border-b-gray-light-1 letra-gray-dark2-4-1vw" >
                                    <div class="col-1 px-3px my-auto">
                                        <img class="w-100 h-100" src="../iconos/pin_drop.svg" alt="">
                                    </div>
                                    <div class="col-11 text-left px-2 my-auto">{{l.description}}</div>
                                </div>
                            </button>
                        </template>
                    </div>
                </div>
            </transition>
        </div>
        
        <transition
            name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
            <div class="row w-100 m-0 oferta-mapa p-3 border-t-gray-lligth-1" v-if="mark_actividad && mapa.vista=='actividades'">
                <trabajo-preview-component :trabajo="oferta" :clickTrabajo="goToOferta" :imgHeigth="'18'"></trabajo-preview-component>
            </div>
        </transition>
        <transition
            name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
            <div class="row w-100 m-0 oferta-mapa p-3 border-t-gray-lligth-1" v-if="mark_usuario && mapa.vista=='usuarios'">
                <div class="col-12 p-3 border-radius-15px usuario_card">
                    <div class="row m-0 w-100">
                        <div class="w-17vw h-17vw">
                            <img class="w-100 h-100 object-fit border-radius-50" :src="usuario.foto || require('../images/perfil.png')" alt="">
                        </div>
                        <div class="col my-auto">
                            <div class="row w-100 m-0 letra-gray-dark-4-5vw justify-content-left">{{usuario.nombre}}</div>
                            <div class="row w-100 m-0 letra-gray-4-1vw justify-content-left">{{usuario.experiencia}}</div>
                        </div>
                    </div>
                    <div class="row m-0 w-100 py-2 mt-2" >
                        <div class="col-6 pl-0">
                            <button class="button boton-moradoglobel-outline" >
                                <div class="row justify-content-center py-10px letra-moradoglobel-4-5vw" @click="llamar(usuario)">Llamar</div>
                            </button>
                        </div>
                        <div class="col-6 pl-0">
                            <button class="button boton-moradoglobel" @click="sendMensaje(usuario)">
                                <div class="row justify-content-center py-10px letra-blanco-4-5vw" >Enviar mensaje</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
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
                //mapa de activdades
                map:            null,
                //drag mapa actividades
                drag_map_act:   false,
                //mapa usuarios activos
                map_usuarios:   null,
                //mapa usuario drag
                drag_map_usr:   false,
                //pin de posicion en mapa de actividades
                pin_position_act:  null,
                //pin de posicion en mapa de usuarios
                pin_position_usr:  null,
                //infowindow
                infowindow: null,
                //actividades activas en el mapa
                markers_actividades:[],
                //pin de actividad seleccionado
                mark_actividad:     null,
                //usuarios activos en el mapa
                markers_usuarios:   [],
                //pin de usuario seleccionado
                mark_usuario:       null,
                //busqueda
                busqueda:           null,
                //activeSearch
                activeSearch:       false,
                //geocoder
                geocoder:           null,
                //buscadores
                trabajo_tipo:       null,
                cat:                null,
            } 
        },
        computed: {
            tipos(){return this.$store.getters.getTiposAcontecimientos;},
            categorias(){return this.$store.getters.getCategorias;},

            mapa(){return this.$store.getters.getMapa;},
            lugares(){return this.$store.getters.getMapsPlaces;},
            ofertas(){return this.$store.getters.getOfertas;},
            oferta(){return this.ofertas.find(o=>{return o.id == this.mark_actividad.id});},
            usuarios(){return this.$store.getters.getUsuariosActivos;},
            usuario(){return this.usuarios.find(u=>{return u.id == this.mark_usuario.id});},
            posicion(){return this.$store.getters.getPosicion;},
            session(){return this.$store.getters.getSession;},
        },
        watch:{
            mapa:(v)=>{
                this.mark_actividad = null;
                this.mark_usuario = null;
            },
            posicion(v){
                this.updatePinPosicion();
                this.updateMapCenter();
            },
        },
        updated(){
            this.marcarOfertas(this.ofertas);
            this.marcarUsuarios(this.usuarios);
        },
        mounted(){
            this.initMapas();
        },
        methods:{
            goTo(ruta){this.$f7.views.principal.router.navigate(ruta);},
            //llama a el usuario
            llamar(usuario){
                if(!usuario.id) return;
                this.$store.commit('call', usuario);
            },
            goToOferta(id){
                this.$store.commit('selectOferta',id);
                this.$f7.router.navigate('/detalle_oferta');
                setTimeout(()=>{this.$f7.panel.close('rigth',true);},500);
            },
            //cierra el mapa
            closeMapa(){
                this.$f7.panel.close('rigth',true);
            },
            //inicializa los dos mapas
            initMapas(){
                this.initMapaActividades();
                this.initMapaUsuarios();
            },
            //inicializa el mapa de las actividades o ofertas
            initMapaActividades(){
                try{
                    let centro =    {lat:  20.675316, lng: -103.355871};
                    if(this.session.lat && this.session.lng) centro = {lat:  this.session.lat, lng: this.session.lng};
                    if(this.posicion.lat && this.posicion.lng) centro = this.posicion;
                    this.map = new google.maps.Map(document.getElementById('mundo_actividades'), 
                    {
                        center: centro,                       
                        zoom: 13,    
                        disableDefaultUI:true,
                        // styles: [ {"featureType": "landscape.man_made","elementType": "geometry","stylers": [{"color": "#f7f1df"}]},{"featureType": "landscape.natural","elementType": "geometry","stylers": [{"color": "#d0e3b4"}]}, {"featureType": "landscape.natural.terrain","elementType": "geometry","stylers": [{"visibility": "off"}]},{"featureType": "poi","elementType": "labels","stylers": [{"visibility": "off"}]}, {"featureType": "poi.business","elementType": "all","stylers": [{"visibility": "off"}]}, {"featureType": "poi.medical","elementType": "geometry","stylers": [{"color": "#fbd3da"}]}, {"featureType": "poi.park","elementType": "geometry","stylers": [{"color": "#bde6ab"}]}, {"featureType": "road","elementType": "geometry.stroke","stylers": [{"visibility": "off"}]}, {"featureType": "road","elementType": "labels","stylers": [{"visibility": "off"}]}, {"featureType": "road.highway","elementType": "geometry.fill","stylers": [{"color": "#ffe15f"}]}, {"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#efd151"}]}, {"featureType": "road.arterial","elementType": "geometry.fill","stylers": [{"color": "#ffffff"}]}, {"featureType": "road.local","elementType": "geometry.fill","stylers": [{"color": "black"}]}, {"featureType": "transit.station.airport","elementType": "geometry.fill","stylers": [{"color": "#cfb2db"}]}, {"featureType": "water","elementType": "geometry","stylers": [{"color": "#a2daf2"}]}],  
                    });
                    this.map.addListener('dragstart',()=>{
                        this.mark_actividad = null;
                        this.drag_map_act = true;
                        });
                    this.geocoder = new google.maps.Geocoder();
                    this.infowindow = new google.maps.InfoWindow({content: 'Estas aqui' });
                }
                catch(e){
                    setTimeout(this.initMapaActividades,500);
                    return;
                }
                this.marcarOfertas(this.ofertas);
                this.updatePinPosicion();
            
            },  
            //inicializa el mapa de usuarios
            initMapaUsuarios(){
                try{
                     let centro =    {lat:  20.675316, lng: -103.355871};
                    if(this.session.lat && this.session.lng) centro = {lat:  this.session.lat, lng: this.session.lng};
                    if(this.posicion.lat && this.posicion.lng) centro = this.posicion;
                    this.map_usuarios = new google.maps.Map(document.getElementById('mundo_usuarios'), 
                    {
                        center: centro,                       
                        zoom: 18,    
                        disableDefaultUI:true,
                        // styles: [ {"featureType": "landscape.man_made","elementType": "geometry","stylers": [{"color": "#f7f1df"}]},{"featureType": "landscape.natural","elementType": "geometry","stylers": [{"color": "#d0e3b4"}]}, {"featureType": "landscape.natural.terrain","elementType": "geometry","stylers": [{"visibility": "off"}]},{"featureType": "poi","elementType": "labels","stylers": [{"visibility": "off"}]}, {"featureType": "poi.business","elementType": "all","stylers": [{"visibility": "off"}]}, {"featureType": "poi.medical","elementType": "geometry","stylers": [{"color": "#fbd3da"}]}, {"featureType": "poi.park","elementType": "geometry","stylers": [{"color": "#bde6ab"}]}, {"featureType": "road","elementType": "geometry.stroke","stylers": [{"visibility": "off"}]}, {"featureType": "road","elementType": "labels","stylers": [{"visibility": "off"}]}, {"featureType": "road.highway","elementType": "geometry.fill","stylers": [{"color": "#ffe15f"}]}, {"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#efd151"}]}, {"featureType": "road.arterial","elementType": "geometry.fill","stylers": [{"color": "#ffffff"}]}, {"featureType": "road.local","elementType": "geometry.fill","stylers": [{"color": "black"}]}, {"featureType": "transit.station.airport","elementType": "geometry.fill","stylers": [{"color": "#cfb2db"}]}, {"featureType": "water","elementType": "geometry","stylers": [{"color": "#a2daf2"}]}],  
                    });
                    this.map_usuarios.addListener('dragstart',()=>{
                        if(this.mark_usuario)this.mark_usuario.setIcon({url: require('../iconos/user-circle.svg'),scaledSize:{height: 25, width: 20}});
                        this.mark_usuario = null;
                        this.drag_map_usr = true;
                        });
                }
                catch(e){
                    setTimeout(this.initMapaUsuarios,500);
                    return;
                 }
                this.marcarUsuarios(this.usuarios);
                this.updatePinPosicion();
            }, 
            getOfertaPorFiltros(oferta){
                    if(!this.trabajo_tipo && !this.cat) return true;
                    else if(this.trabajo_tipo && this.cat) return (oferta.categorias_trabajos_id == this.cat && oferta.tipos_trabajos_id == this.trabajo_tipo);
                    else if(!this.trabajo_tipo) return oferta.categorias_trabajos_id == this.cat;
                    else if(!this.cat) return oferta.tipos_trabajos_id == this.trabajo_tipo;
            },
            //pone los pines de las ofertas en el mapa
            marcarOfertas(ofertas){
                if(!this.map){
                    setTimeout(()=>{this.marcarOfertas(ofertas)}, 500);
                    return;
                }
                ofertas.forEach(o=>{
                    let mar = this.markers_actividades.find(m=>{return m.id == o.id});
                    if(mar){
                        if(!(Number(o.lat)==mar.getPosition().lat())||!(Number(o.lng)==mar.getPosition().lng())) mar.setPosition({lat: Number(o.lat), lng: Number(o.lng) });
                        if(this.getOfertaPorFiltros(o)) {
                            mar.setMap(this.map);
                        }
                        else mar.setMap(null);
                    }
                    else{
                        let m = new google.maps.Marker({
                            position: {lat: Number(o.lat), lng: Number(o.lng) }, 
                            map: this.map,
                            id: o.id,
                            cat: o.categorias_trabajos_id,
                            icon: {
                                url: require('../iconos/pin_'+o.categorias_trabajos_id+'.svg'),
                                scaledSize:{height: 25, width: 20}
                            },
                        });
                        m.addListener('click', ()=>{this.selectMarkActividad(m)});
                        this.markers_actividades.push(m);   
                    }
                });
            },
            //pone los pines de todos los usuarios activos
            marcarUsuarios(usuarios){
                if(!this.map_usuarios){
                    setTimeout(()=>{this.marcarUsuarios(usuarios)}, 500);
                    return;
                }
                usuarios.forEach(u=>{
                    let mar = this.markers_usuarios.find(m=>{return m.id == u.id});
                    if(mar){
                        if(!Number(u.lat) ==  mar.getPosition().lat() || !Number(u.lng) ==  mar.getPosition().lng()){
                            mar.setPosition({lat: Number(u.lat), lng: Number(u.lng) });
                        }
                    }
                    else{
                        if(!u.lat || !u.lng) return;
                        let m = new google.maps.Marker({
                            position: {lat: Number(u.lat), lng: Number(u.lng) }, 
                            map: this.map_usuarios,
                            id: u.id,
                            icon: {
                                url: require('../iconos/user-circle.svg'),
                                scaledSize:{height: 25, width: 20}
                            },
                        });
                        m.addListener('click', ()=>{this.selectMarkUsuario(m)});
                        this.markers_usuarios.push(m);   
                    }
                });
            },
            //selecciona el marcador de un actividad
            selectMarkActividad(mar){
                if(this.mark_actividad)this.mark_actividad.setIcon({url: require('../iconos/pin_'+this.mark_actividad.cat+'.svg'),scaledSize:{height: 25, width: 20}});
                this.mark_actividad = mar;
                this.mark_actividad.setIcon({url: require('../iconos/pin_'+this.mark_actividad.cat+'.svg'),scaledSize:{height: 50, width: 35}});
                this.map.panTo({lat:mar.getPosition().lat(), lng:mar.getPosition().lng()});
                let zoom = this.map.getZoom();
                if(zoom < 14 ) this.map.setZoom(14);
            },
            //selecciona el marcador de un usuario
            selectMarkUsuario(mar){
                if(this.mark_usuario)this.mark_usuario.setIcon({url: require('../iconos/user-circle.svg'),scaledSize:{height: 25, width: 20}});
                this.mark_usuario = mar;
                this.mark_usuario.setIcon({url: require('../iconos/user-circle.svg'),scaledSize:{height: 50, width: 35}});
                this.map_usuarios.panTo({lat:mar.getPosition().lat(), lng:mar.getPosition().lng()});
                let zoom = this.map_usuarios.getZoom();
                if(zoom < 14 ) this.map_usuarios.setZoom(14);
            },
            //centra el mapa a nuestra posicion si el mapa no a sido explorado
            updateMapCenter(){
                if(!this.map || !this.map_usuarios) return;
                if(!this.drag_map_act){
                    this.map.panTo(this.posicion);
                }
                if(!this.drag_map_usr){
                    this.map_usuarios.panTo(this.posicion);
                }
            },
            //centra el mapa a nuestra posicion
            centerMapPos(){
                this.map.panTo(this.posicion);
                this.map_usuarios.panTo(this.posicion);
            },
            //actuliza nuestra pocicion en el mapa
            updatePinPosicion(){
                if(!this.map || !this.map_usuarios) return;
                if(!this.pin_position_act){
                    this.pin_position_act = new google.maps.Marker({
                        position: {lat: Number(this.posicion.lat), lng: Number(this.posicion.lng)}, 
                        map: this.map,
                        icon: {
                            url: require('../iconos/im.svg'),
                            scaledSize:{height: 40, width: 40}
                        },
                    });
                    this.pin_position_act.addListener('click', ()=>{ this.infowindow.open(this.map, this.pin_position_act);});
                }
                else{
                    if(!Number(this.posicion.lat) ==  this.pin_position_act.getPosition().lat() || !Number(this.posicion.lng) ==  this.pin_position_act.getPosition().lng()){
                        this.pin_position_act.setPosition({lat: Number(this.posicion.lat), lng: Number(this.posicion.lng) });
                    }
                }
                if(!this.pin_position_usr){
                    this.pin_position_usr = new google.maps.Marker({
                        position: {lat: Number(this.posicion.lat), lng: Number(this.posicion.lng) }, 
                        map: this.map_usuarios,
                        icon: {
                            url: require('../iconos/im.svg'),
                            scaledSize:{height: 40, width: 40}
                        },
                    });
                    this.pin_position_usr.addListener('click', ()=>{ this.infowindow.open(this.map_usuarios, this.pin_position_usr);});
                }
                else{
                    if(!Number(this.posicion.lat) ==  this.pin_position_usr.getPosition().lat() || !Number(this.posicion.lng) ==  this.pin_position_usr.getPosition().lng()){
                        this.pin_position_usr.setPosition({lat: Number(this.posicion.lat), lng: Number(this.posicion.lng) });
                    }
                }
            },
            //proceso para enviar un mensaje a un usuario si no estas dentro del chat
            sendMensaje(usuario){
                this.$store.commit('enviarMensajesByOutside',usuario.id);
            },
            searchPlaces(){
                this.$store.commit('setBusqueda',this.busqueda);
            },
            closeBusqueda(){
                this.activeSearch = false;
                this.busqueda = null;
                this.searchPlaces();
            },
            selectPlace(place){
               this.geocoder.geocode({'address':place, 'region': 'MX'},
                (results, status)=>{
                    if (status == 'OK') {
                    console.log("service", status, results);
                        if(results[0]){
                            this.map.setCenter(results[0].geometry.location);
                            this.map.setZoom(15);
                            this.map_usuarios.setCenter(results[0].geometry.location);
                            this.map_usuarios.setZoom(15);
                        }
                        this.closeBusqueda();
                    }
                });
            }
        }
    }
</script>