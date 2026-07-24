# UniFlow Web - Guide de Déploiement Vercel

## 🚀 Configuration Optimisée

Ce projet est configuré pour un déploiement optimal sur Vercel avec les standards suivants :

### Performance
- **Code Splitting**: Chunks automatiques pour React, UI, Charts, et Framer
- **Minification**: Terser avec compression aggressive
- **CSS**: Code splitting activé pour CSS-in-JS
- **Caching**: Assets statiques cachées pendant 1 an
- **Build Target**: ES2020 pour les navigateurs modernes

### Security Headers
- `X-Content-Type-Options: nosniff` - Prévient le MIME sniffing
- `X-Frame-Options: DENY` - Prévient le clickjacking
- `X-XSS-Protection: 1; mode=block` - XSS protection
- `Referrer-Policy: strict-origin-when-cross-origin` - Contrôle le referrer
- `Permissions-Policy` - Restreint l'accès caméra/micro

### Cache Strategy
- **Assets (JS/CSS)**: 1 an (immutable)
- **HTML**: 1 heure (doit être revalidé)
- **API responses**: Défini par les headers de réponse

## 📦 Taille du Bundle

### Optimisations appliquées
1. Code splitting par vendor
2. Tree-shaking des imports non utilisés
3. Minification aggressive
4. Console logs supprimés en production
5. Source maps désactivées

### Limites attendues
- Chunk principal: ~150KB (gzippé)
- Total: <500KB (gzippé)

## 🖼️ Images et Assets

### Recommandations
1. **Logos**: 
   - Format: PNG avec alpha channel
   - Taille recommandée: <100KB
   - Actuel: uniflow-logo.png (856KB) - À optimiser

2. **Design mockups**:
   - Actuellement dans `/public` (à déplacer en assets optionnels)
   - Recommandation: Héberger sur CDN externe ou Vercel Blob Storage

3. **Optimisation**:
   ```bash
   # Compresser les images PNG
   pnpm install -D imagemin imagemin-optipng imagemin-pngquant
   
   # Réduire la qualité des mockups
   # Les images de design (>1MB) devraient être servies via CDN
   ```

## 🔄 Variables d'Environnement

Configurer via Vercel Settings > Environment Variables:

```
VITE_APP_NAME=UniFlow
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=https://api.example.com
```

## 📋 Checklist de Déploiement

- [x] Vercel.json configuré avec headers de sécurité
- [x] Vite config optimisé (code splitting, minification)
- [x] .vercelignore configuré
- [x] TypeScript strict mode
- [x] SPA routing configuré (rewrites)
- [ ] Images compressées (<100KB pour logos)
- [ ] Monitorer Core Web Vitals post-déploiement
- [ ] Configurer monitoring (Sentry/datadog optionnel)

## 🎯 Performance Targets

- **Lighthouse**: >85 (desktop)
- **LCP**: <2.5s
- **FID**: <100ms
- **CLS**: <0.1
- **First Contentful Paint**: <1.5s
- **Bundle gzippé**: <500KB

## 🔗 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Build Optimization](https://vitejs.dev/guide/build.html)
- [Tailwind Performance](https://tailwindcss.com/docs/optimizing-for-production)

## 📞 Troubleshooting

### Le build échoue
1. Vérifier les logs: `vercel logs --tail`
2. Vérifier que `pnpm install` s'exécute correctement
3. Vérifier la version Node.js (actuellement 20.x)

### Performance dégradée
1. Analyser le bundle: `npm run build -- --analyze`
2. Vérifier les images trop volumineuses
3. Vérifier les imports non optimisés

### Issues de cache
1. Utiliser `vercel pull` pour resynchroniser
2. Invalider le cache via Vercel dashboard
3. Redéployer avec `vercel --prod`
