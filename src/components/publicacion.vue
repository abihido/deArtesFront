<template>
    
    <div class="polaroid" >
        <div id= "gallery">
            <div id="prev" class="flecha" v-on:click="prev()" v-html="'<'"></div>
            <img id ="imgPublicacion" :src="imagenes[this.index]"  >
            <div id="next" class="flecha" v-on:click="next()" v-html="'>'"></div>
            
        </div>
        <div id="containerPublicacion" v-on:click="referenciar()">
          <p>{{this.titulos[this.index]}}</p>
        </div>
        <div id="textoPublicacion">
           {{this.descrip[this.index]}}
        </div>

    </div>
        
</template>
<script>
import * as request from  './../services/request.service.js' ;
export default {
    props:{rol:Number},
    data(){
        return{
            imagenes:[],
            titulos:[],
            descrip:[],
            index:0,
            max:0,
            xd2:undefined
        }
    },
    methods:{
        referenciar(){
            if(this.link!=""){
                open(this.link);
            }
        },
        prev(){
            if(this.index>0){
                this.index--;
            }
            else{
                this.index=this.max-1;
            }
        },
        next(){
            if(this.index<this.max-1){
                this.index++;
            }
            else{
                this.index=0;
            }
        },
        getGlobals(){
            fetch(request.SERVER_URL+"/publicaciones/cursos/")
                .then(response=>{
                    if(response.status==200){
                        response.json().then(data =>{
                            data.forEach(element => {
                                this.max++;
                                this.imagenes.push(element.imagen);
                                this.descrip.push(element.descripcion);
                                this.titulos.push(element.titulo);
                                console.log(element);
                            }); 
                        }
                        );
                    }

                    else{
                        this.$fire({
                            text: "Porfavor recargue la pagina",
                            titleText: "ERROR VIENDO PUBLICACIONES",
                            type: "error",
                            confirmButtonColor: "#ff8e43",
                            customClass: "swal2-error",
                        });
                    }
                });
        },
        getPublicaciones(){
            fetch(request.SERVER_URL+"/publicaciones/cursos/"+this.$store.state.curso)
                .then(response=>{
                    if(response.status==200){
                        response.json().then(data =>{
                            data.forEach(element => {
                                this.max++;
                                this.imagenes.push(element.imagen);
                                this.descrip.push(element.descripcion);
                                this.titulos.push(element.titulo);
                                console.log(element);
                            }); 
                        }
                        );
                    }

                    else{
                        this.$fire({
                            text: "Porfavor recargue la pagina",
                            titleText: "ERROR VIENDO PUBLICACIONES",
                            type: "error",
                            confirmButtonColor: "#ff8e43",
                            customClass: "swal2-error",
                        });
                    }
                });
        }
    },
    mounted(){
        console.log(this.rol);
        if(this.rol==1){
            this.getGlobals();
            console.log(this.rol);
        }
        else{
            this.getPublicaciones();
        }
    }
    
}
</script>
<style>
    #gallery{
        margin-top: 3%;
        display: flex;
        align-items: center;
        font-size: 4.5vw; 
        flex-flow: row;
        
    }
    #prev{
        margin-left: 2%;
    }
    #next{
        margin-right: 2%;
    }
    .flecha{
        width: 8%;
        color: gray;
    }
    .flecha:hover{
        transform: scale(1.3);
    }
    #imgPublicacion{
        width: 80%;
    }
    #textoPublicacion{
        visibility: hidden;
        position: relative;
        bottom: 55%;
        z-index: 3;
        max-width: 80%;
        left:10%;
        font-family: "Arista 2.0";
        font-size: 2vw; 
        text-align: center;
    }
    #imgPublicacion:hover{
        filter: blur(4px);
        
    }
    #gallery:hover ~ #textoPublicacion{
        visibility: visible;        
        
    }
    #textoPublicacion:hover{
        visibility: visible;
    }
    .polaroid:hover{
        transform: scale(1.1);
    }
    .polaroid {
        color :black;
        cursor: pointer;
        white-space: normal;
        font-family: "Arista 2.0";
        font-size: 1.5vw; 
        width: 100%;
        height: 100%;
        background-color: white;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        margin-bottom: 25px;
        padding-top: 4%;
    }
</style>