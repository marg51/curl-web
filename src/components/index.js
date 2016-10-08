import listQueries from "./list-queries"
import dynamicField from "./dynamic-field"
import response from "./response"
import directives from "./directives"
import tests from "./tests"
import filters from "./filters"
import contextSwitcher from "./context-switcher"
import contextEditor from "./context-editor"

export default app => {
    listQueries(app)
    dynamicField(app)
    response(app)
    tests(app)
    contextSwitcher(app)
    contextEditor(app)

    directives(app)
    filters(app)
}