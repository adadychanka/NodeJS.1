const url = require('url');
const usersService = require("./usersService");

const ROUTES = {
    USERS: '/users'
}

const ROUTES_HANDLERS = {
    [ROUTES.USERS]: function (req, res) {
        const queryParams = url.parse(req.url, true).query

        const query = {
            fullNameSearch: queryParams.fullNameSearch,
            minAge: Number(queryParams.minAge),
            maxAge: Number(queryParams.maxAge),
            type: queryParams.type,
            limit: Number(queryParams.limit),
        }

        return usersService.getUsers(query)
    }
}

function isExactMatch(pathname, route) {
    if (!pathname) {
        return false
    }

    return pathname.match(new RegExp(`^${route}$`))
}

function router(requestedUrl, res) {
    const pathname = requestedUrl.pathname

    let routeHandler = null

    for (const key in ROUTES) {
        const route = ROUTES[key]

        if (isExactMatch(pathname, route)) {
            routeHandler = ROUTES_HANDLERS[route]

            break;
        }
    }

    return routeHandler
}

module.exports = {
    router,
}