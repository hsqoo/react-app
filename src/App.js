import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';

import Home from './components/home/home'
import Musiclist from './components/musiclist/musiclist'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'

// class App extends React.Component {
//     render()  {
//         return(
//           <Router>
//             <Switch>
//                 <Route path="/" component={Home}></Route>
//                 <Route path="/musiclist" component={Musiclist}></Route>
//             </Switch>
//           </Router>
//         )
//     }
// }

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
