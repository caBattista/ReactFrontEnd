export const authConfig = {
  clientId: 'oauth2-pkce',
  authorizationEndpoint: 'http://localhost:8080/realms/demoRealm/protocol/openid-connect/auth',
  tokenEndpoint: 'http://localhost:8080/realms/demoRealm/protocol/openid-connect/token',
  redirectUri: 'http://localhost:5173',
  scope: 'openid profile email offline_access',
  //onRefreshToken: async (event: any) => event.logIn()
};