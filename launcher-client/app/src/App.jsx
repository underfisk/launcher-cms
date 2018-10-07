import React, { Component } from 'react';
import Login from './Components/Login'
import GamesLibrary from './Components/Launcher/MainContainers/GamesLibrary';
import Topbar from './Components/Launcher/Topbar';
import Leftbar from './Components/Launcher/Leftbar';
//import Socket from './Socket'
import electron from './Electron'


export default class App extends Component 
{

  constructor(props){
    super(props)
    this.state = {
      loginVisible: false,

      gamesLibraryVisible : true,
      storeVisible : false,
      socialVisible : false,
      settingsVisible : false,
      
      //soon add a loader phase like discord while we wait for component did mount ofc
    }
  }

  OnContainerChange = (container_type) => {
    console.log("Changing container..")
    switch(container_type){
      case 0:
          //Load the things etc and set the store visible
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
        this.setState({loginVisible: true})
      else
        this.setState({loginVisible: false})

      this.forceUpdate()
    })
  }

  render() {
    return (
      <div>
        {this.state && this.state.loginVisible ?
            <Login/>
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
          {<Topbar/>}
          {<Leftbar containerChangeCallback={() => this.OnContainerChange()} />}/>}
          {<GamesLibrary/>}}
      </div>
    );
  }
}

