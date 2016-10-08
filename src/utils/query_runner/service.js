export const QueryRunner = function QueryRunnerFactory($http, Context) {

    return {
        run
    }

    function run(query, context = Context.get()) {
        const method = query.method.toLowerCase()

        if(!$http[method]) {
            throw new Error(`"${method}" is not a valid method`)
        }

        const headers = _.reduce(query.headers, (state, header, key) => {
            if(typeof header == "function") {
                try {
                    state[key] = header(context)
                } catch(e) {
                    console.warn("couldn't execute header")
                }
            } else {
                state[key] = header
            }

            return state
        }, {})

        if(method == "get") {
            return $http[method](query.url, query.params, {headers})
        }

        // no params yet
        return $http[method](query.url, query.body, {headers})
    }
}