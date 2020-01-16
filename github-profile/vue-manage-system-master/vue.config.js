module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api':{
                target:'http://jsonplaceholder.typicode.com',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            },
            '/v1': {
                target: 'http://localhost:3000/v1',
                changeOrigin: true,
                pathRewrite: {          
                    '^/v1': 'http://localhost:8080'
                  }
            }
        }
    }
}