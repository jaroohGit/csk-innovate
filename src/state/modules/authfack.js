import apiService from '@/services/api'

export const state = {
  currentUser: sessionStorage.getItem('authUser') ? JSON.parse(sessionStorage.getItem('authUser')) : null
}

export const mutations = {
  SET_CURRENT_USER(state, newValue) {
    state.currentUser = newValue
    saveState('authfack.currentUser', newValue)
  }
}

export const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.currentUser
  }
}

export const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  // eslint-disable-next-line no-unused-vars
  init({ state, dispatch }) {
    dispatch('validate')
  },

  // Logs in the current user - Updated to use new API
  async login({ commit, dispatch, getters }, { username, email, password } = {}) {
    if (getters.loggedIn) return dispatch('validate')

    try {
      // Support both username and email login
      const loginUsername = username || email;
      
      const data = await apiService.login(loginUsername, password)
      
      // Store user data and token
      commit('SET_CURRENT_USER', data.user)
      
      return data.user
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  },

  // Logs out the current user.
  logout({ commit }) {
    commit('SET_CURRENT_USER', null)
    apiService.logout()
    return new Promise((resolve) => {
      resolve(true);
    });
  },

  // register the user
  // eslint-disable-next-line no-unused-vars
  registeruser({ commit, dispatch, getters }, { email, password, username } = {}) {
    if (getters.loggedIn) return dispatch('validate')

    // Registration endpoint not implemented yet in backend
    return Promise.reject(new Error('Registration not implemented'))
  },

  // Validates the current user's token and refreshes it
  // with new data from the API.
  // eslint-disable-next-line no-unused-vars
  validate({ commit, state }) {
    if (!state.currentUser) return Promise.resolve(null)
    
    // Ensure token is set in API service
    const token = localStorage.getItem('jwt_token')
    if (token) {
      apiService.setToken(token)
    }
    
    return Promise.resolve(state.currentUser);
  }
}

// ===
// Private helpers
// ===

function saveState(key, state) {
  window.sessionStorage.setItem(key, JSON.stringify(state))
}
