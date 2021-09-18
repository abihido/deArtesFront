
<template>
    <div>
        <div id="listaCursos" v-if="selected==false">
            
            <div id="gridCursos">
                <div id="contenedorCursos" v-for="curso in cursos"   :key="curso.idCursos" v-on:click="seleccionarCurso(curso.idCurso)">
                    <img id="profilePictureList" class="pictureNew" src="../resources/bajo.png"  v-if="curso.avatar==0">
                    <img id="profilePictureList" class="pictureNew" src="../resources/canto.png" v-if="curso.avatar==1">
                    <img id="profilePictureList" class="pictureNew" src="../resources/guitarra.png" v-if="curso.avatar==2">
                    <img id="profilePictureList" class="pictureNew" src="../resources/bateria.png" v-if="curso.avatar==3">
                    <img id="profilePictureList" class="pictureNew" src="../resources/violin.png" v-if="curso.avatar==4">
                
                    <div>
                        {{curso.name}}
                    </div>
                    
                </div>
            </div>
            <div  id="crearNuevoCurso" v-on:click="selected=true"><img id="ImagenNuevoEstudiante" src="../resources/nuevoEstudiante.png" />CREAR CURSO</div>
        </div>
        <div id="crearCursos" v-else>
            <div id= "contenedorImagenNombre">
                
                <div id="contenedorNombre">
                    <div><label class="labelRegistro" for="NameC">Name: </label><input class="inputEst" id="NameC" v-model="nameC" type="text"/></div>
                    <div><label class="labelRegistro" for="NameC">Descripcion: </label><input class="inputEst" id="DescriptionC" v-model="descriptionC" type="text"/></div>
                </div>
                
            </div>
            <v-select class="selector" :value="fichadoN" :options="maestros" label="name" @input="setMaster" placeholder="MAESTRO" />
            <v-select class="selector"  v-model="semestre" :options="semestres"  placeholder="SEMESTRE" />
            <v-select class="selector"  v-model="instrumento" :options="instrumentos"  placeholder="INSTRUMENTO" />
            <button class="botonSeleccion" v-on:click="crearCurso()">CREAR CURSO</button>
            
        </div>
    </div>
</template>
<script>
import vSelect from 'vue-select'
import * as request from  './../services/request.service.js' ;
import 'vue-select/dist/vue-select.css';
export default {
    
    data(){
        return{
            selected:false,
            semestres:['2021-2','2021-3'],
            instrumentos:['Bajo','Canto','Guitarra','Percuciones','Violin','Piano'],
            instrumento:'',
            cursos:[],
            maestros:[],
            fichadoN:'',
            fichado:0,
            nameC:'',
            descriptionC:'',
            semestre:'',
            hasImage:false,
            info:{}
        }
    },
    methods:{
        seleccionarCurso(idCurso){
            this.$store.commit('setCurso',idCurso);
            this.$store.commit("setPage",11);
        },
        setMaster(value){
            console.log(value.idMaestros)
            this.fichadoN=value.name;
            this.fichado=value.idMaestros;
        },
        crearCuerpo(){
            this.info.name = this.nameC;
            this.info.semestre =this.semestre;
            this.info.active=1;
            this.info.description = this.descriptionC;
            this.info.master = this.fichado;
            console.log(this.instrumento,"avatar");
            switch(this.instrumento){
                case 'Bajo':
                    this.info.avatar = 0;
                 
                break;

                case 'Canto':
                    this.info.avatar = 1;
                break;

                case 'Guitarra':
                    this.info.avatar = 2;
                break;

                case 'Percuciones':
                    this.info.avatar = 3;
                break;

                case 'Violin':
                    this.info.avatar = 4;
                break;
            }
            
        },
        crearCurso(){
            this.crearCuerpo();
            console.log(this.info);
            console.log(JSON.stringify(this.info));
            fetch(request.SERVER_URL+"/cursos/", {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(this.info), // data can be `string` or {object}
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(response=>{
                if(response.status==200){
                    console.log("todo bien con el curso");
                }
                else{
                    console.log("algo valio verga")
                }
            });
            this.cursos=[];
            this.getCursos();
            this.selected=false;
        },
    
        getMestros(){
            fetch(request.SERVER_URL+"/maestros/")
                .then(response=>{
                    if(response.status==200){
                        response.json().then(data =>{
                            data.forEach(element => {
                                this.maestros.push(element);
                            });
                        }
                        );
                    }
            });
        },
        getCursos(){
            fetch(request.SERVER_URL+"/cursos/")
                .then(response=>{
                    if(response.status==200){
                        response.json().then(data =>{
                            data.forEach(element => {
                                this.cursos.push(element);
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
    },
    components:{
        vSelect
    },
    mounted(){
        this.getCursos();
        this.getMestros();
    }
}
</script>
<style>
    #imageCursoSelector{
        width: 15vw;
        height: 15vw;
        margin: 0.5vw;
    }
    #uploadCur{
        width: 15vw;
        height: 15vw;
        margin: 0.5vw;
    }
    .selector{
        width: 50vw;
        margin: 1vw;
    }
    #DescriptionC{
        height: 5vw;
    }
    #crearCursos{
        display: flex;
        flex-flow: column;
        align-items: center;
    }
    #contenedorImagenNombre{
        display: flex;
        flex-flow: row;
    }
    #contenedorNombre{
        display: flex;
        flex-flow: column;
        align-items: flex-end;
        justify-content: center;
        font-family: "Arista 2.0" ;
        font-size: 2vw;

    }
    #imagenCurso{
        width: 15vw;
        height: 15vw;
        margin: 0.5vw;
    }
    #crearNuevoCurso{
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
        margin-top:2vw;
        grid-template-columns: repeat(3,25vw);
    }
    #listaCursos{
        display: flex;
        flex-flow: column;
        align-items: center;
        height: 87vh;
        overflow-y: scroll;
    }
</style>