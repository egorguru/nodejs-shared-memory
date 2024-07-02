const fastify = require('fastify')

const client = require('./client')

const app = fastify()

app.get('/save-request', async (req, reply) => {
  const { pid } = process
  console.log('Request to process', pid)
  const requests = (await client.storageGet('requests')) || []
  requests.push({ date: new Date(), pid })
  await client.storageSave('requests', requests)
  reply.send({ pid })
})

app.get('/get-requests', async (req, reply) => {
  const requests = await client.storageGet('requests')
  reply.send({ pid: process.pid, requestCount: requests.length, requests })
})

// /key-value/save?key=key1&value=value1
app.get('/key-value/save', async (req, reply) => {
  await client.storageSave(req.query.key, req.query.value)
  reply.send({ pid: process.pid })
})

// /key-value/get?key=key1
app.get('/key-value/get', async (req, reply) => {
  const value = await client.storageGet(req.query.key)
  reply.send({ pid: process.pid, value })
})

app.get('/request-counter', async (req, reply) => {
  const { pid } = process
  console.log('Request to process', pid)
  await client.counterAdd('request-count', 1)
  reply.send({ pid })
})

app.get('/request-counter-get', async (req, reply) => {
  const requestCount = await client.counterGet('request-count')
  reply.send({ pid: process.pid, requestCount })
})

app.listen({ port: 8080 }, () => console.log('Server has been started'))
