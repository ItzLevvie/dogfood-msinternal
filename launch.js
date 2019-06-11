const https = require('https');

https.get('https://mrodevicemgr.edog.officeapps.live.com/mrodevicemgrsvc/api/v2/C2RReleaseData?audienceFFN=ea4a4090-de26-49d7-93c1-91bff9e53fc3', (res) => {
    res.on('data', (d) => {
        let obj = JSON.parse(d);
        let id = obj.FFN;
        let ver = obj.AvailableBuild;

        console.log(
`\
mkdir ClickToRun

wget http://officecdn.microsoft.com.edgesuite.net/pr/${id}/Office/Data/${ver}/i640.cab -P ClickToRun > /dev/null 2>&1
wget http://officecdn.microsoft.com.edgesuite.net/pr/${id}/Office/Data/${ver}/i641033.cab -P ClickToRun > /dev/null 2>&1

cabextract ClickToRun/i640.cab ClickToRun/i641033.cab -d ClickToRun > /dev/null 2>&1
rm ClickToRun/i640.cab ClickToRun/i641033.cab

{
    echo '@echo off'
    echo 'if not exist "%CommonProgramFiles%\\microsoft shared\\ClickToRun\\OfficeClickToRun.exe" ('
    echo '    robocopy %~dp0ClickToRun "%CommonProgramFiles%\\microsoft shared\\ClickToRun" > nul 2>&1'
    echo ')'
    echo 'if exist "%CommonProgramFiles%\\microsoft shared\\ClickToRun\\OfficeClickToRun.exe" ('
    echo '    start "" "%CommonProgramFiles%\\microsoft shared\\ClickToRun\\OfficeClickToRun.exe" deliverymechanism=${id} platform=x64 culture=en-us productstoadd=O365ProPlusRetail.16_en-us_x-none O365ProPlusRetail.excludedapps.16=groove,onenote updatesenabled.16=True cdnbaseurl.16=http://officecdn.microsoft.com/pr/${id} version.16=${ver} mediatype.16=CDN baseurl.16=http://officecdn.microsoft.com/pr/${id}'
    echo ')'
} > launch.bat
`
        );
    });
});
