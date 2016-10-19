import {QueryStorage} from "./service"

export default app => {
    app.factory("QueryStorage", QueryStorage)

    app.factory("HistoryStorage", () => {
        var history = localStorage.getItem("curl-web-query-history")

        if(history) {
            history = JSON.parse(history)
        } else {
            history = {}
        }

        return {
            get() {return history},
            add(id, value) {
                if(!history[id]) {
                    history[id] = []
                }

                history[id].unshift(value)

                return this
            },
            save() {localStorage.setItem("curl-web-query-history", JSON.stringify(history))}
        }
    })
}