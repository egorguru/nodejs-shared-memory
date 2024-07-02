const fs = require('node:fs')
const fastify = require('fastify')

const config = require('./config')

if (fs.existsSync(config.unixSocketPath)) {
  fs.unlinkSync(config.unixSocketPath)
}

const app = fastify()

const storage = new Map()

app.post('/storage', (req, reply) => {
  const { key, value } = req.body
  storage.set(key, value)
  reply.send({ message: 'OK' })
})

app.get('/storage/:key', (req, reply) => {
  const result = storage.get(req.params.key)
  reply.send(result)
})

app.post('/counter', (req, reply) => {
  const { key, value } = req.body
  if (storage.get(key) === undefined) {
    storage.set(key, 0)
  }
  storage.set(key, storage.get(key) + value)
  reply.send({ message: 'OK' })
})

app.get('/counter/:key', (req, reply) => {
  reply.send(storage.get(req.params.key))
})

app.listen({ path: config.unixSocketPath }, () => {
  console.log('Storage server has been started')
})
