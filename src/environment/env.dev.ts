
const defaultEnv:any = import.meta.env.API_URL || window.location.protocol + '//' + window.location.host
export const environment:any = {
    production: false,
    environment: 'dev',
    apiUrl: defaultEnv ||  'http://localhost:3100'

  };
  
