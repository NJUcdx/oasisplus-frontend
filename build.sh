/usr/local/nginx/sbin/nginx -s stop
rm -rf /usr/local/nginx/html/*
cnpm i
npm run build
cp -r dist/*  /usr/local/nginx/html/
/usr/local/nginx/sbin/nginx