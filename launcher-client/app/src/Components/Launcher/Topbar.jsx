import React, { Component } from 'react';
import { CardTitle, Button, Card, Row, Col, Input, Modal } from 'react-materialize';
import  '../../Styles/Topbar.css'


export default class Topbar extends Component
{
    constructor(props){
        super(props)
        this.state = {
          avatarOptionsVisible : false,
          avatarImgUrl : "https://zelda.com.br/material/avatar-oficial-hyrule-warriors-link.jpg"
        }
    }
    
    render() {
        return (
            <div className="header">
                <img className="logo" alt="logo"/>
               {/* <div className="col 6 user-core">
                    <div className="col 3 user-avatar">
                        <img className="responsive-img circle" src={this.state.avatarImgUrl}/>
                    </div>
                    <div className="col 2 circle responsive-img user-info">
                        Enigma in a box
                    </div>
        </div>*/}
            </div>
        );
      }
}
