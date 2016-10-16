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

        const decomposedUrl = curl.url.match(/^(https?):\/\/([^\/]*)(\/[^\?]*)?(\?.*)?/)

        if(!decomposedUrl) {
            console.warn("/^(https?):\/\/([^\/]*)(\/[^\?]*)?(\?.*)?/", curl.url)
            throw new Error("couldn't parse url")
        }

        let query = {
            name: curl.method + " " + decomposedUrl[3],
            scheme: decomposedUrl[1],
            hostname: decomposedUrl[2],
            endpoint: decomposedUrl[3],
            getParams: decomposedUrl[4],
            headers: `var result = ${JSON.stringify(curl.headers)}`,
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
            headers: query.headers
        }

    }
}