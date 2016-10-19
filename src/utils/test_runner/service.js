const vm = require('vm')

export const TestRunner = function TestRunnerFactory($parse, $timeout, $q) {

    return {
        run
    }

    function run(string_test, data) {

        window.jasmine = jasmineRequire.core(jasmineRequire);
        var env = jasmine.getEnv();
        var jasmineInterface = jasmineRequire.interface(jasmine, env);

        const reporter = createJasmineReporter()
        env.addReporter(reporter);

        let context = vm.createContext({
            ...jasmineInterface,
            console,
            data,
            _
        })

        try {
            const result = vm.Script(string_test).runInContext(context)
            env.execute()
        } catch(e) {
            debugger

        }

        return {
            results: reporter.getResults(),
            promise: reporter.getPromise()
        }
    }

    function createJasmineReporter() {

        const deferred = $q.defer()
        const results = {
            passed: 0,
            failed: 0,
            total: 0,
            children: [],
            specs: []
        }
        return {
            jasmineStarted: function(result) {
                results.current = results
                results.isLoading = true
            },
            suiteStarted: function(result) {
                const suite = {
                    ...result,
                    children: [],
                    specs: [],
                    parent: results.current
                }

                results.current.children.push(suite)
                results.current = suite
            },
            specStarted: function(result) {
                results.total++
                results.current.specs.push(result)
            },
            specDone: function(result) {
                if(!results[result.status])
                    results[result.status] = 1
                else results[result.status]++
            },
            suiteDone: function(result) {
                results.current = results.current.parent

                console.log("suiteDone", result)
            },
            jasmineDone: function(result) {
                results.isLoading = false
                results.isLoaded = true
                console.log("jasmineDone", result)
                deferred.resolve(results)
                $timeout(angular.noop,0) // $digest or not to digest /shrug
            },
            getResults() {return results},
            getPromise() {return deferred.promise}
        }
    }
}
