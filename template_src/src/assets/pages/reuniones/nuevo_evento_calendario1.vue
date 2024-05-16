<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Agrega evento'"/>
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 mt-3">
                    <div class="row w-100 m-0 px-3">

                        <div class="col-12 text-center pt-2 position-relative">
                            <div class="w-30vw h-30vw mx-auto border-radius-30px border-blanco-3 overflow-hidden position-relative">
                                <!-- <uploadImagen class="back-color-azul1" :user="false" :imagen="form.imagen" :create="true" v-model="form.imagen" /> -->
                                <uploadImagen class="back-color-azul1" :user="false" :create="true" v-model="form.imagen" />
                            </div>
                            <div class="row w-100 m-0 letra-gray3-15 text-center justify-content-center">Agrega una imagen para el evento (opcional).</div>
                        </div>
                        <div class="col-12 mt-4">
                            <selectForm type="text" texto="Tipo de evento:" :opciones="tipo" v-model="form.tipo" />
                        </div>
                        <div class="col-12 pt-3 mt-4">
                            <inputForm :scroll="true" :offset="50" type="text" :texto="`Nombre ${form.tipo=='party'?'del regalo grupal':'de la reunion'}:`" placeholder="" v-model="form.nombre" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="date" texto="Fecha:" placeholder="" v-model="form.fecha" :maxlength="50" />
                        </div>
                       

                        <template v-if="form.tipo == 'party'">
                            <div class="row w-100 m-0 px-3 pt-2" >
                                <div class="col-12 px-0 pt-2">
                                    <div class="row w-100 m-0">
                                        <div class="col px-0" @click="form.externo = 'no'">
                                            <div class="row w-100 m-0">
                                                <div class="col-auto my-auto px-0">
                                                    <icono icono="radio_button_checked" clase="letra-azul-30" v-if="form.externo == 'no'" />
                                                    <icono icono="radio_button_unchecked" clase="letra-gray3-30" v-else  />
                                                </div>
                                                <div class="col my-auto px-0 pl-2 letra-gray3-16 pb-7px">Para mi</div>
                                            </div>
                                        </div>
                                        <div class="col px-0" @click="form.externo = 'si'">
                                            <div class="row w-100 m-0">
                                                <div class="col-auto my-auto px-0">
                                                    <icono icono="radio_button_checked" clase="letra-azul-30" v-if="form.externo == 'si'" />
                                                    <icono icono="radio_button_unchecked" clase="letra-gray3-30" v-else  />
                                                </div>
                                                <div class="col my-auto px-0 pl-2 letra-gray3-16 pb-7px">Para alguien mas</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row w-100 m-0 px-3" v-if="form.externo == 'si'" >
                                <div class="row w-100 m-0">
                                    <div class="row w-100 m-0 mt-2 border-b-gray0-1 border-t-gray0-1 " v-if="!nuevoEventoForm.para_usuarios_id" @click="updating('/selecionar_usuario_evento')" >
                                        <div class="row w-100 m-0 py-1">
                                            <div class="col my-auto px-0 letra-gray3-18">Si el destinatario de esta Party es usuario Social Flow agregalo aqui.</div>
                                            <div class="col-auto my-auto px-0">
                                                <icono icono="chevron_right" clase="letra-gray3-35 pt-5px" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row w-100 m-0 mt-2 border-b-gray0-1 border-t-gray0-1 " v-else @click="updating('/selecionar_usuario_evento')" >
                                        <div class="row w-100 m-0 py-1">
                                            <div class="w-15vw h-15vw">
                                                <imagen clase="border-radius-50" :src="usuario.foto" :fit="true" :user="true" />
                                            </div>
                                            <div class="col my-auto px-0 pl-2">
                                                <div class="row w-100 m-0 letra-gray4-18">{{usuario.nombre}}</div>
                                                <div class="row w-100 m-0 letra-gray3-16">{{usuario.email | truncate('30') }}</div>
                                                <div class="row w-100 m-0 pt-2 letra-azul1-16 justify-content-center" @click.stop="ver()" >Ver wishlist</div>
                                            </div>
                                            <div class="col-auto my-auto px-0" @click.stop="form.para_usuarios_id = null; updating(null);">
                                                <icono icono="cancel" clase="letra-azul1-35 pt-5px" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <div class="col-12 mt-4 pt-3">

                            <div class="row w-100 m-0 border-b-gray1-1"  @click="updating('/agregar_usuarios_eventos')">
                                <div class="col px-0 letra-gray3-18">Agregar amigos</div>
                                <div class="col-auto px-0 letra-gray3-18">
                                    <icono icono="add" clase="letra-gray3-25" />
                                </div>
                            </div>

                            <div class="row w-100 m-0 pb-3">
                                <div class="row w-100 m-0" v-for="a of usuariosForm" :key="a.id">
                                    <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1">
                                        <div class="row w-100 m-0">
                                            <div class="w-10vw h-10vw">
                                                <imagen clase="border-radius-50" :src="a.foto" :fit="true" :user="true" />
                                            </div>
                                            <div class="col px-0 pl-2">
                                                <div class="row w-100 m-0 letra-gray4-18">{{a.nombre}}</div>
                                                <!-- <div class="row w-100 m-0 letra-gray3-16">{{a.email | truncate(25) }}</div> -->
                                            </div>
                                        </div>
                                        <div class="row w-100 m-0">
                                            <div class="col-auto my-auto px-0 ml-auto " v-if="form.tipo=='reunion'" >
                                                <div class="row w-100 m-0">
                                                    <div class="row w-100 m-0 letra-gray3-10 justify-content-center text-center">Es para</div>
                                                    <div class="row w-100 m-0">
                                                        <boton-icono @click="a.propio = false" :noborder="true" icono="check_box" v-if="a.propio" />
                                                        <boton-icono @click="a.propio = true" :noborder="true" icono="check_box_outline_blank" v-else />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-auto my-auto px-0 " v-if="form.tipo=='reunion'" >
                                                <div class="row w-100 m-0">
                                                    <div class="row w-100 m-0 letra-gray3-10 justify-content-center text-center">Cooperación</div>
                                                    <div class="row w-100 m-0">
                                                        <boton-icono @click="a.cooperar = false" :noborder="true" icono="check_box" v-if="a.cooperar" />
                                                        <boton-icono @click="a.cooperar = true" :noborder="true" icono="check_box_outline_blank" v-else />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-auto my-auto px-0 ">
                                                <icono @click="eliminar(a)" clase="letra-gray3-30 pt-3" icono="remove" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 mt-4 pt-3" >
                            <div class="row w-100 m-0 border-b-gray1-1" @click="addX">
                                <div class="col-12 px-0 letra-gray4-19" v-if="form.externo == 'no'">Regalos:</div>
                                <div class="col-12 px-0 letra-gray4-19 justify-content-start" v-else >
                                    <!-- <div class="col px-0" v-if="form.tipo == 'party'" >Wishlist para regalos.</div> -->
                                </div>
                                <div class="col px-0 letra-gray3-16">Agregar Productos, Servicios y Experiencias.</div>
                                <div class="col-auto px-0 letra-gray3-18" @click.stop="addX">
                                    <icono icono="add" clase="letra-gray3-25" />
                                </div>
                            </div>
                            
                            <div class="row w-100 m-0 pb-3">
                                <div class="row w-100 m-0" v-for="a of regalosForm.filter(x=>{return x.serie == 'lista'})" :key="a.id">
                                    <div class="row w-100 m-0 px-2 py-1 ">
                                         <div class="w-10vw h-10vw">
                                            <imagen :fit="true" clase="border-radius-10px" :src="a.imagen" />
                                        </div>
                                        <div class="col my-auto px-0 pl-2">
                                            <div class="row w-100 m-0 letra-gray4-14">{{a.nombre}}</div>
                                        </div>
                                    </div>
                                    <div class="row w-100 m-0 py-1 ">
                                        <div class="col-auto my-auto px-1 back-color-azul1 border-radius-5px" v-if="a.cantidad > 1" @click="a.cantidad>1?a.cantidad -= 1:a.cantidad = a.cantidad">
                                            <icono icono="remove" clase="letra-blanco-20 pt-4px" />
                                        </div>
                                        <div class="col-auto my-auto px-1 back-color-azul1 border-radius-5px" v-else @click="eliminarProd(a)">
                                            <icono icono="remove" clase="letra-blanco-20 pt-4px" />
                                        </div>
                                        <div class="col-2 my-auto px-0">
                                            <div class="row w-100 m-0 letra-azul1-25 text-center justify-content-center">{{a.cantidad}}</div>
                                        </div>
                                        <div class="col-auto my-auto px-1 back-color-azul1 border-radius-5px" @click="a.cantidad += 1">
                                            <icono icono="add" clase="letra-blanco-20 pt-4px" />
                                        </div>
                                        <div class="col-auto my-auto px-0 pl-2">
                                            <div class="row w-100 m-0 letra-gray4-15 justify-content-end">{{a.precio | currency}} {{a.currency}}</div>
                                        </div>
                                        <div class="col my-auto px-0 pl-2">
                                            <div class="row w-100 m-0 letra-gray4-15 justify-content-end">{{a.precio * a.cantidad | currency}} {{a.currency}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <template v-if=" (form.tipo == 'party' && form.externo == 'no') || form.tipo == 'reunion' ">
                                <div class="row w-100 m-0 py-2 border-b-gray1-1" @click="addY">
                                    <div class="col my-auto px-0 letra-gray3-18">Seleccionar de mis wishlist existentes.</div>
                                    <!-- <div class="col px-0 letra-gray3-16">Agregar Productos, Servicios y Experiencias.</div> -->
                                    <div class="col-auto my-auto px-0 letra-gray3-18">
                                        <icono icono="add" clase="letra-gray3-25 pt-6px" />
                                    </div>
                                </div>
                                <div class="row w-100 m-0 pb-3">
                                    <div class="row w-100 m-0" v-for="a of regalosForm.filter(x=>{return x.serie == 'wish'})" :key="a.id">
                                        <div class="row w-100 m-0 px-2 py-1 ">
                                            <div class="w-10vw h-10vw">
                                                <imagen :fit="true" clase="border-radius-10px" :src="a.imagen" />
                                            </div>
                                            <div class="col my-auto px-0 pl-2">
                                                <div class="row w-100 m-0 letra-gray4-14">{{a.nombre}}</div>
                                            </div>
                                        </div>
                                        <div class="row w-100 m-0 py-1 ">
                                            <div class="col-auto my-auto px-1 back-color-azul1 border-radius-5px" v-if="a.cantidad > 1" @click="a.cantidad>1?a.cantidad -= 1:a.cantidad = a.cantidad">
                                                <icono icono="remove" clase="letra-blanco-20 pt-4px" />
                                            </div>
                                            <div class="col-auto my-auto px-1 back-color-azul1 border-radius-5px" v-else @click="eliminarProd(a)">
                                                <icono icono="remove" clase="letra-blanco-20 pt-4px" />
                                            </div>
                                            <div class="col-2 my-auto px-0">
                                                <div class="row w-100 m-0 letra-azul1-25 text-center justify-content-center">{{a.cantidad}}</div>
                                            </div>
                                            <div class="col-auto my-auto px-1 back-color-azul1 border-radius-5px" @click="a.cantidad += 1">
                                                <icono icono="add" clase="letra-blanco-20 pt-4px" />
                                            </div>
                                            <div class="col-auto my-auto px-0 pl-2">
                                                <div class="row w-100 m-0 letra-gray4-15 justify-content-end">{{a.precio | currency}} {{a.currency}}</div>
                                            </div>
                                            <div class="col my-auto px-0 pl-2">
                                                <div class="row w-100 m-0 letra-gray4-15 justify-content-end">{{a.precio * a.cantidad | currency}} {{a.currency}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            
                            <div class="row w-100 m-0 mt-2 border-t-gray1-1 total-regaslo-form">
                                <div class="row w-100 m-0 px-2">
                                    <div class="col px-0 letra-gray3-15">Total:</div>
                                    <div class="col-auto px-0 letra-azul-20 pr-4">{{totalCantidad(regalosForm) | currency}} MXN</div>
                                </div>
                                <div class="row w-100 m-0 px-2" v-if="form.cooperacion == 'si'" >
                                    <div class="col px-0 letra-gray3-15" v-if="form.externo=='si'" >Cooperacion por invitado: ({{(usuariosForm.filter(x=>x.cooperar).length + 1)}})</div>
                                    <div class="col px-0 letra-gray3-15" v-if="form.externo=='no'" >Cooperacion por invitado: ({{(usuariosForm.filter(x=>x.cooperar).length)}})</div>

                                    <div class="col-auto px-0 letra-azul-20 pr-4" v-if="form.externo=='si'">{{totalCantidad(regalosForm) / (usuariosForm.filter(x=>x.cooperar).length + 1) | currency}} MXN</div>
                                    <div class="col-auto px-0 letra-azul-20 pr-4" v-if="form.externo=='no'">{{totalCantidad(regalosForm) / (usuariosForm.filter(x=>x.cooperar).length) | currency}} MXN</div>
                                </div>
                            </div>
                        </div>

                      

                       

                        <template v-if="form.tipo == 'party'">
                            <div class="row w-100 m-0" v-if="regalosForm && regalosForm.length">
                                <div class="row w-100 m-0" v-if="regalosForm.find(x=>{return x.tipo == 'producto'})" >
                                    <div class="row w-100 m-0 px-3 pt-4" @click="updating('/mis_domicilios')">
                                        <div class="row w-100 m-0">
                                            <div class="col px-0 letra-gray3-17 text-capitalize">dirección de entrega</div>
                                            <div class="col-auto px-0 letra-azul-15 border-b-azul-1">Click para cambiar</div>
                                        </div>
                                    </div>
                                    <div class="row w-100 m-0 back-color-blanco py-2" @click="updating('/mis_domicilios')"  >
                                        <template v-if="domicilio && domicilio.id">
                                            <div class="row w-100 m-0 px-3">
                                                <div class="col px-0 letra-azul1-16">{{domicilio.calle}} {{domicilio.numero}}</div>
                                            </div>
                                            <div class="row w-100 m-0 px-3 pt-1">
                                                <div class="col px-0 letra-azul1-14">{{domicilio.municipio}}, {{domicilio.estado}}</div>
                                            </div>
                                        </template>
                                        <div class="row w-100 m-0 px-3" v-else >
                                            <div class="col-auto my-auto px-0 py-2 letra-azul1-16"> Selecciona una dirección de entrega</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <div class="col-12 mt-4 pt-3" v-if="form.tipo == 'reunion'" >
                            <div class="row w-100 m-0 border-b-gray1-1" >
                                <div class="col-12 px-0 letra-gray4-19">Amenidades</div>
                                <div class="col-12 px-0 pt-2">
                                    <div class="row w-100 m-0">
                                        <div class="col px-0" @click="form.cooperacion = 'si'">
                                            <div class="row w-100 m-0">
                                                <div class="col-auto my-auto px-0">
                                                    <icono icono="radio_button_checked" clase="letra-azul-30" v-if="form.cooperacion == 'si'" />
                                                    <icono icono="radio_button_unchecked" clase="letra-gray3-30" v-else  />
                                                </div>
                                                <div class="col my-auto px-0 pl-2 letra-gray3-16 pb-7px">Cooperación</div>
                                            </div>
                                        </div>
                                        <div class="col px-0" @click="form.cooperacion = 'no'">
                                            <div class="row w-100 m-0">
                                                <div class="col-auto my-auto px-0">
                                                    <icono icono="radio_button_checked" clase="letra-azul-30" v-if="form.cooperacion == 'no'" />
                                                    <icono icono="radio_button_unchecked" clase="letra-gray3-30" v-else  />
                                                </div>
                                                <div class="col my-auto px-0 pl-2 letra-gray3-16 pb-7px">El host paga</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="col px-0 letra-gray3-16" @click="updating('/agregar_concepto_gasto')">Agregar Productos o gastos para cooperar</div>
                                <div class="col-auto px-0 letra-gray3-18" @click="updating('/agregar_concepto_gasto')">
                                    <icono icono="add" clase="letra-gray3-25" />
                                </div> -->
                                <div class="col px-0 letra-gray3-16" @click="addW()">Agregar Productos o gastos para cooperar</div>
                                <div class="col-auto px-0 letra-gray3-18" @click="addW()">
                                    <icono icono="add" clase="letra-gray3-25" />
                                </div>
                            </div>
                            <div class="row w-100 m-0 pb-3">
                                <div class="row w-100 m-0" v-for="(a, x) of listaRegalosForm" :key="a.id">
                                    <div class="row w-100 m-0 px-2 py-1 ">
                                        <div class="w-10vw h-10vw">
                                            <imagen :fit="true" clase="border-radius-10px" :src="a.imagen" />
                                        </div>
                                        <div class="col my-auto px-0 pl-2">
                                            <div class="row w-100 m-0 letra-gray4-14">{{a.nombre}}</div>
                                        </div>
                                    </div>
                                    <div class="row w-100 m-0 py-1 ">
                                        <div class="col-auto my-auto px-1 back-color-azul1 border-radius-5px" v-if="a.cantidad > 1" @click="a.cantidad>1?a.cantidad -= 1:a.cantidad = a.cantidad">
                                            <icono icono="remove" clase="letra-blanco-20 pt-4px" />
                                        </div>
                                        <div class="col-auto my-auto px-1 back-color-azul1 border-radius-5px" v-else @click="eliminarProd(a)">
                                            <icono icono="remove" clase="letra-blanco-20 pt-4px" />
                                        </div>
                                        <div class="col-2 my-auto px-0">
                                            <div class="row w-100 m-0 letra-azul1-25 text-center justify-content-center">{{a.cantidad}}</div>
                                        </div>
                                        <div class="col-auto my-auto px-1 back-color-azul1 border-radius-5px" @click="a.cantidad += 1">
                                            <icono icono="add" clase="letra-blanco-20 pt-4px" />
                                        </div>
                                        <div class="col-auto my-auto px-0 pl-2">
                                            <div class="row w-100 m-0 letra-gray4-15 justify-content-end">{{a.precio | currency}} {{a.currency}}</div>
                                        </div>
                                        <div class="col my-auto px-0 pl-2">
                                            <div class="row w-100 m-0 letra-gray4-15 justify-content-end">{{a.precio * a.cantidad | currency}} {{a.currency}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row w-100 m-0 mt-2 border-t-gray0-1">
                                    <div class="row w-100 m-0 px-2">
                                        <div class="col px-0 letra-gray3-17">Total:</div>
                                        <div class="col-auto px-0 letra-azul-18 pr-4">{{totalCantidad(listaRegalosForm) | currency}}</div>
                                    </div>
                                    <div class="row w-100 m-0 px-2" v-if="form.cooperacion == 'si'" >
                                        <div class="col px-0 letra-gray3-14" >Cooperacion por invitado: ({{(usuariosForm.filter(x=>x.cooperar).length + 1)}})</div>
                                        <div class="col-auto px-0 letra-azul-18 pr-4" >{{totalCantidad(listaRegalosForm) / (usuariosForm.filter(x=>x.cooperar).length + 1) | currency}} MXN</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                        
                       
                        <div class="col-12 mt-4" v-if="form.tipo == 'reunion'">
                            <inputForm type="time" texto="Hora:" placeholder="" v-model="form.hora" :maxlength="50" />
                        </div>
                        <div class="col-12 mt-4" v-if="form.tipo == 'reunion'">
                            <div class="row w-100 m-0" v-if="!form.otro">
                                <div class="row w-100 m-0 pb-3">Selecciona un lugar para la reunion:</div>
                                <selectForm type="text" :cancel="true" :nulo="true" texto="Recomedados por SocialFlow" :opciones="lugares" v-model="form.lugar" />
                            </div>

                            <div class="row w-100 m-0 pt-3" v-if="!form.lugar">
                                <selectForm type="text" :cancel="true" :nulo="true" texto="Otro lugar:" llave="calle" nombre="calle" :opciones="domicilios" v-model="form.otro" />
                            </div>

                            <div class="row w-100 m-0 mt-2 border-b-gray0-1 border-t-gray0-1 " v-if="!form.lugar" @click="updating('/nuevo_domicilio')" >
                                <div class="row w-100 m-0 py-1">
                                    <div class="col my-auto px-0 letra-gray3-18">Agregar nuevo domicilio</div>
                                    <div class="col-auto my-auto px-0">
                                        <icono icono="chevron_right" clase="letra-gray3-35 pt-5px" />
                                    </div>
                                </div>
                            </div>

                            <!-- <div class="row w-100 m-0" v-if="!form.lugar">
                                <div class="col-12 px-0 mt-2">
                                    <inputForm :scroll="true" type="text" texto="Otro lugar:" placeholder="" v-model="form.otro" />
                                </div>
                            </div> -->
                        </div>

                        
                    </div>
                </div>


                <div class="row w-100 m-0 justify-content-center mt-4 pb-5 px-2">
                    <div class="row w-100 m-0 justify-content-center pb-5">
                        <div class="col-12 py-2">
                            <botonApp tipo="azul" texto="Guardar" radius="30px" @click="save" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
import Swiper from 'swiper';
const moment = require('moment')
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                hoy: moment().format('YYYY-MM-DD'),
                generos:[
                    { id: 'masculino', nombre: 'Masculino'},
                    { id: 'feminino', nombre: 'Feminino'},
                ],
                tipo:[
                    { id: 'reunion', nombre: 'Reunion'},
                    { id: 'party', nombre: 'Regalo grupal'},
                ],
                // form:{
                //     imagen:             this.$store.getters.userStateObject('nuevoEventoForm').imagen,
                //     nombre:             this.$store.getters.userStateObject('nuevoEventoForm').nombre,
                //     lugar:              this.$store.getters.userStateObject('nuevoEventoForm').lugar,
                //     domicilios_id:      this.$store.getters.userStateObject('nuevoEventoForm').domicilios_id,
                //     otro:               this.$store.getters.userStateObject('nuevoEventoForm').otro,
                //     tipo:               this.$store.getters.userStateObject('nuevoEventoForm').tipo,
                //     cooperacion:        this.$store.getters.userStateObject('nuevoEventoForm').cooperacion,
                //     externo:            this.$store.getters.userStateObject('nuevoEventoForm').externo,
                //     para_usuarios_id:   this.$store.getters.userStateObject('nuevoEventoForm').para_usuarios_id,
                //     fecha:              this.$store.getters.userStateObject('nuevoEventoForm').fecha,
                //     hora:               this.$store.getters.userStateObject('nuevoEventoForm').hora,
                //     repeticion:         this.$store.getters.userStateObject('nuevoEventoForm').repeticion,
                // },

                // form: this.$store.getters.userStateObject('nuevoEventoForm'),
            }
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            
            lugares(){return this.$store.getters.userStateArray('lugares');},
            usuarios(){return this.$store.getters.userStateArray('usuarios');},
            usuario(){return this.usuarios.find(x=>{return x.id == this.nuevoEventoForm.para_usuarios_id }); },

            form(){return this.$store.getters.userStateObject('nuevoEventoForm')},
            nuevoEventoForm(){return this.$store.getters.userStateObject('nuevoEventoForm');},
            usuariosForm(){return this.$store.getters.userStateArray('usuariosForm');},
            regalosForm(){return this.$store.getters.userStateArray('regalosForm');},
            listaRegalosForm(){return this.$store.getters.userStateArray('listaRegalosForm');},

            domicilios(){return this.$store.getters.carritoArray('domicilios');},
            domicilio(){return this.$store.getters.carritoFind('domicilios','domicilio');},

            cambioUSD(){return this.$store.getters.catalogoGetObject('cambioUSD');},

            total(){return (a)=>{ let x = 0; a.map(y=>{x = x + Number(y.precio)}); return x; } },
            totalCantidad(){return (a)=>{ 
                    let x = 0; 
                    a.map(y=>{ 
                        if(y.currency == 'USD'){
                            x = x + ((Number(y.precio) * Number(y.cantidad)) *this.cambioUSD);
                        }
                        else{
                            x = x + (Number(y.precio) * Number(y.cantidad));
                        }
                    }); 
                    return x; 
            }},
        },
        mounted() {
            console.log("######## FORM", this.form);
        },
        methods:{
            save(){
                
                if(!this.form.nombre){
                    swal("",`Por favor ingresa el nombre de tu ${this.form.tipo}`,"");
                    return;
                }
                if(this.form.tipo == 'reunion'){
                    if(!this.form.lugar && !this.form.otro){
                        swal("","Por favor ingresa o seleciona el lugar de la reunion","");
                        return;
                    }
                    if(this.form.otro){
                        let y = this.domicilios.find(x=>{return x.calle == this.form.otro; });
                        if(y){
                            this.form.domicilios_id = y.id;
                            this.form.lat = y.lat;
                            this.form.lng = y.lng;
                        }
                    }
                }
                if(this.form.tipo == 'party'){
                    if(!this.regalosForm || !this.regalosForm.length){
                        if(!this.domicilio || !this.domicilio.id){
                            swal("","Por favor selecciona un direccion de entrega","");
                            return;
                        }
                    }
                }
                if(this.form.fecha < this.hoy){
                    swal("","Solo puedes agregar eventos futuros","");
                    return;
                }

                this.form.domicilios_id = this.domicilio.id;
                this.$store.dispatch('postAgregarEvento',this.form);
            },

            updating(ruta){
                console.log("UPDATING", this.form);
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
                if(ruta){
                    this.router.navigate(ruta);
                }
            },

            ver(){
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
                this.router.navigate('/deseos_usuario_evento');
            },

            add(a){
                this.$store.commit('addUser',a);
                console.log("USUARIOS", this.usuariosForm)
            },

            addX(a){
                console.log("UPDATING", this.form);
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
                this.$store.commit('setUsuarioData',['tipo', 'nuevoEvento']);
                this.$store.commit('setUsuarioData',['serie', 'lista']);
                this.router.navigate('/regalos_eventos'); 
            },

            addY(a){
                console.log("UPDATING", this.form);
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
                this.$store.commit('setUsuarioData',['tipo', 'nuevoEvento']);
                this.$store.commit('setUsuarioData',['serie', 'wish']);
                this.router.navigate('/mis_deseos_eventos'); 
            },

            addW(a){
                console.log("UPDATING", this.form);
                this.$store.commit('setUsuarioData',['nuevoEventoForm', this.form]);
                this.$store.commit('setUsuarioData',['tipo', 'nuevoEvento']);
                this.$store.commit('setUsuarioData',['serie', 'amenidad']);
                this.router.navigate('/regalos_eventos'); 
            },

            eliminar(a){
                this.$store.commit('removeUser',a.id);
            },
            delConcepto(a){
                this.$store.commit('removeConcepto',a);
            },
            eliminarProd(a){
                this.$store.commit('removeRegalo',a.id);
            },
          
        }
    }
</script>