import React, { Component } from 'react';
import { CardTitle, Button, Card, Row, Col, Input, Modal } from 'react-materialize';
import '../../../Styles/GameLibrary.css'

export default class GamesLibrary extends Component
{
    constructor(props){
        super(props)
        this.state = {
            background_image: "",
            gamesListCollapsed : false,
            active_game: 1,
            temporaryListOfGames: [{
                id: 1,
                name: "The Witcher: Wild Hunt",
                icon: "https://vignette.wikia.nocookie.net/witcher/images/a/a0/W3WH_Icon.png/revision/latest?cb=20160710052025",
                background: "https://i.ytimg.com/vi/En-VsTq30wQ/maxresdefault.jpg",
                moredata: "etc"
            },{
                id: 2,
                name: "Dota 2",
                icon: "http://cdn.onlinewebfonts.com/svg/img_348221.png",
                background: "https://4.bp.blogspot.com/-oYdwqFdrfpY/WlHIkW9tL4I/AAAAAAAABBg/kjtw6LseHao9xVpqc3CZElJo-dBI6BQMQCLcBGAs/s1600/dota2.JPG",
                moredata: "etc"
            },{
                id: 3,
                name: "CS:GO",
                icon: "https://cdn170.picsart.com/upscale-238186308048212.png?r1024x1024",
                background: "http://i.imgur.com/MU2keaB.png",
                moredata: "etc"
            }]
        }
    }

    componentDidMount(){
        this.changeBackground(1) //default game
    }

    changeBackground = (game_id) => {
        console.log("Chaing background to game id : " + game_id)
        let img = ""
        this.state.temporaryListOfGames.forEach( game => {
            if (game.id === game_id)
                img = game.background
        })
        this.setState({
            background_image: img
        })
    }

    changeActiveGame = (game_id) => {
        console.log("Changing active game to " + game_id)
        //Go to redux and look on our immutable manifest data
        //and seek the id we want
        //for now make a switch case to test
        switch(game_id)
        {
            case 1:
                this.changeBackground(1)
            break;
            
            case 2:
                this.changeBackground(2)
            break;
            
            case 3:
                this.changeBackground(3)
            break;
        }
    }
    
    render() {
        return (
        <div className="game-container">
            {/* Games list */}
            <div className="col s3 games-list">
				<ul>
                    {this.state && this.state.temporaryListOfGames.length > 0 ? 
                        this.state.temporaryListOfGames.map( (game) => 
                        <li key={game.id} onClick={() => this.changeActiveGame(game.id)} className="truncate avatar game-item">
                            <img src={game.icon}/>
                            <span>{game.name}</span>
                        </li>
                        )
                    : null }
				</ul>
			</div>

            <div 
                style={{backgroundImage: `url(${this.state.background_image})`}}
                className="col s9 game-content">

            </div>
		</div>
        );
      }
}

{/*
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
        </div>*/}
