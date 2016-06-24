import {
    ADD_GROUP_CONDITION,
    ADD_GROUP_GROUP,
    DELETE_GROUP,
    UPDATE_OPERATOR,
    UPDATE_CONDITION,
} from '../constants/actionTypes'


export function addGroupCondition(id) {
    return {
        type: ADD_GROUP_CONDITION,
        id
    }
}

export function addGroupGroup(id) {
    return {
        type: ADD_GROUP_GROUP,
        id
    }
}

export function deleteGroup(id) {
    return {
        type: DELETE_GROUP,
        id
    }
}

export function updateOperator(id, patch) {
    return {
        type: UPDATE_OPERATOR,
        id, patch,
    }
}

export function updateCondition(id, patch) {
    return {
        type: UPDATE_CONDITION,
        id, patch,
    }
}