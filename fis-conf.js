// 只需要编译 html 文件，以及其用到的资源。
//默认环境

var env_default_baseUrl = '/';
var env_default_apiHost='/kaola-delivery-web/';

fis.set('project.files', ['*.html', 'map.json','test/**']);

fis.match('*.js', {
    isMod: true
});

fis.match('/static/lib/*.js', {
    isMod: false
});

fis.match('static/lib/GLOBAL_config.js', {
    globalVars: { apiHost: env_default_apiHost, baseUrl:env_default_baseUrl },
    parser: fis.plugin('global-vars')
});

//配置mock接口模拟
fis.match('/test/**', {
    release: '$0',
    isMod: false
});
fis.match('/test/server.conf', {
    release: '/config/server.conf'
});

fis.hook('cmd', {
  baseUrl: '/',

  paths: {
      "navigation": "components/navigation/navigation.js",
      "App": "components/util/App.js"
}
});

fis.match('::packager', {
  postpackager: fis.plugin('loader')
});

// 注意： fis 中的 sea.js 方案，不支持部分打包。
// 所以不要去配置 packTo 了，运行时会报错的。

//公网环境
var env_prod_baseUrl = '/store/';
var env_prod_apiHost='/kaola-delivery-web/';

fis
    .media('prod')
    .set('project.ignore', [
        'test/**',
        'node_modules/**',
        '.git/**',
        '.svn/**'
    ])
    .match('*.css', {
        // fis-optimizer-clean-css 插件进行压缩，已内置
        optimizer: fis.plugin('clean-css')
    })
    .match('*.png', {
        // fis-optimizer-png-compressor 插件进行压缩，已内置
        optimizer: fis.plugin('png-compressor')
    })
    .match('static/lib/GLOBAL_config.js', {
        globalVars: { apiHost: env_prod_apiHost, baseUrl: env_prod_baseUrl},
        parser: fis.plugin('global-vars')
    })
    .match('components/**', {
        url: env_prod_baseUrl + '$0'
    })
    .match('static/**', {
        url: env_prod_baseUrl + '$0'
    })
    .match('/spm_modules/**.js', {
        url: env_prod_baseUrl + '$0',
        optimizer: fis.plugin('uglify-js')
    })
    .match('::packager', {
        postpackager: fis.plugin('loader', {
            allInOne: {
                includeAsyncs: true,
                css: '/pkg/${filepath}_aio.css',
                js: '/pkg/${filepath}_aio.js',
                urlCss: env_prod_baseUrl + '/pkg/${filepath}_aio.css',
                urlJs: env_prod_baseUrl + '/pkg/${filepath}_aio.js',
                ignore: ['/static/lib/sea.js']
            }
        })
    });

//测试环境,110和13配置一样，所以统一用test配置
var env_test_baseUrl = '/h5/warehouse/store/';
var env_test_apiHost='/h5/warehouse/kaola-delivery-web/';

fis
    .media('test')
    .set('project.ignore', [
        //'test/**',//如果不用模拟接口则取消该行注释
        'node_modules/**',
        '.git/**',
        '.svn/**'
    ])
    .match('static/lib/GLOBAL_config.js', {
        globalVars: {apiHost: env_test_apiHost, baseUrl: env_test_baseUrl},
        parser: fis.plugin('global-vars')
    })
    .match('components/**', {
        url: env_test_baseUrl + '$0'
    })
    .match('static/**', {
        url: env_test_baseUrl + '$0'
    })
    .match('/spm_modules/**.js', {
        url: env_test_baseUrl + '$0',
        optimizer: fis.plugin('uglify-js')
    })
    .match('::packager', {
        postpackager: fis.plugin('loader', {
            resoucemapUrl:env_prod_baseUrl+'/pkg/${filepath}_map.js'
            //allInOne: {
            //    includeAsyncs: true,
            //    css: '/pkg/${filepath}_aio.css',
            //    js: '/pkg/${filepath}_aio.js',
            //    urlCss: env_test_baseUrl + '/pkg/${filepath}_aio.css',
            //    urlJs: env_test_baseUrl + '/pkg/${filepath}_aio.js',
            //    ignore: ['/static/lib/sea.js']
            //}
        })
    });

//本地环境
var env_native_baseUrl = '';
var env_native_apiHost='/kaola-delivery-web/';

fis
    .media('native')
    .set('project.ignore', [
        //'test/**',//如果不用模拟接口则取消该行注释
        'node_modules/**',
        '.git/**',
        '.svn/**'
    ])
    .match('static/lib/GLOBAL_config.js', {
        globalVars: {apiHost: env_native_apiHost, baseUrl: env_native_baseUrl},
        parser: fis.plugin('global-vars')
    })
    .match('components/**', {
        url: env_native_baseUrl + '$0'
    })
    .match('static/**', {
        url: env_native_baseUrl + '$0'
    })
    .match('/spm_modules/**.js', {
        url: env_native_baseUrl + '$0',
        optimizer: fis.plugin('uglify-js')
    })
    .match('::packager', {
        postpackager: fis.plugin('loader', {
            resoucemapUrl:env_prod_baseUrl+'/pkg/${filepath}_map.js'
            //allInOne: {
            //    includeAsyncs: true,
            //    css: '/pkg/${filepath}_aio.css',
            //    js: '/pkg/${filepath}_aio.js',
            //    urlCss: env_native_baseUrl + '/pkg/${filepath}_aio.css',
            //    urlJs: env_native_baseUrl + '/pkg/${filepath}_aio.js',
            //    ignore: ['/static/lib/sea.js']
            //}
        })
    });