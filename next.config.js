const UnoCSS = require('@unocss/webpack').default
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["monaco-editor"],
  reactStrictMode: true,
  webpack: (config, options) => {
    // see: https://github.com/microsoft/monaco-editor/issues/3054#issuecomment-1431365562 
    // download and use local marked.js
    config.resolve.alias = {
      ...config.resolve.alias,
      "../common/marked/marked.js": "marked",
    }
    if (!options.isServer) {
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: ["json", "javascript", "typescript", "markdown"],
          filename: "static/[name].worker.js",
        })
      );
    }
    config.cache = false
    config.plugins.push(
      UnoCSS(), // <--
    )
    return config
  },
}

module.exports = nextConfig
