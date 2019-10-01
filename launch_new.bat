@echo off

:architecture
echo Choose what architecture you want to download:
echo [1] 64-bit
echo [2] 32-bit
echo.

set /p option="Choose an option: "

echo.

if %option% == 1 (
    set architecture=x64
) else if %option% == 2 (
    set architecture=x86
) else (
    echo You have chosen an invalid option: %option%
    echo.
    goto architecture
)

:language
echo Choose what language you want to download:
echo [1] English
echo.

set /p option="Choose an option: "

echo.

if %option% == 1 (
    set language=en-us
) else (
    echo You have chosen an invalid option: %option%
    echo.
    goto language
)

:product
echo Choose what product you want to download:
echo [1] Office 365 Home
echo [2] Office 365 ProPlus
echo.

set /p option="Choose an option: "

echo.

if %option% == 1 (
    set product=O365HomePremRetail
) else if %option% == 2 (
    set product=O365ProPlusRetail
) else (
    echo You have chosen an invalid option: %option%
    echo.
    goto product
)

:branch
echo Choose what branch you want to download:
echo [1] Dogfood::DevMain
echo [2] Dogfood::CC
echo [3] Dogfood::FRDC
echo [4] Dogfood::DCEXT
echo [5] Microsoft::DevMain
echo [6] Microsoft::CC
echo [7] Microsoft::FRDC
echo [8] Microsoft::DC
echo [9] Microsoft::LTSC
echo [10] Insiders::DevMain
echo [11] Insiders::CC
echo [12] Insiders::FRDC
echo [13] Insiders::LTSC
echo [14] Production::CC
echo [15] Production::DC
echo [16] Production::LTSC
echo.

set /p option="Choose an option: "

echo.

if %option% == 1 (
    set branch=ea4a4090-de26-49d7-93c1-91bff9e53fc3
    set build=16.0.12126.20000
) else if %option% == 2 (
    set branch=f3260cf1-a92c-4c75-b02e-d64c0a86a968
    set build=16.0.12026.20278
) else if %option% == 3 (
    set branch=834504cc-dc55-4c6d-9e71-e024d0253f6d
    set build=16.0.11929.20374
) else if %option% == 4 (
    set branch=c4a7726f-06ea-48e2-a13a-9d78849eb706
    set build=16.0.10730.20380
) else if %option% == 5 (
    set branch=b61285dd-d9f7-41f2-9757-8f61cba4e9c8
    set build=16.0.12119.20000
) else if %option% == 6 (
    set branch=5462eee5-1e97-495b-9370-853cd873bb07
    set build=16.0.12026.20264
) else if %option% == 7 (
    set branch=9a3b7ff2-58ed-40fd-add5-1e5158059d1c
    set build=16.0.11929.20300
) else if %option% == 8 (
    set branch=f4f024c8-d611-4748-a7e0-02b6e754c0fe
    set build=16.0.11328.20420
) else if %option% == 9 (
    set branch=1d2d2ea6-1680-4c56-ac58-a441c8c24ff9
    set build=16.0.10351.20010
) else if %option% == 10 (
    set branch=5440fd1f-7ecb-4221-8110-145efaa6372f
    set build=16.0.12119.20000
) else if %option% == 11 (
    set branch=64256afe-f5d9-4f86-8936-8840a6a4f5be
    set build=16.0.12026.20264
) else if %option% == 12 (
    set branch=b8f9b850-328d-4355-9145-c59439a0c4cf
    set build=16.0.11929.20300
) else if %option% == 13 (
    set branch=2e148de9-61c8-4051-b103-4af54baffbb4
    set build=16.0.10351.20010
) else if %option% == 14 (
    set branch=492350f6-3a01-4f97-b9c0-c7c6ddf67d60
    set build=16.0.11929.20300
) else if %option% == 15 (
    set branch=7ffbc6bf-bc32-4f92-8982-f9dd17fd3114
    set build=16.0.11328.20420
) else if %option% == 16 (
    set branch=f2e724c1-748f-4b47-8fb8-8e0d210e9208
    set build=16.0.10350.20019
) else (
    echo You have chosen an invalid option: %option%
    echo.
    goto branch
)

:setup
if not exist "%CommonProgramFiles%\microsoft shared\ClickToRun\OfficeClickToRun.exe" (
  robocopy %~dp0ClickToRun "%CommonProgramFiles%\microsoft shared\ClickToRun" > nul 2>&1
)
if exist "%CommonProgramFiles%\microsoft shared\ClickToRun\OfficeClickToRun.exe" (
  start "" "%CommonProgramFiles%\microsoft shared\ClickToRun\OfficeClickToRun.exe" deliverymechanism=%branch% platform=%architecture% culture=%language% productstoadd=%product%.16_%language%_x-none %product%.excludedapps.16=groove,onenote updatesenabled.16=True cdnbaseurl.16=http://officecdn.microsoft.com/pr/%branch% version.16=%build% mediatype.16=CDN baseurl.16=http://officecdn.microsoft.com/pr/%branch%
)

pause
