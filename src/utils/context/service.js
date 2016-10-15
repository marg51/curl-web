export const Context = function ContextFactory() {
    let context = localStorage.getItem("curl-web-context")

    if(context) {
        context = JSON.parse(context)
    } else {
        context = {
            environments: {
                production: {
                    hostname: "https://networklocum.com",
                }
            },
            environment: "production"
        }
    }

    return {
        get() {
            return context
        },
        save() {
            localStorage.setItem("curl-web-context", angular.toJson(context))
        }
    }
}