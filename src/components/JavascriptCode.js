import React, { Component, PropTypes } from 'react'
import generateJavascript              from '../lib/generateJavascript'


class JavascriptCode extends Component {
    render() {
        const { group, groups, conditions, operators } = this.props

        return (
            <pre className="javascript-code">
                {generateJavascript({
                    type: 'group', id: group.id
                }, {
                    groups, conditions, operators
                })}
            </pre>
        )
    }
}

JavascriptCode.propTypes = {
    group: PropTypes.shape({
        id:         PropTypes.string.isRequired,
        components: PropTypes.array.isRequired,
    }),
    groups:     PropTypes.object.isRequired,
    conditions: PropTypes.object.isRequired,
    operators:  PropTypes.object.isRequired,
}


export default JavascriptCode
