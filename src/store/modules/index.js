// const files = require.context('.', false, /\.js$/)
// const modules = {}
const modules = import.meta.glob('./*.js', { eager: true });

const storeModules = {};
for (const path in modules) {
  if (path === './index.js') continue;
  const moduleName = path.replace('./', '').replace(/\.js$/, '');
  storeModules[moduleName] = modules[path].default;
}

export default storeModules;