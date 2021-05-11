<template>
    <div>
        <div id="contenedorEstudiantes" v-for="estudiante in names" v-on:click="changePerson(estudiante.idEstudiantes,'est')"  :key="estudiante.idEstudiantes">
            {{estudiante.name}}
        </div>
    </div>
</template>
<script>
import * as request from  './../services/request.service.js' ;
export default {
        data(){
        return{
            names:[]
        };
    },
    methods:{
        changePerson(idPerson,rolPerson){
            this.$store.commit('setPersonSelected',{id:idPerson,rol:rolPerson});
            this.$store.commit("setPage",6);
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
    },
    mounted(){
        this.getEstudiantes();
    }
}
</script>
<style>

</style>