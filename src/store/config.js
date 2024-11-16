/* -- set app title --*/
const AppTitle = 'Eplison Marketplace';

/* -- set app mode -- */
// const AppMode = [''];
const AppMode = ['development'];

/* -- set API URLs --*/
const testing = 'http://localhost:4000';
// const development = 'http://localhost:4000';
const development = 'https://www.dserver.wcofans.com';
const production = 'http://localhost:4000';

let SocketUrl;
let env = AppMode[0] || 'development', networkType = '';

switch (AppMode[0]) {
  case 'development':
    SocketUrl = development;
    networkType = true;
    break;
  case 'production':
    SocketUrl = production;
    networkType = false;
    break;
  case 'testing':
    SocketUrl = development;
    networkType = true;
    break;
  default:
    SocketUrl = development;
    networkType = true;
}
let ApiUrl = `${SocketUrl}/api`;
export { AppTitle, ApiUrl, SocketUrl, networkType, env };