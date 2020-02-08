
/**
 * A rectangle.
 * @constructor
 */
export class ElasticWS extends WebSocket {
  constructor(url, protocol) {
    super(url, protocol);
	this.reconnect = true;
  }

  onclose(event) {
  
  
  }
	
  //super.onclose.addeven
  
  close() {
    var force = true;
	super.close();
  }
}