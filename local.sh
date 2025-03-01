set -e

jshint .
for f in $(ls); do adb -s emulator-5554 push $f /data/user/0/com.paulcoding.hviewer.dev/files/scripts/; done
