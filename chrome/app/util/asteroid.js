import { createClass } from "asteroid";

const Asteroid = createClass();
// Connect to a Meteor backend
const asteroid = new Asteroid({
  endpoint: "ws://localhost:3000/websocket"
});


asteroid.ddp.on("added", ({collection, id, fields}) => {
  console.log(`Element added to collection ${collection}`);
  console.log(id);
  console.log(fields);
});

export default asteroid;