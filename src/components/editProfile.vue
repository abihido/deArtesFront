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
        <div class="subTitulo">Informacion Estudiante</div>
        <div id="formularioEstudiante">
            <div class="rowFormulario">
                <div><label class="labelRegistro" for="Name">Name: </label><input class="inputEst" id="Name" v-model="info.name" type="text"/></div>
                <div><label class="labelRegistro" for="Edad">Edad: </label><input class="inputEst" id="Edad" v-model="info.edad" type="number"/></div>
            </div>
            <div class="rowFormulario">
                <div><label class="labelRegistro" for="Documento">Documento: </label><input class="inputEst" id="Documento" v-model="info.documento" type="text"/></div>
                <div><label class="labelRegistro" for="Password">Contraseña: </label><input class="inputEst" id="Password" v-model="info.password" type="password"/></div>                
            </div>
            <div class="rowFormulario">
                <div><label class="labelRegistro" for="Celular">Celular: </label><input class="inputEst" id="Celular" v-model="info.celular" type="text"/></div>
                <div><label class="labelRegistro" for="Telefono">Telefono: </label><input class="inputEst" id="Telefono" v-model="info.telefono" type="text"/></div>
            </div>
            <div class="rowFormulario">
                <div><label class="labelRegistro" for="Direccion">Direccion: </label><input class="inputEst" id="Direccion" v-model="info.direccion" type="text"/></div>
                <div><label class="labelRegistro" for="Barrio">Barrio: </label><input class="inputEst" id="Barrio" v-model="info.barrio" type="text"/></div>
            </div>
            <div class="rowFormulario">
                <div><label class="labelRegistro" for="Ciudad">Ciudad: </label><input class="inputEst" id="Ciudad" v-model="info.ciudad" type="text"/></div>
                <div><label class="labelRegistro" for="Mail">Mail: </label><input class="inputEst" id="Mail" v-model="info.mail" type="mail"/></div>
            </div>

        </div>
        <div id="profileCursos">
            <div>CURSOS INSCRITOS:</div>
            <div id="contenedorOpciones" v-for="curso in names" :key="curso.idCurso">{{curso.name}}</div>
        </div>
        <div id="profileProfesores"></div>
    </div>
    <div id="showProfContainer" v-else>
        <img id="profilePicture" :src="this.$store.state.avatar" v-if="this.$store.state.avatar!=undefined">
        <img id="profilePicture" src="../resources/fotoDefault.png" v-else>
        <div class="subTitulo">Informacion Estudiante</div>
        <div id="formularioEstudiante">
            <div class="rowFormulario">
                <div><label class="labelRegistro" for="Name">Name: </label><div class="showEst" id="ShowName"> {{info.name}}</div></div>
                <div><label class="labelRegistro" for="Edad">Edad: </label><div class="showEst" id="ShowEdad">{{info.edad}}</div></div>
            </div>
            <div class="rowFormulario">
                <div><label class="labelRegistro" for="Documento">Documento: </label><div class="showEst" id="ShowDocumento">{{info.documento}}</div></div>                
                <div><label class="labelRegistro" for="Mail">Mail: </label><div class="showEst" id="ShowMail">{{info.mail}}</div></div>
            </div>
            <div class="rowFormulario">
                <div><label class="labelRegistro" for="Celular">Celular: </label><div class="showEst" id="ShowCelular">{{info.celular}}</div></div>
                <div><label class="labelRegistro" for="Telefono">Telefono: </label><div class="showEst" id="ShowTelefono">{{info.telefono}}</div></div>
            </div>
            <div class="rowFormulario">
                <div><label class="labelRegistro" for="Direccion">Direccion: </label><div class="showEst" id="ShowDireccion">{{info.direccion}}</div></div>
                <div><label class="labelRegistro" for="Barrio">Barrio: </label><div class="showEst" id="ShowBarrio">{{info.barrio}}</div></div>
            </div>
            <div class="rowFormulario">
                <div><label class="labelRegistro" for="Ciudad">Ciudad: </label><div class="showEst" id="ShowCiudad">{{info.ciudad}}</div></div>
            </div>
        </div>
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
        getInfo(id){
            fetch(request.SERVER_URL+"/estudiantes/"+id)
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
         getNames(id){
            let rol= 0;
            if(this.$store.state.rolSelected=='mat'){
                rol=1;
            }
            fetch(request.SERVER_URL+"/cursos/nombres/"+id+"/"+rol)
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
        },
        functionBack(){
            this.$store.commit("setPage",7);
        }
    },
    mounted(){
        document.addEventListener("backbutton", this.functionBack, false);
        if(this.$store.state.rol=='adm'){
            this.getNames(this.$store.state.idSelected);

            this.getInfo(this.$store.state.idSelected);
        }
        else{
            this.getNames(this.$store.state.id);

            this.getInfo(this.$store.state.id);
        }
    },
    beforeDestroy () {
        document.removeEventListener("backbutton", this.functionBack);
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
        border-radius: 50%;
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
        font-size: 2vw;
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