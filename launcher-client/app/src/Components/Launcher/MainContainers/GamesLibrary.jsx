import React, { Component } from 'react';
import { CardTitle, Button, Card, Row, Col, Input, Modal } from 'react-materialize';
import '../../../Styles/GameLibrary.css'

export default class GamesLibrary extends Component
{
    constructor(props){
        super(props)
        this.state = {
          ipcRenderer : this.props.ipcRenderer
        }
    }
    
    render() {
        return (
            <div>
        <div className="row">
            {/* Games list */}
            <div className="col s3 games-list">
				<ul>
					<li className="truncate avatar game-item">
					    <img src="https://vignette.wikia.nocookie.net/witcher/images/a/a0/W3WH_Icon.png/revision/latest?cb=20160710052025"/>
						<span>The Witcher: Wild Hunt</span>
					</li>
					<li className="truncate avatar game-item">
                    <img src="https://vignette.wikia.nocookie.net/witcher/images/a/a0/W3WH_Icon.png/revision/latest?cb=20160710052025"/>
						<span>Far Cry 4</span>
					</li>
					<li className="truncate avatar game-item">
                    <img src="https://vignette.wikia.nocookie.net/witcher/images/a/a0/W3WH_Icon.png/revision/latest?cb=20160710052025"/>
						<span>Call of Duty: Black Ops 3</span>
					</li>
					<li className="truncate avatar game-item">
                    <img src="https://vignette.wikia.nocookie.net/witcher/images/a/a0/W3WH_Icon.png/revision/latest?cb=20160710052025"/>
						<span>Final Fantasy XV</span>
					</li>
					<li className="truncate avatar game-item">
                    <img src="https://vignette.wikia.nocookie.net/witcher/images/a/a0/W3WH_Icon.png/revision/latest?cb=20160710052025"/>
						<span>Tom Clancy's: Rainbow Six Siege</span>
					</li>
					<li className="truncate avatar game-item">
                    <img src="https://vignette.wikia.nocookie.net/witcher/images/a/a0/W3WH_Icon.png/revision/latest?cb=20160710052025"/>
						<span>Outlast 2</span>
					</li>	
				</ul>
			</div>
		</div>
        
        <div className="col s9">
		    <div className="row"></div>
            <div className="row">
                <div className="col s6">
                    <img src="https://vignette.wikia.nocookie.net/fantendo/images/e/ef/The-witcher-3-wild-hunt-new-logo-1.png/revision/latest?cb=20170615205915" style={{height: 100}}  alt="logo"/>
                </div>
            </div>

            <div className="row">
                <div className="col s4">
                    <a className="btn-large disabled">Version: 1.4.002</a>
                    <a className="btn-large light-green darken-4 waves-effect waves-light">PLAY</a>
                
                </div>
            </div>
        </div>

		<div className="row">
			<div className="col s8">
				<div className="card grey darken-4 medium opacity ">
                    <div className="card-content white-text">
                        <span className="card-title">Entertainment at Court</span>
                        <p>You're cordially invited to the Imperial court! Bring your best manners... and a sword, or two.

                                In this Special Arena mode you will be able to create your decks with Nilfgaard cards only. The event will last till Wednesday, September 12th, 12 PM (noon) CEST.
                                
                                Good luck and have fun!
                                </p>
                        </div>
                        <div className="card-action">
                        <a href="#">This is a link</a>
                        <a href="#">This is a link</a>
                    </div>
			    </div>
			</div>
		</div>

		<div className="row">
			<div className="col s9">
				<div className="progress btn grey darken-3 outline" style={{height: 35}}>
					<div className="determinate btn green accent-4 z-depth-3 custom" style={{width:69}}></div>
				</div>
			</div>
			<div className="col s3 items-loading">
				<a className="btn grey darken-3 outline">
						<i className="far fa-pause-circle download-item"></i>
				</a>			
				<div className="btn grey darken-3 outline">
					<i className="fas fa-cog download-item"></i>
				</div>
			</div>
		</div>

	    <div className="footer-bar grey darken-4 row opacity">
			<div className="col s4">
				<ul className="friends-playing">
					<h6 className="">Friends playing this game: </h6>	
                    <img className="responsive-img footer-friends" src="https://zelda.com.br/material/avatar-oficial-hyrule-warriors-link.jpg"/>
                    <img className="responsive-img footer-friends" src="https://zelda.com.br/material/avatar-oficial-hyrule-warriors-link.jpg"/>
					<img className="responsive-img footer-friends" src="https://zelda.com.br/material/avatar-oficial-hyrule-warriors-link.jpg"/>
				</ul>
			</div>
          
            <div className="footer-text2">
                <div className="col s4">
                        <h6>Hours Played:</h6><p> 750 Hours</p>
                </div>
                <div className="col s6">
                <h6>Last Played:</h6> <p>03/09/2018</p>
                </div>
            </div>
        </div>
        </div>
        );
      }
}
