
import axios from 'axios';
const state = {};
const getters = {};
const mutations = {};

function getMime(foto){
    if(foto.includes('.png')) return 'png';
    else if(foto.includes('.jpeg')) return 'jpeg';
    else return 'jpg';
}

const actions = {
    unploadImage({ commit, state }, [parametros, foto, endpoint]){
        console.log('subiendo imagenes', [parametros, getMime(foto), foto, endpoint]);
        //opcines subida
        let opcionesSubida = new FileUploadOptions();
        opcionesSubida.fileKey="imagen";
        opcionesSubida.fileName='vueImagen.'+getMime(foto);
        opcionesSubida.mimeType="image/"+getMime(foto);
        opcionesSubida.headers={ Connection: "close"};
        opcionesSubida.chunkedMode = false;
        //parametrs a enviar
        parametros.token = this.getters.getSession.token;
        opcionesSubida.params = parametros;

        let fileTrans = new FileTransfer();
        return new Promise((resolve, reject) => 
        {
            console.log('IN PROMISE', [parametros, getMime(foto), foto, endpoint]);
            fileTrans.upload(foto, encodeURI(this.state.base.url + endpoint ), 
                (response) => {
                    try{
                        console.log('response imagen', response);
                        if(response.response)
                        {
                            //convertimos la respuesta en string
                            let res = JSON.parse(response.response);
                            console.log("RES PARSE", res);
                            if(!res.status){
                                this.commit('finishLoader');
                                swal(res.msg, "", "error");
                                reject(res);
                                return;
                            }
                            resolve(res);
                        }
                    }
                    catch(e){
                        this.commit('finishLoader');
                        swal("No se pudo guardar la imagen", "", "error");
                        reject(e);  
                    }
                    
                }, 
                (error) => {
                    this.commit('finishLoader');
                    console.log("ERROR UNPLOAD IMAGE", error);
                    swal("Hubo un error de red: verifica tu conexión", "", "error");
                    reject(error);
                }, 
                opcionesSubida);
        });
    },

    unploadWebImage({ commit, state }, [parametros, foto, endpoint]){
        console.log('subiendo imagenes', [parametros, foto, endpoint]);
        let token = this.getters.getSession.token;
        var data = new FormData();
        data.append('token',token);
        data.append('imagen', foto);
        for (const d in parametros) {
            data.append(String(d),parametros[d])
        }
        return new Promise((resolve, reject) =>
        {
            console.log("empesando promesa", data);
            $.ajax({
                url: this.getters.baseUrl+endpoint,
                processData: false,
                cache: false,
                method: 'POST',
                contentType: false,
                data: data,
                success:  ( data ) => {
                    console.log("IMAGE RESPONSE", data);
                    this.commit('finishLoader');
                    if(!data.status)
                    {
                        swal(data.msg,"","error");
                        reject(data);
                        return;
                    }
                    resolve(data);
                },
                error: (error) => {
                    swal("","Error de red: por favor verifique su conexión","error");
                    this.commit('finishLoader');
                    reject(error);
                    return;
                }
            })
        });
    },


   subirImagenes({ commit, state }, [parametros, fotos, endpoint])
    {
        return new Promise((resolve, reject) => 
        {
            let estatusFotos = [];
            fotos.forEach(
                foto => {
                    this.dispatch('unploadImage',[parametros, foto, endpoint]).then(
                        res=>{
                            estatusFotos.push(res);
                            if(estatusFotos.length == fotos.length) return resolve(res);
                        },
                        error=>{reject(error);});
                }
            );
        });
    },

    subirVideos({state},[parametros, video,endpoint]){
        return new Promise((resolve, reject) => 
        {
            let done = function(serverResponse) {
                console.log("RESPUESTA VIDEO", serverResponse);
                let response = JSON.parse(serverResponse.response)
                swal("Video respuesta")
                if (response.status) {
                    swal("Video correcto")
                    resolve(response.status);
                }
                else{
                    swal("Video error estatus")
                    this.commit('finishLoader');
                }
            },
            fail = function(error) {
                swal("Video error modelo")
                this.commit('finishLoader');
                swal("","Ocurrio un error inesperado", "error");
                console.log("upload error source " + error.source);
                console.log("upload error target " + error.target);
            },
            options = new FileUploadOptions(),
            ft = new FileTransfer();
        // CONSTRUYE EL OBJETO DE CONFIGURACIÓN
            options.fileKey = 'video'
            options.fileName = 'videoGLobel'
            options.mimeType = 'video/mp4'
            options.params = parametros;
            options.headers = {
                Connection: "close"
            };
            options.chunkedMode = false;
            ft.upload(video, encodeURI(this.state.base.url + endpoint ), done, fail, options);
        });
    },

    saveBase64({state},img){
        this.commit('initLoader');
        return new Promise((resolve, reject) => {
        cordova.base64ToGallery(
            img.split(",")[1],{
                prefix: 'img_',
                mediaScanner: true
            },
            (path) => {
                console.log("IMAGE CONVERT",'file://'+path);
                this.commit('finishLoader');
                resolve('file://'+path);
            },
            (err)=>{
                this.commit('finishLoader');  
                console.log("ERROR DE CONVERSION");
                console.error(err);
                reject(error);
            });
        });
    }
    
};

export default {
    state,
    getters,
    mutations,
    actions
};