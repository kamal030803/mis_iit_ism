const { createServer } = require('https')
const { parse } = require('url')
const next = require('next')
const fs = require("fs");
const dev = process.env.NODE_ENV !== 'production'
const hostname = '172.17.0.81'
const port = 443
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

const httpsOptions = {
  key: fs.readFileSync('/etc/pki/tls/private/wild.iitism.key', 'utf8'),
  cert: fs.readFileSync('/etc/pki/tls/certs/*.iitism.ac.in.crt', 'utf8'),
};

app.prepare().then(() => {
  createServer(httpsOptions,async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      if (pathname === '/a') {
        await app.render(req, res, '/a', query)
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query)
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      console.error(err)
        console.log(dev)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(dev)
      console.log(`> Ready on https://${hostname}:${port}`)
    })
})
