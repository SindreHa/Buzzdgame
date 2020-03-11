import React, { Component } from 'react';
import '../css/faq.css';
import { Link } from "react-router-dom";

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
                    question: "Er denne siden funksjonell?", 
                    answer: "Denne siden er fortsatt i beta stadiet og under stadig utvikling. Det vil derfor være flere knapper og funskjoner som det kan hende at ikke fungerer"
                },
            ]
        }
    }

    componentDidMount() {
        this.expandListener()
    }

    expandListener = () => {
        var faq = document.getElementsByClassName("faq-question");
        var i;
        
        for (i = 0; i < faq.length; i++) {
          faq[i].addEventListener("click", function() {
              console.log("klikk")
            this.getElementsByClassName("expand-icon")[0].classList.toggle("open");
            if (this.nextElementSibling.style.maxHeight){
              this.nextElementSibling.style.maxHeight = null;
              this.nextElementSibling.style.opacity = 0;
              this.nextElementSibling.style.padding = 0;
            } else {
              this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + "px";
              this.nextElementSibling.style.opacity = 1;
              this.nextElementSibling.style.paddingBottom = 10 + "px";
            } 
          });
        }
    }

    render() {
        return (
        <div className="faqWrapper">
        <h2 className="faqHeader">Ofte stilte spørsmål</h2>
        {
            this.state.faq.map((questions) => (
                <div key={questions.key} className="faqItem">
                    <p className="faq-question" onClick={this.expand}>
                        {questions.question}
                        <div className="expand-icon">
                            <span></span>
                            <span></span>
                        </div>
                    </p>
                    <p className="faq-answer collapsed">{questions.answer}</p>
                </div>
            ))
        }
        <Link to="/">Lukk</Link>
        </div>
        )
    }

}
