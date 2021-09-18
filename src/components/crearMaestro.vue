<template>
    <div id="contenedorGeneral">
        <div class="subTitulo">Informacion Maestro</div>
        <div id="formularioEstudiante">
            <div class="rowFormulario">
                <div><label class="labelRegistro" for="Name">Name: </label><input class="inputEst" id="Name" v-model="name" type="text"/></div>
                <div><label class="labelRegistro" for="Edad">Edad: </label><input class="inputEst" id="Edad" v-model="edad" type="number"/></div>
            </div>
            <div class="rowFormulario">
                <div><label class="labelRegistro" for="Documento">Documento: </label><input class="inputEst" id="Documento" v-model="documento" type="text"/></div>
                <div><label class="labelRegistro" for="Password">Contraseña: </label><input class="inputEst" id="Password" v-model="password" type="password"/></div>                
            </div>
            <div class="rowFormulario">
                <div><label class="labelRegistro" for="Celular">Celular: </label><input class="inputEst" id="Celular" v-model="celular" type="text"/></div>
                <div><label class="labelRegistro" for="Telefono">Telefono: </label><input class="inputEst" id="Telefono" v-model="telefono" type="text"/></div>
            </div>
            <div class="rowFormulario">
                <div><label class="labelRegistro" for="Direccion">Direccion: </label><input class="inputEst" id="Direccion" v-model="direccion" type="text"/></div>
                <div><label class="labelRegistro" for="Barrio">Barrio: </label><input class="inputEst" id="Barrio" v-model="barrio" type="text"/></div>
            </div>
            <div class="rowFormulario">
                <div><label class="labelRegistro" for="Ciudad">Ciudad: </label><input class="inputEst" id="Ciudad" v-model="ciudad" type="text"/></div>
                <div><label class="labelRegistro" for="Mail">Mail: </label><input class="inputEst" id="Mail" v-model="mail" type="mail"/></div>
            </div>

        </div>
        
        <button id="publicar" v-on:click="crearMaestro()">Crear Maestro</button>
    </div>
</template>
<script>
import * as request from  './../services/request.service.js' ;
export default {
    data(){
        return{
            name:"",
            password:"",
            edad:0,
            documento:"",
            celular:"",
            telefono:"",
            direccion:"",
            barrio:"",
            ciudad:"",
            mail:"",
            eps:"",
            info:{},

        }
    },
    methods:{
        crearCuerpo(){
            this.info.mail = this.mail;
            this.info.name = this.name;
            this.info.password = this.password;
            this.info.fecha = this.fecha;
            this.info.edad= this.edad;
            this.info.documento= this.documento;
            this.info.celular= this.celular;
            this.info.telefono= this.telefono;
            this.info.direccion= this.direccion;
            this.info.barrio= this.barrio;
            this.info.ciudad= this.ciudad;

          
        },
        crearMaestro(){
            this.crearCuerpo();
            console.log(this.info);
            console.log(JSON.stringify(this.info));
            fetch(request.SERVER_URL+"/maestros/", {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(this.info), // data can be `string` or {object}
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(response=>{
                if(response.status==200){
                    console.log("todo bien con el maestro");
                    if(this.padre==true){
                        response.json().then( data=>{
                            this.crearPadre(data.id);
                        })
                    }
                    else{
                        this.$fire({
                        text: "El maestro fue creado",
                        titleText: "TODO BIEN",
                        type: "success",
                        confirmButtonColor: "#ff8e43",
                        customClass: "swal2-error",
                        });
                        this.$store.commit("setPage",7);
                    }
                }
                else{
                    console.log("algo valio verga")
                }
            })
        },
       
    }
}
</script>