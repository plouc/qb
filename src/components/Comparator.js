import React, { Component, PropTypes } from 'react'
import { injectIntl, intlShape }       from 'react-intl'
import {
    COMPARATOR_EQUAL,
    COMPARATOR_NOT_EQUAL,
    COMPARATOR_IN,
    COMPARATOR_STARTS_WITH,
    COMPARATOR_ENDS_WITH,
    COMPARATOR_GREATER_THAN,
    COMPARATOR_LOWER_THAN,
} from '../constants/comparators'


class Comparator extends Component {
    render() {
        const { intl, onChange, comparators } = this.props

        return (
            <span className="comparator">
                <select onChange={onChange}>
                    {comparators.map(comparator => (
                        <option key={comparator} value={comparator}>
                            {intl.formatMessage({ id: `comparator.${comparator}` })}
                        </option>
                    ))}
                </select>
            </span>
        )
    }
}

Comparator.propTypes = {
    intl:        intlShape,
    comparators: PropTypes.array.isRequired,
    onChange:    PropTypes.func.isRequired,
}

Comparator.defaultProps = {
    comparators: [
        COMPARATOR_EQUAL,
        COMPARATOR_NOT_EQUAL,
        COMPARATOR_IN,
        COMPARATOR_STARTS_WITH,
        COMPARATOR_ENDS_WITH,
        COMPARATOR_GREATER_THAN,
        COMPARATOR_LOWER_THAN,
    ]
}


export default injectIntl(Comparator)
