#!/bin/bash


function foregroundColor() {
  local colorCode=${1}
  tput setaf $colorCode 2> /dev/null
}

# Ignore failures when trying to get colors
set +e
normal=$(tput sgr0 2> /dev/null)

red=$(foregroundColor 1)
green=$(foregroundColor 2)

utils_fg=$(foregroundColor 9)
android_fg=$(foregroundColor 4)
ios_fg=$(foregroundColor 5)
lint_fg=$(foregroundColor 10)
hockey_fg=$(foregroundColor 166)
react_fg=$(foregroundColor 180)

# From now on fail on errors
set -eu

export ENV=${ENV:-"DEV"}
export APPLICATION_ID=${APPLICATION_ID:-"com.twparking"}
export BUILD_NUMBER=${BUILD_NUMBER:-1}

function timestamp() {
  date +"%Y%m%d_%H%M%S"
}

function check_for_tool() {
  local toolName="${1}"
  local installInstructions="${2}"

  if ! which ${toolName} &>/dev/null ; then
    echo "${red}${toolName}${utils_fg} not found${normal}"
    echo "${utils_fg}Install with: ${red}${installInstructions}${normal}"
    exit 1
  fi
}

function check_for_tool_brew() {
  local toolName="${1}"
  local installInstructions="${2}"

  if ! brew ls --versions ${toolName} > /dev/null ; then
    echo "${red}${toolName}${utils_fg} not found${normal}"
    echo "${utils_fg}Install with: ${red}${installInstructions}${normal}"
    exit 1
  fi
}

function check_for_tool_npm() {
  local toolName="${1}"
  local installInstructions="${2}"

  if ! npm list -g ${toolName} > /dev/null ; then
    echo "${red}${toolName}${utils_fg} not found${normal}"
    echo "${utils_fg}Install with: ${red}${installInstructions}${normal}"
    exit 1
  fi
}

function task_build_android {
  echo "${android_fg}Building android signed APK${normal}"
  (cd android && ./gradlew assembleRelease)
  FILENAME="index.android.$(timestamp).bundle"
  echo "${android_fg}Moving apk to root build/${FILENAME} folder${normal}"
  mkdir -p build
  mv android/app/build/intermediates/assets/release/index.android.bundle build/${FILENAME}
}

function task_clean {
    local command="${1:-}"
    echo "${utils_fg}we should clean both ios and android here${normal}"

    echo "${utils_fg}CLEANING ANDROID${normal}"
    echo -e "${utils_fg}\tDeleting root build folder${normal}"
    rm -rf android/build
    echo -e "${utils_fg}\tDeleting app build folder${normal}"
    rm -rf android/app/build

    echo "${utils_fg}CLEANING REACT NATIVE${normal}"
    echo -e "${utils_fg}\tClearing react temp files${normal}"
    rm -rf $TMPDIR/react-*
    echo -e "${utils_fg}\tClearing watchman watches${normal}"
    watchman watch-del-all
    echo -e "${utils_fg}\tDeleting node modules...${normal}"
    rm -rf node_modules
    echo -e "${utils_fg}\tDeleting flow types...${normal}"
    rm -rf flow-typed
    echo -e "${utils_fg}\tDeleting package lock...${normal}"
    rm package-lock.json
    echo -e "${utils_fg}\tReinstalling node modules${normal}"
    npm install
    echo -e "${utils_fg}\tResetting Metro Bundler cache${normal}"
    rm -rf /tmp/metro-bundler-cache-*  # npm start -- --reset-cache
    echo -e "${utils_fg}\tRemoving haste cache${normal}"
    rm -rf /tmp/haste-map-react-native-packager-*
    echo "${utils_fg}running whatever command you want [${command}]${normal}"
    execute_task "${command}"
}

function task_clean_dir {
    echo "${utils_fg}cleaning everything not in git (except for idea folder)${normal}"
    git clean -fxd -e .idea
}

function task_start_ios {
    echo "${ios_fg}Starting ios${normal}"
    react-native run-ios
}

function task_start_android {
   echo "${android_fg}Starting android${normal}"
   react-native run-android
}

function task_clean_android_start {
  # Ignore failures when trying to get colors
  set +e
  echo "${android_fg}Trying to kill the Terminal${normal}"
  killall Terminal
  # From now on fail on errors
  set -eu
  echo "${android_fg}Cleaning everything first${normal}"
  task_clean
  echo "${android_fg}Uninstalling from android device${normal}"
  (cd android && ./gradlew uninstallDebug)
  echo "${android_fg}Installing app${normal}"
  task_start_android
}

function task_init_ios {
  check_for_tool "pod" "brew install brew install cocoapods"

  echo "${ios_fg}Initializing pod project${normal}"
  (cd ios && rm -rf Pods && rm -rf Podfile.lock && pod install)
}

function task_start_ios_device {
   local device="${1:-}"
   echo "${ios_fg}Starting ios on device ${device}${normal}"
   react-native run-ios --simulator="${device}"
}

function task_start_ios_devices {
   local devices=(iPhone\ SE iPhone\ 6 iPhone\ 8 iPhone\ 8\ Plus iPhone\ X)
   echo "${ios_fg}Starting ios on device iPhoneSE, iPhone6, iPhone8 ,iPhone8Plus, iPhoneX}${normal}"
   for device in "${devices[@]}"; do
      echo "${ios_fg}Starting ios on device ${device} ${normal}"
      react-native run-ios --simulator="${device}"
   done
}

function task_list_ios_devices {
   echo "${ios_fg}Available iOS devices to use with start_ios_device${normal}"
   xcrun simctl list devices
}

function task_debug {
    echo "${utils_fg}Opening debug tools for react native ${normal}"
    check_for_tool "react-devtools" "npm install -g react-devtools"

    react-devtools
}

function task_restart_ios_devices {
  echo "${ios_fg}cleaning ios simulators${normal}"
  xcrun simctl erase all
  echo "${ios_fg}finished cleaning ios simulators${normal}"
}

function task_react_generate_icon {
    local pathIcon=${1-"assets/icon/icon.png"}
    check_for_tool_brew "imagemagick" "brew install imagemagick"
    check_for_tool_npm "yo" "npm install -g yo"
    check_for_tool_npm "generator-rn-toolbox" "npm install -g generator-rn-toolbox"
    yo rn-toolbox:assets --icon ${pathIcon}
}

function task_share_screen_android {
    echo "${utils_fg} Sharing connected Android screen ${normal}"
    check_for_tool "ffplay" "brew install ffmpeg --with-sdl2"
    adb shell screenrecord --output-format=h264 --size 1200x900 - | ffplay -
}

function task_help {
  help_message="usage"
  help_message+=" ${utils_fg}clean${normal}"
  help_message+=" | ${utils_fg}clean_dir${normal}"
  help_message+=" | ${utils_fg}debug${normal}"
  help_message+=" | ${utils_fg}share_screen_android${normal}"

  help_message+=" | ${android_fg}build_android${normal}"
  help_message+=" | ${android_fg}start_android | run_android${normal}"
  help_message+=" | ${android_fg}clean_android_start${normal}"

  help_message+=" | ${ios_fg}init_ios${normal}"
  help_message+=" | ${ios_fg}list_ios_devices${normal}"
  help_message+=" | ${ios_fg}start_ios | run_ios${normal}"
  help_message+=" | ${ios_fg}start_ios_device DEVICE${normal}"
  help_message+=" | ${ios_fg}start_ios_devices${normal}"
  help_message+=" | ${ios_fg}test_ios${normal}"
  help_message+=" | ${ios_fg}test_ios_screenshots${normal}"
  help_message+=" | ${ios_fg}restart_ios_devices${normal}"

  help_message+=" | ${react_fg}react_generate_icon [PATH_TO_ICON]${normal}"
  echo "${help_message}"
}

function execute_task {
    local task="${1:-}"
    shift || true
    case ${task} in
      clean) task_clean "$@" ;;
      clean_dir) task_clean_dir "$@" ;;
      debug) task_debug ;;
      share_screen_android) task_share_screen_android ;;

      build_android) task_build_android ;;
      run_android) task_start_android ;;
      start_android) task_start_android ;;
      clean_android_start) task_clean_android_start ;;

      list_ios_devices) task_list_ios_devices ;;
      init_ios) task_init_ios ;;
      run_ios) task_start_ios ;;
      start_ios) task_start_ios ;;
      start_ios_device) task_start_ios_device "$@" ;;
      start_ios_devices) task_start_ios_devices ;;
      restart_ios_devices) task_restart_ios_devices ;;

      react_generate_icon) task_react_generate_icon "$@" ;;
      *) task_help ;;
    esac
}

execute_task "$@"
