export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken', // logout | refreshToken
  pusher_app_id: "12345",
  pusher_key: "12345",
  pusher_secret: "12345",
  pusher_cluster: "mt1",
}
