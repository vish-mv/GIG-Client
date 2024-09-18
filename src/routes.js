const API_URL = window?.configs?.serviceURL ? window.configs.serviceURL : "/";

export const AppRoutes = {
  home: API_URL+'/',
  search: API_URL+'/search/',
  entity: API_URL+'/content/',
  edit: API_URL+'/edit/',
  login: API_URL+'/login',
  register: API_URL+'/register',
  graph: API_URL+'/graphs/visualize'
};
