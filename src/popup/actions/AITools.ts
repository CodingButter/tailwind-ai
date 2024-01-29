import actions from "./execute"

const AITools = actions.map((action) => {
    return {
        type: action.type,
        function: action.function
    }
})

export default AITools;