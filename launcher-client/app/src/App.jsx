import React, { Component } from 'react';
import Login from './Components/Login'
import GamesLibrary from './Components/Launcher/MainContainers/GamesLibrary';
import Topbar from './Components/Launcher/Topbar';
import Leftbar from './Components/Launcher/Leftbar';
//import Socket from './Socket'
import electron from './Electron'
import CTypes from './ContainersTypes'
import Store from './Components/Launcher/MainContainers/Store'

export default class App extends Component 
{

  constructor(props){
    super(props)
    this.state = {
      loginActive: false,
      gamesLibraryActive : true,
      storeActive : false,
      socialActive : false,
      settingsActive : false,
      
      //soon add a loader phase like discord while we wait for component did mount ofc
    }
  }

  /**
   * Disables all the containers
   */
  disableContainers () {
    console.log("Disabling the active container")
    this.setState({
      loginActive: false,
      gamesLibraryActive: false,
      storeActive: false,
      socialActive : false,
      settingsActive: false
    })
  }

  OnContainerChange (container_type) {
    console.log("Changing container.. to type: " + container_type)
    switch(container_type){
      case CTypes.Store:
          //Load the things etc and set the store Active
          this.disableContainers();
          this.setState({storeActive : true})
      break;
      case CTypes.GamesLibrary:
        //Load all the data before ofc
        //and just set active when everything is ready
        this.disableContainers();
        this.setState({gamesLibraryActive : true})
      break;
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
    electron.ipcRenderer.on('hasSessionNotifier', (event, args) => {
      if (args.login_needed)
        this.setState({loginActive: true})
      else
      {
        this.setState({loginActive: false})
        //Load the data of library and set it as default 
      }

      //this.forceUpdate()
    })
  }

  render() {
    return (
      <div id="launcherContainer">
        {this.state && this.state.loginActive ?
          <div id="login">
            <Login/>
          </div>
        : null }

        {this.state && this.state.storeActive ? 
          <div id="store">
            <Store/>
          </div>
        : null }

        {this.state && this.state.gamesLibraryActive ?
          <div id="gameslibrary">
            <Topbar/>
            <Leftbar containerChangeCallback={this.OnContainerChange.bind(this)} />
            <GamesLibrary/>
          </div>
        : null }
        
      </div>
    );
  }
}

