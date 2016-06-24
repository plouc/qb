import {
    OPERATOR_AND,
    OPERATOR_OR,
} from '../constants/operators'
const operatorMapping = {
    [OPERATOR_AND]: '&&',
    [OPERATOR_OR]:  '||',
}

import {
    COMPARATOR_EQUAL,
    COMPARATOR_NOT_EQUAL,
    COMPARATOR_IN,
    COMPARATOR_STARTS_WITH,
    COMPARATOR_ENDS_WITH,
    COMPARATOR_GREATER_THAN,
    COMPARATOR_LOWER_THAN,
} from '../constants/comparators'
const comparatorMapping = {
    [COMPARATOR_EQUAL]:        '===',
    [COMPARATOR_NOT_EQUAL]:    '!==',
    [COMPARATOR_STARTS_WITH]:  'startsWith',
    [COMPARATOR_ENDS_WITH]:    'endsWith',
    [COMPARATOR_GREATER_THAN]: '>',
    [COMPARATOR_LOWER_THAN]:   '<',
}


const traverseNode = (node, entities) => {
    switch (node.type) {
        case 'group':
            const group = entities.groups[node.id]
            return `(${group.components.map(component => traverseNode(component, entities)).join(' ')})`

        case 'operator':
            return operatorMapping[entities.operators[node.id].operator]

        case 'condition':
            const { property, comparator, value } = entities.conditions[node.id]
            if (comparator === COMPARATOR_IN) {
                return `['${value.split(',').join('\', \'')}'].includes(${property})`
            } else if ([COMPARATOR_STARTS_WITH, COMPARATOR_ENDS_WITH].includes(comparator)) {
                return `${property}.${comparatorMapping[comparator]}('${value}')`
            }
            return `${property} ${comparatorMapping[comparator]} '${value}'`
    }
}


export default traverseNode;
