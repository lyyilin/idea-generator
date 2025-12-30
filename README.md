# 💡 创意孵化器 (Idea Incubator)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Powered by Gemini](https://img.shields.io/badge/AI-Gemini%203%20Flash-blueviolet)](https://ai.google.dev/)
[![Built with React](https://img.shields.io/badge/Built%20with-React%2019-blue)](https://react.dev/)

> **从技术兴趣到产品原型，只需一个闪念。**
> 
> 创意孵化器是一个基于 Gemini AI 的个性化创意推送系统。它通过分析你感兴趣的技术栈和痛点描述，为你量身定制高实用性、适合快速落地的创新产品方案。

---

## 🌟 核心特性

- **🚀 灵感孵化引擎**：利用 `Gemini 3 Flash` 模型，根据你的技术背景生成极具可行性的 MVP（最小可行性产品）建议。
- **⚡ Vibe Coding 优化**：专门为“AI 辅助编程”设计的创意输出，生成的逻辑结构简单清晰，适合使用 Cursor/Windsurf 等工具在一小时内快速产出。
- **📊 全方位仪表盘**：可视化展示你的技术分布和创意积累进度，洞察你的创新趋势。
- **📚 私人创意库**：支持创意的收藏、状态管理（待办/已完成）以及一键导出为 **Markdown** 文档。
- **⚙️ 深度调优控制台**：
  - **脑洞程度调节**：通过 Temperature 参数控制 AI 的发散性。
  - **多语言支持**：支持中英文双语切换。
  - **数据迁移**：支持全量数据的本地 JSON 备份与导入。
- **🔒 隐私优先**：所有兴趣数据和生成的创意均存储在浏览器本地（LocalStorage），无后端服务器，确保隐私安全。

## 🛠️ 技术栈

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **AI SDK**: [@google/genai](https://www.npmjs.com/package/@google/genai)
- **Routing**: React Router 7

## 🚀 快速开始

### 环境准备
本应用需要访问 Google Gemini API。应用会自动使用环境中的 `process.env.API_KEY`。

### 使用流程
1. **登记兴趣**：在“添加兴趣”页面输入你擅长的技术（如 `React`, `Tailwind`, `Supabase`）和关注的领域。
2. **生成创意**：前往“每日探索”，点击“启动孵化引擎”。
3. **收藏详情**：查看 AI 生成的核心价值、落地架构建议以及专为 Vibe Coding 设计的 **Prompt 提示词**。
4. **管理进度**：在“创意库”中跟踪实施状态，或将其导出为文档进行深度开发。

## 📸 应用预览

| 概览仪表盘 | 每日创意推送 | 兴趣管理 |
| :--- | :--- | :--- |
| ![Dashboard](https://via.placeholder.com/300x200?text=Dashboard) | ![Explore](https://via.placeholder.com/300x200?text=AI+Explore) | ![Input](https://via.placeholder.com/300x200?text=Interest+Input) |

## 💡 为什么选择这个工具？

在“AI 程序员”时代，**编码的门槛正在消失，而创意的价值正在放大**。
很多开发者拥有强大的技术储备，却苦于没有合适的切入点去实践。这个应用旨在通过 AI 消除“白板恐惧”，将碎片化的技术兴趣转化为可以立即着手开发的微型产品。

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 协议开源。

---

**Made with ❤️ by [[Liyilin ](https://github.com/lyyilin/idea-generator)]**
*如果你觉得这个项目对你有启发，欢迎点一个 Star ⭐️！*
