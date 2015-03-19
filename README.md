
# Prerequisite

You'll need node and gulp installed.

Download node from [Nodejs.org](https://nodejs.org) and run the installer.

Then, install the `gulp` command globally with

```
npm install -g gulp
```

(You may or may not need to run that command via `sudo`.)


# Server

You need to clone and run the accompanying server, which is here: [Wookiee-Sockets](https://github.com/radishmouse/wookiee-sockets)

Then, find out your computer's IP address and change the URL in the script tag in `accel-fun.html`. (You might also want to comment out the `alert` that reminds you to change the URL.)

# Getting this project running:

```
npm install && bower install
gulp serve
```

This opens your default browser to `:9000`, where the index.html will show you a wookiee.

On your phone, open your computer's IP address to port `9000` and append `/accel-fun.html`

For example: `http://192.168.1.100:9000/accel-fun.html`

Shake your phone, and you should see the wookiee dance...!
