<template>
    <div id="barra">
        <div id="cuenta">
            <img id="foto" class="pictureNew" :src="this.$store.state.avatar" v-if="this.$store.state.avatar!=undefined">
            <img id="foto" src="../resources/fotoDefault.png" v-else>
             <div id="nombre">{{this.$store.state.name}}</div>
            <button id="botonCuenta" v-on:click="cuenta()">Cuenta</button>
        </div>
        <img id="logo" src="../resources/logoBlanco.png">
    </div>    
</template>

<script>
export default {
    methods:{
        cuenta(){
            this.$store.commit("setPage",6);
        }
    }
}
</script>

<style>
#barra{
    background-image: url("../resources/FondoBandaGrande.jpg");
    /*background-repeat: no-repeat;*/
    background-size: cover;
    background-position: 0% 25%;
    width: 100vw;
    height: 13vh;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
}
#cuenta{
    display:grid;
    color: white;

}
#botonCuenta{
    grid-column: 2;
    grid-row: 2;
    border-radius: 5px;
    font-family: "Arista 2.0";
    color: white;
    border: 2px solid white;
    font-size: 1vw;
    height: 4vh;
    width:5vw;
    margin-bottom: 2vh;
    background-color: #49006E;
}
#nombre{
    margin-top: 2vh;
    grid-column: 2;
    font-family: "Arista 2.0";
    font-size: 2vw;
    grid-row: 1;
    color: white;
}
#foto{
    grid-column: 1;
    grid-row: 1/3;
    height: 6vw;
    margin-top: 0.5vh;
    margin-left: 2vw;
    margin-right: 3vh;
}
#logo{
    
    height: 11vh;
    
    margin-right: 3vw;
}
</style>