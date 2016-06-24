import React, { Component, PropTypes } from 'react'
import ConditionGroup                  from './ConditionGroup'


class Query extends Component {
    render() {
        const { query } = this.props

        return (
            <div className="query">
                <ConditionGroup
                    {...this.props}
                    group={query}
                />
            </div>
        )
    }
}

const { object, func } = PropTypes
Query.propTypes = {
    query:             object.isRequired,
    groups:            object.isRequired,
    conditions:        object.isRequired,
    operators:         object.isRequired,
    onAddCondition:    func.isRequired,
    onAddGroup:        func.isRequired,
    onGroupRemoval:    func.isRequired,
    onOperatorUpdate:  func.isRequired,
    onConditionUpdate: func.isRequired,
}


export default Query
