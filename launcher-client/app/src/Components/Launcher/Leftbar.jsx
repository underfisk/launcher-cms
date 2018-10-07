import React, { Component } from 'react';
import '../../Styles/Leftbar.css'
import Icon from 'react-materialize/lib/Icon';

export default class Leftbar extends Component
{
    constructor(props){
        super(props)
        this.state = {
            containerChangeCallback : props.containerChangeCallback
        }
    }
    
   
    render() {
        return (
            <div className="leftbar">
                <ul>
                    <li onClick={() => this.state.containerChangeCallback(0)} className="tooltipped" data-position="right" data-tooltip="Shop">
                        <Icon small>
                            shopping_cart
                        </Icon>
                    </li>
                    <li onClick={() => this.state.containerChangeCallback(1)} className="tooltipped active" data-position="right" data-tooltip="Your Games">
                        <Icon small>
                            list
                        </Icon>
                    </li>
                    <li onClick={() => this.state.containerChangeCallback(2)} className="tooltipped" data-position="right" data-tooltip="Friends">
                        <Icon small>
                            group
                        </Icon>
                    </li>
                    <li onClick={() => this.state.containerChangeCallback(3)} className="tooltipped" data-position="right" data-tooltip="Settings">
                        <Icon small>
                            settings
                        </Icon>
                    </li>
                </ul>
            </div>
        );
      }
}
