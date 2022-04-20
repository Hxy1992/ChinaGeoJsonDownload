const chalk = require('chalk')

const msgPath = process.env.HUSKY_GIT_PARAMS
const userEmail = process.env.GIT_AUTHOR_EMAIL
const msg = require('fs')
.readFileSync(msgPath, 'utf-8')
.trim()

const commitRE = /^(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?: .{1,80}/

if (!commitRE.test(msg)) {
    console.log()
    console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
        '不合法的 commit 消息格式',
    )}\n\n`
        + chalk.red(
            '  请使用正确的提交格式:\n\n',
        )
        + `    ${chalk.green('feat: add \'comments\' option')}\n`
        + `    ${chalk.green('fix: handle events on blur (close #28)')}\n\n`
        + chalk.blue('  请查看 git commit 提交规范: https://www.conventionalcommits.org/zh-hans。\n')
        + chalk.blue(`commit 的类型：\n

        feat: 新功能、新特性\n
        fix: 修改 bug\n
        perf: 更改代码，以提高性能（在不影响代码内部行为的前提下，对程序性能进行优化）\n
        refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）\n
        docs: 文档修改\n
        style: 代码格式修改, 注意不是 css 修改（例如分号修改）\n
        test: 测试用例新增、修改\n
        build: 影响项目构建或依赖项修改\n
        revert: 恢复上一次提交\n
        ci: 持续集成相关文件修改\n
        chore: 其他修改（不在上述类型中的修改）\n
        release: 发布新版本。\n`),
    )

    process.exit(1)
}
