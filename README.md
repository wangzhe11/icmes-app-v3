# icmes-app-v3

使用 pnpm 操作

## Git hooks && commitlint

拉取代码后先执行 `npx husky install` 初始化 `husky`，激活 git 提交的校验。如果不生效，打开文件夹查看文件类型是不是纯文本格式，如果是纯文本手动改为可运行的脚本格式。

|   code   |                             desc                              |
| :------: | :-----------------------------------------------------------: |
|   feat   |                          添加新功能                           |
|   fix    |                           修复 bug                            |
|  style   | 代码格式变动, 不影响代码功能的更改(修改空格/格式化代码等操作) |
|   pref   |                         优化/性能提升                         |
|   docs   |                           修改文档                            |
|   test   |                      新增或修改测试用例                       |
| refactor |     功能重构，指既不是新增功能，也不是修改 bug 的代码变动     |
|  chore   |                    更改脚手架配置相关文件                     |
|  revert  |                           版本回退                            |
|    ui    |           只更新 css 样式，不涉及任何业务功能的修改           |

## unocss && sass
