#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const [reportPath, device = 'unknown', thresholdArg = '70'] = process.argv.slice(2);
if (!reportPath) {
  console.error('Usage: node scripts/assert-lighthouse-score.mjs <report.json> <device> [minimum-performance-score]');
  process.exit(2);
}

const threshold = Number(thresholdArg);
if (!Number.isFinite(threshold) || threshold < 0 || threshold > 100) {
  throw new Error('Performance threshold must be between 0 and 100');
}

const report = JSON.parse(await readFile(reportPath, 'utf8'));
const categories = report.categories ?? {};
const score = (name) => {
  const value = categories[name]?.score;
  return typeof value === 'number' ? Math.round(value * 100) : null;
};

const performance = score('performance');
const results = {
  device,
  performance,
  accessibility: score('accessibility'),
  bestPractices: score('best-practices'),
  seo: score('seo'),
  url: report.finalDisplayedUrl ?? report.finalUrl ?? 'unknown',
};

console.log('Lighthouse scores: ' + JSON.stringify(results));

if (performance === null) {
  throw new Error('Lighthouse report does not contain a performance score');
}
if (performance < threshold) {
  throw new Error(
    'Lighthouse ' + device + ' performance score ' + performance +
    ' is below the required threshold ' + threshold,
  );
}
