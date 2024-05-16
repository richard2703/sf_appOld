## SOCIALFLOW APP

cordova build android --prod --release
sudo n 8.11.3
sudo n 12.16.1

keytool -genkey -v -keystore social-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias social-key
/Users/alonso/Library/Android/sdk/build-tools/27.0.3/zipalign -v -p 4 app-release-unsigned.apk app-zip.apk
/Users/alonso/Library/Android/sdk/build-tools/27.0.3/apksigner sign --ks social-key.jks --out social.apk app-zip.apk

cordova build android --release -- --keystore=./social-key.jks --storePassword=sustam --alias=social-key --password=sustam

info@socialflowapp.com

56 tony@socialflowapp.com
464 ccrr@gmail.com
53 vdleslie@gmail.com
58 uriel.rodriguez.lopez@gmail.com
310 rtelz073@gmail.com
362 nicolevianne2002@hotmail.com
362 mmzz@gmail.com
411 ramirolomelig@gmail.com
8 	lalo@sustam.com
410	lar@gmail.com

## Errro en qrscaner
remplazar UIApplication.openSettingsURLString por UIApplicationOpenSettingsURLString en platforms/ios/Proyecto/Plugins/.....qrscaneer/.....swift
For Android 
cordova plugin rm cordova-plugin-keyboard && cordova plugin add cordova-plugin-ionic-keyboard

## Version original
Node version: v8.11.3
Cordova version: 8.1.0

### Instalacion del plugin de facebook
cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="179170914228450" --variable APP_NAME="SocialFlow"
cordova plugin rm cordova-plugin-facebook4 --save

### Agrega esto al podfile en platforms/ios
target 'SocialFlow' do
	project 'SocialFlow.xcodeproj'
	pod 'FirebaseMessaging', '~> 2.0.0'
	pod 'FBSDKCoreKit', '~> 5.15.0'
	pod 'FBSDKShareKit', '~> 5.15.0'
	pod 'FBSDKLoginKit', '~> 5.15.0'
end

## Por utlimo en platform/ios
pod install


