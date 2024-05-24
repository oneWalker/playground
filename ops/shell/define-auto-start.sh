# Step 1, edit the service file in /etc/systemd/system, yourapp can be any name you like.
sudo vim /etc/systemd/system/yourapp.service
# Step 2, write the following content into the file.
[Unit]
Description=Rating System Service
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/nohup /usr/bin/java -jar -Dspring.profiles.active=prod /app/ratingsystem-0.0.3-SNAPSHOT.jar
User=ubuntu
WorkingDirectory=/app
StandardOutput=file:/app/logs/ratingsystem.log
StandardError=file:/app/logs/ratingsystem_error.log

[Install]
WantedBy=multi-user.target

# Step 3, reload the systemd service.
sudo systemctl daemon-reload

# Step 4, start the service.
sudo systemctl start yourapp

# Step 5, enable the service on boot.
sudo systemctl enable yourapp

# Step 6, check the status of the service.
sudo systemctl status yourapp