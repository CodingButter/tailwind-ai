import actions from "./execute"

const AIToolsArray = Object.keys(actions).map((action) => {
    const { exec, ...rest } = actions[action]
    return rest;
})

export default AIToolsArray;