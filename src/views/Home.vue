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
        <div id="nuevoEstudiante" v-else-if="this.$store.state.page==8"><crearEstudiante></crearEstudiante></div>
        <div id="nuevoCurso" v-else-if="this.$store.state.page==9"><crearCurso></crearCurso></div>
        <div id="nuevoMaestro" v-else-if="this.$store.state.page==10"><crearMaestro></crearMaestro></div>
        <div id="editCurso" v-else-if="this.$store.state.page==11"><editCursos></editCursos></div>
        <div id="nuevaTarea" v-else-if="this.$store.state.page==12"><crearTarea></crearTarea></div>
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
import CrearEstudiante from '../components/crearEstudiante.vue'
import crearCurso from '../components/crearCurso.vue'
import crearMaestro from '../components/crearMaestro.vue'
import editCursos from '../components/editCursos.vue'
import crearTarea from '../components/crearTarea.vue'

export default {
  components: { barra,menuLateral,Cursos,Cartelera, Biblioteca,tienda,editPublicacion,editProfile, Estudiantes,CrearEstudiante,crearCurso,crearMaestro,editCursos,crearTarea},
  

}
</script>
  

<style,
    CrearEstudiante>
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
