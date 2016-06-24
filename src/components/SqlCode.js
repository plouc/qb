import React, { Component, PropTypes } from 'react'
import generateJavascript              from '../lib/generateSql'


class SqlCode extends Component {
    render() {
        const { group, groups, conditions, operators } = this.props

        return (
            <pre className="sql-code">
                {generateJavascript({
                    type: 'group', id: group.id
                }, {
                    groups, conditions, operators
                })}
            </pre>
        )
    }
}

SqlCode.propTypes = {
    group: PropTypes.shape({
        id:         PropTypes.string.isRequired,
        components: PropTypes.array.isRequired,
    }),
    groups:     PropTypes.object.isRequired,
    conditions: PropTypes.object.isRequired,
    operators:  PropTypes.object.isRequired,
}


export default SqlCode
