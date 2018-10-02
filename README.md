[![codebeat badge](https://codebeat.co/badges/038c799e-4818-4598-ad0e-0fe648046fe8)](https://codebeat.co/projects/github-com-luzma87-twparking-master)

1. clone project
1. install watchman and node 
`brew install node`
`brew install watchman`
1. install react-native: `npm install -g react-native-cli`
1. install dependencies: `./go clean`
1. install pods (ios only) `./go init_ios`
1. install adb tools (android only) `brew cask install android-platform-tools`
1. set ANDROID_HOME to whatever you have in Android Studio
1. fix xcode 🙄 https://stackoverflow.com/questions/39778607/error-running-react-native-app-from-terminal-ios
1. start app: `./go start_ios` *may need to do it twice...
1. start app: `./go start_android` (needs an open emulator or a connected device) *may need to do it twice...

