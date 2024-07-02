const axios = require('axios').default

const config = require('./config')

exports.storageSave = async (key, value) => {
  await axios.request({
    socketPath: config.unixSocketPath,
    url: '/storage',
    method: 'POST',
    data: { key, value },
  })
}

exports.storageGet = async key => {
  const response = await axios.request({
    socketPath: config.unixSocketPath,
    url: `/storage/${key}`,
    method: 'GET',
  })
  return response.data
}

exports.counterAdd = async (key, value) => {
  await axios.request({
    socketPath: config.unixSocketPath,
    url: '/counter',
    method: 'POST',
    data: { key, value },
  })
}

exports.counterGet = async key => {
  const response = await axios.request({
    socketPath: config.unixSocketPath,
    url: `/counter/${key}`,
    method: 'GET',
  })
  return response.data
}
