import { readdir, cp } from 'fs/promises';
import path, { resolve } from 'path';

const __dirname = path.dirname(__filename);
const TEMPLATES_DIR = resolve(__dirname, "..", "..", "template", "apps");

export async function getAvailableApps(): Promise<string[]> {
  return await readdir(TEMPLATES_DIR);
}

export async function copyApp(appName: string, targetDir: string): Promise<void> {
  const appPath = resolve(TEMPLATES_DIR, appName);
  const targetPath = resolve(process.cwd(), targetDir);
  
  await cp(appPath, targetPath, { recursive: true });
}