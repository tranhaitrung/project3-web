export default {
    increment (state) {
      state.count++
    },

    setName(state, name) {
      state.ten = name
    },

    setFullNname(state, fullName) {
      state.fullName = fullName
    },

    setIsLogin(state, isLogin) {
      state.isLogin = isLogin
    },

    setToken(state, token) {
      state.token = token
    },

    setAvatar(state, avatar) {
      state.avatar = avatar
    }

  }