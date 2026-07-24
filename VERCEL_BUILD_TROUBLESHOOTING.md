# Vercel Build Troubleshooting & Prevention Guide

## Common Errors & Solutions

### 1. "Headless installation requires a pnpm-lock.yaml file"

**Problem**: 
```
ERROR Headless installation requires a pnpm-lock.yaml file
Error: Command "pnpm install --frozen-lockfile" exited with 1
```

**Root Cause**: 
The `.vercelignore` file was ignoring `pnpm-lock.yaml`, preventing Vercel from finding it during the build.

**Solution**:
- Ensure `pnpm-lock.yaml` is NOT in `.vercelignore`
- Keep `pnpm-lock.yaml` in the repository
- Check `.vercelignore` doesn't contain `pnpm-lock.yaml`

**Prevention Checklist**:
- ✓ Lock files (`pnpm-lock.yaml`, `package-lock.json`) must ALWAYS be included
- ✓ Don't ignore lock files in `.vercelignore`
- ✓ Commit lock files to git: `git add pnpm-lock.yaml && git commit`

---

### 2. "env must be an object" - vercel.json schema error

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

**Prevention**:
- Use `{}` for empty object, never `[]`
- Reference: [Vercel Configuration docs](https://vercel.com/docs/projects/project-configuration)

---

### 3. "images must include sizes property"

**Problem**:
```json
{
  "images": {
    "domains": ["example.com"]  // ❌ Missing 'sizes' property
  }
}
```

**Solution**:
For SPA (Vite) projects, remove the `images` property entirely as it's not needed.

**Prevention**:
- Don't add `images` config unless using Next.js Image Optimization
- For Vite/React apps, image optimization is handled by the build tool

---

### 4. Build process ignoring necessary files

**Problem**:
`.vercelignore` file was ignoring source files needed for the build:
```
artifacts/uniflow-web/src          # ❌ Can't build without source
artifacts/uniflow-web/tsconfig.json  # ❌ TypeScript config needed
artifacts/uniflow-web/vite.config.ts # ❌ Build config needed
```

**Solution**:
Only ignore files that are truly not needed for the build:
```
# DO ignore:
- .git, .gitignore
- node_modules
- .env.local files
- Development tools (.idea, .vscode)
- Documentation files
- CI/CD configs

# DON'T ignore:
- pnpm-lock.yaml (or package-lock.json, yarn.lock)
- Source files (src/)
- Build config (vite.config.ts, tsconfig.json, webpack.config.js)
- package.json, pnpm-workspace.yaml
- Public assets needed in build
```

---

## Current .vercelignore Configuration

**Correctly Ignored**:
- Build outputs (except dist/public)
- Dependencies (except lock files)
- Git history (.git)
- Local env files
- Development tools
- Documentation
- CI/CD configs

**Critically NOT Ignored** (so Vercel can build):
- `pnpm-lock.yaml` - Required for reproducible builds
- `artifacts/uniflow-web/src` - Source code
- `artifacts/uniflow-web/tsconfig.json` - TypeScript config
- `artifacts/uniflow-web/vite.config.ts` - Build configuration
- `artifacts/uniflow-web/index.html` - Entry point
- `artifacts/uniflow-web/public` - Public assets
- `artifacts/uniflow-web/tailwind.config.js` - Styling

---

## Vercel Build Command Flow

```bash
# 1. Install dependencies (needs pnpm-lock.yaml)
pnpm install --frozen-lockfile

# 2. Build the app (needs all source files)
cd artifacts/uniflow-web && pnpm run build

# 3. Output served from
artifacts/uniflow-web/dist/public/
```

**Each step requires specific files** - removing any breaks the pipeline.

---

## Prevention Checklist Before Deployment

- [ ] `pnpm-lock.yaml` exists in repository root
- [ ] `.vercelignore` doesn't contain `pnpm-lock.yaml`
- [ ] `.vercelignore` doesn't ignore source files (src/, tsconfig.json, etc)
- [ ] `vercel.json` has `"env": {}` (object, not array)
- [ ] No unnecessary `images` config in `vercel.json`
- [ ] `buildCommand` points to correct project: `cd artifacts/uniflow-web && pnpm run build`
- [ ] `outputDirectory` is correct: `artifacts/uniflow-web/dist/public`
- [ ] All lock files are committed to git
- [ ] No temporary files in root directory

---

## Best Practices

### 1. Lock File Management
```bash
# Always regenerate on dependency changes
pnpm install

# Commit the lock file
git add pnpm-lock.yaml
git commit -m "chore: update dependencies"
```

### 2. Testing Build Locally
```bash
# Test the exact build command
cd artifacts/uniflow-web
pnpm run build

# Verify output exists
ls -la dist/public/
```

### 3. Monitoring Deployments
- Check Vercel deployment logs for each build
- Look for "ERROR" keywords in logs
- Verify build artifacts are created (dist/public/)
- Test the deployed URL

---

## Quick Reference

| Issue | Check | Fix |
|-------|-------|-----|
| Lock file error | `.vercelignore` content | Remove `pnpm-lock.yaml` from ignore list |
| Schema error | `vercel.json` env property | Change `"env": []` to `"env": {}` |
| Images error | `vercel.json` images config | Remove `images` property |
| Build failures | Source files in ignore | Remove src/, config files from `.vercelignore` |
| Dependency issues | Lock file exists | Commit `pnpm-lock.yaml` to git |

---

## Debugging Build Issues

### Enable verbose logging
In Vercel dashboard, rebuild with more output to see detailed build steps.

### Check git status
```bash
git status
# Ensure pnpm-lock.yaml shows as tracked (not ignored)
```

### Validate configuration
```bash
# Check JSON syntax
cat vercel.json | python -m json.tool

# Check ignore patterns
cat .vercelignore
```

### Local reproduction
```bash
cd /vercel/share/v0-project
cd artifacts/uniflow-web
pnpm install --frozen-lockfile
pnpm run build
```

---

## Configuration Files Reference

### vercel.json
- `buildCommand`: Command to run the build (points to uniflow-web)
- `outputDirectory`: Where built files are served from
- `installCommand`: Must use `--frozen-lockfile` for reproducibility
- `env`: Environment variables (empty object if none)
- `rewrites`: SPA routing configuration
- `headers`: Security and cache headers

### .vercelignore
- Excludes unnecessary files from deployment
- Reduces deployment size and build time
- Must NOT exclude files needed for the build

### pnpm-lock.yaml
- Lock file for reproducible installs
- Must be in repository
- Must NOT be in `.vercelignore`
- Generated by `pnpm install`

---

## Additional Resources

- [Vercel Configuration](https://vercel.com/docs/projects/project-configuration)
- [pnpm workspaces](https://pnpm.io/workspaces)
- [.vercelignore documentation](https://vercel.com/docs/projects/overview#ignored-files-and-folders)
- [Build outputs documentation](https://vercel.com/docs/concepts/deployments/build-step)

---

Last updated: 2024-07-23
