# FFMPG Scripts
ffmpeg Scripts
## ffmpeg 
create a still image from video file, with file name as a OSD

# AE-Pipeline-Tools
AE pipeline script
This is a basic UI widget / helper to create template layers / adjustments layers for after effect ( 22+ 23+ ) usuefull for VFX / ACES workflows.
With a simple click it will create:
- viewing Ocio Adjustment Layer
- render Ocio Adjustment Layer
- Input Ocio Adjustment Layer

The Scripts calls for OCIO preset so you have to make them, or use the one I have included ( copy to your %userfolder%/Adobe/After Effects 2022/User Presets/ ). If using your own you'll need to modify the code references to the *.ffx files as needed.
I was using ACES 1.2 OpenColorIO configuration. ( included here for future me, all credits and massive thank you to the Aces peeps )

`git clone --branch v1.2 https://github.com/ampas/aces-dev.git`\
The original author of this OCIO config is:

Haarm-Pieter Duiker

