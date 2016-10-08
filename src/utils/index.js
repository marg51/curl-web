import query_builder from "./query_builder"
import query_runner from "./query_runner"
import test_runner from "./test_runner"
import query_storage from "./storage"
import context from "./context"

export default app => {
    query_builder(app)
    query_runner(app)
    test_runner(app)
    query_storage(app)
    context(app)
}