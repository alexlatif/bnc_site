```bash
rsync -avz --delete --exclude '.git' --exclude 'node_modules' . cpu:~/bnc-site/
sudo cp -r /root/bnc-site/* /var/www/bnc-site/

sudo nano /etc/caddy/Caddyfile
sudo systemctl reload caddy
```