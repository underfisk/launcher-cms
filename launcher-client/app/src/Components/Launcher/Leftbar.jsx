import React, { Component } from 'react';
import '../../Styles/Leftbar.css'
import Icon from 'react-materialize/lib/Icon';
import CTypes from '../../ContainersTypes'

export default class Leftbar extends Component
{
    constructor(props){
        super(props)
        this.state = {
            isMounted : false,
            containerChangeCallback : props.containerChangeCallback
        }
    }
    
    /*componentWillUnmount(){
        console.log("Stopping timers")
        this.setState({isMounted = false})
    }*/

    componentDidMount(){
        console.log("Sliders is mounted")
        this.setState({isMounted : true})
    }
   
    render() {
        return (
            <div className="leftbar">
                <ul>
                    <li onClick={() => this.state.containerChangeCallback(CTypes.Store)} className="tooltipped" data-position="right" data-tooltip="Shop">
                        <Icon small>
                            shopping_cart
                        </Icon>
                    </li>
                    <li onClick={() => this.state.containerChangeCallback(CTypes.GamesLibrary)} className="tooltipped active" data-position="right" data-tooltip="Your Games">
                        <Icon small>
                            list
                        </Icon>
                    </li>
                    <li onClick={() => this.state.containerChangeCallback(CTypes.Social)} className="tooltipped" data-position="right" data-tooltip="Friends">
                        <Icon small>
                            group
                        </Icon>
                    </li>
                    <li onClick={() => this.state.containerChangeCallback(CTypes.Settings)} className="tooltipped" data-position="right" data-tooltip="Settings">
                        <Icon small>
                            settings
                        </Icon>
                    </li>
                </ul>
            </div>
        );
      }
}
