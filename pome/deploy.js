// Vercel 部署验证脚本 (ES Module)
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🎯 诗词赏析网页 - Vercel 部署验证');
console.log('================================');

// 检查必要文件
const requiredFiles = [
  'package.json',
  'vercel.json',
  'src/App.vue',
  'src/main.js'
];

console.log('📁 检查必要文件...');
requiredFiles.forEach(file => {
  if (existsSync(join(__dirname, file))) {
    console.log(`✅ ${file} - 存在`);
  } else {
    console.log(`❌ ${file} - 缺失`);
  }
});

// 检查 package.json 配置
try {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  console.log('\n📦 检查 package.json 配置...');
  
  if (packageJson.scripts.build) {
    console.log('✅ build 脚本 - 已配置');
  } else {
    console.log('❌ build 脚本 - 未配置');
  }
  
  if (packageJson.dependencies?.vue) {
    console.log('✅ Vue 依赖 - 已安装');
  } else {
    console.log('❌ Vue 依赖 - 未安装');
  }
  
} catch (error) {
  console.log('❌ package.json 解析失败:', error.message);
}

// 检查构建输出
console.log('\n🔧 检查构建输出...');
if (existsSync('dist')) {
  const distFiles = readdirSync('dist');
  console.log(`✅ dist 目录存在，包含 ${distFiles.length} 个文件`);
  distFiles.forEach(file => {
    console.log(`   📄 ${file}`);
  });
} else {
  console.log('❌ dist 目录不存在，请先运行 npm run build');
}

console.log('\n🎉 部署验证完成！');
console.log('💡 下一步：将代码推送到GitHub，然后在Vercel中导入项目');
console.log('🌐 Vercel 控制台: https://vercel.com');