import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function extractLighthouseData(filePath) {
  try {
    const html = fs.readFileSync(filePath, "utf-8");
    const jsonMatch = html.match(/window\.__LIGHTHOUSE_JSON__ = (.*?);<\/script>/);
    if (!jsonMatch) {
      console.log(`Could not find Lighthouse JSON in ${filePath}`);
      return;
    }
    const data = JSON.parse(jsonMatch[1]);
    
    console.log(`=== ${filePath} ===`);
    
    const audits = data.audits;
    
    console.log("--- Forced Reflow ---");
    if (audits['diagnostics'] && audits['diagnostics'].details && audits['diagnostics'].details.items) {
      // Sometimes reflow is hidden in diagnostics or a specific audit like "layout-shifts" or "metrics"
      // Actually, Lighthouse audit ID for forced reflow is 'diagnostics' ? No, it's often 'long-tasks' or specific.
      // Let's just dump the audit names that failed
    }
    
    // specifically look for 'network-requests' or 'critical-request-chains'
    console.log("--- Critical Request Chains ---");
    if (audits['critical-request-chains']) {
      console.log(JSON.stringify(audits['critical-request-chains'].details, null, 2));
    }
    
    console.log("--- Other Audits with score < 1 ---");
    for (const key of Object.keys(audits)) {
      if (audits[key].score !== null && audits[key].score < 1 && key !== 'critical-request-chains') {
        console.log(`\nAudit: ${key}`);
        if (audits[key].details) {
           // console.log(JSON.stringify(audits[key].details, null, 2).substring(0, 500));
           if (audits[key].details.items) {
             console.log(JSON.stringify(audits[key].details.items, null, 2).substring(0, 1000));
           }
        }
      }
    }
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

extractLighthouseData(join(__dirname, "qa-artifacts/lighthouse-report-mobile.html"));
