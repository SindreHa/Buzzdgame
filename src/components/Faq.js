import React, { Component } from 'react';
import '../css/faq.css';
import { Link } from "react-router-dom";
import { CSSTransition }  from 'react-transition-group';

const FadeIn = ({in: inProp, children }) => (
    
    <CSSTransition
        in={inProp}
        timeout={{ enter: 0, exit: 400 }}
        classNames='fadeIn'
        appear
         >
            {children}
    </CSSTransition>
);

export default class Faq extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transIn: true,
            faq: [
                {
                    question: "Hva er Buzzdgame?", 
                    answer: "Buzzdgame er en flerspiller tjeneste for deg som syntes stemningen litt for dårlig der du er. Opprett et rom og få med deg resten av gruppen for å få en livlig stemning i rommet!"
                },
                {
                    question: "Hvordan spiller jeg?", 
                    answer: "For å spille kan du enten å bli med i et eksisterende rom med en romkode eller opprette ditt eget. NB! Funksjonalitet er ikke på plass enda for dette men du kan se en demo ved å bruke koden 'DEMO'"
                },
                {
                    question: "Hvordan oppretter jeg et eget rom?", 
                    answer: "Skriv inn ønsket romkode og trykk lag rom for å opprette et eget rom for å så velge hvilket spill rommet skal ha. NB! Denne funksjonen er ikke tilgjengelig enda"
                },
                {
                    question: "Hvorfor fungerer ikke alle knapper?", 
                    answer: "Denne siden er fortsatt i tidlig utviklingsfase. Det vil derfor være flere knapper og funskjoner som det kan hende at ikke fungerer"
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
        <FadeIn in={this.state.transIn}>
            <div className="faqWrapper">
            <h2 className="faqHeader">Ofte stilte spørsmål</h2>
            {
                this.state.faq.map((questions, i) => (
                    <div key={i} className="faqItem">
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
        </FadeIn>
        )
    }

}
