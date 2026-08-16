# MyTalk

> 从 TED Talk 到 My Talk

MyTalk 是一个面向新航道 TED 企业命题的 AI 表达成长产品原型。它帮助新航道雅思托福学习者将来自 TED、电影、书籍和日常生活的感触，带入真题场景，发展为符合考试要求、也真正属于自己的英语表达。

## 核心想法

TED 是思想与英语输入的入口。MyTalk 将这些观点与用户的个人经验连接起来，陪伴用户记录一个念头、把它带入雅思托福真题、完成词汇语法句式训练、形成英语表达、与他人分享，并在长期积累中看见自己的成长。

## 产品路径

1. **足迹**：记录一句感受、一个疑问或一条没有发出的回应；也可以观看精选 TED 内容后留下反应。可编辑、打标签，并留待之后调用。
2. **表达工坊**：选择自由表达、雅思口语/写作或托福口语/写作目标，带入相关足迹，通过引导问题、词汇语法句式训练和限时输出完成自己的表达。
3. **思想图书馆**：将表达制作成封面卡片分享；读者可以认同、留下温和追问或收藏一条足迹。
4. **成长**：回看足迹、成稿、常出现主题、表达日历与代表表达。

## 运行原型

使用现代浏览器直接打开 `outputs/mytalk_studio_demo.html` 即可体验原型。

当前版本可通过 Vercel 的同源 API 代理接入飞书妙搭开放 API：三个现有按钮分别请求递进追问、表达检查与表达评分。若未部署代理或 AI 服务不可用，页面会自动保留本地演示逻辑。TED 内容接口、雅思托福真题服务、语音识别、用户账号、数据库及真实社区内容仍属于后续建设范围。

## 飞书 AI 部署

1. 在 Vercel 导入此 GitHub 仓库。
2. 在 Vercel 项目的 Environment Variables 中设置 `MIAODA_API_URL` 为妙搭的线上开放 API 地址，并设置 `MIAODA_API_KEY` 为线上环境凭证的 API Key。
3. 部署完成后，首页由 `outputs/mytalk_studio_demo.html` 提供，前端会请求同源的 `/api/mytalk`。

不要把 API Key 写入 HTML、Git 仓库或截图中。

## 项目材料

- `outputs/MyTalk_项目介绍.md`：项目介绍
- `outputs/mytalk_studio_opening_report.md`：报名表文案
- `outputs/mytalk_studio_supplement.md`：项目补充说明
- `outputs/mytalk_studio_submission_checklist.md`：最终提交清单
- `outputs/mytalk_studio_demo.html`：可交互原型
