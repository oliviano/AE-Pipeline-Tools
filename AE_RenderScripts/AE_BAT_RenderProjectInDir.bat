@echo off

REM Render AE Projects from cmd by Olivier Jean.
REM Will render AE project found in current folder, allowing user to select which project to render.

REM The path to the aerender.exe
set AEEXE="C:\Program Files\Adobe\Adobe After Effects 2024\Support Files\aerender.exe"

REM Get the absolute path where the batch file is executed
set "BATCH_PATH=%~dp0"

REM List all .aep files in the current directory
echo Available After Effects projects:
setlocal enabledelayedexpansion
set /a count=0
for %%f in (*.aep) do (
    set /a count+=1
    echo !count!: %%f
    set "project[!count!]=%%f"
)

if %count%==0 (
    echo No After Effects projects found in the current directory.
    pause
    exit /b
)

REM Ask the user to select a project
set /p choice="Select a project by entering the corresponding number: "

REM Validate the input
if "%choice%"=="" (
    echo Invalid selection.
    pause
    exit /b
)

REM Set the selected project (combine batch path with relative path)
set "PROJECT=%BATCH_PATH%!project[%choice%]!"

REM Print the absolute path of the selected project
REM echo Selected project (absolute path): "%PROJECT%"

REM Print the full aerender command before executing
echo Command to be executed: %AEEXE% -project "%PROJECT%"
REM pause

REM Run the aerender command with the selected project
%AEEXE% -project "%PROJECT%"

exit
