const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
    config = rewireLess.withLoaderOptions({
      javascriptEnabled: true,
      modifyVars: {
          "@layout-body-background": "#FFFFFF",
          "@layout-header-background": "#FFFFFF",
          "@layout-footer-background": "#FFFFFF",
          "@layout-sider-background": "#001529",
          "@layout-sider-children": "#314659",
          "@ant-menu-dark": "#001529"
      },
    })(config, env);
    return config;
};
