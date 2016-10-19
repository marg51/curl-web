export default app => {
    app.directive("codeEditor", ($timeout) => {
        return {
            scope: {
                value:"=",
                config: "@"
            },
            link: (scope, elm) => {
                function wait() {
                    if(typeof monaco != "undefined") return $timeout(angular.noop, 0)

                    return $timeout(wait, 2000)
                }



                wait().then(() => {
                    window.editor = monaco.editor.create(elm[0], {
                        value: scope.value,
                        language: 'javascript',
                        roundedSelection: false,
                        scrollBeyondLastLine: false,
                        readOnly: false,
                        theme: "vs-dark",
                        ...scope.$eval(scope.config)
                    });
                    editor.onDidBlurEditor(() => {
                        scope.value = editor.getValue()
                        scope.$apply()
                    })
                })

            }
        }
    })
}