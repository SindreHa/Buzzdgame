// setupProxy.js
import proxy from 'http-proxy-middleware'
export default function(app) {
  app.use(proxy('/.netlify/functions/', { 
    target: 'http://localhost:9000/',
    "pathRewrite": {
      "^/\\.netlify/functions": ""
    }
  }))
}