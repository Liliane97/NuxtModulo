import { defineNuxtModule, addPlugin, createResolver, addComponent } from '@nuxt/kit'
import { resolve } from 'path/posix';
import { name, version } from '../package.json';

// Module options TypeScript inteface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'projetoModule',
    compatibility:{
      nuxt:"^3.0.0",
    }
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup (_moduleOptions, nuxt) {
    const resolver = createResolver(import.meta.url)
    const runtimeDir = resolver.resolve("./runtime")
    nuxt.options.build.transpile.push(runtimeDir)

    addPlugin(resolve(runtimeDir, 'plugin'))

   const componentsDir = resolver.resolve(runtimeDir,"components");

   addComponent({
    name:"ProjetoModule",
    filePath:resolve(componentsDir,"HelloWorld.vue")
   })

  }
})
