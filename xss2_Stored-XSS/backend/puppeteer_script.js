const puppeteer = require('puppeteer');

async function simulateUserVisit(link) {
    try {
        process.stdout.write('Launching Puppeteer...\n');
        const browser = await puppeteer.launch({
            headless: true,
            executablePath: '/usr/bin/chromium',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        process.stdout.write('Browser launched.\n');
        
        const page = await browser.newPage();
        process.stdout.write('New page created.\n');
        
        process.stdout.write('Setting cookie...\n');
        await page.setCookie({
            name: 'session',
            value: 'flag{this_is_secret_cookie}',
            domain: 'xss2-frontend',
        });
        process.stdout.write('Cookie set.\n');
        
        process.stdout.write('Navigating to link: ' + link + '\n');
        await page.goto(link, { waitUntil: 'networkidle2' });
        process.stdout.write('Visited link: ' + link + '\n');
        
        await browser.close();
        process.stdout.write('Browser closed.\n');
    } catch (err) {
        process.stderr.write('Error in Puppeteer script: ' + err + '\n');
    }
}

const link = process.argv[2];
if (link && link.startsWith('http://localhost:3000')) {
    // Convert the link from http://localhost:3000 to http://xss1-frontend:3000 and keep the rest of the path
    const convertedLink = 'http://xss2-frontend:3000' + link.slice(21);
    simulateUserVisit(convertedLink).then(() => {
        process.stdout.write('Simulated user visit to ' + convertedLink + '\n');
    }).catch(err => {
        process.stderr.write('Error simulating user visit: ' + err + '\n');
    });
} else {
    process.stdout.write('Invalid link. Only links starting with http://localhost:3000 are allowed.\n');
}