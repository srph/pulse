export default {
  api: {
    baseUrl: process.env.API_BASE_URL || 'http://localhost:8000',
    clientId: process.env.API_CLIENT_ID || '',
    clientSecret: process.env.API_CLIENT_SECRET || ''
  },
  app: {
    title: 'Pulse',
    tagline: 'An entry journal that lets you keep track of your goals.',
    description: 'Pulse is an entry journal that lets you keep track of your goals.'
  }
}
