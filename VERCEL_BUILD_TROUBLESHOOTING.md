# Vercel Build Troubleshooting & Prevention Guide

## Common Errors & Solutions

### 1. "The specified Root Directory 'artifacts/api-server' does not exist."

**Problem**:
```
The specified Root Directory "artifacts/api-server" (or "artifacts/uniflow-web") does not exist. Please update your Project Settings.
```

**Root Cause**:
In earlier workspace iterations, the project was organized with monorepo subfolders (`artifacts/api-server` or `artifacts/uniflow-web`). The repository has been simplified into a **standard standalone React project at the root level (`./`)**. Vercel's Project Settings in the dashboard still have a non-empty Root Directory override pointing to the old folder path.

**Solution**:
1. Open your project in the [Vercel Dashboard](https://vercel.com/dashboard).
2. Go to **Settings** -> **General** -> **Root Directory**.
3. Click **Edit** on **Root Directory** and clear/reset it to `./` (or leave it empty).
4. Ensure **Framework Preset** is set to **Vite** or **Other**.
5. Ensure **Build Command** is `npm run build` and **Output Directory** is `dist/public` (or set by `vercel.json`).
6. Click **Save** and trigger a **Redeploy** on Vercel.

---

### 2. "Headless installation requires a pnpm-lock.yaml file"

**Problem**: 
```
ERROR Headless installation requires a pnpm-lock.yaml file
Error: Command "pnpm install --frozen-lockfile" exited with 1
```

**Root Cause**: 
The `.vercelignore` file was ignoring lockfiles, or a lockfile was missing from the repository root.

**Solution**:
- Ensure `pnpm-lock.yaml` or `package-lock.json` is in the repository root.
- Ensure lockfiles are NOT listed in `.vercelignore`.

---

### 3. "env must be an object" - vercel.json schema error

**Problem**:
```json
{
  "env": []  // ❌ Wrong - array instead of object
}
```

**Solution**:
```json
{
  "env": {}  // ✓ Correct - empty object or with values
}
```

---

## Current Vercel Deployment Configuration

**File**: `vercel.json` at root (`/`)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**File**: `vite.config.ts` build settings
```ts
build: {
  outDir: path.resolve(import.meta.dirname, 'dist/public'),
  emptyOutDir: true
}
```

---

## Prevention Checklist Before Deployment

- [ ] Vercel **Root Directory** setting is set to `./` (root) in Vercel Dashboard.
- [ ] `vercel.json` exists at the root of the project.
- [ ] `buildCommand` is `npm run build`.
- [ ] `outputDirectory` is `dist/public`.
- [ ] `package.json` contains `dev`, `build`, `lint`, and `preview` scripts.

