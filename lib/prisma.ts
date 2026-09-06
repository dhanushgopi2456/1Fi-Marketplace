import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function resolveDatabaseUrl(): string {
  const localDbPath = path.resolve(process.cwd(), 'prisma', 'dev.db');

  // Detect serverless environment (Vercel, AWS Lambda)
  const isServerless = Boolean(
    process.env.VERCEL ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.LAMBDA_TASK_ROOT ||
    process.env.NOW_REGION
  );

  let targetPath = localDbPath;

  if (isServerless) {
    const tmpDbPath = path.join('/tmp', 'dev.db');
    try {
      if (!fs.existsSync(tmpDbPath)) {
        const candidatePaths = [
          localDbPath,
          path.resolve(__dirname, '..', 'prisma', 'dev.db'),
          path.resolve(__dirname, 'prisma', 'dev.db'),
          path.resolve('/var/task/prisma/dev.db'),
        ];
        const existingSource = candidatePaths.find((p) => fs.existsSync(p));
        if (existingSource) {
          fs.copyFileSync(existingSource, tmpDbPath);
        }
      }
      targetPath = tmpDbPath;
    } catch (e) {
      console.warn('Serverless SQLite /tmp copy warning:', e);
    }
  }

  const fileUrl = `file:${targetPath}`;
  // Ensure process.env.DATABASE_URL always starts with file: when SQLite is the schema provider
  if (!process.env.DATABASE_URL || !process.env.DATABASE_URL.startsWith('file:')) {
    process.env.DATABASE_URL = fileUrl;
  }

  return process.env.DATABASE_URL;
}

const resolvedUrl = resolveDatabaseUrl();
process.env.DATABASE_URL = resolvedUrl;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: resolvedUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

