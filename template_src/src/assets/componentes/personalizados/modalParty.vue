<template>
<transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster">
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center" v-if="state" @click.self="closeModal()">
        <div class="row w-100 h-100 h-max-94vh pb-4 scroll-y m-0px px-3 " @click.self="closeModal()">
            <div class="row w-100 m-0 mt-5 back-color-blanco pb-3 border-radius-15px overflow-hidden position-relative " >

                <div class="w-auto position-absolute right-5px top-5px z-10000000  " @click="closeModal()">
                    <icono icono="clear" clase="letra-rojo2-40 fw-600" />
                </div>

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 overflow-hidden back-color-fondo">

                        <div class="row w-100 m-0 position-relative ">
                            <div class="row w-100 m-0 h-17vh" v-if="f.evento && f.evento.imagen">
                                <imagen clase="" :create="true" :src="f.evento.imagen" :fit="true" />
                            </div>
                            <div class="row w-100 m-0 h-17vh" v-else>
                                <imagen clase="" :default="1" :fit="true" />
                            </div>
                            <div v-if="f.evento" class="row w-100 m-0 position-absolute top-0px left-0px z-index-10000 ">
                                <div :class="reu?'back-color-verde4':'back-color-amar'" class="col-auto px-3 letra-blanco-15 border-br-radius-15px text-capitalize">
                                    <div class="row w-100 m-0">{{f.evento.type}}</div>
                                    <div class="row w-100 m-0" v-if="debug">#{{f.evento.id}}</div>
                                </div>
                            </div>
                        </div>

                        <template v-if="party">
                            <div class="row w-100 m-0 px-3 py-3 back-color-azul1 ">
                                <div class="col-auto px-0">
                                    <div class="w-20vw h-20vw my-auto  ">
                                        <imagen v-if="f.usuario && f.usuario" clase="border-radius-50" :user="true" :src="f.usuario.foto" :fit="true" />
                                    </div>
                                </div>
                                <div class="col pl-3 pr-0 my-auto">
                                    <div class="row w-100 m-0 letra-blanco-16 justify-content-start ">
                                        <div v-if="f.usuario && f.usuario" class="col-auto px-0 pr-1 fw-600">{{f.usuario.nombre}}</div>
                                        <div class="col-auto px-0">te invito a cooperar</div>
                                    </div>
                                    <div class="row w-100 m-0 letra-blanco-16 justify-content-start ">
                                        <div class="col-auto px-0 pr-1">Para el regalo </div>
                                        <div v-if="f.evento && f.evento" class="col-auto px-0 fw-600">{{f.evento.nombre}}</div>
                                    </div>
                                    <div class="row w-100 m-0 letra-blanco-15 justify-content-start ">
                                        <div class="col-auto px-0">Agregado {{[f.evento.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                                    </div>
                                </div>
                            </div>

                            <template v-if="party">
                                <template v-if="f.evento.para_usuarios_id">
                                    <div class="row w-100 m-0 px-3 py-3 ">
                                        <div class="row w-100 m-0 pb-2 letra-gray3-16">Regalo grupal para:</div>
                                        <div class="row w-100 m-0 pb-1">
                                            <div class="col-auto px-0">
                                                <div class="w-13vw h-13vw my-auto  ">
                                                    <imagen clase="border-radius-50" :src="paraUsuario.foto" :user="true" :fit="true" />
                                                </div>
                                            </div>
                                            <div class="col pl-3 pr-0 my-auto">
                                                <div class="row w-100 m-0 letra-gray4-17 justify-content-start " @click.stop="$store.verPerfil({ id: paraUsuario.id })" >
                                                    <div class="col-auto px-0 fw-600">{{paraUsuario.nombre}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="row w-100 m-0 px-3 py-3 ">
                                        <div class="row w-100 m-0 pb-2 letra-gray3-16">Regalo grupal para:</div>
                                        <div class="row w-100 m-0 ">
                                            <div class="col-auto px-0">
                                                <div class="w-13vw h-13vw my-auto  ">
                                                    <imagen v-if="f.usuario && f.usuario" clase="border-radius-50" :src="f.usuario.foto" :user="true" :fit="true" />
                                                </div>
                                            </div>
                                            <div class="col pl-3 pr-0 my-auto">
                                                <div class="row w-100 m-0 letra-gray4-17 justify-content-start " @click.stop="$store.verPerfil({ id: f.usuario.id })" >
                                                    <div v-if="f.usuario && f.usuario" class="col-auto px-0 fw-600">{{f.usuario.nombre}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </template>


                        </template>

                        <template v-else >
                            <div class="row w-100 m-0 px-3 py-2 border-b-gray01-1">
                                <div class="col-auto px-0 mt-2">
                                    <div class="w-20vw h-20vw my-auto  ">
                                        <imagen v-if="f.usuario && f.usuario" clase="border-radius-50" :user="true" :src="f.usuario.foto" :fit="true" />
                                    </div>
                                </div>

                                <div class="col pl-3 pr-0 my-auto">
                                    <!-- <div class="row w-100 m-0 letra-azul1-22 text-capitalize" v-if="debug">ID #{{f.evento.id}}</div> -->
                                    <div v-if="f.usuario && f.usuario" class="row w-100 m-0 letra-gray4-17">{{f.usuario.nombre}} te invita a la reunion</div>
                                    <div v-if="f.evento && f.evento" class="row w-100 m-0 letra-azul1-17 text-capitalize">{{f.evento.nombre}}</div>
                                    <div v-if="debug"  class="row w-100 m-0" >#{{f.evento.id}}</div>
                                    <div v-if="f.evento && f.evento" class="row w-100 m-0 letra-gray3-16">A las {{[f.evento.hora, 'HH:mm:ss'] | moment('HH:mm [hrs]')}}, el dia {{[f.evento.fecha, 'YYYY-MM-DD'] | moment('DD [de] MMMM [de] YYYY')}}</div>
                                    <div class="row w-100 m-0 letra-azul1-13 justify-content-end">{{[f.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                                    <div v-if="f.evento.lista_id" class="row w-100 m-0 " @click="verDeseosLista()"  >
                                        <div class="col-auto px-0 letra-azul1-16 border-b-azul1-1 ">Ver wishlist de la reunion</div>
                                    </div>
                                </div>
                            </div>
                        </template>

                    </div>

                    <div class="row w-100 m-0 pb-1" >

                        <template v-if="reu" >
                            <div class="row w-100 m-0 px-3 pt-2 pb-2 border-b-gray01-1 back-color-azul1" v-if="a.lugar" @click="togo()">
                                <!-- <div class="row w-100 m-0 letra-gray3-15">Lugar</div> -->
                                <div class="row w-100 m-0">
                                    <div class="row w-100 m-0 px-3">
                                        <div class="w-10vw my-auto">
                                            <imagen :icono="true" src="lub" />
                                        </div>
                                        <div class="col my-auto px-0 pl-3">
                                            <div class="row w-100 m-0 letra-blanco-18">{{a.lugar}}s</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="row w-100 m-0 px-1 pt-2 letra-rojo-15 justify-content-center text-center ">*Recuerda respetar las restricciones vigente en materia de Covid y aségurarte, con una prueba, estar negativo, antes de participar a una reunión.</div> -->
                        </template>

                        <template v-if="reu">
                            <div class="row w-100 m-0 pt-2 px-3 pb-3 border-b-gray01-1" v-if=" f.usuarios && f.usuarios.length ">
                                <div class="row w-100 m-0 pt-2 letra-gray3-15" >
                                    <div class="col-auto px-0 pt-3px">Invitados a la reunion</div>
                                    <div class="col-auto pl-3 px-0" @click="goChat()">
                                        <icono icono="message" clase="letra-azul1-35" />
                                    </div>
                                    <div class="col-auto px-0 mx-auto pt-3px">Invitacion</div>
                                    <div class="col-auto px-1 mx-auto pt-3px pr-3">Pago</div>
                                </div>

                               
                                <div class="row w-100 m-0 ">
                                    <div class="row w-100 m-0 px-1 py-1" v-for="u of f.usuarios" :key="u.id">
                                        <div class="w-8vw h-8vw my-auto" @click.stop="$store.verPerfil({ id: u.usuario.id })">
                                            <imagen v-if="u.usuario" clase="border-radius-50" :src="u.usuario.foto" :fit="true" :user="true" />
                                        </div>
                                        <div class="col my-auto px-0 pl-2" @click.stop="$store.verPerfil({ id: u.usuario.id })">
                                            <div class="row w-100 m-0 letra-gray3-14">{{u.usuario.nombre}}</div>
                                            <!-- <div class="row w-100 m-0 letra-gray3-14">{{u.cobro.estatus}}</div> -->
                                            <!-- <div class="row w-100 m-0 letra-gray3-13">{{u.usuario.email | truncate(30) }}</div> -->
                                        </div>
                                        <div class="w-21 my-auto px-0" >
                                            <div class="row w-100 m-0 letra-azul1-14 text-capitalize text-center justify-content-center ">{{u.estatus}}</div>
                                        </div>
                                        <div class="w-28 my-auto px-0 pl-3" v-if="u.cobro && u.cobro.id" >
                                            <div class="row w-100 m-0 text-capitalize justify-content-center "
                                                 :class="{   'letra-gray3-14': u.cobro.estatus == 'pendiente', 
                                                            'letra-rojo-14': u.cobro.estatus == 'rechazado', 
                                                            'letra-azul1-14': u.cobro.estatus == 'aceptado', 
                                                        }" >{{u.cobro.estatus=='aceptado'?'Pagado':u.cobro.estatus}}</div>
                                        </div>
                                        <div class="w-28 my-auto px-0" v-else>
                                            <div :class="f.evento.cooperacion == 'no'?'letra-verde7-13':'letra-gray3-22'" class="row w-100 m-0 text-center justify-content-center ">
                                                <template v-if="f.evento.cooperacion == 'no'" >El host ya pagó</template>
                                                <template v-else >-</template>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <template v-if="f.evento.cooperacion == 'no'" >
                                <div class="row w-100 m-0 pt-2 pb-1 px-3">
                                    <div class="row w-100 m-0 justify-content-center text-center letra-verde7-15">En esta modalidad que el Host ya pagó, solo deberás aceptar la invitación presencial a la reunion, sin necesidad de tu aportacion de pago.</div>
                                </div>
                            </template>
                            <template v-if="f.evento.cooperacion == 'si'" >
                                <div class="row w-100 m-0 pt-2 pb-1 px-3">
                                    <div class="row w-100 m-0 justify-content-center text-center letra-verde7-15">En esta modalidad de Reunion por cooperación, se comparte entre todos el importe de las amenidades.</div>
                                </div>
                            </template>
                        </template>

                        <template v-else >
                            <div class="row w-100 m-0 border-b-gray01-1" v-if=" f.usuarios && f.usuarios.length ">
                                <div class="row w-100 m-0 px-3 pt-2 letra-blanco-15 back-color-rojo"   >
                                    <div class="col px-0 pt-3px">Invitados al regalo grupal</div>
                                    <div class="col-auto px-0" @click="goChat()">
                                        <icono icono="message" clase="letra-blanco-35" />
                                    </div>
                                </div>
                                <div class="row w-100 m-0 px-3">
                                    <div class="row w-100 m-0 px-1 py-1" v-for="u of f.usuarios" :key="u.id">
                                        <div class="w-8vw h-8vw my-auto" @click.stop="$store.verPerfil({ id: u.usuario.id })" >
                                            <imagen v-if="u.usuario" clase="border-radius-50" :src="u.usuario.foto" :fit="true" :user="true" />
                                        </div>
                                        <div class="col my-auto px-0 pl-2" @click.stop="$store.verPerfil({ id: u.usuario.id })" >
                                            <div class="row w-100 m-0 letra-gray4-14">{{(u.usuario || {}).nombre}}</div>
                                            <!-- <div class="row w-100 m-0 letra-gray3-13">{{u.usuario.email | truncate(30) }}</div> -->
                                        </div>
                                        <div class="col-auto my-auto px-0" v-if="false">
                                            <div class="row w-100 m-0 letra-azul1-16 text-capitalize justify-content-center ">{{u.estatus}}</div>
                                        </div>
                                        <div class="w-28 my-auto px-0" v-if="u.cobro && u.cobro.id" >
                                            <div class="row w-100 m-0 text-capitalize justify-content-center "
                                                 :class="{  'letra-gray3-14': u.cobro.estatus == 'pendiente', 
                                                            'letra-rojo-14':  u.cobro.estatus == 'rechazado', 
                                                            'letra-azul1-14': u.cobro.estatus == 'aceptado', 
                                                        }" >{{u.cobro.estatus=='aceptado'?'Pagado':u.cobro.estatus}}</div>
                                        </div>
                                        <div class="w-28 my-auto px-0" v-else>
                                            <div class="row w-100 m-0 text-capitalize justify-content-center letra-gray3-22">-</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>

                         <template v-if="party" >
                            <div class="row w-100 m-0 pb-3 " v-if=" f.productos && f.productos.length ">
                                <div class="row w-100 m-0 py-2 px-3 letra-blanco-15 back-color-azul1">Productos del regalo</div>
                                <div class="row w-100 m-0 px-3" >
                                    <div class="row w-100 m-0 py-2" v-for="u of f.productos" :key="u.id" @click="goBuy(u)">
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

                                                    <!-- <div class="col my-auto ml-auto px-0 letra-gray3-17 ">{{Number(u.precio) + Number(u.iva) | currency}} {{'MXN'}} x{{u.cantidad}} </div> -->
                                                    <div class="col-auto my-auto ml-auto px-0 letra-azul1-19 fw-600 ">{{u.total | currency}}  {{'MXN'}}</div>
                                                </div>
                                            </template>
                                            <template v-if="1">
                                                <compProdDesgloce :info="f.evento" :data="u" :tipo="3" />
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <template v-if="noVencido">
                                <div class="row w-100 m-0 px-3 py-2 letra-blanco-15 back-color-rojo " v-if=" f.cobro.estatus == 'pendiente' && Number(f.cobro.total) " >
                                    <div class="col-11 px-3 pt-3px justify-content-center text-center mx-auto">Debes pagar antes de las {{[f.evento.expiracion, 'YYYY-MM-DD HH:mm:ss'] | moment('HH:mm [hrs] DD [de] MMMM [del] YYYY') }}</div>
                                </div>
                            </template>
                        </template>

                        <template v-if="reu" >
                            <div class="row w-100 m-0  pt-2 border-b-gray01-1" v-if=" f.gastos && f.gastos.length ">
                                <div class="row w-100 m-0 px-3">
                                    <div class="row w-100 m-0 letra-gray3-15" v-if="a.cooperacion == 'si'" >
                                        <div class="row w-100 m-0" v-if="f.cobro && f.cobro.id">Amenidades para cooperación: </div>
                                        <div class="row w-100 m-0" v-else>Amenidades de la Reunión: </div>
                                    </div>
                                    <div class="row w-100 m-0 letra-gray3-15" v-else >Amenidades: </div>
                                    <div class="row w-100 m-0 pb-2">
                                        <div class="row w-100 m-0 py-3px" v-for="u of f.gastos" :key="u.id">
                                            <div class="row w-100 m-0">
                                                <div class="w-10vw h-10vw">
                                                    <imagen clase="border-radius-5px" :src="u.imagen" :fit="true" />
                                                </div>
                                                <div class="col my-auto px-0 pl-2">
                                                    <div class="row w-100 m-0 letra-gray4-15">{{u.nombre}}</div>
                                                </div>
                                            </div>
                                            <template v-if="a.cooperacion == 'si'" >
                                                <template v-if="0"> 
                                                    <div class="row w-100 m-0" v-if="f.cobro && f.cobro.id" >
                                                        <div class="col-auto my-auto px-0 letra-gray3-16 " v-if="Number(u.iva)">{{Number(u.precio) * 1.16  | currency}} {{'MXN'}} X {{u.cantidad}}</div>
                                                        <div class="col-auto my-auto px-0 letra-gray3-16 " v-else>{{u.precio | currency}} {{'MXN'}} X {{u.cantidad}}</div>
                                                        <!-- <div class="col-auto my-auto px-0 letra-gray3-16 " >{{u.precio | currency}} {{(u.producto || {}).currency}} X {{u.cantidad}}</div> -->
                                                        <div class="col-auto my-auto ml-auto px-0 letra-azul1-18 fw-600 ">{{u.total | currency}}  {{(u.producto || {}).currency}}</div>
                                                    </div>
                                                </template>
                                                <template v-if="1">
                                                    <compProdDesgloce :info="f.evento" :data="u" :tipo="3" />
                                                </template>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="row w-100 m-0" v-if="a.cooperacion == 'si'" >
                                        <div class="row w-100 m-0 border-t-gray1-1" v-if="f.cobro && f.cobro.id" >
                                            <div class="col px-0 letra-gray4-17">Total:</div>
                                            <div class="col-auto px-0 letra-azul1-19 fw-600">{{f.evento.total_gastos | currency}} MXN</div>
                                        </div>
                                    </div>
                                </div>

                                <template v-if="noVencido">

                                    <template v-if="f.cobro.id && f.cobro.estatus == 'pendiente'" >
                                        <div class="row w-100 m-0 mt-2 px-3 py-2 letra-blanco-15 back-color-azul1 " >
                                            <div class="col-11 px-3 py-3px justify-content-center text-center mx-auto">Debes pagar antes de las {{[f.evento.expiracion, 'YYYY-MM-DD HH:mm:ss'] | moment('HH:mm [hrs] DD [de] MMMM [del] YYYY') }}</div>
                                        </div>
                                    </template>
                                    <template v-if=" f.cobro.estatus == 'pendiente' && Number(f.cobro.total) ">
                                        <div class="row w-100 m-0 px-2 pt-2">
                                            <div class="col px-0 letra-gray3-17 justify-content-center text-center ">Confirmar participación en el pago:</div>
                                        </div>
                                        <div class="row w-100 m-0 px-3" >
                                            <div class="row w-100 m-0 pt-2 ">
                                                <div class="w-27 my-auto px-1">
                                                    <botonApp texto="Rechazar" radius="15px" tipo="gris" @click="actulizarCobro(0)" />
                                                </div>
                                                <div class="w-73 my-auto mx-auto px-1">
                                                    <botonApp :texto="`Pagar cooperación por $${ Number(f.cobro.total).toFixed(2) }`" radius="15px" tipo="rojo" @click="actulizarCobro(1)" />
                                                </div>
                                            </div>
                                            <div class="row w-100 m-0 pt-1 pb-3 letra-gray3-14 justify-content-center text-center ">El monto a pagar puede variar dependiendo de cuántos invitados acepten o no la invitación a este pago.</div>
                                        </div>
                                    </template>

                                    <div class="row w-100 m-0 pt-2">
                                        <pagoDeclinadoComponent :dx="f.evento" :cx="f.cobro" />
                                    </div>
                                </template>
                                <template v-else-if="f.cobro.estatus == 'aceptado'" >
                                    <div class="row w-100 m-0 pt-2 pb-3"  >
                                        <div class="row w-100 m-0 px-3 back-color-azul1">
                                            <div class="row w-100 m-0 py-10px letra-blanco-16 justify-content-center text-center ">Haz pagado tu cooperación. Estamos en espera de que el resto de los invitados acepte la cooperación y realice su pago.</div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </template>

                    </div>

                    <div class="row w-100 m-0">
                        

                        <template v-if="party">
                            <template v-if="noVencido">
                                <div class="row w-100 m-0 px-3 pt-1" v-if=" f.cobro.estatus == 'pendiente' && Number(f.cobro.total) ">
                                    <div class="row w-100 m-0 px-2">
                                        <div class="col px-0 letra-gray3-18">Te tocaria pagar: </div>
                                        <div class="col-auto px-0 letra-azul1-20">{{f.cobro.total | currency}} MXN</div>
                                    </div>
                                    <div class="row w-100 m-0 pt-2 ">
                                        <div class="col-6 px-1">
                                            <botonApp texto="Rechazar" radius="15px" tipo="gris" @click="actulizarCobro(0)" />
                                        </div>
                                        <div class="col-6 px-1">
                                            <botonApp texto="Pagar" radius="15px" tipo="azul" @click="actulizarCobro(1)" />
                                        </div>
                                    </div>
                                    <div class="row w-100 m-0 pt-1 pb-3 letra-gray3-14 justify-content-center text-center ">El monto a pagar puede variar dependiendo de cuántos invitados acepten o no la invitación a este pago.</div>
                                </div>

                                <div class="row w-100 m-0 pt-2">
                                    <pagoDeclinadoComponent :dx="f.evento" :cx="f.cobro" />
                                </div>
                                
                            </template>
                            <div class="row w-100 m-0 pt-2 pb-3" v-else-if="f.cobro.estatus == 'aceptado'" >
                                <div class="row w-100 px-3 m-0 back-color-azul1">
                                    <div class="row w-100 m-0 py-10px letra-blanco-17 justify-content-center text-center ">Haz pagado tu cooperación. Estamos en espera de que el resto de los invitados acepte la cooperación y realice su pago.</div>
                                </div>
                            </div>
                        </template>


                        <template v-if="reu">
                            <div class="row w-100 m-0 px-2 pt-1 pb-3"  v-if=" f.estatus == 'enviado' ">
                                <div class="row w-100 m-0 letra-gray3-17 px-2 py-2 pb-3 justify-content-center text-center ">Confirmar la asistencia a la reunión:</div>
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
            name: 'modalParty',
            razon: '',
            calificaion:0,
            form: {
                nombre: null,
                telefono: null,
            },
            hora: moment().format('YYYY-MM-DD HH:mm:ss'),
        };
    },
    props: [
        'data',
    ],
    computed: {
        state() {return this.$store.getters.getModal(this.name)},
        router(){return this.$store.getters.getRouter;},
        debug(){return this.$store.getters.deviceready == false; },

        invitaciones(){return this.$store.getters.userStateArray('invitaciones');},
        f(){return this.invitaciones.find(x=>{return x.id == this.data.id}) || {} },
        a(){return this.f.evento || {} },
        paraUsuario(){return this.f.paraUsuario || {} },
        party(){return this.a.tipo == 'party' },
        reu(){return this.a.tipo == 'reunion' },
        noVencido(){
            console.log("HORARIN", this.hora, this.f.evento.expiracion, this.hora <= this.f.evento.expiracion)
            return this.hora <= this.f.evento.expiracion 
        },
        t(){
            let to = 0;
            this.f.productos.map(x=>{ to = to + ( Number(x.precio) * Number(x.cantidad) )});
            return to;
        },
    },
    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },

        togo(){
            this.$store.dispatch('openBrowser',`https://maps.google.com/?daddr=${this.a.lat},${this.a.lng}&directionsmode=driving`);
        },

        cancelar(){
            this.closeModal();
        },

        goChat(e){
            this.$store.commit('setUsuarioData',['evento', this.f.id ]);
            this.router.navigate('/mensajes_invitaciones');
            this.closeModal();
        },

        next(e){
            this.$store.dispatch('postActulizarSolicitud',[this.f, e]);
            // this.closeModal();
        },

        goBuy(u){
            this.$store.commit('updateCatalogosState',['producto', u.productos_id ]);
            this.$store.commit('setCarritosState',['producto', u.productos_id ]);
            this.router.navigate('/detalle_producto');
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
            if(e==0){
                if(this.party){
                    this.$emit('cancel');
                    this.closeModal();
                    return;
                }
            }
            this.$store.dispatch('postActulizarCobro', [this.a, e]);
        },

        verDeseosLista(){
            console.log("ASASAS");
            this.$store.commit('setUsuarioData', ['detalle',this.f.id]);
            this.router.navigate('/ver_deseos_amigo_reunion');
        },

    },
}
</script>







