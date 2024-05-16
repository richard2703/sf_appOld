<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" v-if="state" @click.self="closeModal()">

        <modalmensajeA v-if="party"
            :texto="`¿Seguro que deseas cancelar el regalo grupal?`"
            :boton="'Si cancelar'"
            colorC="azul"
            colorA="gris"
            :cancelBoton="'No cancelar'"
            @click="eliminar(evento)"
        />
        <modalmensajeA v-if="reu"
            :texto="`¿Seguro que deseas cancelar la reunion?`"
            :boton="'Si cancelar'"
            colorC="azul"
            colorA="gris"
            :cancelBoton="'No cancelar'"
            @click="eliminar(evento)"
        />
        <modalPost 
            v-if="newPost"
            :post="{}"
            @close="newPost = false; closeModal();"
            :evento="evento.id"
            :fn="preparePost"
        />

        <div class="row w-100 h-100 h-max-94vh pb-4 scroll-y m-0px px-3 " @click.self="closeModal()">
            <div class="row w-100 m-0 mt-5 back-color-blanco pb-3 border-radius-15px overflow-hidden position-relative " >

                <div class="w-auto position-absolute left-36 top-0px z-10000000 " v-if="reu" @click="newPost=true" >
                    <div :class="reu?'back-color-verde4':'back-color-amar'" class="row w-100 m-0 py-8px px-8px border-bl-radius-10px border-br-radius-10px " >
                        <icono icono="collections" clase="letra-blanco-35 fw-600" />
                    </div>
                </div>

                <div class="w-auto position-absolute right-0px top-0px z-10000000 " @click="closeModal()">
                    <div :class="reu?'back-color-verde4':'back-color-amar'" class="row w-100 m-0 py-8px px-8px  border-bl-radius-10px " >
                        <icono icono="clear" clase="letra-blanco-35 fw-600" />
                    </div>
                </div>

                <div class="w-auto position-absolute right-56px top-0px z-10000000 " @click=" $store.commit('initEdicionEvento'); closeModal(); " >
                    <div :class="reu?'back-color-verde4':'back-color-amar'"  class="row w-100 m-0 py-8px px-8px border-bl-radius-10px border-br-radius-10px">
                        <icono icono="edit" clase="letra-blanco-35 fw-600" />
                    </div>
                </div>
                
                <div class="w-auto position-absolute right-112px mr-1px top-0px z-10000000 " @click=" $store.commit('openA') " >
                    <div :class="reu?'back-color-verde4':'back-color-amar'" class="row w-100 m-0 py-8px px-8px border-bl-radius-10px border-br-radius-10px">
                        <icono icono="delete" clase="letra-blanco-35 fw-600" />
                    </div>
                </div>

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 overflow-hidden back-color-fondo">

                        <div class="row w-100 m-0 position-relative ">
                            <div class="row w-100 m-0 h-17vh" v-if="evento.imagen">
                                <imagen clase="" :create="true" :src="evento.imagen" :fit="true" />
                            </div>
                            <div class="row w-100 m-0 h-17vh" v-else>
                                <imagen clase="" :default="1" :fit="true" />
                            </div>
                            <div class="row w-100 m-0 position-absolute top-0px left-0px z-index-10000 ">
                                <div :class="reu?'back-color-verde4':'back-color-amar'" class="col-auto px-3 letra-blanco-15 border-br-radius-15px text-capitalize">
                                    <div class="row w-100 m-0">{{evento.type}}</div>
                                    <div class="row w-100 m-0" v-if="debug">#{{evento.id}}</div>
                                </div>
                            </div>
                        </div>

                        <template v-if="party">
                            <div class="row w-100 m-0 px-3 py-3 back-color-azul1 ">
                                <div class="col-auto px-0">
                                    <div class="w-20vw h-20vw my-auto  ">
                                        <imagen clase="border-radius-50" :user="true" :src="usuario.foto" :fit="true" />
                                    </div>
                                </div>
                                <div class="col pl-3 pr-0 my-auto">
                                    <div class="row w-100 m-0 letra-blanco-16 justify-content-start ">
                                        <div class="col-auto px-0">Creaste el regalo grupal</div>
                                    </div>
                                    <div class="row w-100 m-0 letra-blanco-16 justify-content-start ">
                                        <div class="col-auto px-0 fw-600">{{evento.nombre}}</div>
                                    </div>
                                    <div class="row w-100 m-0 letra-blanco-15 justify-content-start ">
                                        <div class="col-auto px-0">Agregado {{[evento.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                                    </div>
                                </div>
                            </div>

                            <div class="row w-100 m-0 px-3 py-3 pb-2">
                                <div class="col-auto px-0">
                                    <div class="w-17vw h-17vw my-auto  ">
                                        <imagen clase="border-radius-50" :user="true" :src="paraUsuario.foto" :fit="true" v-if="evento.para_usuarios_id" />
                                        <imagen clase="border-radius-50" :user="true" :src="null" :fit="true" v-else-if="evento.externo=='si'" />
                                        <imagen clase="border-radius-50" :user="true" :src="usuario.foto" :fit="true" v-else />
                                    </div>
                                </div>
                                <div class="col pl-3 pr-0 my-auto">
                                    <div class="row w-100 m-0 letra-gray4-17 justify-content-start ">
                                        <div class="row w-100 m-0 px-0 pr-1">Regalo grupal para:</div>
                                        <div class="row w-100 m-0 px-0 fw-600" v-if="evento.para_usuarios_id" @click.stop="closeModal(); $store.verPerfil({id:evento.para_usuarios_id})">{{paraUsuario.nombre}}</div>
                                        <div class="row w-100 m-0 px-0 fw-600" v-else-if="evento.externo=='si'">Para un tercero</div>
                                        <div class="row w-100 m-0 px-0 fw-600" v-else>{{usuario.nombre}}</div>
                                    </div>
                                    <div class="row w-100 m-0 letra-gray4-14 justify-content-start ">
                                        <div class="row w-100 m-0 px-0">Total: {{evento.total_regalos | currency }} MXN</div>
                                        <div class="row w-100 m-0 px-0">Cooperación por invitado: {{cobro.total | currency }} MXN</div>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template v-else >
                            <div class="row w-100 m-0 px-3 py-2 border-b-gray01-1">
                                <div class="col-auto px-0 mt-2">
                                    <div class="w-20vw h-20vw my-auto  ">
                                        <imagen clase="border-radius-50" :user="true" :src="usuario.foto" :fit="true" />
                                    </div>
                                </div>
                                <div class="col pl-3 pr-0 my-auto">
                                    <!-- <div class="row w-100 m-0 letra-azul1-22 text-capitalize" v-if="debug">ID #{{f.evento.id}}</div> -->
                                    <div class="row w-100 m-0 letra-gray4-17">Creaste la reunion</div>
                                    <div class="row w-100 m-0 letra-azul1-17 text-capitalize">{{evento.nombre}}</div>
                                    <div class="row w-100 m-0 letra-gray3-16">A las {{[evento.hora, 'HH:mm:ss'] | moment('HH:mm [hrs]')}}, el dia {{[evento.fecha, 'YYYY-MM-DD'] | moment('DD [de] MMMM [de] YYYY')}}</div>
                                    <div class="row w-100 m-0 letra-azul1-13 justify-content-end">{{[evento.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                                    <div class="row w-100 m-0 " @click="verDeseosLista()" v-if="evento.lista_id" >
                                        <div class="col-auto px-0 letra-azul1-16 border-b-azul1-1 ">Ver wishlist de la reunion</div>
                                    </div>
                                </div>
                            </div>
                        </template>

                    </div>

                    <div class="row w-100 m-0 pb-1" >

                        <template v-if="reu" >
                            <div class="row w-100 m-0 px-3 pt-2 pb-2 border-b-gray01-1 back-color-azul1" v-if="evento.lugar" @click="togo()">
                                <!-- <div class="row w-100 m-0 letra-gray3-15">Lugar</div> -->
                                <div class="row w-100 m-0">
                                    <div class="row w-100 m-0 px-3">
                                        <div class="w-10vw my-auto">
                                            <imagen :icono="true" src="lub" />
                                        </div>
                                        <div class="col my-auto px-0 pl-3">
                                            <div class="row w-100 m-0 letra-blanco-18">{{evento.lugar}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="row w-100 m-0 px-1 pt-2 letra-rojo-15 justify-content-center text-center ">*Recuerda respetar las restricciones vigente en materia de Covid y aségurarte, con una prueba, estar negativo, antes de participar a una reunión.</div> -->
                        </template>

                        <template v-if="reu">
                            <div class="row w-100 m-0 pt-2 px-3 pb-3 border-b-gray01-1" v-if=" usuarios && usuarios.length ">
                                <div class="row w-100 m-0 pt-2 letra-gray3-15" >
                                    <div class="col px-0 pt-3px">Invitados a la reunion</div>
                                    <div class="col-auto px-0" @click="goChat()">
                                        <icono icono="message" clase="letra-azul1-35" />
                                    </div>
                                </div>

                                <div class="row w-100 m-0">
                                    <div class="w-23 ml-auto">
                                        <div class="row w-100 m-0 letra-azul1-14 justify-content-center text-center">Invitación</div>
                                    </div>
                                    <div class="w-28">
                                        <div class="row w-100 m-0 letra-azul1-14 justify-content-center text-center">Cooperación</div>
                                    </div>
                                </div>

                                <div class="row w-100 m-0 ">
                                    <div class="row w-100 m-0 px-1 py-1" v-for="u of usuarios" :key="u.id">
                                        <div class="w-8vw h-8vw my-auto" @click.stop="closeModal(); $store.verPerfil({id: u.usuario.id})" >
                                            <imagen clase="border-radius-50" :src="u.usuario.foto" :fit="true" :user="true" />
                                        </div>
                                        <div class="col my-auto px-0 pl-2" @click.stop="closeModal();  $store.verPerfil({id: u.usuario.id})">
                                            <div class="row w-100 m-0 letra-gray4-15">{{u.usuario.nombre}}</div>
                                            <!-- <div class="row w-100 m-0 letra-gray3-13">{{u.usuario.email | truncate(30) }}</div> -->
                                        </div>
                                        <div class="w-23 my-auto px-0">
                                            <div class="row w-100 m-0  text-capitalize justify-content-center "
                                                 :class="{  'letra-gray3-14':  u.estatus == 'enviado', 
                                                            'letra-rojo-14':   u.estatus == 'rechazado', 
                                                            'letra-azul1-14':  u.estatus == 'aceptado', 
                                                        }" >{{u.estatus}}</div>
                                        </div>
                                        <div class="w-28 my-auto px-0" v-if="u.cobro.id" >
                                            <div class="row w-100 m-0 text-capitalize justify-content-center "
                                                 :class="{  'letra-gray3-14': u.cobro.estatus == 'pendiente', 
                                                            'letra-rojo-14':  u.cobro.estatus == 'rechazado', 
                                                            'letra-azul1-14': u.cobro.estatus == 'aceptado', 
                                                        }" >{{u.cobro.estatus}}</div>
                                        </div>
                                        <div class="w-28 my-auto px-0" v-else>
                                            <div class="row w-100 m-0 text-capitalize justify-content-center letra-gray3-22">-</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template v-else >
                            <div class="row w-100 m-0 pt-2 border-b-gray01-1" v-if=" usuarios && usuarios.length ">
                                <div class="row w-100 m-0 px-3 pt-2 letra-blanco-15 back-color-azul1"   >
                                    <div class="col px-0 pt-3px">Invitados al regalo grupal</div>
                                    <div class="col-auto px-0" @click="goChat()">
                                        <icono icono="message" clase="letra-blanco-35" />
                                    </div>
                                </div>
                                <div class="row w-100 m-0 px-3">
                                    <div class="row w-100 m-0 px-1 py-1" v-for="u of usuarios" :key="u.id">
                                        <div class="w-8vw h-8vw my-auto" @click.stop="closeModal(); $store.verPerfil({id:u.usuario.id})">
                                            <imagen clase="border-radius-50" :src="u.usuario.foto" :fit="true" :user="true" />
                                        </div>
                                        <div class="col my-auto px-0 pl-2" @click.stop="closeModal(); $store.verPerfil({id:u.usuario.id})">
                                            <div class="row w-100 m-0 letra-gray4-15">{{u.usuario.nombre}} {{u.usuario.id == session.id?'(yo)':''}}</div>
                                            <!-- <div class="row w-100 m-0 letra-gray3-13">{{u.usuario.email | truncate(30) }}</div> -->
                                        </div>
                                        <div class="w-28 my-auto px-0" v-if="u.cobro.id" >
                                            <div class="row w-100 m-0 text-capitalize justify-content-center "
                                                 :class="{  'letra-gray3-14': u.cobro.estatus == 'pendiente', 
                                                            'letra-rojo-14':  u.cobro.estatus == 'rechazado', 
                                                            'letra-azul1-14': u.cobro.estatus == 'aceptado', 
                                                        }" >{{u.cobro.estatus}}</div>
                                        </div>
                                        <div class="w-28 my-auto px-0" v-else>
                                            <div class="row w-100 m-0 text-capitalize justify-content-center letra-gray3-22">-</div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </template>

                        <template v-if="party" >
                            <div class="row w-100 m-0 pb-3 " v-if=" productos && productos.length ">
                                <div class="row w-100 m-0 py-2 px-3 letra-blanco-15 back-color-azul1">Productos del regalo</div>
                                <div class="row w-100 m-0 px-3" >
                                    <div class="row w-100 m-0 py-2" v-for="u of productos" :key="u.id" @click="goBuy(u)">
                                        <div class="row w-100 m-0">
                                            <div class="row w-100 m-0">
                                                <div class="w-10vw h-10vw">
                                                    <imagen clase="border-radius-50" :src="u.imagen" :fit="true" />
                                                </div>
                                                <div class="col my-auto px-0 pl-2">
                                                    <div class="row w-100 m-0 letra-gray4-15">{{u.nombre | truncate(150)}}</div>
                                                </div>
                                            </div>
                                            <div class="row w-100 m-0">
                                                <template v-if="0">
                                                    <div class="row w-100 m-0">
                                                        <div class="col-auto my-auto px-0 letra-gray3-16 " v-if="Number(u.iva)">{{Number(u.precio) * 1.16  | currency}} {{'MXN'}} X {{u.cantidad}}</div>
                                                        <div class="col-auto my-auto px-0 letra-gray3-16 " v-else>{{u.precio | currency}} {{'MXN'}} X {{u.cantidad}}</div>
                                                        <div class="col-auto my-auto ml-auto px-0 letra-azul1-19 fw-600 ">{{u.total | currency}}  {{'MXN'}}</div>
                                                    </div>
                                                </template>
                                                <template v-if="1">
                                                    <compProdDesgloce :info="evento" :data="u" :tipo="3" />
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <template v-if="evento.externo == 'si'">
                                <template v-if="cobro.estatus != 'aceptado'" >
                                    <template v-if="noVencido">
                                        <div class="row w-100 m-0 px-3 py-2 letra-blanco-15 back-color-rojo "   >
                                            <div class="col-11 px-3 pt-0px justify-content-center text-center mx-auto">Debes pagar antes de las {{[evento.expiracion, 'YYYY-MM-DD HH:mm:ss'] | moment('HH:mm [hrs] DD [de] MMMM [del] YYYY') }}</div>
                                        </div>
                                    </template>
                                </template>
                            </template>
                        </template>

                        <template v-if="reu" >
                            <div class="row w-100 m-0  pt-2 border-b-gray01-1" v-if=" gastos && gastos.length ">
                                <div class="row w-100 m-0 px-3">
                                    <div class="row w-100 m-0 letra-gray3-15" v-if="evento.cooperacion == 'si'" >Amenidades para cooperación: </div>
                                    <div class="row w-100 m-0 letra-gray3-15" v-else >Amenidades: </div>
                                    <div class="row w-100 m-0">
                                        <div class="row w-100 m-0 py-3px" v-for="u of gastos" :key="u.id">
                                            <div class="row w-100 m-0">
                                                <div class="w-10vw h-10vw">
                                                    <imagen clase="border-radius-5px" :src="u.imagen" :fit="true" />
                                                </div>
                                                <div class="col my-auto px-0 pl-2">
                                                    <div class="row w-100 m-0 letra-gray4-15">{{u.nombre}}</div>
                                                </div>
                                            </div>
                                            <div class="row w-100 m-0" v-if="evento.cooperacion == 'si'">
                                                <template v-if="0" >
                                                    <div class="col-auto my-auto px-0 letra-gray3-16 " v-if="Number(u.iva)">{{Number(u.precio) * 1.16  | currency}} {{'MXN'}} X {{u.cantidad}}</div>
                                                    <div class="col-auto my-auto px-0 letra-gray3-16 " v-else>{{u.precio | currency}} {{'MXN'}} X {{u.cantidad}}</div>
                                                    <div class="col-auto my-auto ml-auto px-0 letra-azul1-18 fw-600 ">{{u.total | currency}}  {{'MXN'}}</div>
                                                </template>
                                                <template v-if="1">
                                                    <compProdDesgloce :info="evento" :data="u" :tipo="3" />
                                                </template>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row w-100 m-0" v-if="evento.cooperacion == 'si'" >
                                        <div class="row w-100 m-0 pb-3 border-t-gray0-3">
                                            <div class="col px-0 letra-gray4-17">Total:</div>
                                            <div class="col-auto px-0 letra-azul1-19 fw-600">{{evento.total_gastos | currency}} MXN</div>
                                        </div>
                                    </div>
                                    
                                </div>

                                <template v-if="noVencido">
                                    <div class="row w-100 m-0 mt-2 px-3 py-2 letra-blanco-15 back-color-azul1 " v-if="cobro.estatus != 'aceptado'">
                                        <div class="col-11 px-3 pt-0px justify-content-center text-center mx-auto">Debes pagar antes de las {{[evento.expiracion, 'YYYY-MM-DD HH:mm:ss'] | moment('HH:mm [hrs] DD [de] MMMM [del] YYYY') }}</div>
                                    </div>

                                    <div class="row w-100 m-0" v-if=" cobro.estatus == 'pendiente' && Number(cobro.total) ">
                                        <div class="row w-100 m-0 pt-2 pb-3">
                                            <div class="col-12 mx-auto px-1">
                                                <botonApp :texto="`Pagar cooperación por $${ Number(cobro.total).toFixed(2) }`" radius="15px" tipo="rojo" @click="actulizarCobro(1)" />
                                            </div>
                                        </div>
                                    </div>

                                   <pagoDeclinadoComponent :dx="evento" :cx="cobro" />
                                </template>

                                <div class="row w-100 m-0 mt-2" v-else-if="cobro.estatus == 'aceptado'" >
                                    <div class="row w-100 m-0 px-2 back-color-azul1" v-if="evento.cooperacion == 'si'">
                                        <div class="row w-100 m-0 px-3 py-2 letra-blanco-16 justify-content-center text-center">Haz pagado tu cooperación. Estamos en espera de que el resto de los invitados acepte la cooperación y realice su pago.</div>
                                    </div>
                                    <div class="row w-100 m-0 px-2 back-color-azul1" v-if="evento.cooperacion == 'no'">
                                        <div class="row w-100 m-0 px-3 py-2 letra-blanco-16 justify-content-center text-center">El pago de las amenidades de la reunion, fue completado correctamente, gracias.</div>
                                    </div>
                                </div>

                            </div>
                        </template>

                    </div>

                    <div class="row w-100 m-0">

                        <template v-if="party">
                            <template v-if="evento.externo == 'si'">
                                <template v-if="noVencido">
                                    <div class="row w-100 m-0 px-3 pt-1" v-if=" cobro.estatus == 'pendiente' && Number(cobro.total) ">
                                        <div class="row w-100 m-0 px-2">
                                            <div class="col px-0 letra-gray3-18">Te tocaria pagar: </div>
                                            <div class="col-auto px-0 letra-azul1-20">{{cobro.total | currency}} MXN</div>
                                        </div>
                                        <div class="row w-100 m-0 pt-2 pb-3">
                                            <div class="col-6 px-1">
                                                <botonApp texto="Rechazar" radius="15px" tipo="gris" @click="actulizarCobro(0)" />
                                            </div>
                                            <div class="col-6 px-1">
                                                <botonApp texto="Pagar" radius="15px" tipo="azul" @click="actulizarCobro(1)" />
                                            </div>
                                        </div>
                                    </div>

                                    <pagoDeclinadoComponent :dx="evento" :cx="cobro" />
                                    
                                </template>

                                <div class="row w-100 m-0" v-else-if="cobro.estatus == 'aceptado'" >
                                    <div class="row w-100 m-0 px-2 back-color-azul1">
                                        <div class="row w-100 m-0 px-3 py-2 letra-blanco-16 justify-content-center text-center">Haz pagado tu cooperación. Estamos en espera de que el resto de los invitados acepte la cooperación y realice su pago.</div>
                                    </div>
                                </div>
                            </template>
                        </template>


                        <template v-if="reu">
                            <div class="row w-100 m-0 px-2 pt-1 pb-3"  v-if="evento.estatus == 'enviado' ">
                                <div class="row w-100 m-0 letra-gray3-16 px-2 py-2">Responde a la invitación:</div>
                                <div class="row w-100 m-0">
                                    <div class="col-6 px-1">
                                        <botonApp texto="Rechazar" radius="15px" tipo="gris" @click="next('rechazado')" />
                                    </div>
                                    <div class="col-6 px-1">
                                        <botonApp texto="Aceptar" radius="15px" tipo="azul" @click="next('aceptado')" />
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template v-if="evento.estatus_cobros == 'rechazados'">
                            <div class="row w-100 m-0 px-3 py-2">
                                <div class="row w-100 m-0 letra-rojo-18 justify-content-center text-center" v-if="party">*El cobro del regalo grupal fue fallido, no se pudo completar</div>
                                <div class="row w-100 m-0 letra-rojo-18 justify-content-center text-center" v-else>*La cooperación para la reunion fue fallida, no se pudo completar</div>
                            </div>
                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0 px-3">
                                    <div class="row w-100 m-0 px-1 py-1" v-for="u of cobros" :key="u.id" >

                                        <div class="row w-100 m-0">
                                            <div class="w-8vw h-8vw my-auto" @click.stop="closeModal(); $store.verPerfil({id:u.usuario.id})">
                                                <imagen clase="border-radius-50" :src="u.usuario.foto" :fit="true" :user="true" />
                                            </div>
                                            <div class="col my-auto px-0 pl-2" @click.stop="closeModal(); $store.verPerfil({id:u.usuario.id})">
                                                <div class="row w-100 m-0 letra-gray4-15">{{u.usuario.nombre}} {{u.usuario.id == session.id?'(yo)':''}}</div>
                                                <!-- <div class="row w-100 m-0 letra-gray3-13">{{u.usuario.email | truncate(30) }}</div> -->
                                            </div>
                                            <div class="w-28 my-auto px-0">
                                                <div class="row w-100 m-0 text-capitalize justify-content-center text-center "
                                                    :class="{   'letra-gray3-14': u.estatus_cobro == 'pendiente', 
                                                                'letra-rojo-14': u.estatus_cobro == 'errorcobro', 
                                                                'letra-verde4-14': u.estatus_cobro == 'aceptado', 
                                                            }" >{{ u.estatus_cobro=='errorcobro'?'Pago rechazado':u.estatus_cobro }}</div>
                                            </div>
                                        </div>

                                        <template v-if="0" >
                                            <div class="row w-100 m-0 pr-3" v-if="u.estatus_cobro == 'errorcobro'">
                                                <div class="row w-100 m-0 letra-rojo-14 justify-content-end text-end" v-if="u.mensaje=='Your card was declined.'">*Metodo de pago declinado</div>
                                                <div class="row w-100 m-0 letra-rojo-14 justify-content-end text-end" v-else>*{{u.mensaje}}</div>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template v-if="party">
                            <div class="row w-100 m-0 px-2 pt-1 pb-3"  v-if="!evento.domicilios_id ">
                                <div class="row w-100 m-0 letra-gray3-16 px-2 py-2 justify-content-center text-center ">Se enviara un qr en el momento que todos los invitados realicen su cooperación.</div>
                            </div>
                            <div class="row w-100 m-0 px-2 pb-3"  v-else >
                                <div class="row w-100 m-0 letra-gray3-16 px-2 pt-2 ">Dirección de entrega:</div>
                                <div class="row w-100 m-0 letra-azul1-16 px-2 pb-2 ">{{evento.lugar}}</div>
                            </div>
                        </template>

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
    props: [],
    data(){
        return {
            name: 'modalEventoCreador',
            newPost: false,
            hora: moment().format('YYYY-MM-DD HH:mm:ss'),
        };
    },

    computed: {
        state() {return this.$store.getters.getModal(this.name)},
        router(){return this.$store.getters.getRouter;},
        session(){return this.$store.getters.getSession;},
        debug(){return this.$store.getters.deviceready == false; },

        evento(){return this.$store.getters.userStateFind('misEventos','evento'); },
        party(){return this.evento.tipo == 'party' },
        reu(){return this.evento.tipo == 'reunion' },

        noVencido(){
            console.log("HORARIN", this.hora, this.evento.expiracion, this.hora <= this.evento.expiracion)
            return this.hora <= this.evento.expiracion
        },

        usuario(){return this.evento.usuario || {} },
        paraUsuario(){return this.evento.paraUsuario || {} },
        cobro(){return this.evento.miCobro || {} },
        usuarios(){return this.evento.usuarios || [] },
        productos(){return this.evento.productos || [] },
        gastos(){return this.evento.gastos || [] },
        cobros(){return this.evento.cobrado || [] },

        usuariosForm(){return this.$store.getters.userStateArray('usuariosForm');},
    },

    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },

        verDeseosLista(){
            this.closeModal();
            this.router.navigate('/ver_lista_evento');
        },

        eliminar(a){
            this.closeModal();
            this.$store.dispatch('postEliminarEvento',a);
        },

        togo(){
            this.$store.dispatch('openBrowser',`https://maps.google.com/?daddr=${this.evento.lat},${this.evento.lng}&directionsmode=driving`);
        },

        cancelar(){
            this.closeModal();
        },

        goChat(e){
            this.closeModal();
            this.router.navigate('/mensajes_grupo');
        },

        next(e){
            this.$store.dispatch('postActulizarSolicitud',[this.f, e]);
            this.closeModal();
        },

        goBuy(u){
            this.$store.commit('updateCatalogosState',['producto', u.productos_id ]);
            this.$store.commit('setCarritosState',['producto', u.productos_id ]);
            this.router.navigate('/detalle_producto');
        },
        
        preparePost(){
            console.log("this", this.usuarios);
            this.usuarios.map(x=>{
                this.$store.commit('addUser',x.usuario);
            });
        },

        pagar(e){
            let p = {
                id: this.f.evento.id,
                // imagen: 'https://socialflow.app/backend/apiv1/imagenes/rr.jpeg',
                nombre: `Coopera para el ${this.f.evento.type}: ${this.f.evento.nombre}`,
                precio: this.f.cobro.total,
                total: this.f.cobro.total,
                eventos_id: this.f.evento.id,
                currency: 'MXN',
                type: 'coopera',
            };

            if(this.f.evento.imagen){
                p.imagen = this.$store.getters.urlImagen(this.f.evento.imagen);
            }
            
            this.$store.commit('cleanCarrito');
            this.$store.commit('addProductoCarrito', p );
            this.$store.commit('setCarritosState',['eventos_id', this.f.evento.id]);
            this.router.navigate('/carrito');
        },

        actulizarCobro(e){
            this.$store.dispatch('postActulizarCobro', [this.evento, e]);
        },
    },
}
</script>







