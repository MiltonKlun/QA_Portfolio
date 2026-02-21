import fs from 'fs';

function parseReport(filename) {
    try {
        const content = fs.readFileSync(filename, 'utf-8');
        const match = content.match(/window\.__LIGHTHOUSE_JSON__\s*=\s*(\{.*?\});<\/script>/s);
        if (!match) {
            console.log(`Could not extract JSON from ${filename}`);
            return;
        }
        const data = JSON.parse(match[1]);
        console.log(`\n=== ${filename} ===`);
        const cats = data.categories || {};
        for (const [key, cat] of Object.entries(cats)) {
            console.log(`${cat.title}: ${Math.round(cat.score * 100)}`);
        }
        
        console.log('\nTop Areas for Improvement:');
        const audits = Object.values(data.audits || {})
            .filter(a => a.score !== null && a.score < 1 && ['numeric', 'binary'].includes(a.scoreDisplayMode))
            .sort((a, b) => (a.score || 0) - (b.score || 0))
            .slice(0, 5);
            
        for (const audit of audits) {
            console.log(`- ${audit.title}: ${audit.displayValue || ''} (Score: ${audit.score})`);
            console.log(`  ${audit.description.split('.')[0]}.`);
        }
    } catch (e) {
        console.error(`Error parsing ${filename}: `, e.message);
    }
}

parseReport('qa-artifacts/lighthouse-report-desktop.html');
parseReport('qa-artifacts/lighthouse-report-mobile.html');
