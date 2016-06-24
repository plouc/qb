import { COMPARATOR_EQUAL } from '../constants/comparators'
import { OPERATOR_AND }     from '../constants/operators'
import uuid                 from 'uuid'
import {
    ADD_GROUP_CONDITION,
    ADD_GROUP_GROUP,
    DELETE_GROUP,
    UPDATE_CONDITION,
    UPDATE_OPERATOR,
} from '../constants/actionTypes'

const defaultCondition = {
    property:   '',
    comparator: COMPARATOR_EQUAL,
    value:      '',
}

const defaultOperator = {
    operator: OPERATOR_AND
}

const ROOT_ID = 'root'
const defaultState = {
    root:   ROOT_ID,
    groups: {
        [ROOT_ID]: {
            id:         ROOT_ID,
            components: []
        }
    },
    conditions: {},
    operators:  {}
}

const cleanup = (group, component) => {

}


export default function groups(state = defaultState, action = {}) {
    let append
    let newOperator

    switch (action.type) {
        case ADD_GROUP_CONDITION:
            const newCondition = {
                ...defaultCondition,
                id: uuid.v4(),
            }

            newOperator = {
                ...defaultOperator,
                id: uuid.v4(),
            }

            append = [{
                type: 'condition',
                id:   newCondition.id,
            }]

            if (state.groups[action.id].components.length > 0) {
                append.unshift({
                    type: 'operator',
                    id:   newOperator.id,
                })
            }

            return {
                ...state,
                groups: {
                    ...state.groups,
                    [action.id]: {
                        ...state.groups[action.id],
                        components: [
                            ...state.groups[action.id].components,
                            ...append,
                        ]
                    }
                },
                conditions: {
                    ...state.conditions,
                    [newCondition.id]: newCondition,
                },
                operators: {
                    ...state.operators,
                    [newOperator.id]: newOperator,
                }
            }

        case ADD_GROUP_GROUP:
            const newGroup = {
                id:         uuid.v4(),
                components: [],
            }

            newOperator = {
                ...defaultOperator,
                id: uuid.v4(),
            }

            append = [{
                type: 'group',
                id:   newGroup.id,
            }]

            if (state.groups[action.id].components.length > 0) {
                append.unshift({
                    type: 'operator',
                    id:   newOperator.id,
                })
            }

            return {
                ...state,
                groups: {
                    ...state.groups,
                    [action.id]: {
                        ...state.groups[action.id],
                        components: [
                            ...state.groups[action.id].components,
                            ...append,
                        ]
                    },
                    [newGroup.id]: newGroup,
                },
                operators: {
                    ...state.operators,
                    [newOperator.id]: newOperator,
                }
            }

        case DELETE_GROUP:
            let filteredGroups = { ...state.groups }
            delete filteredGroups[action.id]

            let group
            for (let groupId in filteredGroups) {
                group = state.groups[groupId]
                let groupIndex = group.components.findIndex(({ type, id }) => type === 'group' && id === action.id)

                if (groupIndex !== -1) {
                    const components = group.components.slice()
                    components.splice(groupIndex === 0 ? groupIndex : groupIndex - 1, 2)
                    filteredGroups = {
                        ...filteredGroups,
                        [group.id]: {
                            ...group,
                            components,
                        }
                    }
                }
            }

            return {
                ...state,
                groups: { ...filteredGroups }
            }

        case UPDATE_CONDITION:
            return {
                ...state,
                conditions: {
                    ...state.conditions,
                    [action.id]: {
                        ...state.conditions[action.id],
                        ...action.patch
                    },
                }
            }

        case UPDATE_OPERATOR:
            return {
                ...state,
                operators: {
                    ...state.operators,
                    [action.id]: {
                        ...state.operators[action.id],
                        ...action.patch,
                    }
                }
            }

        default:
            return state
    }
}
