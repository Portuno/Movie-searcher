module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Movie-searcher/' 
    : '/',
  transpileDependencies: true
}
