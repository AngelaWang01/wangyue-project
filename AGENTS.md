# AGENTS.md · MoonEcho 项目协作指南

## 🧭 项目概览

“望月AI · MoonEcho” 是一款面向海外华人老年人的数字陪伴应用，具备以下功能：

- 🤝 情感陪聊（ChatPage）
- 🌍 多语翻译（TranslationPage）
- 🧓 生活引导（GuidancePage）
- 💊 用药提醒（MedicationPage）

技术栈：**React + TypeScript + Vite + Tailwind CSS**

本项目注重语音陪伴体验，支持简体中文、繁体中文、粤语模式与适老化字体/语音。

## 🗂️ 目录结构说明
src/
├── App.tsx                  # 主入口，定义所有页面路由
├── components/              # 通用 UI 组件（按钮、切换器、头部等）
├── contexts/                # 全局状态（语言/语音/登录）
├── pages/                   # 各功能页面
│   ├── LoginPage.tsx
│   ├── HomePage.tsx
│   ├── ChatPage.tsx
│   ├── TranslationPage.tsx
│   ├── GuidancePage.tsx
│   └── MedicationPage.tsx
└── index.css                # Tailwind CSS 样式定义
## 🛠️ 开发与运行

### 本地开发环境设置

```bash
# 克隆项目
git clone <your-repo-url>
cd moonecho
npm install

# 启动开发服务器
npm run dev
常用命令
	•	npm run dev：开发模式运行项目
	•	npm run build：打包生产版本
	•	npm run lint：运行 ESLint 校验

🌐 项目规范
	•	所有样式使用 Tailwind 工具类
	•	所有语音调用使用 useAudio() 钩子函数
	•	多语言/简繁体/粤语切换由 LanguageContext 管理
	•	登录状态管理使用 AuthContext
	•	所有页面支持“老年模式”（大字号、语音辅助）

🧪 测试建议（未来拓展）
	•	可配置测试命令（Vitest / Jest）
	•	建议为每个功能页面编写测试用例
	•	使用 AGENTS.md 提示 Codex 运行测试前先执行 npm install

📝 Pull Request 说明格式

标题格式：
[模块名] 添加/优化 xxx 功能
PR 内容应包含：
	•	变更说明
	•	所影响的文件
	•	测试方式说明
	•	是否影响其他页面

🔐 安全建议
	•	不应暴露任何真实用户信息或语音数据
	•	Codex 执行任务前请确认权限为只读，或开启特定分支进行测试

✨ 推荐后续任务给 Codex
- 请为 ChatPage 添加语音识别输入功能
- 帮我检查 LanguageContext 是否冗余
- 优化 TranslationPage 的用户交互逻辑
- 添加项目文档注释和页面跳转逻辑说明
Happy Coding! 欢迎你加入望月AI的温暖世界 🌙
