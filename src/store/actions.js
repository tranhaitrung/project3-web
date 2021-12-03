export default {
    updateProfiles({commit, getters}, names){
      var name = getters.ten;
      console.log(name);
      // context.commit('setName', 'Trân Hải Hải')
      commit('setName', names)
    },

    updateLogined({commit}) {
      commit('setFullNname', localStorage.getItem('displayName')),
      commit('setIsLogin', localStorage.getItem('isLogin')),
      commit('setToken', localStorage.getItem('token'))
      commit('setAvatar', localStorage.getItem('avatar'))
    }
  }