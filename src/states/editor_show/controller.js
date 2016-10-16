export default function EditorShowController($scope, QueryStorage, QueryRunner, $stateParams, TestRunner, $parse) {
    $scope._ = {
        content: "body",
        contentResponse: "response"
    }

    $scope.query = QueryStorage.get($stateParams.id)

    $scope.trigger = () => {
        QueryStorage._save()
        delete $scope.response

        return QueryRunner.run($scope.query) // second value is a random context for now
            .then(data => {
                delete $scope._.content
                // $scope.tests = TestRunner.run($scope.query.tests, data)

                return data
            })
            .then(data => $scope.response = JSON.stringify(data.data, null, 4))
            .catch(data => $scope.response = data)
    }
}