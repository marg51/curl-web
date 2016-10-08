export default app => {
    app.directive("contextEditor", () => {
        return {
            scope: true,
            template: require("./index.html"),
            controller($scope, Context) {
                $scope.context = Context.get()
            }
        }
    })
}