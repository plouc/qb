import React, { Component, PropTypes } from 'react'
import { injectIntl, intlShape }       from 'react-intl'
import {
    OPERATOR_AND,
    OPERATOR_OR
} from '../constants/operators'


class Operator extends Component {
    constructor(props) {
        super(props)

        this.handleUpdate = this.handleUpdate.bind(this)
    }

    handleUpdate(e) {
        const { operator: { id }, onUpdate } = this.props
        onUpdate(id, { operator: e.target.value })
    }

    render() {
        const { intl, operators } = this.props

        return (
            <span className="operator">
                <select onChange={this.handleUpdate}>
                    {operators.map(operator => (
                        <option key={operator} value={operator}>
                            {intl.formatMessage({ id: `operator.${operator}` })}
                        </option>
                    ))}
                </select>
            </span>
        )
    }
}

Operator.propTypes = {
    intl:      intlShape.isRequired,
    onUpdate:  PropTypes.func.isRequired,
    operators: PropTypes.array.isRequired,
    operator:  PropTypes.shape({
        id:       PropTypes.string.isRequired,
        operator: PropTypes.string.isRequired,
    }).isRequired,
}

Operator.defaultProps = {
    operators: [
        OPERATOR_AND,
        OPERATOR_OR,
    ]
}


export default injectIntl(Operator)
