#readme #请把代码提交到 dev 分支，master 主干只做合仓

#### cross-env 跨平台参数注入流程

### 新增插件

cross-env npm 插件 - 跨平台参数注入
package.json
npm script 脚本发布语言

### Step1：新增参数

package.json scripts 增加参数
LANG 语言
PREPULISH 是否预发布

### Step2-1：参数注入

webpack 路径注入
\build\webpack.prod.dev.js
\build\webpack.prod.conf.js
\index.html

### Step2-2：语言注入

变量：pageStaticLanguage
\src\store\index.js
\config\index.js
\index.html

## Step3：脚本

//中文
npm run ZH-build-pre-pulish
// 英文
npm run EN-build-pre-pulish

npm run dev-ZH
npm run dev-EN
