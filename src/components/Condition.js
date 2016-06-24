import React, { Component, PropTypes } from 'react'
import Comparator                      from './Comparator'


class Condition extends Component {
    constructor(props) {
        super(props)

        this.handlePropertyUpdate   = this.handlePropertyUpdate.bind(this)
        this.handleComparatorUpdate = this.handleComparatorUpdate.bind(this)
        this.handleValueUpdate      = this.handleValueUpdate.bind(this)
    }

    handlePropertyUpdate(e) {
        const { condition: { id }, onUpdate } = this.props
        onUpdate(id, { property: e.target.value })
    }

    handleComparatorUpdate(e) {
        const { condition: { id }, onUpdate } = this.props
        onUpdate(id, { comparator: e.target.value })
    }

    handleValueUpdate(e) {
        const { condition: { id }, onUpdate } = this.props
        onUpdate(id, { value: e.target.value })
    }

    render() {
        const {
            property,
            comparator,
            value
        } = this.props

        return (
            <span className="condition" style={{ }}>
                <input
                    className="condition_property"
                    type="text"
                    value={property}
                    onChange={this.handlePropertyUpdate}
                />
                <Comparator
                    onChange={this.handleComparatorUpdate}
                    value={comparator}
                />
                <input
                    className="condition_value"
                    type="text"
                    value={value}
                    onChange={this.handleValueUpdate}
                />
            </span>
        )
    }
}

Condition.propTypes = {
    onUpdate:  PropTypes.func.isRequired,
    condition: PropTypes.shape({
        id:         PropTypes.string.isRequired,
        property:   PropTypes.string.isRequired,
        comparator: PropTypes.string.isRequired,
        value:      PropTypes.string.isRequired,
    }).isRequired,
}


export default Condition
