const vm = require('vm')

export const TestRunner = function TestRunnerFactory($parse) {

    return {
        run
    }

    function run(string_test, data) {

        window.jasmine = jasmineRequire.core(jasmineRequire);
        var env = jasmine.getEnv();
        var jasmineInterface = jasmineRequire.interface(jasmine, env);

        env.addReporter(jasmineInterface.jsApiReporter);

        let context = vm.createContext({
            ...jasmineInterface,
            console,
            data
        })

        try {
            const result = vm.Script(string_test).runInContext(context)
            env.execute()
        } catch(e) {
            debugger

        }

        return jasmineInterface.jsApiReporter
    }
}