import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id:undefined,
    name:'',
    mail:'',
    rol:'',
    loggued:false,
    page:0,
    curso:undefined,
    avatar:undefined,
    idSelected:undefined,
    rolSelected:''
  },
  mutations: {
    storeUser(state,Builder){
      state.id=Builder.id,
      state.mail=Builder.mail,
      state.name=Builder.name,
      state.rol=Builder.rol,
      state.page=0,
      state.avatar=Builder.avatar
    },
    changeLogState(state){
      state.loggued=!state.loggued;
    },
    setId(state,newId) {
      state.id=newId;
    },
    setName(state,newName){
      state.name=newName;
    },
    setMail(state,newMail){
      state.mail=newMail;
    },
    setRol(state,newRol){
      state.rol=newRol;
    },
    setPage(state,newPage){
      state.page=newPage;
    },
    setCurso(state,newCurso){
      state.curso=newCurso;
    },
    setAvatar(state,newAvatar){
      state.avatar=newAvatar;
    },
    setPersonSelected(state,newPersonSelected){
      state.idSelected=newPersonSelected.id;
      state.rolSelected=newPersonSelected.rol;
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, { expires: 1, secure: true })
    })
  ]
})
