export default function EditorShowController($scope, QueryStorage, HistoryStorage, QueryRunner, $stateParams, TestRunner, $parse) {
    $scope._ = {
        content: "config",
        contentResponse: "response"
    }

    $scope.query = QueryStorage.get($stateParams.id)
    $scope.history = HistoryStorage.get()

    $scope.trigger = () => {
        QueryStorage._save()
        delete $scope.response

        return QueryRunner.run($scope.query)
            .then(data => {
                delete $scope._.content
                const tests = TestRunner.run($scope.query.tests, data)

                $scope.tests = tests.results

                tests.promise.then(data => {
                    var {passed, failed, total} = data
                    HistoryStorage.add($scope.query.id, {passed, failed, total, date: new Date}).save()
                })

                return data
            })
            .then(data => $scope.response = JSON.stringify(data.data, null, 4))
            .catch(data => $scope.response = data)
    }
}