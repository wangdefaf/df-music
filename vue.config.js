const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isProduction = process.env.NODE_ENV === 'production'
const isAnalyze = process.env.ANALYZE === 'true'

module.exports = {
  // 基础路径
  publicPath: isProduction ? '/df-music/' : '/',
  
  // 输出目录
  outputDir: 'dist',
  
  // 静态资源目录
  assetsDir: 'static',
  
  // 生产环境关闭 source map
  productionSourceMap: !isProduction,
  
  // 开发服务器配置
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // 代理配置
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  
  // CSS相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: isProduction,
    // 开启 CSS source maps
    sourceMap: !isProduction,
    // CSS预处理器配置
    loaderOptions: {
      sass: {
        // 全局引入变量和混入
        prependData: `
          @import "@/assets/css/variables.scss";
          @import "@/assets/css/mixins.scss";
        `
      }
    }
  },
  
  // webpack配置
  configureWebpack: config => {
    // 生产环境优化
    if (isProduction) {
      // 代码压缩
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      
      // 插件配置
      const plugins = [
        // gzip压缩
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 8192,
          minRatio: 0.8,
          deleteOriginalAssets: false
        })
      ]
      
      // 打包分析
      if (isAnalyze) {
        plugins.push(new BundleAnalyzerPlugin())
      }
      
      config.plugins.push(...plugins)
    }
    
    // 路径别名
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      'components': path.resolve(__dirname, 'src/components'),
      'views': path.resolve(__dirname, 'src/views'),
      'assets': path.resolve(__dirname, 'src/assets'),
      'network': path.resolve(__dirname, 'src/network'),
      'utils': path.resolve(__dirname, 'src/utils')
    }
  },
  
  // webpack链式配置
  chainWebpack: config => {
    // 移除预加载
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    
    // 图片压缩
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: false },
        pngquant: { quality: [0.65, 0.90], speed: 4 },
        gifsicle: { interlaced: false },
        webp: { quality: 75 }
      })
    
    // 代码分割
    if (isProduction) {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial'
          },
          elementUI: {
            name: 'chunk-elementUI',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/
          },
          commons: {
            name: 'chunk-commons',
            test: path.resolve(__dirname, 'src/components'),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
    }
    
    // SVG优化
    config.module
      .rule('svg')
      .exclude.add(path.resolve('src/assets/icons'))
      .end()
    
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
  
  // PWA配置
  pwa: {
    name: 'DF Music',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/sw.js'
    }
  },
  
  // 多线程构建
  parallel: require('os').cpus().length > 1,
  
  // 插件选项
  pluginOptions: {
    // 自动导入组件
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/assets/css/variables.scss'),
        path.resolve(__dirname, 'src/assets/css/mixins.scss')
      ]
    }
  }
}