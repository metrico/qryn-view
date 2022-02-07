
const defaultEnv = process.env.API_URL || window.location.protocol + '//' + window.location.host
export const environment = {
    production: false,
    environment: 'dev',
    apiUrl: defaultEnv ||  'http://localhost:3100'

  };
  
