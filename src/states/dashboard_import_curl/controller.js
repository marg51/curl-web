export default function DashboardCreatequeryController($scope, QueryBuilder, $state, QueryStorage) {
    $scope.import = (curl_string) => {
        const query = QueryBuilder.createQueryFromCurl(curl_string)
        const {id} = query

        QueryStorage.add(query);


        $state.go("editor.show", {id})
    }
}