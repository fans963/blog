# CodeRabbit AI 代码审查配置说明

## 📖 简介

本项目已配置 [CodeRabbit](https://coderabbit.ai/) AI 代码审查工具，可在每次 Pull Request 时自动进行代码审查，提供智能化的代码质量建议。

## 🚀 如何使用

### 1. 安装 CodeRabbit

1. 访问 [CodeRabbit.ai](https://coderabbit.ai/)
2. 使用 GitHub 账号登录
3. 授权 CodeRabbit 访问您的仓库
4. 选择要启用的仓库（本仓库：fans963/blog）

### 2. 自动审查流程

CodeRabbit 会在以下情况自动工作：

- ✅ 创建新的 Pull Request
- ✅ 向 PR 添加新的提交
- ✅ 在 PR 评论中 @coderabbitai 并提问
- ❌ Draft PR（草稿 PR 不会触发审查）

### 3. 与 CodeRabbit 交互

在 PR 评论中，你可以使用以下命令与 CodeRabbit 互动：

#### 基本命令

```
@coderabbitai review
```
请求重新审查

```
@coderabbitai summary
```
生成更改摘要

```
@coderabbitai resolve
```
解决所有对话

```
@coderabbitai configuration
```
显示当前配置

#### 提问示例

```
@coderabbitai 这段代码有什么性能问题吗？
```

```
@coderabbitai 如何改进这个组件的可访问性？
```

```
@coderabbitai 这个 TypeScript 类型定义是否合理？
```

## ⚙️ 配置说明

### 语言设置

- **审查语言**: 中文（zh-CN）
- **审查风格**: Chill（温和模式）

### 启用的工具

| 工具 | 用途 | 状态 |
|-----|------|------|
| ESLint | JavaScript/TypeScript 代码检查 | ✅ 启用 |
| Markdownlint | Markdown 文档检查 | ✅ 启用 |
| Yamllint | YAML 配置文件检查 | ✅ 启用 |
| Gitleaks | 检测敏感信息泄露 | ✅ 启用 |
| ShellCheck | Shell 脚本检查 | ✅ 启用 |
| LanguageTool | 语法和拼写检查 | ✅ 启用 |

### 文件类型专项指导

#### TypeScript 文件 (*.ts)
- 确保类型安全，避免使用 `any`
- 优先使用接口定义对象结构
- 检查未使用的导入
- 遵循项目编码规范

#### React 组件 (*.tsx)
- 确保 Props 类型定义完整
- 检查 Hooks 依赖数组
- 确保无障碍性（a11y）最佳实践
- 避免不必要的重新渲染
- 正确使用 React 19 新特性

#### Astro 组件 (*.astro)
- 检查 frontmatter 语法
- 优化静态生成性能
- 正确使用 Astro Islands 模式
- 合理使用 `client:*` 指令

#### MDX 文章 (*.mdx)
- 验证 frontmatter 格式
- 确保必需字段存在（title, description, date, category）
- 检查链接有效性

### 忽略的文件

以下文件/目录将被跳过审查：

```
- node_modules/
- dist/, build/, .astro/
- *.lock（所有锁文件）
- worker-configuration.d.ts
- .wrangler/, .vscode/
- *.min.js, *.min.css
- .env*
```

## 📋 审查内容

CodeRabbit 会关注：

1. **代码质量**
   - 代码可读性
   - 命名规范
   - 代码复杂度
   - 重复代码

2. **类型安全**
   - TypeScript 类型定义
   - 类型推导
   - any 的使用

3. **性能优化**
   - 不必要的渲染
   - 内存泄漏风险
   - 打包优化

4. **安全性**
   - XSS 风险
   - 敏感信息泄露
   - 依赖漏洞

5. **最佳实践**
   - React Hooks 使用
   - Astro Islands 模式
   - 无障碍性（a11y）
   - SEO 优化

## 🎯 最佳实践

### 对于贡献者

1. **提交前自查**
   - 运行 `npm run build` 确保构建通过
   - 检查 TypeScript 类型错误
   - 运行 ESLint 修复基本问题

2. **编写清晰的 PR 描述**
   - 说明修改的目的
   - 列出主要变更
   - 提及相关的 Issue

3. **响应审查意见**
   - 认真对待 CodeRabbit 的建议
   - 解释为什么某些建议不适用
   - 及时修复发现的问题

### 对于维护者

1. **配置调整**
   - 根据需要修改 `.coderabbit.yaml`
   - 调整审查严格程度
   - 添加项目特定规则

2. **审查策略**
   - CodeRabbit 作为辅助，不替代人工审查
   - 关注业务逻辑和架构设计
   - 使用 CodeRabbit 发现细节问题

## 🔧 自定义配置

如需修改配置，编辑项目根目录的 `.coderabbit.yaml` 文件。

### 修改审查风格

```yaml
reviews:
  profile: "chill"  # 可选: "chill", "assertive", "aggressive"
```

### 添加路径规则

```yaml
path_instructions:
  - path: "src/custom/**"
    instructions: |
      - 自定义规则说明
```

### 排除更多文件

```yaml
path_filters:
  excluded:
    - "**/custom-folder/**"
```

## 📚 参考资源

- [CodeRabbit 官方文档](https://docs.coderabbit.ai/)
- [配置文件完整说明](https://docs.coderabbit.ai/guides/configure-coderabbit/)
- [命令参考](https://docs.coderabbit.ai/guides/review-instructions/)

## 💡 提示

- CodeRabbit 的建议是参考性的，不是强制性的
- 可以在 PR 中与 CodeRabbit 对话获取更多解释
- 对于误报，可以在配置中添加例外规则
- 定期查看 CodeRabbit 的审查结果，提升代码质量意识

## 🙋 常见问题

**Q: CodeRabbit 会自动修复代码吗？**  
A: 不会。CodeRabbit 只提供建议，需要开发者手动修改。

**Q: 如何暂时禁用 CodeRabbit？**  
A: 可以将 PR 设为 Draft，或在配置中临时禁用 `auto_review.enabled`。

**Q: CodeRabbit 的建议都要采纳吗？**  
A: 不需要。根据实际情况判断，可以解释为什么不采纳某个建议。

**Q: 可以用其他语言审查吗？**  
A: 可以，修改配置中的 `language` 字段，如 `"en-US"` 表示英语。

---

**用 ❤️ 打造，用 🤖 AI 驱动**
