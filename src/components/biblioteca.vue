<template>
    <div id="bibliotecaBack">
        <div class="recurso">
            <div class="optionBilioteca" id="videos"><img id="videosImg" class="menuBiblioteca" src="../resources/videosLogo.png">Videos</div>
            <div class="bibliotecaContent">
                <div class="documentContainer" v-for="video in videos" v-bind:key="video.id" v-on:click="downloadFiles(video.name,video.id)">
                    <img scr='../resources/video.png'/>
                    <div>{{video.name}}</div>
                </div>
            </div>
        </div>
        <div class="recurso">
            <div class="optionBilioteca" id="documentos"><img id="documentosImg" class="menuBiblioteca" src="../resources/documentosLogo.png">Documentos</div>
            <div class="bibliotecaContent">
                <div class="documentContainer" v-for="documento in documentos" v-bind:key="documento.id" v-on:click="downloadFiles(documento.name,documento.id)">
                    <img src="../resources/documento.png"/>
                    <div>
                       {{documento.name}}
                    </div>
                </div>
            </div>
        </div>
        <div class="recurso">
            <div class="optionBilioteca" id="audios"><img id="audiosImg" class="menuBiblioteca" src="../resources/audiosLogo.png">Audios</div>
            <div class="bibliotecaContent">
                <div class="documentContainer" v-for="audio in audios" v-bind:key="audio.id" v-on:click="downloadFiles(audio.name,audio.id)">
                    <img src="../resources/audio.png"/>
                    <div>{{audio.name}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as request from  './../services/request.service.js' ;
import * as downloadjs from 'downloadjs';
export default {
    data(){
        return{
            videos:[],
            audios:[],
            documentos:[]
        }
    },
    methods:{
        downloadFiles(nombre,id){
            const url = new URL(request.SERVER_URL+"/Archivos/download")
            const params={name:nombre,file:id}
            url.search= new URLSearchParams(params).toString();
            
            
            
            fetch(url)
                .then(response=>{
                    console.log(response);
                    if(response.status==200){
                    /*    const blob = new Blob([response.body], {type:'arraybuffer'});
                        const link = document.createElement('a');
                        link.href = window.URL.createObjectURL(blob);
                        link.download = nombre;
                        link.click();*/
                         response.blob()
                        .then((blob) => downloadjs(blob, nombre));
                    }

                    else{
                        this.$fire({
                            text: "Porfavor recargue la pagina",
                            titleText: "ERROR TRAYENDO ARCHIVO",
                            type: "error",
                            confirmButtonColor: "#ff8e43",
                            customClass: "swal2-error",
                    });
                }
            });
        },
        getVideos(){
            
            fetch(request.SERVER_URL+"/Archivos/list/videos")
                .then(response=>{
                    if(response.status==200){
                        response.json().then(data =>{
                            data.forEach(element => {
                                this.videos.push(element);
                                console.log(element);
                            });
                        }
                        );
                    }

                    else{
                        this.$fire({
                            text: "Porfavor recargue la pagina",
                            titleText: "ERROR TRAYENDO VIDEOS",
                            type: "error",
                            confirmButtonColor: "#ff8e43",
                            customClass: "swal2-error",
                    });
                }
            });
        },
        getAudios(){
            
            fetch(request.SERVER_URL+"/Archivos/list/audios")
                .then(response=>{
                    if(response.status==200){
                        response.json().then(data =>{
                            data.forEach(element => {
                                this.audios.push(element);
                                console.log(element);
                            });
                        }
                        );
                    }

                    else{
                        this.$fire({
                            text: "Porfavor recargue la pagina",
                            titleText: "ERROR TRAYENDO AUDIOS",
                            type: "error",
                            confirmButtonColor: "#ff8e43",
                            customClass: "swal2-error",
                    });
                }
            });
        },
        getDocumentos(){
            
            fetch(request.SERVER_URL+"/Archivos/list/documentos")
                .then(response=>{
                    if(response.status==200){
                        response.json().then(data =>{
                            data.forEach(element => {
                                this.documentos.push(element);
                                console.log(element);
                            });
                        }
                        );
                    }

                    else{
                        this.$fire({
                            text: "Porfavor recargue la pagina",
                            titleText: "ERROR TRAYENDO DOCUMENTOS",
                            type: "error",
                            confirmButtonColor: "#ff8e43",
                            customClass: "swal2-error",
                    });
                }
            });
        }
    },
    mounted(){
            this.getVideos();
            this.getAudios();
            this.getDocumentos();       
    }
}
</script>
<style>
.documentContainer{
    border-radius: 5px;
    border: 2px solid black;
    margin: 0.25 vh;
    color: gray;
    font-family: "DIN BOLD" ;
    font-size: 2vw;
    font-weight: bold;
    display: flex;
    flex-direction:row;
    justify-content: center;
    align-content: center;
    height: 4vw;
    cursor:pointer;
}
.documentContainer:hover{
    transform: scale(1.01);
}
#bibliotecaBack{
    display: flex;
    flex-flow: column;
}
.recurso{
    display: flex;
    flex-flow: row;
    justify-content: center;
}
.optionBilioteca{
    width: 17vw;
    display: flex;
    flex-flow: column;
    color: #2A003F;
    font-family: "DIN BOLD" ;
    font-size: 2vw;

}
.bibliotecaContent{
    background-color: white;
    width: 60vw;
    overflow-y: auto;
    border:3px solid black;
    scroll-behavior: smooth;
    padding: 1vw;
    height: 10vw;
    border-radius: 30px;
    align-self: center;
}
.menuBiblioteca{
    width: 9vw;
    align-self: center;
    margin-top: 1.5vw;
}
.menuBiblioteca:hover{
    transform: scale(1.1);
}
#audiosImg{
    width: 10.3vw;
}
</style>