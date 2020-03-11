import React, { Component } from 'react';
import '../css/faq.css';

export default class Faq extends Component {

    constructor(props) {
        super(props);
        this.state = {
            faq: [
                {
                    key: 1,
                    question: "Hva er Buzzdgame?", 
                    answer: "Buzzdgame er et spill for sosiale sammenhegner. Du kan enten spille et tekstbasert eller kortbasert spill"
                },
                {
                    key: 2,
                    question: "Hvordan spiller jeg?", 
                    answer: "For å spille kan du skrive inn romkoden din eller lage et nytt rom"
                },
                {
                    key: 3,
                    question: "Hvordan oppretter jeg et eget rom?", 
                    answer: "Skriv inn ønsket romkode og trykk lag rom for å lage eget rom med valgt spill"
                },
                {
                    key: 4,
                    question: "Lorem iposum?", 
                    answer: "dolor sit amet, consectetur adipiscing elit. Mauris cursus ullamcorper varius. Maecenas pharetra rutrum urna in porttitor. Aenean sem est"
                },
            ]
        }
    }

    expand = (e) => {
        e.currentTarget.getElementsByClassName("expand-icon")[0].classList.toggle("open")
        const element = e.currentTarget.parentElement
        .getElementsByClassName("faq-answer")[0].classList.toggle("collapsed");
        //element.classList.toggle("open")
        /* const answer = element.parentElement;
        console.log(answer.closest("p").className) */
    }

    renderFaq = () => {
        return (
            this.state.faq.map((questions) => (
                <div key={questions.key} className="faqItem">
                    <p className="faq-question" onClick={this.expand}>
                        {questions.question}
                    		<div class="expand-icon">
                                <span></span>
                                <span></span>
                            </div>
                    </p>
                    <p className="faq-answer collapsed">{questions.answer}</p>
                </div>
            ))
        )
    }


    render() {
        return (
        <div className="faqWrapper">
            {this.renderFaq()}
        </div>
        )
    }

}
