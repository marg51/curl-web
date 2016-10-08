require("angular")
require("angular-ui-router")
require("jsonformatter")
require("jsonformatter/dist/json-formatter.min.css")
require("angular-uuid")
require("lodash")
require("angular-ui-bootstrap")

const app = angular.module("app", [
    "ui.router",
    "jsonFormatter",
    "angular-uuid",
    "ui.bootstrap"
])

// initialize our modules
import utils from "./utils"
utils(app)

import states from "./states"
states(app)

import components from "./components"
components(app)

import run from './app.run'
run(app)

require("./styles/index.less")