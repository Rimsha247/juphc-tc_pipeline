# Tax Calculator
Static web app (index.html, script.js, style.css, taxCalculator.js, favicon.ico) served by nginx.

    npm install
    npx jasmine
    docker build -t tax-calculator:1.0 .
    docker run -d -p 8080:80 --name tax tax-calculator:1.0
