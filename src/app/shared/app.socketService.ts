import { Injectable } from '@angular/core';
// import * as SocketIo from '../../../node_modules/socket.io-client';

@Injectable()
export class SocketService {
// private socket = SocketIo('http://ec2-18-216-244-36.us-east-2.compute.amazonaws.com:3000/api/images');



  constructor() {

  }

  sendImage(image) {
    // this.socket.emit('image', image);
  }

}
