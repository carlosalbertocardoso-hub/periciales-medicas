#!/usr/bin/env node

/**
 * GTM Verification Script
 * Verifica que GTM está cargado y funcionando correctamente
 *
 * Ejecutar: npm run verify:gtm (o node scripts/verify-gtm.js)
 */

const https = require('https');
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
};

function log(msg, color = 'reset') {
  console.log(`${colors[color]}${msg}${colors.reset}`);
}

async function checkGTMId(gtmId) {
  return new Promise((resolve) => {
    const url = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    https
      .get(url, (res) => {
        resolve(res.statusCode === 200);
      })
      .on('error', () => {
        resolve(false);
      });
  });
}

async function main() {
  log('\n🔍 GTM Verification Checklist\n', 'blue');

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  // 1. Check env var
  if (!gtmId) {
    log('❌ NEXT_PUBLIC_GTM_ID not found in .env', 'red');
    log('\nAdd to .env or Vercel:');
    log('  NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX', 'yellow');
    process.exit(1);
  }

  log(`✅ NEXT_PUBLIC_GTM_ID found: ${gtmId}`, 'green');

  // 2. Validate format
  if (!/^GTM-[A-Z0-9]+$/.test(gtmId)) {
    log(`❌ Invalid GTM ID format: ${gtmId}`, 'red');
    log('Should be: GTM-XXXXXXX', 'yellow');
    process.exit(1);
  }

  log('✅ GTM ID format valid', 'green');

  // 3. Check if GTM script is accessible
  log('\n⏳ Checking if GTM script is accessible...', 'blue');
  const isAccessible = await checkGTMId(gtmId);

  if (isAccessible) {
    log('✅ GTM script is accessible', 'green');
  } else {
    log(
      '⚠️  Could not reach GTM script (this is normal if GTM ID is new)',
      'yellow'
    );
  }

  // 4. Show manual verification steps
  log('\n📋 Manual Verification Steps:\n', 'blue');
  log('1. npm run dev (start dev server)', 'gray');
  log('2. Open http://localhost:3000', 'gray');
  log('3. Open DevTools (F12)', 'gray');
  log('4. Console tab → type: dataLayer', 'gray');
  log('5. Should see array with consent events', 'gray');
  log('\n6. Fill & submit a form (Consulta or Contacto)', 'gray');
  log('7. Console → type: dataLayer[dataLayer.length - 1]', 'gray');
  log('8. Should see event object with event: "form_submitted"', 'gray');

  log('\n🎯 Next Steps:\n', 'blue');
  log('1. Go to Google Tag Manager', 'gray');
  log('   https://tagmanager.google.com/', 'gray');
  log('\n2. Create container for pericialesmedicas.es', 'gray');
  log('\n3. Copy GTM ID to .env and Vercel', 'gray');
  log('\n4. In GTM, create GA4 Configuration tag', 'gray');
  log('\n5. Publish changes in GTM', 'gray');
  log('\n6. Run this script again to verify\n', 'gray');
}

main().catch(console.error);
