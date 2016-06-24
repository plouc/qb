import React, { Component, PropTypes } from 'react'
import { connect }                     from 'react-redux'
import Combokeys                       from 'combokeys'
import Query                           from '../components/Query'
import { IntlProvider, addLocaleData } from 'react-intl'
import en                              from 'react-intl/locale-data/en'
import fr                              from 'react-intl/locale-data/fr'
import translations                    from '../translations/'
import JavascriptCode                  from '../components/JavascriptCode'
import SqlCode                         from '../components/SqlCode'
import {
    addGroupCondition,
    addGroupGroup,
    deleteGroup,
    updateOperator,
    updateCondition,
} from '../actions/'


addLocaleData([...en, ...fr])


class App extends Component {
    constructor(props) {
        super(props)

        this.handleLocaleSwitch = this.handleLocaleSwitch.bind(this)

        this.state = {
            locale: 'fr'
        }
    }

    handleLocaleSwitch(e) {
        this.setState({ locale: e.target.value })
    }

    componentDidMount() {
        const combokeys = new Combokeys(document.documentElement)
    }

    render() {
        const { locale } = this.state
        const { query, groups, conditions, operators } = this.props

        //<pre>{JSON.stringify(query, null, '  ')}</pre>

        return (
            <div style={{ fontFamily: 'consolas' }}>
                <header style={{ marginBottom: '10px' }}>
                    <h1 style={{ display: 'inline-block' }}>QB</h1>
                    &nbsp;
                    <select onChange={this.handleLocaleSwitch}>
                        <option value="fr">français</option>
                        <option value="en">english</option>
                    </select>
                </header>
                <IntlProvider locale={locale} messages={translations[locale]}>
                    <div>
                        <Query {...this.props} />
                        <h3>javascript</h3>
                        <JavascriptCode
                            group={query}
                            groups={groups}
                            conditions={conditions}
                            operators={operators}
                        />
                        <h3>SQL</h3>
                        <SqlCode
                            group={query}
                            groups={groups}
                            conditions={conditions}
                            operators={operators}
                        />
                    </div>
                </IntlProvider>
            </div>
        );
    }
}

App.propTypes = {
    query:             PropTypes.object.isRequired,
    groups:            PropTypes.object.isRequired,
    conditions:        PropTypes.object.isRequired,
    operators:         PropTypes.object.isRequired,
    onAddCondition:    PropTypes.func.isRequired,
    onAddGroup:        PropTypes.func.isRequired,
    onGroupRemoval:    PropTypes.func.isRequired,
    onOperatorUpdate:  PropTypes.func.isRequired,
    onConditionUpdate: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    const { root, groups, conditions, operators } = state.query

    return {
        query: groups[root],
        groups,
        conditions,
        operators,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddCondition: id => {
            dispatch(addGroupCondition(id))
        },
        onAddGroup: id => {
            dispatch(addGroupGroup(id))
        },
        onGroupRemoval: id => {
            dispatch(deleteGroup(id))
        },
        onOperatorUpdate: (operatorId, patch) => {
            dispatch(updateOperator(operatorId, patch))
        },
        onConditionUpdate: (conditionId, patch) => {
            dispatch(updateCondition(conditionId, patch))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)