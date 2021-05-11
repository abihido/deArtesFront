<template>
    <div id = "cursosBack">

        <div id="cursoSelector" v-if="selected==false">
            <div id="tittleCursorSelector" >SELECCIONA EL CURSO </div>
            <div id="contenedorOpciones" v-for="curso in names" :key="curso.idCurso">
                <div class="triangle"></div> 
                <div id="row" v-on:click="changeCurso(curso.idCurso,curso.name)">{{curso.name}}</div>
            </div>
        </div>
            <div id="cursoShow" v-else>

                <div id="tituloCurso">{{selectedName}}</div>
                <div id="cursoContent">
                    <div id="publicaciones">
                        <div id="publicacionCurso"><publicacion></publicacion></div>
                        <div id="newPubButtom" v-if="this.$store.state.rol=='mat'" v-on:click="edit()">Modificar Publicaciones</div> 
                    </div>
                    <div id="gridCurso">
                        <div class="optionCurso" id="tareas"><img id="tareasImg" class="menuCurso" src="../resources/tareasLogo.png">Tareas</div>
                        <div class="optionCurso" id="calificaciones" ><img id="calificacionesImg" class="menuCurso" src="../resources/calificacionesLogo.png">Calificaciones</div>
                        <div class="optionCurso" id="claseVivo"><img id="claseVivoImg" class="menuCurso" src="../resources/clasesLogo.png">Clase en Vivo</div>
                        <div class="optionCurso" id="claseGrabada"><img id="claseGrabadaImg" class="menuCurso" src="../resources/clasesGrabadasLogo.png">Clase Grabada</div>
                    </div>
                </div>
            </div>
        <div>

        </div>

    </div>

</template>
<script>
import * as request from  './../services/request.service.js' ;
import publicacion from '../components/publicacion.vue'
export default {
    data(){
        return{
            selected:false,
            selectedName:"",
            names:[]
        };
    },
    components:{
        publicacion
    },
    methods:{
        getNames(){
            let rol= 0;
            if(this.$store.state.rol=='mat'){
                rol=1;
            }
            fetch(request.SERVER_URL+"/cursos/nombres/"+this.$store.state.id+"/"+rol)
                .then(response=>{
                    if(response.status==200){
                        response.json().then(data =>{
                            if (data.length>1){
                            data.forEach(element => {
                                this.names.push(element);
                                console.log(element);
                            });
                            }
                            else{
                                console.log(data.idCurso)
                                this.changeCurso(data.idCurso,data.name);
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
        changeCurso(idCurso,name){
            this.$store.commit('setCurso',idCurso);
            this.selected=true;
            this.selectedName=name;
            console.log(this.$store.state.curso);
        },
        edit(){
            this.$store.commit('setPage',5);
        }
    },
    mounted(){
        this.getNames();
    }
}
</script>
<style>
#cursoSelector{
    display: flex;
    flex-flow: column;
}
#tittleCursorSelector{
    margin: 3vw;
    padding: 2vw;
    border: 2px solid #2A003F;
    color: white;
    font-family: "Arista 2.0" ;
    font-size: 5vw;
    align-self: center;
    background-color: #49006E;
}
#contenedorOpciones{
    align-self: flex-start;
    display:flex;
    flex-flow: row;
}
.triangle{
     width: 0; 
     height: 0; 
     border-left: 2vw solid #2A003F;
     border-top: 1vw solid transparent;
     border-bottom: 1vw solid transparent;
     margin-left: 4vw;
     margin-top: 4vw;
}
#row{
    padding-right:4vw ;
    border-top: 2px solid #49006E;
    border-bottom: 2px solid #49006E;
    margin:2vw;
    margin-left: 1vw;
    
    color: #2A003F;
    font-family: "Arista 2.0" ;
    font-size: 4vw;
}
#row:hover{
    color: white;
    background-color: #49006E;
}

#cursoShow{
    display: flex;
    flex-flow: column;
}
#cursoContent{
    display: flex;
    justify-content: space-around;
}
#tituloCurso{
    color: #2A003F;
    align-self: start;
    margin-left:4vw ;
    font-family: "DIN" ;
    font-size: 3vw;
}
#publicacionCurso{
    width: 30vw;
    max-height: 30vw;
  
}
#gridCurso{
    align-self: flex-end;
    display: grid;
    width: 40vw;
}
.menuCurso{
    align-self: center;
    width: 13vw;
}
.menuCurso:hover{
    transform: scale(1.1);
}
#tareas{
    grid-row: 1;
    grid-column: 1;
}
#calificaciones{
    grid-row: 1;
    grid-column: 2;   
}
#claseVivo{
    grid-row: 2;
    grid-column: 1;
}
#claseGrabada{
    grid-row: 2;
    grid-column: 2;
}
.optionCurso{
    width: 17vw;
    display: flex;
    flex-flow: column;
    color: #2A003F;
    font-family: "DIN BOLD" ;
    font-size: 2vw;
    margin-bottom: 3vw;
}
#publicaciones{
    display: flex;
    flex-flow: column;
    margin-bottom:2vw;
    margin-top: 2vw;
}
#newPubButtom{
    border: 2px solid white;
    border-radius: 10px;
    background-color: #49006E;
    color: white;
    font-family: "Arista 2.0";
    font-size: 1.5vw;
    height: 2.5vw;
    width: 23vw;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-self: center;
    margin-top: 1vw;
}
#newPubButtom:hover{
    cursor: pointer;
    transform: scale(1.1);
}
</style>