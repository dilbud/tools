@echo off
setlocal enabledelayedexpansion

set prefix=V1_2_
set suffix=_alter
set ext=.java

set /a counter=1

for %%i in (
    hello
    world
) do (
    set filename=!prefix!!counter!!suffix!_%%i!ext!
    echo Creating file: !filename!
    echo. > !filename!
    set /a counter+=1
)

echo All files created successfully.
pause
