import React, { Component } from 'react';
import { CardTitle, Button, Card, Row, Col, Input, Modal } from 'react-materialize';
import  '../../Styles/Topbar.css'


export default class Topbar extends Component
{
    constructor(props){
        super(props)
        this.state = {
          ipcRenderer : this.props.ipcRenderer,
          avatarOptionsVisible : false,
          avatarImgUrl : "https://zelda.com.br/material/avatar-oficial-hyrule-warriors-link.jpg"
        }
    }
    
    render() {
        return (
            <div className="header">
                <div className="row">
                    <img className="logo" alt="logo"/>

                <div className="col s9"></div>
                <div className="col s2 fixed-action-btn user-placement">
                        <a className="inline btn-floating btn-large red">
                            <div>
                                <img 
                                src={this.state.avatarImgUrl} 
                                className="responsive-img circle" 
                                alt="user"/>
                            </div>
                        </a>
                        <p className="white-text user-name">Enigma</p>
                        <ul>
                            <li className="tooltipped" data-position="bottom" data-tooltip="Profile">
                                <a className="hovereffectbtn btn-floating blue-grey darken-4">
                                    <i className="material-icons">person</i>
                                </a>
                            </li>
                            <li className="tooltipped" data-position="bottom" data-tooltip="Notifications"><a className="hovereffectbtn btn-floating blue-grey darken-4"><i className="material-icons">notifications</i></a></li>
                            <li className="tooltipped" data-position="bottom" data-tooltip="Wallet"><a className="hovereffectbtn btn-floating blue-grey darken-4"><i className="material-icons">payment</i></a></li>
                            <li className="tooltipped" data-position="bottom" data-tooltip="Logout"><a className="hovereffectbtn btn-floating red "><i className="material-icons">power_settings_new</i></a></li>
                        </ul>
                    </div>	
                </div>
            </div>
        );
      }
}
