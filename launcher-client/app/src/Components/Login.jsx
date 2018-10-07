import React, { Component } from 'react';
import { CardTitle, Button, Card, Row, Col, Input, Modal } from 'react-materialize';
import '../Styles/Login.css'
import '../Electron'

/**
 * When we make a css and is not applied its because it's on a local 
 * module and we need to make it global
 */

import Spinner from './Spinner'

 //if you use fs
const headerStyle = {
  "height" : "35px",
  "marginBottom": "10%"
}
export default class Login extends Component
{
    constructor(props){
        super(props)
        this.state = {
          usernameError : "",
          passwordError : "",
          passwordInputType : "password",
          loginFieldValue : "Login",
          submitEnabled : false,
          captchaNeeded : false
        }
    }
    
    OnUsernameChange = (event, value) => {
      let reg = /^[A-Za-z\d\s]+$/;
      if (reg.test(value + "\n"))
        this.setState({usernameError : ""})
      else
        this.setState({usernameError : "Please insert a valid username"})
    }

    OnPasswordChange = (event, value) => {
      let reg = /^[A-Za-z\d\s]+$/;
      if (reg.test(value + "\n"))
        this.setState({passwordError : ""})
      else
        this.setState({passwordError : "Please insert a valid password"})
    }

    /**
     * When the user wants to hide/show the password field
     * 
     * @return {void}
     */
    OnVisibilityChange = () => {
      if (this.state.passwordInputType === "password")
        this.setState({passwordInputType : "text"})
      else
        this.setState({passwordInputType : "password"})
    }

    /**
     * On login submit button action we request a login to backend
     * 
     * @return {void}
     */
    Authenticate = () => {

      let username = document.getElementById("username").value,
        password = document.getElementById("password").value

      console.log("Username = " + username + " pwd: " + password)

      this.setState({loginFieldValue : <Spinner></Spinner>, submitEnabled: true})
      /**
       * @todo Block every input while requesting
       */
      electron.ipcRenderer.send('authentication', {
        user : username,
        pass: password
        //send after the code etc even if is blank but for now is ok
      })

      electron.ipcRenderer.on('authentication-response', (event, args) => {
          console.log("Got a auth answer")
          switch(args.type)
          {
            case 'captcha_needed':
              this.setState({captchaNeeded : true})
            break;
          }
      })
      
      return false //to prevent submition
    }

    render() {
        return (
            <div className="valign-wrapper row login-box">
              <div className="loginDark col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
                <form action="javascript:;" onSubmit={() => this.Authenticate()}>
                  <div className="card-content">
                    <span style={headerStyle} className="card-title">
                      <div className="steam-logo"></div>
                    </span>
                    <div className="row">
                    <div className="input-field col s12">
                        <Input 
                          onChange={this.OnUsernameChange} 
                          type="text" 
                          id="username" 
                          name="username" 
                          validate={true}
                          error={this.state.usernameError}
                          label="Username"
                          required
                          maxLength={30}
                          minLength={4}
                          s={10}>
                        </Input>
                      </div>
                      <div className="input-field col s12">
                        <Input 
                          onChange={this.OnPasswordChange}
                          type={this.state.passwordInputType}
                          id="password"
                          name="password"
                          error={this.state.passwordError} 
                          validate={true}
                          label="Password"
                          required
                          maxLength={30}
                          minLength={4}
                          s={10}>
                        </Input>
                        <i onClick={() => this.OnVisibilityChange()} className="showPassword material-icons password-show-button">&#xE417;</i>
                      </div>

                      {this.state.captchaNeeded === true ? 
                        
                        <Modal
                          open={true}
                          id='captcha'
                          header='Modal Header'>
                          <p>Steam is requiring the captcha filling to make sure you are not a robot!</p>
                        </Modal>
                      : null}

                    </div>
                    <small> We ensure that nothing is safed, you can visit our github repository</small>
                  </div>
                  <div className="card-action right-align">
                    <div className="col s6 register-label"> {/** Handle buttons like register in electron */}
                      Need an account? <a id="login-register" href="https://store.steampowered.com/join/">Register</a>
                    </div>
                    <button type="submit" id="login-submit" disabled={this.state.submitEnabled} className="btn green waves-effect waves-light">{this.state.loginFieldValue}</button>
                  </div>
                </form>
              </div>
            </div>
        );
      }
}
