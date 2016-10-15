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
                    }).result.finally(() => {
                        Context.save()
                    })
                }

                $scope.$watch("context.environment", env => {
                    if(env) Context.save()
                })
            }
        }
    })
}