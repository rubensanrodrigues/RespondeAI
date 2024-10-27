#!/bin/sh
/etc/init.d/nginx start
cd RespondeAI/backend
waitress-serve --host 127.0.0.1 app:app