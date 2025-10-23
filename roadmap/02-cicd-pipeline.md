# Phase 2: CI/CD Pipeline Setup

> **Goal:** Automate testing, building, publishing to NPM, and Storybook deployment

**Duration:** 3-4 hours
**Dependencies:** Phase 1 (package.json must be complete)
**Agent-Ready:** ✅ Yes
**Priority:** 🔴 Critical

---

## 🎯 Objectives

1. ✅ Create GitHub Actions workflow for continuous integration (CI)
2. ✅ Create automated NPM publishing workflow
3. ✅ Set up Storybook deployment to GitHub Pages
4. ✅ Configure GitHub repository secrets
5. ✅ Test workflows with dry-run

---

## 📋 Tasks

### Task 2.1: Create CI Workflow

**File:** `.github/workflows/ci.yml` (NEW FILE)

**Purpose:** Run on every push/PR to ensure code quality

**Create this file:**

```yaml
name: CI

on:
  push:
    branches: [master, main]
  pull_request:
    branches: [master, main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint-and-typecheck:
    name: Lint & Type Check
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Lint UI package
        run: pnpm --filter @devlaunch/ui lint

      - name: TypeScript check UI package
        run: pnpm --filter @devlaunch/ui typecheck

  build-package:
    name: Build UI Package
    runs-on: ubuntu-latest
    needs: lint-and-typecheck

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build UI package
        run: pnpm --filter @devlaunch/ui build

      - name: Check bundle size
        run: |
          cd packages/ui
          pnpm run size

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: ui-dist
          path: packages/ui/dist
          retention-days: 7

  build-storybook:
    name: Build Storybook
    runs-on: ubuntu-latest
    needs: build-package

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build Storybook
        run: pnpm --filter @devlaunch/ui build-storybook

      - name: Upload Storybook artifact
        uses: actions/upload-artifact@v4
        with:
          name: storybook-static
          path: packages/ui/storybook-static
          retention-days: 7

  build-web-app:
    name: Build Next.js App
    runs-on: ubuntu-latest
    needs: lint-and-typecheck

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build Next.js app
        run: pnpm --filter web build

  all-checks-passed:
    name: All Checks Passed ✅
    runs-on: ubuntu-latest
    needs: [lint-and-typecheck, build-package, build-storybook, build-web-app]
    if: always()

    steps:
      - name: Check all jobs succeeded
        run: |
          if [ "${{ needs.lint-and-typecheck.result }}" != "success" ] || \
             [ "${{ needs.build-package.result }}" != "success" ] || \
             [ "${{ needs.build-storybook.result }}" != "success" ] || \
             [ "${{ needs.build-web-app.result }}" != "success" ]; then
            echo "❌ Some checks failed"
            exit 1
          fi
          echo "✅ All checks passed!"
```

**What This Workflow Does:**
- ✅ Runs on every push to master/main
- ✅ Runs on every pull request
- ✅ Parallel jobs for faster execution
- ✅ Cancels outdated runs (saves CI minutes)
- ✅ Lints and typechecks code
- ✅ Builds UI package and checks bundle size
- ✅ Builds Storybook
- ✅ Builds Next.js app (ensures no breaking changes)
- ✅ Uploads artifacts for inspection

**Acceptance Criteria:**
- [ ] File created at `.github/workflows/ci.yml`
- [ ] Workflow runs on push to master/main
- [ ] Workflow runs on PRs
- [ ] All four jobs complete successfully
- [ ] Bundle size check passes (<50KB)

---

### Task 2.2: Create NPM Publish Workflow

**File:** `.github/workflows/publish.yml` (NEW FILE)

**Purpose:** Automatically publish to NPM when you create a version tag

**Create this file:**

```yaml
name: Publish to NPM

on:
  push:
    tags:
      - 'v*.*.*'  # Triggers on tags like v1.0.0, v1.2.3, etc.

permissions:
  contents: write  # For creating GitHub releases
  id-token: write  # For NPM provenance

jobs:
  publish:
    name: Publish Package
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run linting
        run: pnpm --filter @devlaunch/ui lint

      - name: Run type checking
        run: pnpm --filter @devlaunch/ui typecheck

      - name: Build package
        run: pnpm --filter @devlaunch/ui build

      - name: Run bundle size check
        run: |
          cd packages/ui
          pnpm run size

      - name: Extract version from tag
        id: extract_version
        run: |
          TAG=${GITHUB_REF#refs/tags/}
          VERSION=${TAG#v}
          echo "VERSION=$VERSION" >> $GITHUB_OUTPUT
          echo "TAG=$TAG" >> $GITHUB_OUTPUT

      - name: Verify package version matches tag
        run: |
          PKG_VERSION=$(node -p "require('./packages/ui/package.json').version")
          if [ "$PKG_VERSION" != "${{ steps.extract_version.outputs.VERSION }}" ]; then
            echo "❌ package.json version ($PKG_VERSION) doesn't match tag (${{ steps.extract_version.outputs.VERSION }})"
            exit 1
          fi
          echo "✅ Version match: $PKG_VERSION"

      - name: Publish to NPM
        run: |
          cd packages/ui
          npm publish --provenance --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

      - name: Create GitHub Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ steps.extract_version.outputs.TAG }}
          release_name: Release ${{ steps.extract_version.outputs.TAG }}
          body: |
            ## @devlaunch/ui ${{ steps.extract_version.outputs.VERSION }}

            ### What's Changed
            See [CHANGELOG.md](https://github.com/${{ github.repository }}/blob/main/packages/ui/CHANGELOG.md) for details.

            ### Installation
            ```bash
            npm install @devlaunch/ui@${{ steps.extract_version.outputs.VERSION }}
            ```

            ### Links
            - 📦 [NPM Package](https://www.npmjs.com/package/@devlaunch/ui)
            - 📚 [Documentation](https://${{ github.repository_owner }}.github.io/${{ github.event.repository.name }})
            - 📖 [Storybook](https://${{ github.repository_owner }}.github.io/${{ github.event.repository.name }})
          draft: false
          prerelease: false

      - name: Post-publish notification
        run: |
          echo "✅ Successfully published @devlaunch/ui@${{ steps.extract_version.outputs.VERSION }} to NPM!"
          echo "📦 Package URL: https://www.npmjs.com/package/@devlaunch/ui"
```

**What This Workflow Does:**
- ✅ Triggers when you push a version tag (e.g., `git tag v1.0.0 && git push origin v1.0.0`)
- ✅ Runs all quality checks (lint, typecheck, build, bundle size)
- ✅ Verifies package.json version matches the tag
- ✅ Publishes to NPM with provenance (security feature)
- ✅ Creates a GitHub Release automatically
- ✅ Includes installation instructions in release notes

**Acceptance Criteria:**
- [ ] File created at `.github/workflows/publish.yml`
- [ ] Workflow triggers on version tags (v*.*.*)
- [ ] NPM_TOKEN secret configured (see Task 2.4)
- [ ] Publishes as public scoped package
- [ ] Creates GitHub release automatically

---

### Task 2.3: Create Storybook Deployment Workflow

**File:** `.github/workflows/deploy-storybook.yml` (NEW FILE)

**Purpose:** Deploy Storybook to GitHub Pages on every push to master

**Create this file:**

```yaml
name: Deploy Storybook

on:
  push:
    branches: [master, main]
    paths:
      - 'packages/ui/**'
      - '.github/workflows/deploy-storybook.yml'

# Allow one concurrent deployment
concurrency:
  group: 'pages'
  cancel-in-progress: true

# Sets permissions for GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    name: Build Storybook
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build Storybook
        run: pnpm --filter @devlaunch/ui build-storybook

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './packages/ui/storybook-static'

  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    needs: build

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

      - name: Post-deployment notification
        run: |
          echo "✅ Storybook deployed successfully!"
          echo "🔗 URL: ${{ steps.deployment.outputs.page_url }}"
```

**What This Workflow Does:**
- ✅ Triggers when UI package files change
- ✅ Builds Storybook
- ✅ Deploys to GitHub Pages
- ✅ Provides deployment URL

**Additional Setup Required:**
1. Go to GitHub repository → Settings → Pages
2. Source: GitHub Actions (not Deploy from a branch)
3. Ensure `gh-pages` branch exists or let workflow create it

**Acceptance Criteria:**
- [ ] File created at `.github/workflows/deploy-storybook.yml`
- [ ] GitHub Pages enabled in repo settings
- [ ] Source set to "GitHub Actions"
- [ ] Workflow deploys successfully
- [ ] Storybook accessible at `https://<username>.github.io/<repo>`

---

### Task 2.4: Configure GitHub Secrets

**Purpose:** Store sensitive credentials securely

**Required Secrets:**

#### 1. NPM_TOKEN
**Purpose:** Allows GitHub Actions to publish to NPM

**How to Create:**

1. Go to [npmjs.com](https://www.npmjs.com/) and log in
2. Click your avatar → Access Tokens
3. Generate New Token → Classic Token
4. Select **Automation** type
5. Set expiration (1 year recommended)
6. Copy the token (starts with `npm_`)

**Add to GitHub:**
1. Go to your repo → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `NPM_TOKEN`
4. Value: Paste the token
5. Click "Add secret"

#### 2. GITHUB_TOKEN (Automatic)
**Note:** This is automatically provided by GitHub Actions. No setup needed.

**Acceptance Criteria:**
- [ ] NPM account created
- [ ] NPM automation token generated
- [ ] `NPM_TOKEN` secret added to GitHub repo
- [ ] Token has publish permissions
- [ ] Token expiration noted (set calendar reminder)

---

### Task 2.5: Add Status Badges to README

**File:** `packages/ui/README.md` (will be created in Phase 3)

**Add these badges to the top:**

```markdown
# @devlaunch/ui

[![NPM Version](https://img.shields.io/npm/v/@devlaunch/ui?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@devlaunch/ui)
[![NPM Downloads](https://img.shields.io/npm/dm/@devlaunch/ui?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@devlaunch/ui)
[![CI](https://github.com/yourusername/devl-project/actions/workflows/ci.yml/badge.svg)](https://github.com/yourusername/devl-project/actions/workflows/ci.yml)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@devlaunch/ui?style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/package/@devlaunch/ui)
[![License](https://img.shields.io/npm/l/@devlaunch/ui?style=flat&colorA=000000&colorB=000000)](https://github.com/yourusername/devl-project/blob/main/packages/ui/LICENSE)

> Enterprise-grade React component library with beautiful animations
```

**Update URLs:**
- Replace `yourusername` with your GitHub username
- Replace `devl-project` with your repo name

**Acceptance Criteria:**
- [ ] Badges added to README
- [ ] All URLs correct
- [ ] Badges display properly on GitHub
- [ ] CI badge shows passing

---

## ✅ Verification Steps

### 1. Test CI Workflow

**Create a test branch:**
```bash
git checkout -b test/ci-workflow
git push origin test/ci-workflow
```

**Create a PR:**
- GitHub Actions should trigger automatically
- Check Actions tab to see workflow running
- All jobs should pass ✅

### 2. Test Storybook Deployment (Dry Run)

**Merge to master:**
```bash
git checkout master
git merge test/ci-workflow
git push origin master
```

**Verify:**
- Check Actions tab
- "Deploy Storybook" workflow should run
- Visit `https://yourusername.github.io/devl-project`
- Storybook should load

### 3. Test Publish Workflow (DRY RUN - DO NOT TAG YET!)

**Create a test tag locally (don't push):**
```bash
git tag v0.0.0-test
```

**Delete tag:**
```bash
git tag -d v0.0.0-test
```

**Note:** Don't push tags until v1.0.0 is ready! The publish workflow will actually publish to NPM.

---

## 📊 Acceptance Criteria

**Before marking this phase complete, ensure:**

- [ ] `.github/workflows/ci.yml` created
- [ ] `.github/workflows/publish.yml` created
- [ ] `.github/workflows/deploy-storybook.yml` created
- [ ] `NPM_TOKEN` secret configured
- [ ] GitHub Pages enabled
- [ ] CI workflow runs and passes
- [ ] Storybook deploys to GitHub Pages
- [ ] Status badges added to README (Phase 3)
- [ ] All workflows tested (except publish - that's for v1.0.0)

---

## 🚨 Common Issues & Solutions

### Issue: CI workflow fails with "pnpm not found"
**Solution:** Ensure `pnpm/action-setup@v2` step is present

### Issue: NPM publish fails with 403 Forbidden
**Solution:**
- Verify NPM_TOKEN is correct
- Check token has publish permissions
- Ensure package name isn't taken (`npm search @devlaunch/ui`)

### Issue: Storybook deployment 404s
**Solution:**
- Check GitHub Pages settings (must use "GitHub Actions" source)
- Verify deployment workflow completed
- Wait 2-3 minutes for Pages to update

### Issue: Bundle size check fails
**Solution:**
- Review what's being bundled (`pnpm run size:why`)
- Ensure externals are correct in tsup.config.ts
- Check Radix/React not accidentally bundled

---

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [NPM Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [GitHub Pages Deployment](https://docs.github.com/en/pages)
- [Semantic Versioning](https://semver.org/)

---

## ⏭️ Next Phase

Once complete, you can proceed to:
- **Phase 3: Documentation** (independent)
- **Phase 4-6: Components** (independent)
- **Phase 7: Theming** (independent)

All phases can run in parallel after Phases 1 & 2 complete.

---

**Estimated Time:** 3-4 hours
**Difficulty:** ⭐⭐⭐ Moderate-Advanced
**Impact:** 🔥 Critical - Automation foundation
