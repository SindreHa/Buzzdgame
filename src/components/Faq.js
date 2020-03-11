import React, { Component } from 'react';
import '../css/faq.css';

export default class Faq extends Component {

    constructor(props) {
        super(props);
        this.state = {
            faq: [
                {
                    question: "Hva er Buzzdgame?", 
                    answer: "Buzzdgame er et spill for sosiale sammenhegner. Du kan enten spille et tekstbasert eller kortbasert spill"
                },
                {
                    question: "Hvordan spiller jeg?", 
                    answer: "For å spille kan du skrive inn romkoden din eller lage et nytt rom"
                },
                {
                    question: "Hvordan oppretter jeg et eget rom?", 
                    answer: "Skriv inn ønsket romkode og trykk lag rom for å lage eget rom med valgt spill"
                },
            ]
        }
    }

    render() {
        return (
        <div className="faqWrapper">
            { 
                this.state.faq.map((questions) => (
                    <div className="faqItem">
                        <p>{questions.question}</p>
                        <p>{questions.answer}</p>
                    </div>
                ))
            }
        </div>
        )
    }

}
