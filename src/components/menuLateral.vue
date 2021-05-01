<template>
    <div id="backMenu">
        <div id="menuContent">
            <div id="cartelera" class="menu" v-on:click="cambiarPagina(0,'cartelera')">Cartelera</div>
            <div id="cursos" class="menu" v-on:click="cambiarPagina(1,'cursos')">Cursos</div>
            <div id ="biblioteca" class="menu" v-on:click="cambiarPagina(2,'biblioteca')">Biblioteca</div>
            <div id ="tareas" class="menu" v-on:click="cambiarPagina(3,'tareas')">Interactivo</div>
            <div id= "tienda" class="menu" v-on:click="cambiarPagina(4,'tienda')">Tienda</div>
            <div id ="botonesMenu">
                <button class="botonMenuLateral">Ajustes</button>
                <button class="botonMenuLateral" v-on:click="cerrarSesion()">Cerrar Sesion</button>
            </div>
        </div>
    </div>
</template>
<script>
import * as Cookies from 'js-cookie'
export default {
    
    data(){
        return{
            anterior:''
        };
    },
        methods:{
        paginaDefault(){
            switch(this.$store.state.page){
                case 0:
                    this.cambiarFondo('cartelera');
                break;
                case 1:
                    this.cambiarFondo('cursos');
                break;
                case 2:
                    this.cambiarFondo('biblioteca');
                break;
                case 3:
                    this.cambiarFondo('tareas');
                break;
                case 4:
                    this.cambiarFondo('tienda');
                break;
            }
        },
        cambiarPagina(pagina,id){
            this.$store.commit("setPage",pagina);
            this.cambiarFondo(id);
        },
        cambiarFondo(id){
            const x = document.getElementById(id);
            if(this.anterior!=''){
                const y= document.getElementById(this.anterior);
                y.style.backgroundColor = "#2A003F";
            }
            this.anterior=id;
            x.style.backgroundColor = "#49006E";
        },
        cerrarSesion(){
            Cookies.remove('vuex');
            this.$router.push('Login')
        }
    },
    mounted(){
        this.paginaDefault();
    }
}
</script>
<style>
#backMenu{
    height: 100%;
    width: 18vw;
    background-color: #2A003F;
    justify-items: center;
}
#botonesMenu{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: absolute;
    bottom: 1vw;
    width: 18vw;
    left: 0vw;
    cursor: pointer;
    
}
.botonMenuLateral{
    background-color: #E77817;
    color:white;
    font-family: "Arista 2.0";
    font-size: 0.9vw;
    height: 2vw;
    width: 7vw;
    border: 2px solid white;
    border-radius: 10px;
}
.botonMenuLateral:hover{
    transform: scale(1.1);
}
#menuContent{
    margin:1vw;
}
.menu{
    color: white;
    border-bottom: 2px solid #49006E;
    border-top: 1px solid #49006E;
    height: 5vw;
    font-family: "Arista 2.0";
    font-size: 2vw;
    text-align: center;
    display: flex;
    flex-flow: column;
    align-content: center;
    justify-content: center;
}
#Cartelera{
border-top: 2px solid #49006E;
}
.menu:hover{
    background-color:  #49006E;
    cursor: pointer;
}
.menu:clic{
    background-color:  #49006E;
}
</style>