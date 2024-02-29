import axios from "axios";

export const user = {
  namespaced: true,
  state: () => ({
    users: null,
    selectedUser: null,
  }),
  mutations: {
    setUsers(state, users) {
      state.users = users;
      if (!users?.find(i => i.id === state.selectedUser?.id)) {
        state.selectedUser = null
      }
    },
    setSelectedUser(state, user) {
      state.selectedUser = user;
    },
  },
  actions: {
    async getUsers({commit}, {values, page}) {
      try {
        const key = values[0].match("[0-9]+") ? 'id' : 'username'
        let params = ``;
        for (let i = 0; i < values.length; i++) {
          params += `${key}=${values[i]}`
          if (i !== values.length - 1) {
            params += '&'
          }
        }
        await axios.get(`https://jsonplaceholder.typicode.com/users?${params}&_start=0&_limit=${20 * page}`).then(response => {
          commit('setUsers', response.data)
        })

        //to check infinite scroll
        // await axios.get(`https://jsonplaceholder.typicode.com/photos?_start=0&_limit=${20 * page}`).then(response => {
        //   commit('setUsers', response.data)
        // })

        return true
      } catch (e) {
        return false
      }
    }
  },

}
