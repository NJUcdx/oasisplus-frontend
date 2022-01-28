source /etc/profile
/usr/local/nginx/sbin/nginx -s stop
rm -rf /usr/local/nginx/html/*
cnpm i
/usr/local/bin/npm run build
cp -r dist/*  /usr/local/nginx/html/
/usr/local/nginx/sbin/nginx