<template>
    <div id="contenedorGeneral">
        <div class="subTitulo">Informacion Estudiante</div>
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
        <div id="barraOpcional" v-on:click="padre=!padre">
            <div id="masBarraOpcional">+</div>
            <div style="margin-left:5vw;">AGREGAR PADRES</div>
            <div id="flechaBarraOpcional" v-if="padre==true">V</div>
        </div>
        <div class="subTitulo" v-if="padre==true">Informacion Acudiente</div>
        <div id="formularioPadre" v-if="padre==true">
            <div class="rowFormulario">
                <div><label class="labelRegistro" for="NameP">Name: </label><input class="inputEst" id="Name" v-model="nameP" type="text"/></div>
            </div>
            <div class="rowFormulario">
                <div><label class="labelRegistro" for="Documento">Documento: </label><input class="inputEst" id="Documento" v-model="documentoP" type="text"/></div>
                <div><label class="labelRegistro" for="Parentesco">Parentesco: </label><input class="inputEst" id="Parentesco" v-model="parentesco" type="text"/></div>
            </div>
            <div class="rowFormulario">
                <div><label class="labelRegistro" for="Celular">Celular: </label><input class="inputEst" id="Celular" v-model="celularP" type="text"/></div>
                <div><label class="labelRegistro" for="Telefono">Telefono: </label><input class="inputEst" id="Telefono" v-model="telefonoP" type="text"/></div>
            </div>
            <div class="rowFormulario">
                <div><label class="labelRegistro" for="Mail">Mail: </label><input class="inputEst" id="Mail" v-model="mailP" type="mail"/></div>
                <div><label class="labelRegistro" for="PasswordP">Contraseña: </label><input class="inputEst" id="PasswordP" v-model="passwordP" type="password"/></div>                
            </div>
        </div>
        <button id="publicar" v-on:click="crearEstudiante()">Crear Estudiante</button>
    </div>
</template>
<script>
import * as request from  './../services/request.service.js' ;
export default {
    props:{
        infoEdit:{
            
        }
    },
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
            padre:false,
            nameP:"",
            parentesco:"",
            documentoP:"",
            celularP:"",
            telefonoP:"",
            mailP:"",
            passwordP:"",
            info:{},
            infoP:{}

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

            this.infoP.mail = this.mailP;
            this.infoP.name = this.nameP;
            this.infoP.password = this.passwordP;
            
            this.infoP.documento=this.documentoP;
            this.infoP.parentesco= this.parentesco;
            this.infoP.celular= this.celularP;
            this.infoP.telefono= this.telefonoP;           
        },
        crearEstudiante(){
            this.crearCuerpo();
            console.log(this.info);
            console.log(JSON.stringify(this.info));
            fetch(request.SERVER_URL+"/estudiantes/", {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(this.info), // data can be `string` or {object}
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(response=>{
                if(response.status==200){
                    console.log("todo bien con el estudiante");
                    if(this.padre==true){
                        response.json().then( data=>{
                            this.crearPadre(data.id);
                        })
                    }
                    else{
                        this.$fire({
                        text: "El estudiante fue creado",
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
        crearPadre(idEstudiante){
            this.infoP.idEstudiante = idEstudiante;
            console.log(this.infoP);
            console.log(JSON.stringify(this.infoP));
            fetch(request.SERVER_URL+"/padres/", {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(this.infoP), // data can be `string` or {object}
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(response=>{
                if(response.status==200){
                    console.log("todo bien con el Padre");
                        this.$fire({
                        text: "El estudiante fue creado",
                        titleText: "TODO BIEN",
                        type: "success",
                        confirmButtonColor: "#ff8e43",
                        customClass: "swal2-error",
                        });
                        this.$store.commit("setPage",7);
                }
                else{
                    console.log("algo valio verga")
                }
            })
        }
    }
}
</script>
<style>
    #flechaBarraOpcional{
        display: flex;
        margin-left: 50%;
    }
    .subTitulo{
        font-family: "Arista 2.0" ;
        font-size: 2vw;
        display: flex;
        align-self: flex-end;
        margin-right: 10%;
        color: #2A003F;
        border-bottom: 2px solid #2A003F;
    }
    #masBarraOpcional{
        font-size: 5vw;
        margin-left: 3%;
    }
    #PasswordP{
        width:16vw;
    }
    #barraOpcional{
        width: 70%;
        margin-top: 2vw;
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: flex-start;
        font-family: "Arista 2.0" ;
        font-size: 2vw;
        height: 3vw;
        cursor: pointer;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    #contenedorGeneral{
        display: flex;
        flex-flow: column;
        align-items: center;
        height: 87vh;
        overflow-y: scroll;
    }
    #formularioEstudiante{
        width: 80%;     
    }
    #formularioPadre{
        width: 80%;     
    }
    #Edad{
        width: 10vw;
        padding: 12px 0px;
    }
    #Parentesco{
        width: 17vw;
    }
    #Name{
        width: 40vw;
    }
    .inputEst{
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        height: 2vw;
        width: 25vw;
        border-radius: 10px;
    }
    #Documento{
        width:20vw;
    }
    #Password{
        width: 20vw;
    }
    #Mail{
        width: 32vw;
    }
    #Telefono{
        width: 22vw;
    }
    #Ciudad{
        width: 20vw;
    }
    .rowFormulario{
        display: flex;
        flex-flow: row;
        justify-content:space-between;
        padding: 1vw 0% 1vw 0%;
    }
    .labelRegistro{
        margin-right: 0.5vw;
        font-family: "DIN Medium" ;
        font-size: 2vw;
        color:black;
    }
    #publicar{
    width: 50%;
    margin: 2% 25% 2% 25%;


    background-color: #E77817;
    color:white;
    font-family: "Arista 2.0";
    font-size: 1.5vw;
    height: 3vw;
    border: 2px solid white;
    border-radius: 10px;
}
</style>