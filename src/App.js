import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';

import Home from './components/home/home'
import {HashRouter as Router, Route} from 'react-router-dom'

class App extends React.Component {
    render()  {
        return(
          <Router>
            <div>
                <Route path="/" component={Home}></Route>
            </div>
          </Router>
        )
    }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
