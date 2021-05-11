<template>
  <div class="home">
    <barra></barra>
    <div id="content">
      <menu-lateral ></menu-lateral>
      <div id="homeContent">
        <div id="homeCartelera" v-if="this.$store.state.page==0"><cartelera></cartelera></div>
        <div id="homeCursos" v-else-if="this.$store.state.page==1"><cursos></cursos></div>
        <div id="homeBiblioteca" v-else-if="this.$store.state.page==2"><biblioteca></biblioteca></div>
        <div id="homeInteractiva" v-else-if="this.$store.state.page==3"><tienda></tienda></div>
        <div id="homeTienda" v-else-if="this.$store.state.page==4"><tienda></tienda></div>
        <div id="homeEditPub" v-else-if="this.$store.state.page==5"><editPublicacion></editPublicacion> </div>
        <div id="homeEditProf" v-else-if="this.$store.state.page==6"> <editProfile></editProfile> </div>
        <div id="estudiantes" v-else-if="this.$store.state.page==7"><estudiantes></estudiantes></div>
      </div>
    </div>
  </div>
</template>

<script>
import barra from '../components/barra.vue'
import Biblioteca from '../components/biblioteca.vue'
import Cartelera from '../components/cartelera.vue'
import Cursos from '../components/cursos.vue'
import menuLateral from '../components/menuLateral.vue'
import tienda from '../components/tienda.vue'
import editPublicacion from '../components/editPublicacion.vue'
import editProfile from '../components/editProfile.vue'
import Estudiantes from '../components/estudiantes.vue'

export default {
  components: { barra,menuLateral,Cursos,Cartelera, Biblioteca,tienda,editPublicacion,editProfile, Estudiantes},
  

}
</script>
  

<style>
.home{
  height: 100vh;
  width: 100vw;
  background-color: #49006E;
  display:flex;
  flex-direction:column;
}
#homeContent{
  background-color: white;
  flex-grow: 1;
}
#content{
  height:100%;
  display: flex;
  width: 100%;
}
</style>
