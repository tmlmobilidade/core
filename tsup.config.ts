import { defineConfig, Options } from 'tsup';


const baseConfig: Partial<Options> = {
  format: ['esm', 'cjs'],
  sourcemap: true,
  clean: true,
  dts: true
};

export default defineConfig([
  {
    ...baseConfig,
    entry: ['src/interfaces/index.ts'],
    outDir: 'dist/interfaces',
  },
  {
    ...baseConfig,
    entry: ['src/lib/index.ts'],
    outDir: 'dist/lib',
  },
  {
    ...baseConfig,
    entry: ['src/providers/index.ts'],
    outDir: 'dist/providers',
  },
  {
    ...baseConfig,
    entry: ['src/types/index.ts'],
    outDir: 'dist/types',
  },
  {
    ...baseConfig,
    entry: ['src/utils/index.ts'],
    outDir: 'dist/utils',
    dts: false
  }
]);

