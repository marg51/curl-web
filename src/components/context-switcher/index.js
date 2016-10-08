export default app => {
    app.directive("contextSwitcher", () => {
        return {
            scope: true,
            template: require("./index.html"),
            controller($scope, Context, $uibModal) {
                $scope.context = Context.get()

                $scope.openEditor = () => {
                    $uibModal.open({
                        template: `<div context-editor></div>`
                    })
                }
            }
        }
    })
}