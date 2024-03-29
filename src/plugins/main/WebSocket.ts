"use strict"
import webSokect from 'socket.io-client'
// import LSAgent from '@/plugins/storage/LSAgent'
const connStack: string[] = []
const devMode = process.env.NODE_ENV !== 'production'
class WS {
  baseUrl = devMode ? 'ws://127.0.0.1:3000' : /* 'wss://scavorb.com' */ 'ws://127.0.0.1:3000'

  createConnection (nsp: string, opts?) {
    const defaultOptions = {
      path: '/orbServer',
      secure: true,
      rejectUnauthorized: true,
      transports: [ "websocket" ],
    }
    const connOptions = opts ? Object.assign(defaultOptions, opts) : defaultOptions

    const socket = webSokect(this.baseUrl + nsp, connOptions)

    socket.on('connect', function () {
      connStack.push(nsp)
      if (devMode) {

        console.log('connected to ws ', nsp)
        console.log(socket)
        console.log(connStack)
        // socket.send('New connection established!')
      }
    })

    socket.on('disconnect', function (reason) {
      connStack.splice(connStack.indexOf(nsp), 1)
      devMode ? console.log(socket + ' Disconnected from ws - Reason: ' + reason) : ''
    })
    socket.on('error', function (reason) {
      devMode ? console.error('Error - Reason: ' + reason) : ''
    })
    socket.on('reconnect', function (attemptNumber) {
      //  console.log('Reconnected - ' + attemptNumber)
    })

    return socket
  }
}


export function io (nsp: string, opts?) {
  return new WS().createConnection(nsp, opts)
}