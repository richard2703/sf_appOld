<template>
    <f7-page id="mi_cuenta">

    <modal-mensaje
        :texto="`¿Estas seguro de eliminar tu cuenta?`"
        :boton="'Aceptar'"
        @click="borrardo();  "
    />


    <div class="vista">
        <nav-bar tipo="init" :backs="false" :logo="true" :profile="true" :chat="true" />
        <!-- <nav-bar tipo="inicio" :backs="false" :title="'Mi cuenta'" :chat="true" /> -->
        
        <div class="contenedor-page">
            <div class="row m-0 justify-content-center">
                <div class="row w-100 m-0 justify-content-center">
                        <div class="col-12 h-65vw px-0">
                            <imagen clase="object-fit back-color-gray35" :fit="true" :perfil="true" alt="" />
                        </div>
                        <div class="col-12 text-center back-color-gray4">
                            <div class="row m-0 w-100 pt-2 pb-1 letra-blanco-4-6vw fw-800 justify-content-center">{{session.nombre}}</div>
                            <div class="row m-0 w-100 pb-1 letra-blanco-3-5vw justify-content-center">{{session.email}}</div>
                            <div class="row m-0 w-100 pb-2 letra-blanco-4-1vw justify-content-center">Tel. {{session.telefono}}</div>
                        </div>
                </div>
                <div class="row w-100 m-0 back-color-blanco border-b-gray0-1">
                    <div class="row w-100 m-0 px-3 py-2 border-b-gray01-1" @click="goTo('/niveles')">
                        <!-- <div class="col my-auto px-0 letra-gray3-19">Nivel</div> -->
                        <div class="col-auto my-auto px-0">
                            <div class=" border-radius-10px " 
                            :class="`back-color-${session.nivel}`">
                                <div class="row w-100 m-0 px-2 py-2 letra-blanco-20 justify-content-center text-center text-capitalize">{{session.nivel}}</div>
                            </div>
                        </div>
                        <div class="col px-0 my-auto">
                            <div class="row w-100 m-0 letra-gray3-18 justify-content-end">Monedero {{session.monedero | currency}} MXN</div>
                        </div>
                       
                    </div>
                     <div class="col-12  m-0 px-3 py-2 border-b-gray01-1" @click="goTo('/membresias')">
                            <div class=" border-radius-10px " 
                            :class="'back-color-verde2'">
                                <div class="  m-0 px-2 py-2 letra-blanco-20 justify-content-center text-center text-capitalize">Cambio de Membresia</div>
                            </div>
                    </div>
                    <div class="row w-100 m-0 px-3 py-2 border-b-gray01-1" @click="goTo('/historial_puntos')">
                        <div class="col-auto px-0 pr-2">
                            <div class="w-40px">
                                <imagen :icono="true" src="pp" />
                            </div>
                        </div>
                        <div class="col-auto mr-auto my-auto px-0 letra-gray3-19">Puntos</div>
                        <div class="col-auto my-auto ml-auto px-0">
                            <div class="row w-100 m-0 px-2 letra-gray3-20 justify-content-center text-center text-capitalize">{{session.puntos |  currency({
                                                                                                                                                        symbol: '',
                                                                                                                                                        thousandsSeparator: ',',
                                                                                                                                                        fractionCount: '1',
                                                                                                                                                        fractionSeparator: '.',
                                                                                                                                                        symbolPosition: '',
                                                                                                                                                        symbolSpacing: '',
                                                                                                                                                        avoidEmptyDecimals: 0,
                                                                                                                                                        }) }} pts</div>
                        </div>
                    </div>
                    <div class="row w-100 m-0 px-3 py-2 border-b-gray01-1" >
                        <div class="col-auto px-0 pr-2">
                            <div class="w-40px">
                                <imagen :icono="true" src="code" />
                            </div>
                        </div>
                        <div class="col-auto mr-auto my-auto px-0 letra-gray3-19">Codigo de referido</div>
                        <div class="col-auto my-auto ml-auto px-0">
                            <div class="row w-100 m-0 px-2 letra-gray3-20 justify-content-center text-center text-capitalize">{{session.mi_codigo}}</div>
                        </div>
                    </div>
                </div>
                <div class="row w-100 m-0 back-color-blanco">
                <div class="col-12 p-0">

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/editar_perfil')">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="ed" />
                                        </div>
                                    </div>
                                    <div class="col my-auto letra-gray3-15 p-0">Editar perfil</div>
                                    <div class="col-1 p-0">
                                        <img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/ch_left.svg" alt="">
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/lista_domicilios')">
                                <div class="row m-0 w-100 justify-content-between position-relative">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="dd" />
                                        </div>
                                    </div>
                                    <div class="col my-auto letra-gray3-15 p-0">Mis domicilios</div>
                                    <div class="col-1 p-0"><img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/ch_left.svg" alt=""></div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/amigos')">
                                <div class="row m-0 w-100 justify-content-between position-relative">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="aa" />
                                        </div>
                                    </div>
                                    <div class="col my-auto letra-gray3-15 p-0">Mis amigos</div>
                                    <div class="col-1 p-0"><img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/ch_left.svg" alt=""></div>

                                    <div v-if="amigos" class="w-35px h-35px border-radius-50 back-color-azul1 position-absolute top-0px right-30px align-content-center " >
                                        <div class="row w-100 m-0 pt-4px letra-blanco-20 justify-content-center text-center">{{amigos}}</div>
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/amigos_favoritos')">
                                <div class="row m-0 w-100 justify-content-between position-relative">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="vip" />
                                        </div>
                                    </div>
                                    <div class="col my-auto letra-gray3-15 p-0">Personas importantes</div>
                                    <div class="col-1 p-0"><img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/ch_left.svg" alt=""></div>

                                    <!-- <div class="w-35px h-35px border-radius-50 back-color-azul1 position-absolute top-0px right-30px align-content-center " v-if="amigos">
                                        <div class="row w-100 m-0 pt-4px letra-blanco-20 justify-content-center text-center">{{amigos}}</div>
                                    </div> -->
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/solicitudes_amistad')">
                                <div class="row m-0 w-100 justify-content-between position-relative">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="cc" />
                                        </div>
                                    </div>
                                    <div class="col my-auto letra-gray3-15 p-0">Solicitudes de amistad</div>
                                    <div class="col-1 p-0"><img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/ch_left.svg" alt=""></div>

                                    <div v-if="solicitudes" class="w-35px h-35px border-radius-50 back-color-azul1 position-absolute top-0px right-30px align-content-center " >
                                        <div class="row w-100 m-0 pt-4px letra-blanco-20 justify-content-center text-center">{{solicitudes}}</div>
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/metodos_pago')">
                                <div class="row m-0 w-100 justify-content-between position-relative">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="mm" />
                                        </div>
                                    </div>
                                    <div class="col my-auto letra-gray3-15 p-0">Metodos de pago</div>
                                    <div class="col-1 p-0"><img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/ch_left.svg" alt=""></div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/historial_tarjetas_regalo')">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="gift" formato="png" />
                                        </div>
                                    </div>
                                    <div class="col my-auto letra-gray3-15 p-0">Mis tarjetas de regalo</div>
                                    <div class="col-1 p-0"><img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/ch_left.svg" alt=""></div>
                                </div>
                            </button>
                        </div>
                        
                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/mis_fechas')">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="ca" />
                                        </div>
                                    </div>
                                    <div class="col my-auto letra-gray3-15 p-0">Mis fechas</div>
                                    <div class="col-1 p-0"><img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/ch_left.svg" alt=""></div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/misReuniones')">
                                <div class="row m-0 w-100 justify-content-between position-relative">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="rr" />
                                        </div>
                                    </div>
                                    <div class="col my-auto letra-gray3-15 p-0">Mis reuniones</div>
                                    <div class="col-1 p-0"><img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/ch_left.svg" alt=""></div>


                                    <div v-if="reuniones" class="w-35px h-35px border-radius-50 back-color-azul1 position-absolute top-0px right-30px align-content-center " >
                                        <div class="row w-100 m-0 pt-4px letra-blanco-20 justify-content-center text-center">{{reuniones}}</div>
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/misPartys')">
                                <div class="row m-0 w-100 justify-content-between position-relative">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="re" />
                                        </div>
                                    </div>
                                    <div class="col my-auto letra-gray3-15 p-0">Mis regalos grupales</div>
                                    <div class="col-1 p-0"><img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/ch_left.svg" alt=""></div>

                                    <div class="w-35px h-35px border-radius-50 back-color-azul1 position-absolute top-0px right-30px align-content-center " v-if="partys">
                                        <div class="row w-100 m-0 pt-4px letra-blanco-20 justify-content-center text-center">{{partys}}</div>
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/mis_deseos')">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="ww" />
                                        </div>
                                    </div>
                                    <div class="col my-auto letra-gray3-15 p-0">Mis Wishlists</div>
                                    <div class="col-1 p-0"><img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/ch_left.svg" alt=""></div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/historial_compras')">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="com" />
                                        </div>
                                    </div>
                                    <div class="col my-auto letra-gray3-15 p-0">Historial compras</div>
                                    <div class="col-1 p-0"><img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/ch_left.svg" alt=""></div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/servicios_canjear')">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="bb" />
                                        </div>
                                    </div>
                                    <div class="col my-auto letra-gray3-15 p-0">Servicios por canjear</div>
                                    <div class="col-1 p-0"><img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/ch_left.svg" alt=""></div>
                                    
                                    <div class="w-35px h-35px border-radius-50 back-color-azul1 position-absolute top-8px right-45px align-content-center " v-if="serviciosCanjear">
                                        <div class="row w-100 m-0 pt-4px letra-blanco-20 justify-content-center text-center">{{serviciosCanjear}}</div>
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/regalos_amigos')">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="pa" />
                                        </div>
                                    </div>
                                    <div class="col my-auto letra-gray3-14 p-0">Regalos recibidos</div>
                                    <div class="col-1 p-0"><img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/ch_left.svg" alt=""></div>
                                    

                                    <div class="w-35px h-35px border-radius-50 back-color-azul1 position-absolute top-8px right-45px align-content-center " v-if="regalosAmigos">
                                        <div class="row w-100 m-0 pt-4px letra-blanco-20 justify-content-center text-center">{{regalosAmigos}}</div>
                                    </div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1" v-if="session.partner_id" >
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="$store.commit('openEscaner')" >
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="ll" />
                                        </div>
                                    </div>
                                    <div class="col my-auto letra-gray3-15 p-0">Lector de QR</div>
                                    <div class="col-1 p-0"><img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/ch_left.svg" alt=""></div>
                                </div>
                            </button>
                        </div>
                        
                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1" v-if="session.partner_id" >
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="$store.commit('openEscaner', 1)" >
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="lec" formato="png" />
                                        </div>
                                    </div>
                                    <div class="col my-auto letra-gray3-15 p-0">Lector de tarjetas de regalo</div>
                                    <div class="col-1 p-0"><img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/ch_left.svg" alt=""></div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="registra()" >
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="ne" />
                                        </div>
                                    </div>
                                    <div class="col my-auto letra-gray3-15 p-0">Registra tu negocio</div>
                                    <div class="col-1 p-0"><img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/ch_left.svg" alt=""></div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1" v-if="!session.partner_id">
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="goTo('/relacionar_cuenta_partner')">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="settings" />
                                        </div>
                                    </div>
                                    <div class="col my-auto letra-gray3-15 p-0">Relaciona tu negocio a tu cuenta.</div>
                                    <div class="col-1 p-0"><img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/ch_left.svg" alt=""></div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1" >
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="tuto()">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="tuto" />
                                        </div>
                                    </div>
                                    <div class="col my-auto letra-gray3-15 p-0">Tutoriales</div>
                                    <div class="col-1 p-0"><img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/ch_left.svg" alt=""></div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1" >
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="aviso()">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="av1" />
                                        </div>
                                    </div>
                                    <div class="col my-auto letra-gray3-15 p-0">Aviso de privacidad</div>
                                    <div class="col-1 p-0"><img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/ch_left.svg" alt=""></div>
                                </div>
                            </button>
                        </div>

                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="$store.commit('logout', $f7router)">
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="ss" />
                                        </div>
                                    </div>
                                    <div class="col my-auto letra-gray3-15 p-0">Cerrar sesión</div>
                                    <div class="col-1 p-0"><img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/ch_left.svg" alt=""></div>
                                  
                                </div>
                            </button>
                        </div>
                        
                        <div class="row m-0 border-botom-gray border-t-gray-lligth-1 border-b-gray-lligth-1">
                            <button type="button" class="button button-outline button-raised button-active-gray px-3 py-2 text-left" @click="borrar()" >
                                <div class="row m-0 w-100 justify-content-between">
                                    <div class="col-auto px-0 pr-2">
                                        <div class="w-40px">
                                            <imagen :icono="true" src="del" formato="png" />
                                        </div>
                                    </div>
                                    <div class="col my-auto letra-gray3-15 p-0">Eliminar cuenta</div>
                                    <div class="col-1 p-0"><img class="w-100 h-100" src="https://socialflow.app/backend/apiv1/iconos/ch_left.svg" alt=""></div>
                                  
                                </div>
                            </button>
                        </div>
                </div>
                </div>

                <div class="row w-100 m-0 py-2 pt-3 px-2 ">
                    <div class="row w-100 m-0 letra-gray3-15 text-center justify-content-center ">Esta aplicación recoge contactos de tu telefono para habilitar compartir el estatus de tus invitaciones a eventos.</div>
                </div>

                <!-- <div class="row m-0 pt-4 justify-content-center letra-gray4-4-1vw" >V.{{11.03 || session.vr || version}}</div> -->
                <div class="row m-0 pt-2 justify-content-center letra-gray4-4-1vw" >V.{{11.60}}</div>
            </div>
        </div>

        <tabs />

    </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            amigos(){return 0; return this.$store.getters.userStateArray('amigos').filter(x=>{ return x.estatus == 'aceptado' && x.usuarios_id == this.session.id } ).length; },
            solicitudes(){return this.$store.getters.userStateArray('amigos').filter(x=>{ return x.estatus == 'enviado' && x.amigos_id == this.session.id } ).length; },

            prelecturas(){return this.$store.getters.getCatalogo('notificacionesPreLeidasVista') },
            reuniones(){return this.$store.getters.userStateArray('invitaciones').filter( 
                x=>{ return x.evento.tipo == 'reunion' && !this.prelecturas.some(w=>w.valor == x.id && w.vista == 'misReuniones') }).length; },
                
            partys(){return this.$store.getters.userStateArray('invitaciones').filter( 
                x=>{ return x.evento.tipo == 'party' && !this.prelecturas.some(w=>w.valor == x.id && w.vista == 'misPartys')  } ).length; },

            regalosAmigos(){return (this.$store.getters.userStateArray('regalosAmigos').filter(x=>{ 
                return !this.prelecturas.some(w=>w.valor == x.id && w.vista == 'regalos_amigos')  }) || []).length;},
            serviciosCanjear(){return (this.$store.getters.userStateArray('regalosAmigos').filter(w=>w.productos.some(e=>e.tipo_entrega != 'domicilio')).filter(x=>{ 
                return !this.prelecturas.some(w=>w.valor == x.id && w.vista == 'servicios_canjear' )  }) || []).length;},

            version(){return this.$store.getters.syncObj('appApi');},
        },

        mounted(){
            // console.log("reunionesX reunionesX", this.reunionesX);
            this.$store.dispatch('synchronizeData');
        },
        
        methods:{
            goTo(ruta){
                this.router.navigate(ruta);
            },
            registra(){
                this.$store.dispatch('openBrowser', 'https://socialflow.app');
            },
            tuto(){
                this.$store.dispatch('openBrowser', this.session.youtube);
            },
            aviso(){
                this.$store.dispatch('openBrowser', this.session.aviso || 'https://socialflow.app/#/aviso-de-privacidad');
            },
            openBrowser(url){
                this.$store.dispatch('openBrowser',url);
            },
            borrar(){
                this.$store.commit('openM');
            },
            borrardo(){
                this.$store.dispatch('postBorrarPerfil', [this.session, ()=>{
                    this.$store.commit('logout', this.$f7router); 
                    swal("Cuenta eliminada","","success");
                }]);
            },
        }
    }
</script>