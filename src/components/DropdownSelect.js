import React, { Component } from 'react'
import Select from 'react-select'


/* Stil på gameSelect dropdown */
const customSelectStyle = {
    control: (provided, state) => ({
        ...provided,
        borderRadius: '2px',
        border: 'none',
        boxShadow: state.isFocused ? 'inset 0px 0px 0px 3px var(--accent)' : '',
        transition: 'box-shadow .2s'
    }),
    option: (provided, state) => ({
        ...provided,
        color: 'var(--dark)',
        backgroundColor: state.isSelected ? '#ccc' : '#fff',
        transition: 'all .2s',
        '&:hover': {
            backgroundColor: 'var(--dark)',
            color: 'var(--light)'
          }
    }),
    dropdownIndicator: (base, state) => ({
        ...base,
        transition: 'all .3s ease-out',
        transform: state.isFocused ? 'rotate(180deg)' : 'null'
      }),
    menu: (base) => ({
        ...base,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        animationName: 'dropDownBounce',
        animationDuration: '.4s',
        animationIterationCount: '1',
        marginTop: '6px',
        borderRadius: '2px'
    })
}

export default class DropdownSelect extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Select
                id="gameSelect"
                options={this.props.gameModes}
                value={this.props.gameModes[0]}
                styles={customSelectStyle}
                placeholder="Velg spill"
                onChange={this.props.handleGamePick}
                isSearchable={false}
            />
        )
    }
}
