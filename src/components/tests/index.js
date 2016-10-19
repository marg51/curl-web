export default app => {
    app.directive("tests", () => {
        return {
            scope: {
                tests: "="
            },
            template: require("./index.html")
        }
    })

    app.directive("testSuite", () => {
        return {
            template: `
            <div style="padding-left: 15px;">
                <b>{{test.description}}</b><br />
                <ul class="list-unstyle">
                    <li ng-repeat="spec in test.specs" ng-class="{'text-success':spec.status == 'passed'}">
                        {{spec.description}}
                        <span ng-if="spec.status == 'failed'" ng-repeat="error in spec.failedExpectations" class="text-danger">{{error.message}}</span>
                    </li>
                </ul>
                <div ng-repeat="test in test.children" test-suite></div>
            </div>`
        }
    })
}