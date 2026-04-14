const fs = require('fs');
const path = require('path');

const VERCEL_TOKEN = process.env.VERCEL_OIDC_TOKEN;
const TEAM_ID = "team_BeIliWVpxPJ5VXv2m6rRRxjp";
const PROJECT_ID = "prj_bGdeTt2rw6b9eZoJhO3wj5Ed2DAc";

async function deployFiles() {
  try {
    // Read files
    const indexHtml = fs.readFileSync('index.html', 'utf-8');
    const dataJson = fs.readFileSync('data.json', 'utf-8');

    console.log('Files loaded successfully');
    console.log('index.html:', indexHtml.length, 'bytes');
    console.log('data.json:', dataJson.length, 'bytes');

    // Create deployment payload
    const deploymentData = {
      files: [
        {
          file: 'index.html',
          data: indexHtml
        },
        {
          file: 'data.json',
          data: dataJson
        }
      ]
    };

    // Use curl to deploy
    const curlCommand = `curl -X POST https://api.vercel.com/v13/deployments \\
      -H "Authorization: Bearer ${VERCEL_TOKEN}" \\
      -H "Content-Type: application/json" \\
      -H "vercel-teamId: ${TEAM_ID}" \\
      -d '${JSON.stringify(deploymentData)}'`;

    console.log('Deployment command prepared');
    console.log('Token available:', !!VERCEL_TOKEN);
    console.log('Team ID:', TEAM_ID);
    console.log('Project ID:', PROJECT_ID);

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

deployFiles();
