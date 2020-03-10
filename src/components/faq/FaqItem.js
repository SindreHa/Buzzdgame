import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FaqItem extends Component {
    render() {
        const { id, question, answer} = this.props.faq;
        return (
            <div className="faqItem">
                
            </div>
        )
    }
}
