const vm = require("vm")

export const QueryRunner = function QueryRunnerFactory($http, Context, QueryStorage) {

    return {
        run
    }

    function run(query, context = Context.get()) {
        const method = query.method.toLowerCase()

        if(!$http[method]) {
            throw new Error(`"${method}" is not a valid method`)
        }
        const vmContext = {
            context: context.environments[context.environment],
            getQuery: QueryStorage.get,
            console,
            _,
            executeInContext: (value) => {
                const localCtx = vm.createContext(vmContext)
                vm.runInContext(value, localCtx)

                return localCtx
            }
        }
        const vmContextHeaders = vm.createContext(vmContext)
        const headers = vm.runInContext(query.headers, vmContextHeaders) || vmContextHeaders.result

        const vmContextBody = vm.createContext(vmContext)
        const body = vm.runInContext(query.body, vmContextBody) || vmContextBody.result

        let url
        if(vmContextHeaders.hostname) {
            url = vmContextHeaders.hostname + query.endpoint + query.getParams
        } else {
            url = query.scheme+"://"+query.hostname + query.endpoint + query.getParams
        }

        if(method == "get") {
            return $http[method](url, query.params, {headers})
        }

        // no params yet
        return $http[method](url, body, {headers})
    }

}