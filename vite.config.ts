import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const libraryStylesPlugin = {
  name: 'taglite-library-styles',
  transform(code: string, id: string) {
    if (!id.endsWith('/src/index.ts')) {
      return null
    }

    return {
      code: `import './components/SimpleTagInput/SimpleTagInput.css'\n${code}`,
      map: null,
    }
  },
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLibraryBuild = mode === 'lib'

  return {
    plugins: [
      react(),
      ...(isLibraryBuild ? [libraryStylesPlugin] : []),
      ...(isLibraryBuild ? [] : [tailwindcss()]),
    ],
    build: isLibraryBuild
      ? {
          copyPublicDir: false,
          lib: {
            entry: 'src/index.ts',
            name: 'taglite',
            formats: ['es', 'cjs'],
            fileName: format =>
              format === 'es'
                ? 'taglite.js'
                : 'taglite.cjs',
          },
          rolldownOptions: {
            external: [
              'react',
              'react-dom',
              /^react\//,
              /^react-dom\//,
            ],
          },
        }
      : undefined,
  }
})
