## Councils App ##

The councils app is built on the Ionic Framework. As such, it is able to be distributed as a native app on both Android and iOS. Since Ionic/Cordova use HTML5/CSS/JS as the base of the UI, the apps can be tested in a normal web browser. So you don't need to install any emulators to test the functionality.

#### Installation: ####

The installation process requires both node.js and npm to be installed. Once those are installed, the rest is pretty straight forward.

Install Cordova (core of Ionic) with:

```npm install -g cordova```

Install Ionic with:

```npm install -g ionic```

Then pull down the latest project code into your favorite working directory with:

```git clone https://www.github.com/Verdad/councils.git```


#### Running the App: ####

Navigate to the directory with:

```cd councils```

and run the Ionic mini-server with:

```ionic serve```

A browser window should open displaying the application. Navigate and test the app using the mouse as your finger (so you have to click and drag to emulate a touch and swipe).

#### Building Native: ####

If you're feeling ambitious (or curious) you can build the app for Android or iOS. Run

```
ionic platform add ios
ionic platform add android
```

to download/install the proper frameworks. Then

```
ionic build ios
ionic build android
```

will package and build the native apps. 

#### Emulating Native iOS: ####

```
npm install -g ios-sim
ionic emulate ios
```

#### Automated Testing: ####

Run the Ionic mini-server with:

```
ionic serve
```

Then remove ```#/``` from the url and add ```/test``` to the end so the url looks like:

```
http://{{domain}}:{{port}}/test
```
