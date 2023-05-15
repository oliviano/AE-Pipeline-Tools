@echo off
VPMD EXTRACT PNG FROM SLASBUCKLING NOTCHLC
@for %%i in (*.mov *.mp4 *.webm) do ffmpeg -ss 1 -i "%%i" -vf "drawtext=fontfile='c\:\\Windows\\Fonts\\arial.ttf':x=(w-text_w)/2:y=(h-(text_h*2)):fontsize=50:fontcolor=white:box=1:boxcolor=black@0.65:boxborderw=5:text=%%~ni" -frames:v 1 -q:v 2 "%%~ni.jpg"
pause