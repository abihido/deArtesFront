<template>
    <div id="bibliotecaBack">
        <div class="recurso">
            <div class="optionBilioteca" id="videos"><img id="videosImg" class="menuBiblioteca" src="../resources/videosLogo.png">Videos</div>
            <div class="bibliotecaContent"></div>
        </div>
        <div class="recurso">
            <div class="optionBilioteca" id="documentos"><img id="documentosImg" class="menuBiblioteca" src="../resources/documentosLogo.png">Documentos</div>
            <div class="bibliotecaContent"></div>
        </div>
        <div class="recurso">
            <div class="optionBilioteca" id="audios"><img id="audiosImg" class="menuBiblioteca" src="../resources/audiosLogo.png">Videos</div>
            <div class="bibliotecaContent"></div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
#bibliotecaBack{
    display: flex;
    flex-flow: column;
}
.recurso{
    display: flex;
    flex-flow: row;
    justify-content: center;
}
.optionBilioteca{
    width: 17vw;
    display: flex;
    flex-flow: column;
    color: #2A003F;
    font-family: "DIN BOLD" ;
    font-size: 2vw;

}
.bibliotecaContent{
    background-color: yellow;
    width: 60vw;
    height: 10vw;
    border-radius: 30px;
    align-self: center;
}
.menuBiblioteca{
    width: 9vw;
    align-self: center;
    margin-top: 1.5vw;
}
.menuBiblioteca:hover{
    transform: scale(1.1);
}
#audiosImg{
    width: 10.3vw;
}
</style>