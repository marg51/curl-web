export default app => {
    app.directive("listQueries", (HistoryStorage) => {
        return {
            scope: {
                queries: "="
            },
            template: require("./index.html"),
            link: (scope) => {
                scope.history = HistoryStorage.get()
            }
        }
    })

    require("./index.less")
}