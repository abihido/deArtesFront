<template>
    <div>
    <div id="listaPublicaciones" v-if="selected==false">
        <div id="contenedorEstudiantes" v-for="publicacion in publicaciones" v-on:click="changePerson(estudiante.idEstudiantes,'est')"  :key="publicacion.idPublicacion" >
            <img id="profilePictureList" class="pictureNew" :src="publicacion.imagen" v-if="publicacion.imagen!=undefined">
            <img id="profilePictureList" src="../resources/fotoDefault.png" v-else>
            <div>
                {{publicacion.titulo}}
            </div>
        </div>
    </div>
    <div id="editContainer" v-else>
        <div id="tituloPubGen">Crea Una Nueva Publicacion!</div>
        <div class="pubText">TITULO</div>
        <input class="inputPub" id="tituloPub" v-model="info.titulo" type="text"/>
        <div class="pubText" id="descripcionPubText"  >DESCRIPCION</div>
        <input class="inputPub" id="descripcionPub" v-model="info.descripcion" type="text" />
        <div class="pubText" id="linkPubText">LINK</div>
        <input class="inputPub" id="linkPub" v-model="info.link" type="text" />
        <div class="pubText" id="imgPubText">IMAGEN</div>
        <image-uploader 
            :debug="1"
            :maxWidth="615"
            :maxHeight="615"
            :quality="0.7"
            :autoRotate=true
            outputFormat="string"
            :preview=true
            :className="['fileinput', { 'fileinput--loaded' : hasImage }]"
            capture="environment"
            accept="image/*"
            doNotResize="['gif', 'svg']"
            @input="setImage"
            @onComplete="endImageResize"
        >
            <label id="uploadPub" for="fileInput" slot="upload-label" v-show="this.hasImage==false">
                <figure>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <path class="path1" d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"></path>
                </svg>
                </figure>
                <span class="upload-caption">{{ hasImage ? 'Replace' : 'Upload' }}</span>
            </label>
        </image-uploader>
        <button class="botonSeleccion" id="publicar" v-on:click="setPublication()">Publicar</button>
    </div>
    </div>
</template>
<script>
import * as request from  './../services/request.service.js' ;
import ImageUploader from 'vue-image-upload-resize'
export default {
    data(){
        return{
            selected:false,
            hasImage:false,
            publicaciones:[],
            info:{
                imagen:undefined,
                titulo:"",
                descripcion:"",
                link:"",
                rol:undefined,
                curso:undefined
            }
            
        }
    },
    components:{
        ImageUploader
    },
    methods: {
        setImage: function (file) {
            this.hasImage = true
            this.info.imagen = file
            console.log(this.info.imagen);
        },
        endImageResize(){
            this.$fire({
              text: "la imagen fue cargada",
              titleText: "IMAGEN CARGADA",
              type: "success",
              confirmButtonColor: "#ff8e43",
              customClass: "swal2-error",
            });
        },
        getPublicaciones(){
            fetch(request.SERVER_URL+"/publicaciones/")
                .then(response=>{
                    if(response.status==200){
                        response.json().then(data =>{
                            data.forEach(element => {
                                this.publicaciones.push(element);
                                console.log(element);
                            });
                        }
                        );
                    }

                    else{
                        this.$fire({
                            text: "Porfavor recargue la pagina",
                            titleText: "ERROR VIENDO ESTUDIANTES",
                            type: "error",
                            confirmButtonColor: "#ff8e43",
                            customClass: "swal2-error",
                    });
                }
            });
        },
        setPublication(){
            console.log(this.info);
            console.log(JSON.stringify(this.info));
            fetch(request.SERVER_URL+"/publicaciones/", {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(this.info), // data can be `string` or {object}
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(response=>{
                if(response.status==200){
                    console.log("todo bien xd")
                    
                }
                else{
                    console.log("algo valio verga")
                }
            })
        }
  },
  mounted(){
      this.getPublicaciones();
      if(this.$store.state.rol=="adm"){
        this.info.rol=1
      }
      else{
         this.info.rol=0;
         this.info.curso=this.$store.state.curso; 
      }
  }
}
</script>
<style>
#listaPublicaciones{
    height: 87vh;
    overflow-y: scroll;
}
#tituloPubGen{
    font-size: 3vw;
    grid-column: 1/3;
    color: white;
}
.img-preview{
    width: 15vw;
    height: 15vw;
}
#editContainer{
    display: grid;
    background-color: #49006E;
    font-family: "Arista 2.0" ;
    align-content: space-around;
    justify-content:space-evenly;
    height: 87vh;
}
.fileinput{
    visibility: hidden;
    display: none;
}
.pubText{
    grid-column: 1/3;
    font-size: 2vw;
    color: white;
}
#uploadPub{
    background-color: gray;
    width: 15vw;
    height: 15vw;
    grid-column: 2;
    grid-row: 7;
    display: flex;
    flex-flow: column;
    justify-content: center;
}
.inputPub{
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    width: 100%;
    grid-column: 1/3;
    
}
#descripcionPub{
    grid-row: 7;
    grid-column: 1;
    height: 60%;
    margin-top: 10%;
    white-space: normal;
    width: 100%;
}
#descripcionPubText{
    grid-row: 6;
    grid-column: 1;
}

#imgPubText{
    grid-row: 6;
    grid-column: 2;
}
.inputPub:focus{
    border: 3px solid #555;
}
#publicar{
    grid-column: 1/3;
    width: 50%;
    margin: 2% 25% 2% 25%;



}
.botonSeleccion{
    background-color: #E77817;
    color:white;
    font-family: "Arista 2.0";
    font-size: 1.5vw;
    height: 3vw;
    border: 2px solid white;
    border-radius: 10px;
    cursor: pointer;
}

</style>