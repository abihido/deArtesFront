<template>
  <div id="login" class="center-content">
    <img src="../resources/LogoFondoBlanco.png" id="logoLogin"/>
    <div id="user" class="center-content">
      <div id="user" class="">
        <p class="label">E-mail</p>
        <div class="space"></div>
        <input
          type="text"
          name="User"
          v-model="userLog.username"
          class="entrada"
        />
      </div>
      <div id="pass" class="">
        <p class="label">Contraseña</p>
        <div class="space"></div>
        <input
          type="password"
          name="password"
          v-model="userLog.password"
          class="entrada"
        />
      </div>
      <div id="recuperacion">¿olvidaste tu contraseña?</div>
      <div>
        <button
          type="button"
          name="log"
          v-on:click="login()"
          id="botonEntrar"
        >
          ENTRAR
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import * as request from "../services/request.service";
import alert from "vue-simple-alert";
import Vue from "vue";
Vue.use(alert);
export default {
  name: "Login",
  data() {
    return {
      userLog: {
        username: "",
        password: ""
      },
    };
  },
  methods: {
    getData() {
        const requestOptions={
          method:"POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({password: this.userLog.password})
        }
        fetch(request.SERVER_URL+"/estudiantes/"+this.userLog.username,requestOptions)

        .then(response => {
          if(response.status == 500){
            this.$fire({
              text: "Error del servidor",
              titleText: "ERROR LOGUEANDO USUARIO",
              type: "error",
              confirmButtonColor: "#ff8e43",
              customClass: "swal2-error",
            });
          }
          if (response.status!=404 ) {
            response.json().then(data=>{
            console.log(data);
              if(data!=false){
                
                const builder = {
                    id: data.id,
                    name: data.name,
                    mail: data.mail,
                    rol: data.rol
                };
                this.$store.commit("storeUser", builder);
                this.$store.commit("changeLogState");
                this.$router.push('Home');
              }
              else{
                  this.$fire({
              text: "Contraseña incorrecta",
              titleText: "ERROR LOGUEANDO USUARIO",
              type: "error",
              confirmButtonColor: "#ff8e43",
              customClass: "swal2-error",
            });
              }});
          } else {
            this.$fire({
              text: "El usuario no existe",
              titleText: "ERROR LOGUEANDO USUARIO",
              type: "error",
              confirmButtonColor: "#ff8e43",
              customClass: "swal2-error",
            });
          }
        }
      )
    },
    login() {
      if (this.userLog.username != "" && this.userLog.password != "") {
        this.getData();
      } else {
        this.$fire({
          text: "Un nombre de usuario y contraseña deben ser presentados",
          titleText: "ERROR LOGUEANDO USUARIO",
          type: "error",
          confirmButtonColor: "#ff8e43",
          customClass: "swal2-error",
        });
      }
    }
  },
  components: {
  },
};
</script>

<style scoped>
#login{
  background-color: white;
  min-height: 60vh;
  width: 25vw;
  border: 3px solid #E77817;
  border-radius: 10px;
}
#botonEntrar{
  background-color: #E77817;
  border-radius: 10px;
  color: white;
  font-family: "Arista 2.0" ;
  font-size: 2vw;
  margin-top: 3vh;
  margin-bottom: 3vh;
  width: 13vw;
}
.label{
  color: #333333;
  font-family: "Arista 2.0";
  font-size: 2vw;
  margin-top: 1vh;
  margin-bottom: 0vh;
}
#logoLogin{
  margin-top: 3vh;
  width: 16vw;
}
#recuperacion{
  font-family: "AvantGarde Medium BT Medium";
  font-weight: bold;
  margin-top: 1vh;
}
.entrada{
  width: 16vw;
  height: 4vh;
  border: 2px solid darkgray;
  margin: 0px;
}
</style>
