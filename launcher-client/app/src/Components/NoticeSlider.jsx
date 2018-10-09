import React, { Component } from 'react';
import '../Styles/Slider.css'
import { Card, CardTitle, Button } from 'react-materialize';

export default class NoticeSlider extends Component
{
    constructor(props){
        super(props)

        this.state = {
            content : [{
                image: "https://lh3.googleusercontent.com/-eK2gfdRoPWc/V-JG-qgSS4I/AAAAAAAAAVc/VhD7hyCAZCUDodRJnZD4nXPLSSen0WTZgCHMYBhgL/h250/",
                title: "Oh yea",
                description: "I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.",
                url: "https://google.pt"
            }, {
                image: "http://i.imgur.com/FZu5Uxz.jpg",
                title: "New update",
                description: "KSAKSAKSKAK K SKASKAKS AKS KSAKSKA S",
                url: "https://google.pt"
            }, {
                image: "https://i.imgur.com/cdGkI35.png",
                title: "CS GO RELEASE",
                description: "KSAKSAKSKAK K SKASKAKS AKS KSAKSKA S",
                url: "https://google.pt"
            }],//props.content,
            currentIndex: 0,
            interval : props.interval | 3000,
        }
    }

    componentDidMount() {
        console.log("Initializing the carousel with interval= " + this.state.interval)
        //Set the default card on position 0 but also start the carousel
        if (typeof this.state.content != 'undefined' && this.state.content.length > 0)
        {
            this.changeCardData( this.state.content[0] )
            this.setState({currentIndex: this.state.currentIndex++})
            //just rotate if we have more than 1 atleast 2
            if (this.state.content.length > 1)
                this.initializeCarousel()
        }
    }

    initializeCarousel() { 
        let count = this.state.content.length - 1,
            ci = this.state.currentIndex

        setInterval( () => {
            if (ci >= 0 && ci <= count){
                this.changeCardData(this.state.content[ci])
                if (ci++ > count)
                    ci = 0
                else
                    ci++
                this.setState({currentIndex: ci})
            }
            else if (ci > count){
                this.changeCardData(this.state.content[count])
                ci = 0
                this.setState({currentIndex: ci})
            }
                
        }, this.state.interval )
    }

    changeCardData = data => {
        $('.card-image').fadeOut('slow')
        this.setState({
            cardData: {
                image: data.image,
                title: data.title,
                description: data.description,
                url: data.url
            }
        })
        $('.card-image').fadeIn('slow')
    }

    render(){
        return (
            <div className="row game-slider">
                {this.state && typeof this.state.cardData != 'undefined' ? 
                    <Card className='small'
                        header={
                            <CardTitle 
                                image={this.state.cardData.image}>{this.state.cardData.title}
                            </CardTitle>}
                        >
                        {this.state.cardData.description}
                    </Card>
                : null /* Soon render a spinner */} 
            </div>
        )
    }
}