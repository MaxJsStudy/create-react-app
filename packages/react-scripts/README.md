## React scripts based on [react scripts](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts) for [Ant Design](https://ant.design)
* Add `eslint`, `less` related configuration
* Add an alias for the `src` folder to `@`
* Add support for [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)
* Add support for custom themes, just add `antd.theme.js` in the project root directory, [Ant Design Less variables](https://ant.design/docs/react/customize-theme#Ant-Design-Less-variables)

### Example for `antd.theme.js`
```javascript
module.exports = {
    'primary-color': '#1DA57A',
    'link-color': '#1DA57A',
}
```

## Instructions
`create-react-app <project name> --scripts-version antd-react-scripts`
