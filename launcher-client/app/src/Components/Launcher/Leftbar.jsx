import React, { Component } from 'react';
import '../../Styles/Leftbar.css'
import Icon from 'react-materialize/lib/Icon';

export default class Leftbar extends Component
{
    constructor(props){
        super(props)
        this.state = {
          ipcRenderer : this.props.ipcRenderer
        }
    }
    
   
    render() {
        return (
            <div className="navbar">
                <ul>
                    <li className="tooltipped" data-position="right" data-tooltip="Shop">
                        <Icon small>
                            shopping_cart
                        </Icon>
                    </li>
                    <li className="tooltipped active" data-position="right" data-tooltip="Your Games"><i className="fas fa-list-ul"></i></li>
                    <li className="tooltipped" data-position="right" data-tooltip="Friends"><i className="fas fa-user-friends"></i></li>
                    <li className="tooltipped" data-position="right" data-tooltip="Settings"><i className="fas fa-cog"></i></li>
                </ul>
            </div>
        );
      }
}
