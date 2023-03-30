const http = require('http');
const url = require('url');
const {router} = require("./router");

const hostname = '127.0.0.1'
const port = 4000

const server = http.createServer(function (req, res) {
    const requestedUrl = url.parse(req.url, true)
    const routeHandler = router(requestedUrl, res)

    let responseData = {
        data: null,
        error: null,
    }

    if (routeHandler) {
        res.statusCode = '200'

        const data = routeHandler(req, res)
        responseData.data = data
        responseData.error = null

    } else {
        res.statusCode = '404'

        responseData.data = null
        responseData.error = 'Not found'
    }

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(responseData))
});

server.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`)
})
