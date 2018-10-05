import React, { Component } from 'react';
import Login from './Components/Login'
import GamesLibrary from './Components/Launcher/MainContainers/GamesLibrary';
import Topbar from './Components/Launcher/Topbar';
import Leftbar from './Components/Launcher/Leftbar';
//import Socket from './Socket'

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer;


export default class App extends Component 
{

  constructor(props){
    super(props)
    this.state = {
      loginVisible: false,
      gamesLibraryVisible : true,
      
      ipcRenderer : ipcRenderer
      //soon add a loader phase like discord while we wait for component did mount ofc
    }
  }
  /**
   * Wait until the component is mounted
   * 
   * @return {void}
   */  
  componentDidMount (){
    //maybe check soon if this gives problems and if yes we 
    //use componentWillUnmount to unbind
    
    ipcRenderer.on('hasSessionNotifier', (event, args) => {
      if (args.login_needed)
        this.setState({loginVisible: true})
      else
        this.setState({loginVisible: false})

      this.forceUpdate()
    })
  }

  render() {
    // document.addEventListener('DOMContentLoaded', function() {
    //   var elems = document.querySelectorAll('.tooltipped');
    //   var instances = M.Tooltip.init(elems,{});
    // });
    // document.addEventListener('DOMContentLoaded', function() {
    //   var elems = document.querySelectorAll('.input-field');
    //   var instances = M.Sidenav.init(elems, {});
    // });
  
    // document.addEventListener('DOMContentLoaded', function() {
    //   var elems = document.querySelectorAll('.chips');
    //   var instances = M.Chips.init(elems, {});
    // });
  
    // var chip = {
    //   tag: 'chip content',
    //   image: '',
    // };
    //   document.addEventListener('DOMContentLoaded', function() {
    //   var elems = document.querySelectorAll('.fixed-action-btn');
    //   var instances = M.FloatingActionButton.init(elems, {
    //   direction: 'left',
    //   hoverEnabled: false
    //   });
    // });
  
    //   document.addEventListener('DOMContentLoaded', function() {
    //   var elems = document.querySelectorAll('.sidenav');
    //   var instances = M.Sidenav.init(elems, {});
    // });
  
    return (
      <div>
        {this.state && this.state.loginVisible ?
            <Login ipcRenderer={this.state.ipcRenderer}/>
        : null }
        {
          /**
           * Here we will filter the button actions, all the components
           * management etc so this is our main controller
           */
         /* this.state && this.state.gamesLibraryVisible ?
            <GamesLibrary ipcRenderer={this.state.ipcRenderer}/>
          : null
        */}
          {<Topbar ipcRenderer={this.state.ipcRenderer}/>}
          {<Leftbar ipcRenderer={this.state.ipcRenderer}/>}
          {/*<GamesLibrary ipcRenderer={this.state.ipcRenderer}/>*/}
      </div>
    );
  }
}

