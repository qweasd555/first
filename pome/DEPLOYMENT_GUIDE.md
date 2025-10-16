# 诗词赏析网页 - Vercel 部署指南

## 📋 部署前准备

### 1. 确保代码已推送到GitHub
```bash
git add .
git commit -m "添加动态效果和Vercel部署配置"
git push origin main
```

### 2. 创建Vercel账户（如果还没有）
- 访问 [https://vercel.com](https://vercel.com)
- 使用GitHub账户登录

## 🚀 部署步骤

### 方法一：通过GitHub仓库部署（推荐）

1. **登录Vercel控制台**
   - 访问 https://vercel.com
   - 点击 "New Project"

2. **导入GitHub仓库**
   - 选择您的GitHub账户
   - 找到并选择 `second/pome` 仓库
   - 点击 "Import"

3. **配置项目设置**
   - **Framework Preset**: Vite
   - **Root Directory**: 保持默认（根目录）
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **环境变量配置**
   - 通常不需要额外配置
   - 如果需要，可以添加环境变量

5. **开始部署**
   - 点击 "Deploy"
   - 等待构建完成（约1-2分钟）

### 方法二：通过Vercel CLI部署

1. **安装Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   cd E:\MySoft\github\second\pome
   vercel --prod
   ```

## ⚙️ 项目配置说明

### vercel.json 配置
```json
{
  "version": 3,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### package.json 关键配置
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "vercel-build": "vite build"
  }
}
```

## 🌐 部署后访问

部署成功后，您将获得一个类似这样的URL：
- `https://your-project-name.vercel.app`

### 自定义域名（可选）
1. 在Vercel项目设置中
2. 选择 "Domains"
3. 添加您的自定义域名

## 🔧 常见问题解决

### 构建失败
- 检查Node.js版本兼容性
- 确保所有依赖正确安装
- 查看构建日志中的具体错误信息

### 路由问题
- SPA应用需要配置重定向规则
- 确保vercel.json中的路由配置正确

### 静态资源加载失败
- 检查构建输出目录是否正确
- 确认资源路径配置

## 📊 部署状态监控

部署后，您可以在Vercel控制台中：
- 查看构建日志
- 监控网站性能
- 设置自定义域名
- 配置环境变量
- 查看访问统计

## 🎯 部署成功验证

部署完成后，请检查：
- ✅ 网站可以正常访问
- ✅ 所有页面路由正常工作
- ✅ 动态效果正常显示
- ✅ 响应式设计正常
- ✅ 图片和资源加载正常

## 📞 技术支持

如果遇到问题：
1. 查看Vercel官方文档
2. 检查构建日志中的错误信息
3. 确保本地构建成功后再部署

---

**祝您部署顺利！🎉**