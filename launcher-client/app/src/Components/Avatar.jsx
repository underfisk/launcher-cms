import React, { Component } from 'react';
import '../Styles/Avatar.css'
export default class Avatar extends Component
{
    constructor(props){
        super(props)
        this.state = {
          ipcRenderer : this.props.ipcRenderer
        }
    }
   
    render() {
        return (
            <div className="avatar-box">
                <img 
                src="https://zelda.com.br/material/avatar-oficial-hyrule-warriors-link.jpg"
                className="responsive-img circle" 
                alt="user"/>
            </div>
        );
      }
}
