import io from 'socket.io-client'
import store, {getReceipt} from '../client/store/index'
import {updateReceipt} from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket

// put this in thunk
// socket.emit('cell-update', receipt);
