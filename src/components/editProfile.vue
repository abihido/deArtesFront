<template>
    <div>
    <div id="editProfContainer" v-if="this.$store.state.rol=='adm'">
        <div id="profContPicture">
        <img id="profilePicture" class="pictureNew" :src="this.imagen" v-if="this.imagen!=undefined">
        <img id="profilePicture" class="pictureNew" :src="this.info.avatar" v-else-if="this.info.avatar!=undefined">
        <img id="profilePicture" src="../resources/fotoDefault.png" v-else>
        <image-uploader 
            :debug="1"
            :maxWidth="615"
            :maxHeight="615"
            :quality="0.7"
            :autoRotate=true
            outputFormat="string"
            :preview=false
            :className="['fileinput', { 'fileinput--loaded' : hasImage }]"
            capture="environment"
            accept="image/*"
            doNotResize="['gif', 'svg']"
            @input="setImage"
            @onComplete="endImageResize"
        >
            <label id="uploadProf" for="fileInput" slot="upload-label" >
                <figure>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <path class="path1" d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"></path>
                </svg>
                </figure>
            </label>
        </image-uploader>
        </div>
        <div id="profileName" class="profileText">Nombre2:  {{this.info.name}}</div>
        <div id="profileMail" class="profileText">Mail:  {{this.info.mail}}</div>
        <div id="profileCursos">
            <div>CURSOS INSCRITOS:</div>
            <div id="contenedorOpciones" v-for="curso in names" :key="curso.idCurso">{{curso.name}}</div>
        </div>
        <div id="profileProfesores"></div>
    </div>
    <div id="showProfContainer" v-else>
        <img id="profilePicture" :src="this.$store.state.avatar" v-if="this.$store.state.avatar!=undefined">
        <img id="profilePicture" src="../resources/fotoDefault.png" v-else>
        <div id="profileName" class="profileText">Nombre:  {{this.$store.state.name}}</div>
        <div id="profileMail" class="profileText">Mail:  {{this.$store.state.mail}}</div>
        <div id="profileCursos">
            <div>CURSOS INSCRITOS:</div>
            <div id="contenedorOpciones" v-for="curso in names" :key="curso.idCurso">{{curso.name}}</div>
        </div>
        <div id="profileProfesores"></div>
    </div>
    </div>
</template>
<script>
import * as request from  './../services/request.service.js' ;
import ImageUploader from 'vue-image-upload-resize'
export default {

    data(){
        return{
            imagen:undefined,
            hasImage:false,
            names:[],
            info:Object
        };
    },
    components:{
        ImageUploader
    },
    methods:{
        setImage: function (file) {
            this.hasImage = true
            this.imagen = file
            this.setPhoto()
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
        getInfo(){
            fetch(request.SERVER_URL+"/estudiantes/"+this.$store.state.idSelected)
                .then(response=>{
                    if(response.status==200){
                        response.json().then(data =>{
                            this.info=data;
                            console.log(data);    
                        }
                        );
                    }

                    else{
                        this.$fire({
                            text: "Porfavor recargue la pagina",
                            titleText: "ERROR VIENDO CURSOS",
                            type: "error",
                            confirmButtonColor: "#ff8e43",
                            customClass: "swal2-error",
                    });
                }
            });
        },
         getNames(){
            let rol= 0;
            if(this.$store.state.rolSelected=='mat'){
                rol=1;
            }
            fetch(request.SERVER_URL+"/cursos/nombres/"+this.$store.state.idSelected+"/"+rol)
                .then(response=>{
                    if(response.status==200){
                        response.json().then(data =>{

                            data.forEach(element => {
                                this.names.push(element);
                                console.log(element);
                            });
                            
                        }
                        );
                    }

                    else{
                        this.$fire({
                            text: "Porfavor recargue la pagina",
                            titleText: "ERROR VIENDO CURSOS",
                            type: "error",
                            confirmButtonColor: "#ff8e43",
                            customClass: "swal2-error",
                    });
                }
            });
        },
        setPhoto(){
            this.info.avatar=this.imagen;
            console.log(this.info);
            console.log(JSON.stringify(this.info));
            fetch(request.SERVER_URL+"/estudiantes/"+this.info.idEstudiantes, {
                method: 'PUT', // or 'PUT'
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
        this.getNames();
        if(this.$store.state.id==this.$store.state.idSelected){
            this.info.id=this.$store.state.id;
            this.info.name=this.$store.state.name;
            this.info.mail=this.$store.state.mail;
            this.info.avatar=this.$store.state.avatar;

        }
        else{
            this.getInfo();
        }
    }
}
</script>
<style>
    #editProfContainer{
        height: 87vh;
        display: flex;
        flex-flow: column;
        overflow-y: scroll;
        align-items: center;
    }
    #showProfContainer{
        height: 87vh;
        display: flex;
        flex-flow: column;
        overflow-y: scroll;
        align-items: center;
    }
    .pictureNew{
        border-radius: 40%;
    }
    .profileText{
        color: black;
        font-family: "Arista 2.0" ;
        font-size: 5vw;
        margin-bottom: 5%;
    }
    #profilePicture{
        width: 40%;
    }
    #profContPicture{
        margin-top: 3%;
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: flex-end;
    }
    #profileCursos{
        color: black;
        margin-left: 15%;
        align-self: flex-start;
        font-family: "Arista 2.0" ;
        font-size: 4vw;
    }
    #contenedorOpciones{
        margin-left: 10%;
    }
    .fileinput{
    visibility: hidden;
    display: none;
    }
    #uploadProf{
        grid-column: 2;
        grid-row: 7;
        display: flex;
        flex-flow: column;
        justify-content: center;
    }
</style>