import React, { Component } from 'react';
import Inventory from "./components/Inventory";
// import socketIOClient from "socket.io-client";



class App extends Component {
  constructor() {
    super();
    this.state = {
      // response: false,
      // endpoint: "http://localhost:4242"
    }
  }

  // componentDidMount() {
  //   const { endpoint, response } = this.state;
  //   const socket = socketIOClient(endpoint);

  //   socket.on("test", function(data) {
  //     console.log(data)
  //   })
  // }

  render() {
    return(
    <main>
      <Inventory 
      // socket={
        // socketIOClient("")
      // }
      />
    </main>
    )
  }
}










// const App = () => (
//   <main>
//     <Inventory socket={
//       socketIOClient("")
//     } />
//   </main>
// )

export default App;
