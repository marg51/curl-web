const vm = require("vm")

export const QueryRunner = function QueryRunnerFactory($http, Context, QueryStorage) {

    return {
        run
    }

    function run(query, context = Context.get()) {


        const contextToSend = {
            context: context.environments[context.environment],
            getQuery: QueryStorage.get,
            _ // el lodashito (:
        }
        const vmContext = vm.createContext(contextToSend)
        vm.runInContext(query.config, vmContext)
        const config = vmContext.result

        const method = config.method.toLowerCase()
        if(!$http[method]) {
            throw new Error(`"${method}" is not a valid method`)
        }

        let url
        url = config.scheme+"://"+config.hostname + config.endpoint + config.getParams

        if(method == "get") {
            return $http[method](url, {headers: config.headers})
        }

        // no params yet
        return $http[method](url, config.body, {headers:config.headers})
    }

}