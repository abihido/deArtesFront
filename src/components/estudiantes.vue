<template>
    <div id="contenedorEstudiantesTotal">
        <div id="menuSelectorEstudiantes">
            <div class="menuBarra" id="menuEstudiantes" v-on:click="changeRol(0)">ESTUDIANTES</div>
            <div class="menuBarra" id="menuProfesores"  v-on:click="changeRol(2)">PROFESORES</div>
        </div>
        
        <div id="estudiantes" v-if="this.rol==0">
            <div class="estudentGrid">
                <div id="contenedorEstudiantes" v-for="estudiante in names" v-on:click="changePerson(estudiante.idEstudiantes,'est')"  :key="estudiante.idEstudiantes" >
                    <img id="profilePictureList" class="pictureNew" :src="estudiante.avatar" v-if="estudiante.avatar!=undefined">
                    <img id="profilePictureList" class="pictureNew" src="../resources/fotoDefault.png" v-else>
                    <div>
                        {{estudiante.name}}
                    </div>
                </div>
            </div>
            <div  id="nuevoEstudianteB" v-on:click="changePage(8)"><img id="ImagenNuevoEstudiante" src="../resources/nuevoEstudiante.png" />CREAR ESTUDIANTE</div>
        </div>
        <div id="estudiantes" v-else-if="this.rol==2">
            <div class="estudentGrid">
                <div id="contenedorEstudiantes" v-for="estudiante in names" v-on:click="changePerson(estudiante.idEstudiantes,'mat')"  :key="estudiante.idMaestros" >
                    <img id="profilePictureList" class="pictureNew" :src="estudiante.avatar" v-if="estudiante.avatar!=undefined">
                    <img id="profilePictureList" class="pictureNew" src="../resources/fotoDefault.png" v-else>
                    <div>
                        {{estudiante.name}}
                    </div>
                </div>
            </div>
            <div id="nuevoEstudianteB" v-on:click="changePage(10)"><img id="ImagenNuevoEstudiante" src="../resources/nuevoEstudiante.png" /><div>CREAR PROFESOR</div></div>
        </div>
    </div>
</template>
<script>
import * as request from  './../services/request.service.js' ;
export default {
        data(){
        return{
            names:[],
            rol:0
        };
    },
    methods:{
        changePerson(idPerson,rolPerson){
            this.$store.commit('setPersonSelected',{id:idPerson,rol:rolPerson});
            this.$store.commit("setPage",6);
        },
        changePage(value){
            this.$store.commit("setPage",value);
        },
        changeRol(rol){
            this.rol=rol;
            this.names=[];

            if(rol==2){
                this.getMaestros();
                this.cambiarFondo(1);
            }
            if(rol==0){
                this.getEstudiantes();
                this.cambiarFondo(0);
            }
        },
        cambiarFondo(id){
            const prof = document.getElementById('menuProfesores');
            const est = document.getElementById('menuEstudiantes');
            if(id==1){
                prof.style.backgroundColor = "#FCC601";
                est.style.backgroundColor =  "#2A003F"

            }
            else{
                est.style.backgroundColor = "#FCC601";
                prof.style.backgroundColor =  "#2A003F"
            }
            
            
        },
        getEstudiantes(){
            fetch(request.SERVER_URL+"/estudiantes/")
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
                            titleText: "ERROR VIENDO ESTUDIANTES",
                            type: "error",
                            confirmButtonColor: "#ff8e43",
                            customClass: "swal2-error",
                    });
                }
            });
        },
        getMaestros(){
            fetch(request.SERVER_URL+"/maestros/")
                .then(response=>{
                    if(response.status==200){
                        this.names=[];
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
                            titleText: "ERROR VIENDO MAESTROS",
                            type: "error",
                            confirmButtonColor: "#ff8e43",
                            customClass: "swal2-error",
                    });
                }
            });
        },
        getPadres(){
            fetch(request.SERVER_URL+"/padres/")
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
                            titleText: "ERROR VIENDO PADRES",
                            type: "error",
                            confirmButtonColor: "#ff8e43",
                            customClass: "swal2-error",
                    });
                }
            });
        },
    },
    mounted(){
        this.getEstudiantes();
        this.cambiarFondo(0);
    }
}
</script>
<style>
    #contenedorEstudiantes{
        display: flex;
        flex-flow: column;
        align-items: center;
        font-family: "Arista 2.0" ;
        font-size: 2vw;
        margin:1vw;
        color:black;
        padding: 0.5vw;
    }
    #estudiantes{
        display: flex;
        flex-flow: column;
        align-items: center;
    }
    #profilePictureList{
        height: 14vw;
        width: 14vw;
        
    }
    #ImagenNuevoEstudiante{
        height: 14vw;
        width: 14vw;
    }
    #contenedorEstudiantesTotal{
        height: 87vh;
        display: flex;
        flex-flow: column;
        align-items: center;
        overflow-y: scroll;
    }
    .estudentGrid{
        display: grid;
        grid-template-columns: repeat(3,25vw);
    }
    #menuSelectorEstudiantes{
        font-family: "Arista 2.0" ;
        cursor: pointer;
        display: flex;
        color: white;
        font-size: 2vw;
        border:1px solid black;
        border-radius: 30px;
        margin: 1vw;
        background-color: #2A003F;
        padding: 0.2vw;
    }
    #nuevoEstudianteB{
        cursor: pointer;
        font-family: "Arista 2.0" ;
        display:flex;
        color:black;
        font-size: 1.5vw;
        flex-flow: column;
        width: 15vw;
        align-items: center;
        align-self: center;
    }

    .menuBarra{
        border-radius: 30px;
        padding-top: 0.5vw;
        padding-left: 1vw;
        padding-bottom: 0.5vw;
        padding-right: 1vw;
    }
</style>