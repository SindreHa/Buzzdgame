import React, { Component } from 'react';
import FaqItem from './FaqItem';

export default class Faq extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [
                "Hva er Buzzdgame?",
                "Hvordan spiller jeg?",
                "Hvor finner jeg romkoden min?",
                "Hvem lagde Buzzdgame?"
            ],
            answers: [
                "Buzzdgame er et spill for sosiale sammenhegner. Du kan enten spille et tekstbasert eller kortbasert spill",
                "For å spille kan du skrive inn romkoden din eller lage et nytt rom",
                "Romkoden får du av skaperen av rommet du vil være med i",
                "Buzzdgame er et bachelorprosjekt for 5 personer ved Universitet i Sørøst-Norge"
            ]
        }
    }

    faqElement = (questions, answers) => {
        const faqWrap = document.createElement("div");
        faqWrap.className = "faqWrap"
    }

    render() {
        return this.state.map((questions, answers) => (
            <FaqItem questions={questions} answers={answers}/>
        ));
    }

}
