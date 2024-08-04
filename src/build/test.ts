// Import required packages
import { parse, compileTemplate, compileScript } from '@vue/compiler-sfc';
import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

export function vuePlugin() {
  return {
    name: 'vue-plugin',
    setup(build) {
      build.onLoad({ filter: /\.vue$/ }, async (args) => {
        // 读取 .vue 文件内容
        const source = await fs.promises.readFile(args.path, 'utf8');

        // 解析 Vue 文件
        const { descriptor } = parse(source, { filename: args.path });

        // 编译 <template> 部分
        let templateCode = '';
        if (descriptor.template) {
          const { code } = compileTemplate({
            source: descriptor.template.content,
            filename: args.path,
          });
          templateCode = code;
        }

        // 编译 <script> 部分
        let scriptCode = '';
        if (descriptor.script) {
          const script = compileScript(descriptor, {
            id: path.basename(args.path),
            isProd: true,
            templateOptions: {
              ssr: false,
              compilerOptions: {
                jsx: 'preserve', // 支持 JSX
              },
              preprocessLang: descriptor.script.lang || 'ts', // 支持 TypeScript
            },
          });
          scriptCode = script.content;
        }

        // 处理 <style> 部分（可选）
        let stylesCode = '';
        if (descriptor.styles) {
          descriptor.styles.forEach((style) => {
            stylesCode += style.content;
          });
        }

        // 生成最终的 JavaScript 模块
        const finalCode = `
          ${templateCode}
          ${scriptCode}
          const styles = \`${stylesCode}\`;
        `;

        return {
          contents: finalCode,
          loader: 'js',
        };
      });
    },
  };
}

// 使用 esbuild 构建项目
esbuild.build({
  entryPoints: ['src/main.js'],
  bundle: true,
  outdir: 'dist',
  plugins: [vuePlugin()],
}).catch(() => process.exit(1));