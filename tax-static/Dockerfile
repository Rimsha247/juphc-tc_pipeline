cd /home/project/tax-calculator/tax-static
cat > Dockerfile << 'EOF'
FROM nginxinc/nginx-unprivileged:latest
COPY favicon.ico /usr/share/nginx/html/favicon.ico
COPY index.html /usr/share/nginx/html/index.html
COPY script.js /usr/share/nginx/html/script.js
COPY style.css /usr/share/nginx/html/style.css
COPY taxCalculator.js /usr/share/nginx/html/taxCalculator.js
EOF
cat Dockerfile
