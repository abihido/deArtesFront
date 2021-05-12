<template>
    <div id="contenedorEstudiantesTotal">
        <div id="menuSelectorEstudiantes">
            <div v-on:click="changeRol(0)">ESTUDIANTES</div>
            <div v-on:click="changeRol(1)">PROFESORES</div>
            <div v-on:click="changeRol(2)">PADRES</div>
        </div>
        <div v-if="this.rol==0">
            <div id="contenedorEstudiantes" v-for="estudiante in names" v-on:click="changePerson(estudiante.idEstudiantes,'est')"  :key="estudiante.idEstudiantes" >
                <img id="profilePictureList" class="pictureNew" :src="estudiante.avatar" v-if="estudiante.avatar!=undefined">
                <img id="profilePictureList" src="../resources/fotoDefault.png" v-else>
                <div>
                    {{estudiante.name}}
                </div>
                <div>
                    {{estudiante.mail}}
                </div>
            </div>
        </div>
        <div v-else-if="this.rol==1">
                <div id="contenedorEstudiantes" v-for="estudiante in names" v-on:click="changePerson(estudiante.idEstudiantes,'mat')"  :key="estudiante.idMaestros" >
                <img id="profilePictureList" class="pictureNew" :src="estudiante.avatar" v-if="estudiante.avatar!=undefined">
                <img id="profilePictureList" src="../resources/fotoDefault.png" v-else>
                <div>
                    {{estudiante.name}}
                </div>
                <div>
                    {{estudiante.mail}}
                </div>
            </div>
        </div>
        <div v-else-if="this.rol==2">
                <div id="contenedorEstudiantes" v-for="estudiante in names" v-on:click="changePerson(estudiante.idEstudiantes,'pad')"  :key="estudiante.idPadres" >
                <img id="profilePictureList" class="pictureNew" :src="estudiante.avatar" v-if="estudiante.avatar!=undefined">
                <img id="profilePictureList" src="../resources/fotoDefault.png" v-else>
                <div>
                    {{estudiante.name}}
                </div>
                <div>
                    {{estudiante.mail}}
                </div>
            </div>
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
        changeRol(rol){
            this.rol=rol;
            this.names=[];
            if(rol==1){
                this.getMaestros();
            }
            if(rol==2){
                this.getPadres();
            }
            if(rol==0){
                this.getEstudiantes();
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
    }
}
</script>
<style>
    #contenedorEstudiantes{
        display: flex;
        flex-flow: row;
        justify-content: space-around;
        font-family: "Arista 2.0" ;
        font-size: 2vw;
        border: 3px solid black;
        margin:1vw;
        color:black;
        padding: 0.5vw;
        border-radius: 10px;
    }
    #contenedorEstudiantes:hover{
        border:5px solid #555;
    }
    #profilePictureList{
        height: 4vw;
    }
    #contenedorEstudiantesTotal{
        height: 87vh;
        overflow: scroll;
    }
    #menuSelectorEstudiantes{
        font-family: "Arista 2.0" ;
        cursor: pointer;
        display: flex;
        color: black;
        font-size: 1vw;
        border:1px solid black;
        border-radius: 30px;
        margin: 1vw;
        padding: 0.2vw;
        justify-content: space-around;
    }
</style>