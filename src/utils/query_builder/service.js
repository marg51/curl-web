import {parse} from "./helper"

export const QueryBuilder = function QueryBuilderFactory() {
    return {
        createQueryFromCurl,
        restaureQuery,
        stringifyQuery
    }

    /** Create a new query from a curl command
      * @params {string:curl_string} "curl google.com"
      */
    function createQueryFromCurl(curl_string) {
        // @throw if the string is not a curl command
        const curl = parse(curl_string)

        const decomposedUrl = curl.url.match(/^(https?):\/\/([^\/]*)(\/[^\?]*)?(\?.*)?/)

        if(!decomposedUrl) {
            console.warn("/^(https?):\/\/([^\/]*)(\/[^\?]*)?(\?.*)?/", curl.url)
            throw new Error("couldn't parse url")
        }

        let query = {
            name: decomposedUrl[3],
            config: `var result = ${JSON.stringify({
                scheme: decomposedUrl[1],
                hostname: decomposedUrl[2],
                endpoint: decomposedUrl[3],
                getParams: decomposedUrl[4],
                url: curl.url,
                method: curl.method,
                headers: curl.headers,
                body: JSON.parse(curl.data.ascii)
            }, null, 4)}`,
            tests: `
                describe("MyTest", () => {
                    it("should have valid status code", () => {
                        expect(data.status).toBeGreaterThan(200)
                        expect(data.status).toBeLowerThan(300)
                    })
                })`

        }

        return query
    }

    function restaureQuery(query) {
        return query
        // query.config.tests = new Function(query.config.tests)
    }

    function stringifyQuery(query) {

        return query
        // return {...query, config: {...query.config, tests: query.config.tests.toString()}}
    }
}