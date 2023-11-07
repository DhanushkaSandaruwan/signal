const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});
const {Builder, By, Key, until, WebElement} = require('selenium-webdriver');
let signals = [];
let driver;
app.use(express.json());

// REST API for login
app.post('/login', (req, res) => {
    // Implement your login logic here
    res.json({message: 'Login API called'});
});

// WebSocket API
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Implement your WebSocket logic here
        console.log(`Received: ${message}`);

        // Send data to the WebSocket client
        ws.send('Hello from the server!'); // Replace with your data
    });
});

server.listen(3000, async () => {
    await setInitialData();
    await initializeDriver();
    collectData();
    console.log('Server is running on port 3000');
});

async function setInitialData() {
    signals.push({
        name: 'AUDCAD',
        primary_direction: '-',
        primary_sell: '-',
        primary_neutral: '-',
        primary_buy: '-',
        secondary_direction: '',
        secondary_sell: '-',
        secondary_neutral: '',
        secondary_buy: '-'
    });
    signals.push({
        name: 'AUDJPY',
        primary_direction: '-',
        primary_sell: '-',
        primary_neutral: '-',
        primary_buy: '-',
        secondary_direction: '',
        secondary_sell: '-',
        secondary_neutral: '',
        secondary_buy: '-'
    });
    signals.push({
        name: 'AUDUSD',
        primary_direction: '-',
        primary_sell: '-',
        primary_neutral: '-',
        primary_buy: '-',
        secondary_direction: '',
        secondary_sell: '-',
        secondary_neutral: '',
        secondary_buy: '-'
    });
    signals.push({
        name: 'AUDCHF',
        primary_direction: '-',
        primary_sell: '-',
        primary_neutral: '-',
        primary_buy: '-',
        secondary_direction: '',
        secondary_sell: '-',
        secondary_neutral: '',
        secondary_buy: '-'
    });
    signals.push({
        name: 'GBPJPY',
        primary_direction: '-',
        primary_sell: '-',
        primary_neutral: '-',
        primary_buy: '-',
        secondary_direction: '',
        secondary_sell: '-',
        secondary_neutral: '',
        secondary_buy: '-'
    });
    signals.push({
        name: 'GBPAUD',
        primary_direction: '-',
        primary_sell: '-',
        primary_neutral: '-',
        primary_buy: '-',
        secondary_direction: '',
        secondary_sell: '-',
        secondary_neutral: '',
        secondary_buy: '-'
    });
    signals.push({
        name: 'GBPCAD',
        primary_direction: '-',
        primary_sell: '-',
        primary_neutral: '-',
        primary_buy: '-',
        secondary_direction: '',
        secondary_sell: '-',
        secondary_neutral: '',
        secondary_buy: '-'
    });
    signals.push({
        name: 'GBPUSD',
        primary_direction: '-',
        primary_sell: '-',
        primary_neutral: '-',
        primary_buy: '-',
        secondary_direction: '',
        secondary_sell: '-',
        secondary_neutral: '',
        secondary_buy: '-'
    });
    signals.push({
        name: 'GBPCHF',
        primary_direction: '-',
        primary_sell: '-',
        primary_neutral: '-',
        primary_buy: '-',
        secondary_direction: '',
        secondary_sell: '-',
        secondary_neutral: '',
        secondary_buy: '-'
    });
    signals.push({
        name: 'USDCAD',
        primary_direction: '-',
        primary_sell: '-',
        primary_neutral: '-',
        primary_buy: '-',
        secondary_direction: '',
        secondary_sell: '-',
        secondary_neutral: '',
        secondary_buy: '-'
    });
    signals.push({
        name: 'USDJPY',
        primary_direction: '-',
        primary_sell: '-',
        primary_neutral: '-',
        primary_buy: '-',
        secondary_direction: '',
        secondary_sell: '-',
        secondary_neutral: '',
        secondary_buy: '-'
    });
    signals.push({
        name: 'USDCNH',
        primary_direction: '-',
        primary_sell: '-',
        primary_neutral: '-',
        primary_buy: '-',
        secondary_direction: '',
        secondary_sell: '-',
        secondary_neutral: '',
        secondary_buy: '-'
    });
    signals.push({
        name: 'USDCHF',
        primary_direction: '-',
        primary_sell: '-',
        primary_neutral: '-',
        primary_buy: '-',
        secondary_direction: '',
        secondary_sell: '-',
        secondary_neutral: '',
        secondary_buy: '-'
    });
    signals.push({
        name: 'EURAUD',
        primary_direction: '-',
        primary_sell: '-',
        primary_neutral: '-',
        primary_buy: '-',
        secondary_direction: '',
        secondary_sell: '-',
        secondary_neutral: '',
        secondary_buy: '-'
    });
    signals.push({
        name: 'EURJPY',
        primary_direction: '-',
        primary_sell: '-',
        primary_neutral: '-',
        primary_buy: '-',
        secondary_direction: '',
        secondary_sell: '-',
        secondary_neutral: '',
        secondary_buy: '-'
    });
    signals.push({
        name: 'EURCHF',
        primary_direction: '-',
        primary_sell: '-',
        primary_neutral: '-',
        primary_buy: '-',
        secondary_direction: '',
        secondary_sell: '-',
        secondary_neutral: '',
        secondary_buy: '-'
    });
    signals.push({
        name: 'EURCAD',
        primary_direction: '-',
        primary_sell: '-',
        primary_neutral: '-',
        primary_buy: '-',
        secondary_direction: '',
        secondary_sell: '-',
        secondary_neutral: '',
        secondary_buy: '-'
    });
    signals.push({
        name: 'EURUSD',
        primary_direction: '-',
        primary_sell: '-',
        primary_neutral: '-',
        primary_buy: '-',
        secondary_direction: '',
        secondary_sell: '-',
        secondary_neutral: '',
        secondary_buy: '-'
    });
    signals.push({
        name: 'EURGBP',
        primary_direction: '-',
        primary_sell: '-',
        primary_neutral: '-',
        primary_buy: '-',
        secondary_direction: '',
        secondary_sell: '-',
        secondary_neutral: '',
        secondary_buy: '-'
    });
    signals.push({
        name: 'CADJPY',
        primary_direction: '-',
        primary_sell: '-',
        primary_neutral: '-',
        primary_buy: '-',
        secondary_direction: '',
        secondary_sell: '-',
        secondary_neutral: '',
        secondary_buy: '-'
    });
    signals.push({
        name: 'CADCHF',
        primary_direction: '-',
        primary_sell: '-',
        primary_neutral: '-',
        primary_buy: '-',
        secondary_direction: '',
        secondary_sell: '-',
        secondary_neutral: '',
        secondary_buy: '-'
    });
}

async function initializeDriver() {
    console.log('initializing driver')
    try {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('C:\\Users\\Dhanushka\\Documents\\projects\\svr\\widget.html');
    } catch (error) {
        console.error('Error:', error);
    }
}

async function collectData() {
    while (true) {
        let name;
        let direction;
        let sell;
        let neutral;
        let buy;
        await sleep(30000);
        await setInitialData();
        let frames = await driver.findElement(By.tagName("body")).findElements(By.tagName("iframe"));
        for (const frame of frames) {
            try {
                await driver.switchTo().frame(frame);
                name = await driver.findElement(By.xpath("//*[@id=\"widget-technical-analysis-container\"]/div/div/div/div/span")).getAttribute('innerText');
                direction = await driver.findElement(By.xpath("//*[@id=\"widget-technical-analysis-container\"]/div/div/div/div/div[2]/div[1]/div[3]")).getAttribute('class');
                sell = await driver.findElement(By.xpath("//*[@id=\"widget-technical-analysis-container\"]/div/div/div/div/div[2]/div[2]/div[1]/span[2]")).getAttribute('innerText');
                neutral = await driver.findElement(By.xpath("//*[@id=\"widget-technical-analysis-container\"]/div/div/div/div/div[2]/div[2]/div[2]/span[2]")).getAttribute('innerText');
                buy = await driver.findElement(By.xpath("//*[@id=\"widget-technical-analysis-container\"]/div/div/div/div/div[2]/div[2]/div[3]/span[2]")).getAttribute('innerText');

                name = name.replace('Technical Analysis for ', '');
                if (direction.includes('container-neutral')) {
                    direction = 'Neutral';
                } else if (direction.includes('container-strong-buy')) {
                    direction = 'Strong Buy';
                } else if (direction.includes('container-strong-sell')) {
                    direction = 'Strong Sell';
                } else if (direction.includes('container-buy')) {
                    direction = 'Buy';
                } else if (direction.includes('container-sell')) {
                    direction = 'Sell';
                }

                for (let i = 0; i < signals.length; i++) {
                    if (signals[i].name === name) {
                        signals[i].primary_direction = direction;
                        signals[i].primary_sell = sell;
                        signals[i].primary_neutral = neutral;
                        signals[i].primary_buy = buy;
                        break;
                    }
                }
                if (direction.includes('Strong') && (parseInt(sell) > 16 || parseInt(buy) > 16)) {
                    await driver.findElement(By.xpath('//*[@id="5m"]')).click();
                    name = '';
                    direction = '';
                    sell = '';
                    neutral = '';
                    buy = '';
                    await sleep(5000);

                    name = await driver.findElement(By.xpath("//*[@id=\"widget-technical-analysis-container\"]/div/div/div/div/span")).getAttribute('innerText');
                    direction = await driver.findElement(By.xpath("//*[@id=\"widget-technical-analysis-container\"]/div/div/div/div/div[2]/div[1]/div[3]")).getAttribute('class');
                    sell = await driver.findElement(By.xpath("//*[@id=\"widget-technical-analysis-container\"]/div/div/div/div/div[2]/div[2]/div[1]/span[2]")).getAttribute('innerText');
                    neutral = await driver.findElement(By.xpath("//*[@id=\"widget-technical-analysis-container\"]/div/div/div/div/div[2]/div[2]/div[2]/span[2]")).getAttribute('innerText');
                    buy = await driver.findElement(By.xpath("//*[@id=\"widget-technical-analysis-container\"]/div/div/div/div/div[2]/div[2]/div[3]/span[2]")).getAttribute('innerText');

                    name = name.replace('Technical Analysis for ', '');
                    if (direction.includes('container-neutral')) {
                        direction = 'Neutral';
                    } else if (direction.includes('container-strong-buy')) {
                        direction = 'Strong Buy';
                    } else if (direction.includes('container-strong-sell')) {
                        direction = 'Strong Sell';
                    } else if (direction.includes('container-buy')) {
                        direction = 'Buy';
                    } else if (direction.includes('container-sell')) {
                        direction = 'Sell';
                    }

                    for (let i = 0; i < signals.length; i++) {
                        if (signals[i].name === name) {
                            signals[i].secondary_direction = direction;
                            signals[i].secondary_sell = sell;
                            signals[i].secondary_neutral = neutral;
                            signals[i].secondary_buy = buy;
                            break;
                        }
                    }
                    notify();
                }
                await driver.switchTo().defaultContent();
                name = '';
                direction = '';
                sell = '';
                neutral = '';
                buy = '';
            } catch (e) {
                console.error('data collection error!')
            }
        }
        await driver.navigate().refresh();
    }
}

async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function notify() {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(signals));
        }
    });
}
