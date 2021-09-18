<template>
    <div id="editCursos">
        <div id= "contenedorImagenNombre">
                <img id="profilePictureList" class="pictureNew" src="../resources/bajo.png"  v-if="curso.avatar==0">
                    <img id="profilePictureList" class="pictureNew" src="../resources/canto.png" v-if="curso.avatar==1">
                    <img id="profilePictureList" class="pictureNew" src="../resources/guitarra.png" v-if="curso.avatar==2">
                    <img id="profilePictureList" class="pictureNew" src="../resources/bateria.png" v-if="curso.avatar==3">
                    <img id="profilePictureList" class="pictureNew" src="../resources/violin.png" v-if="curso.avatar==4">
                <div id="contenedorNombre">
                    <div><label class="labelRegistro" for="NameC">Nombre: </label><input class="inputEst" id="NameC" v-model="name" type="text"/></div>
                    <div><label class="labelRegistro" for="NameC">Descripcion: </label><input class="inputEst" id="DescriptionC" v-model="description" type="text"/></div>
                </div>
                
            </div>
        <div id="eliminaciones">
            <div class="labelRegistro deleteButton" v-if="!deleting" v-on:click="deleting=!deleting">ELIMINAR ESTUDIANTES</div>
            <div class="labelRegistro deleteButton" v-else v-on:click="deleting=!deleting">DEJAR DE ELIMINAR</div>

            <div class="labelRegistro deleteButton" v-on:click="deleteCurso(idCurso)">Eliminar Curso</div>
        </div>
        
        <div class="labelRegistro"  >Estudiantes </div>
        

         <div id="gridCursos">
                <div id="contenedorCursos" v-for="estudiante in estudiantes"   :key="estudiante.idEstudiante" >
                    
                    <img id="profilePictureList" class="pictureNew" src="../resources/fotoDefault.png" v-if="estudiante.avatar==null">
                    <img id="profilePictureList" class="pictureNew" :src="estudiante.avatar" v-else >

                    <div> {{estudiante.name}}  </div>

                    <div class="deleteButton" v-if="deleting" v-on:click="deleteInscription(estudiante.idEstudiantes,idCurso)">ELIMINAR ESTUDIANTE</div>
                </div>
         </div>
         <div  id="crearNuevoCurso" v-on:click="setDisponibles()"><img id="ImagenNuevoEstudiante" src="../resources/nuevoEstudiante.png" />Inscribir Estudiante</div>
         <div id="gridCursos" v-if="select">
                <div id="contenedorCursos" v-for="disponible in disponibles" v-on:click="createInscription(disponible.idEstudiantes)"  :key="disponible.idEstudiante" >
                    <img id="profilePictureList" class="pictureNew" src="../resources/fotoDefault.png" v-if="disponible.avatar==null">
                    <img id="profilePictureList" class="pictureNew" :src="disponible.avatar" v-else >
                    
                    <div> {{disponible.name}}  </div>
                </div>
         </div>
    </div>
</template>
<script>
import * as request from  './../services/request.service.js' ;
export default {
    data(){
        return{
            curso:[],
            idCurso:0,
            estudiantes:[],
            disponibles:[],
            info:{},
            select:false,
            name:'',
            deleting:false,
            description:''
        }
    },
    methods:{
                getEstudiantes(idCursos){
            fetch(request.SERVER_URL+"/estudiantes/curso/"+idCursos)
                .then(response=>{
                    if(response.status==200){
                        response.json().then(data =>{
                            data.forEach(element => {
                                this.estudiantes.push(element);
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
        getUnique(){
            fetch(request.SERVER_URL+"/cursos/"+this.idCurso)
                .then(response=>{
                    if(response.status==200){
                        response.json().then(data =>{
                            this.name=data.name;
                            this.description = data.description;
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
        getAll(){
            this.disponibles=[];
            fetch(request.SERVER_URL+"/estudiantes")
                .then(response=>{
                    if(response.status==200){
                        response.json().then(data =>{
                            console.log(data.length);
                            console.log(this.estudiantes)
                            if(data!= undefined){
                                data.forEach(element => {
                                const even = (element2) => element2.idEstudiantes == element.idEstudiantes ;
                                if(!this.estudiantes.some(even)){
                                    this.disponibles.push(element);
                                }
                                
                                console.log(element);
                            });
                            }
                            
                            
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
        setDisponibles(){
            this.select=!this.select;
            this.getAll();
        },
        deleteInscription(id,curso){
            fetch(request.SERVER_URL+"/matriculas/"+id+"/"+curso, {
                method: 'DELETE', // or 'PUT'
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(response=>{
                if(response.status==200){
                    
                    console.log("todo bien con la eliminacion inscripcion");
                    this.estudiantes=[];
                    this.getEstudiantes(this.idCurso);
                }
                else{
                    console.log("algo valio verga")
                }
            });
        
        },
        createInscription(id){
            this.info.idestudiante = id;
            this.info.idcurso = this.idCurso;
            this.info.semestre = "xd";
            fetch(request.SERVER_URL+"/matriculas/", {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(this.info), // data can be `string` or {object}
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(response=>{
                if(response.status==200){
                    console.log(response);
                    response.json().then(data =>{
                        console.log(data);
                    })
                    console.log("todo bien con la inscripcion");
                    this.estudiantes=[];
                    this.getEstudiantes(this.idCurso);
                    this.select = false;
                }
                else{
                    console.log("algo valio verga")
                }
            });
        
    
        
        },
        deleteCurso(id){
            fetch(request.SERVER_URL+"/cursos/"+id, {
                method: 'DELETE', // or 'PUT'
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(response=>{
                if(response.status==200){
                    
                    console.log("todo bien con la eliminacion del curso");
                    
                    this.$store.commit('setCurso',0);
                    this.$store.commit("setPage",9);
                }
                else{
                    console.log("algo valio verga")
                }
            });
        }
        
        
    },
    
    mounted(){
        this.idCurso= this.$store.state.curso;
        this.getUnique();
        this.getEstudiantes(this.idCurso);
    }
    
}
</script>
<style>
    #contenedorImagenNombre{
        display: flex;
        flex-flow: row;
    }
    #editCursos{
        display: flex;
        flex-flow: column;
        align-items: center;
        height: 87vh;
        overflow-y: scroll;
    }
    #eliminaciones{
        display: flex;
        flex-flow: row;
        align-content: center;
    }
    #contenedorNombre{
        display: flex;
        flex-flow: column;
        align-items: flex-end;
        justify-content: center;
        font-family: "Arista 2.0" ;
        font-size: 2vw;
        margin-top:3vw;

    }
    #contenedorCursos{
        display: flex;
        flex-flow: column;
        align-items: center;
        font-family: "Arista 2.0" ;
        font-size: 2vw;
        margin:1vw;
        color:black;
        padding: 0.5vw;
    }
    #gridCursos{
        display: grid;
        grid-template-columns: repeat(3,25vw);
    }
    .deleteButton{
        background: red;
        border-radius: 10px;
        cursor: pointer;
        padding: 1vw;
    }
</style>