export default function EditorShowController($scope, QueryStorage, QueryRunner, $stateParams, TestRunner, $parse) {
    $scope._ = {
        content: "body",
        contentResponse: "response"
    }

    $scope.query = QueryStorage.get($stateParams.id)

    $scope.trigger = () => {
        delete $scope.response

        return QueryRunner.run($scope.query) // second value is a random context for now
            .then(data => {
                $scope.tests = TestRunner.run($scope.query.tests, data)

                return data
            })
            .then(data => $scope.response = data)
            .catch(data => $scope.response = data)
    }
}