利用 Next.js 开发静态网站并托管至 GitHub Pages 的完整执行方案如下。该方案基于 Next.js 的 **Static Exports**（静态导出）功能，结合 **GitHub Actions** 实现自动化构建与部署。

---

### 1. 项目初始化

首先确保本地已安装 Node.js (推荐 v18+)。

```bash
npx create-next-app@latest my-static-site
cd my-static-site
```
*建议在安装过程中选择 TypeScript 和 ESLint 以保证代码质量。*

---

### 2. 配置 Next.js (核心步骤)

Next.js 默认采用服务端渲染 (SSR)，托管至 GitHub Pages 需要将其配置为纯静态输出 (SSG)。

修改根目录下的 `next.config.mjs` (或 `next.config.js`)：

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. 启用静态导出模式
  output: 'export',

  // 2. 关闭图片优化 (GitHub Pages 不支持 Next.js 的默认服务端图片优化)
  images: {
    unoptimized: true,
  },
  
  // 3. 配置资源路径 (根据你的 GitHub 仓库类型选填)
  // 如果你的仓库是 username.github.io (个人主页)，则不需要此项
  // 如果你的仓库是 project-name (项目主页)，则必须设置为 '/project-name'
  // basePath: '/my-static-site', 
};

export default nextConfig;
```

**注意：** 如果配置了 `basePath`，在代码中引用 `public` 文件夹下的图片时，路径需包含该前缀，或者使用 Next.js 的 `<Image />` 组件（它会自动处理 basePath）。

---

### 3. 配置 GitHub Actions 自动部署

使用 GitHub Actions 可以实现“推送到 main 分支即自动发布”。

在项目根目录创建文件：`.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Detect package manager
        id: detect-package-manager
        run: |
          if [ -f "${{ github.workspace }}/yarn.lock" ]; then
            echo "manager=yarn" >> $GITHUB_OUTPUT
            echo "command=install" >> $GITHUB_OUTPUT
            echo "runner=yarn" >> $GITHUB_OUTPUT
            exit 0
          elif [ -f "${{ github.workspace }}/package.json" ]; then
            echo "manager=npm" >> $GITHUB_OUTPUT
            echo "command=ci" >> $GITHUB_OUTPUT
            echo "runner=npx --no-install" >> $GITHUB_OUTPUT
            exit 0
          else
            echo "Unable to determine package manager"
            exit 1
          fi

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: ${{ steps.detect-package-manager.outputs.manager }}

      - name: Setup Pages
        uses: actions/configure-pages@v5
        with:
          # 自动注入 basePath (如果 next.config.js 未硬编码，此步骤可协助处理)
          static_site_generator: next

      - name: Install dependencies
        run: ${{ steps.detect-package-manager.outputs.manager }} ${{ steps.detect-package-manager.outputs.command }}

      - name: Build with Next.js
        run: ${{ steps.detect-package-manager.outputs.runner }} next build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

### 4. 推送代码至 GitHub

1.  在 GitHub 上创建一个新的仓库（Public 或 Private 均可）。
2.  将本地代码推送到远程仓库：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

---

### 5. 启用 GitHub Pages

1.  进入 GitHub 仓库页面。
2.  点击 **Settings** (设置) -> 侧边栏 **Pages**。
3.  在 **Build and deployment** (构建与部署) 区域：
    *   **Source**: 选择 **GitHub Actions**。
4.  此时，GitHub Actions 应该已经自动开始运行。你可以点击仓库上方的 **Actions** 标签查看进度。
5.  构建成功后，Settings 页面上方会显示你的网站链接。

---

### 6. 常见问题与注意事项

#### A. 样式或 JS 404 错误 (资源路径问题)
如果部署后页面无样式，通常是因为 `basePath` 设置错误。
*   **检查**：打开浏览器开发者工具 (F12) -> Network，查看 CSS/JS 请求的 URL。
*   **修正**：如果你的仓库名是 `my-repo`，URL 是 `user.github.io/my-repo`，确保 `next.config.mjs` 中设置了 `basePath: '/my-repo'`。

#### B. `_next` 文件夹 404 (Jekyll 干扰)
GitHub Pages 默认使用 Jekyll 处理静态文件，它会忽略以下划线 `_` 开头的文件（如 Next.js 生成的 `_next` 文件夹）。
*   **解决方案**：Next.js 的构建过程或上述 GitHub Action 通常会自动生成 `.nojekyll` 文件。如果遇到问题，请确保构建产物目录（`./out`）中包含一个名为 `.nojekyll` 的空文件。

#### C. 图片加载失败
*   **本地图片**：使用 `import src from './image.png'` 并在 `<Image src={src} />` 中使用，Next.js 会自动处理路径。
*   **Public 文件夹图片**：如果使用字符串路径 `<Image src="/logo.png" />` 且配置了 `basePath`，即使在本地开发环境正常，部署后也可能出错。建议使用 helper 函数或环境变量来处理前缀，例如：
    ```javascript
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    <Image src={`${basePath}/logo.png`} ... />
    ```

#### D. 动态路由 (Dynamic Routes)
静态导出 (`output: 'export'`) 不支持服务端的动态路由。如果你使用了 `[id].js` 这样的动态路由，必须使用 `generateStaticParams` (App Router) 或 `getStaticPaths` (Pages Router) 在构建时预先生成所有可能的路径。