import React, { Component, PropTypes } from 'react'
import { FormattedMessage }            from 'react-intl'
import Operator                        from './Operator'
import Condition                       from './Condition'


class ConditionGroup extends Component {
    constructor(props) {
        super(props)

        this.handleAddClause = this.handleAddClause.bind(this)
        this.handleAddGroup  = this.handleAddGroup.bind(this)
        this.handleDelete    = this.handleDelete.bind(this)
    }

    handleAddClause() {
        const { group, onAddCondition } = this.props
        onAddCondition(group.id)
    }

    handleDelete() {
        const { group, onGroupRemoval } = this.props
        onGroupRemoval(group.id)
    }

    handleAddGroup() {
        const { group, onAddGroup } = this.props
        onAddGroup(group.id)
    }

    render() {
        const { group, groups, conditions, operators, onConditionUpdate, onOperatorUpdate } = this.props

        const nodes = [];
        group.components.forEach(component => {
            switch (component.type) {
                case 'group':
                    nodes.push(
                        <ConditionGroup
                            key={component.id}
                            {...this.props}
                            group={groups[component.id]}
                        />
                    )
                    break

                case 'condition':
                    nodes.push(
                        <Condition
                            key={component.id}
                            condition={conditions[component.id]}
                            onUpdate={onConditionUpdate}
                        />
                    )
                    break

                case 'operator':
                    nodes.push(
                        <Operator
                            key={component.id}
                            operator={operators[component.id]}
                            onUpdate={onOperatorUpdate}
                        />
                    )
                    break
            }

        })

        return (
            <span className="condition-group">
                {nodes}
                <span className="condition-group_add-clause" onClick={this.handleAddClause}>
                    +
                </span>
                <span className="condition-group_add-group" onClick={this.handleAddGroup}>
                    +()
                </span>
                <span className="condition-group_delete" onClick={this.handleDelete}>
                    x
                </span>
            </span>
        )
    }
}

ConditionGroup.propTypes = {
    group:             PropTypes.object.isRequired,
    groups:            PropTypes.object.isRequired,
    conditions:        PropTypes.object.isRequired,
    operators:         PropTypes.object.isRequired,
    onAddCondition:    PropTypes.func.isRequired,
    onAddGroup:        PropTypes.func.isRequired,
    onGroupRemoval:    PropTypes.func.isRequired,
    onOperatorUpdate:  PropTypes.func.isRequired,
    onConditionUpdate: PropTypes.func.isRequired,
}


export default ConditionGroup
