const express = require('express');
const app = express();

app.get('/', (req, res) => {
    const plan = [
        "1. Regular physical exercise",
        "2. Healthy diet",
        "3. Mental stimulation",
        "4. Quality sleep",
        "5. Stress management",
        "6. Social engagement",
        "7. Regular medical check-ups"
    ];
    res.send(`
        <html>
            <head>
                <title>7-Point Plan to Treat Dementia</title>
            </head>
            <body>
                <h1>7-Point Plan to Treat Dementia</h1>
                <ul>
                    ${plan.map(point => `<li>${point}</li>`).join('')}
                </ul>
            </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
