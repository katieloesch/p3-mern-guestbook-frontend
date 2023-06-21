
const API_url = 'https://mern-guestbook-8a2170773d42.herokuapp.com/'

//getAPI

export const getAllPosts = async() => {
  return fetch(`${API_url}/posts`)
};






