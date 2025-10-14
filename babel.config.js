// babel.config.js (修正版本)
module.exports = {
  // 🚨 這裡必須使用 'babel-preset-expo' 🚨
  presets: ["babel-preset-expo"],
  plugins: [
    "react-native-reanimated/plugin",
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@assets": "./assets",
          "@components": "./components",
          "@hooks": "./hooks",
        },
      },
    ],
  ],
};
