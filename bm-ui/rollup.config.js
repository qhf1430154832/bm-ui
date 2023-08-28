import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss';
import clear from 'rollup-plugin-clear';
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import path  from 'path';
import fs from 'fs'
function getEntries(path) {
    let files = fs.readdirSync(resolve(path))
    const entries = files.reduce((ret, item) => {
      const itemPath = join(path, item)
      const isDir = fs.statSync(itemPath).isDirectory()
      if (isDir) {
        ret[item] = resolve(join(itemPath, 'index.js'))
      } else {
        const [name] = item.split('.')
        ret[name] = resolve(itemPath)
      } 
      return ret
    }, {})
    return entries
  }
export default{
  input: ['./package/index.ts'],
  output: {
    file: 'dist/main.js',
    format: 'es'
  },
  plugins: [
    typescript(), // 会自动读取sconfig.json配置文件
    postcss({ 
      extensions: ['.css'], // 将scss解析成css
      extract: true,
      modules: true,
    }),
    clear({
      targets: ['dist']
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production') // 否则会报：process is not defined的错
    }),
    nodeResolve({
    }),
    commonjs(),
    babel(), // 会自动读取babel的配置文件
    terser(),
    serve('dist'),
    livereload('src'), // 当src目录中的文件发生变化时，刷新页面
  ],
  external: [{
    includeDependencies: true,
  }], // 项目中引用的第三方库
}
