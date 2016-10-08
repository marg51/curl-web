import {parse} from "./helper"

export const QueryBuilder = function QueryBuilderFactory() {
    return {
        createQueryFromCurl,
        restaureQuery
    }

    /** Create a new query from a curl command
      * @params {string:curl_string} "curl google.com"
      */
    function createQueryFromCurl(curl_string) {
        // @throw if the string is not a curl command
        const curl = parse(curl_string)

        let query = {
            name: curl.url,
            headers: {
                // example of function as value
                timestamp: (context) => {
                    return context.hostname
                },
                ...curl.headers
            },
            body: curl.data.ascii,
            method: curl.method,
            url: curl.url,
            tests: `expect(data.status).to.equal(200)

                    expect(data.data.id).to.equal(1)`.replace(/[ \t]*/g, "")
        }

        return query
    }

    function restaureQuery(query) {

        return {
            ...query,
            headers: {
                ...query.headers,
                timestamp: (context) => {
                    return context.environment.hostname
                },
            }
        }

    }
}