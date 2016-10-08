export const Context = function ContextFactory() {
    const context = {
        environments: {
            production: {
                hostname: "https://networklocum.com",
                profiles: {
                    staff: {
                        token: "123"
                    }
                },
                profile: "staff"
            }
        }
    }

    context.environment = context.environments.production

    return {
        get() {
            return context
        }
    }
}