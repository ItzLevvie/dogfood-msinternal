"use strict";

const https = require("https");

const getBranch = "Dogfood_DevMain";
const getFFN = "ea4a4090-de26-49d7-93c1-91bff9e53fc3";

const getBuild = "16.0.13725.20000";

function print(getBranch, getFFN, getBuild) {
    console.log("sudo apt update > /dev/null 2>&1");
    console.log("sudo apt install cabextract > /dev/null 2>&1");
    console.log("");
    console.log("wget http://officecdn.microsoft.com.edgesuite.net/pr/" + getFFN + "/Office/Data/" + getBuild + "/i640.cab -P ClickToRun > /dev/null 2>&1");
    console.log("");
    console.log("cabextract ClickToRun/i640.cab -d ClickToRun > /dev/null 2>&1");
    console.log("rm ClickToRun/i640.cab");
    console.log("");
    console.log("{");
    console.log("    echo \"@echo off\"");
    console.log("    echo \"if not exist \\\"%CommonProgramFiles%\\microsoft shared\\ClickToRun\\OfficeClickToRun.exe\\\" (\"");
    console.log("    echo \"    robocopy \\\"%~dp0ClickToRun\\\" \\\"%CommonProgramFiles%\\microsoft shared\\ClickToRun\\\" > nul 2>&1\"");
    console.log("    echo \")\"");
    console.log("    echo \"if exist \\\"%CommonProgramFiles%\\microsoft shared\\ClickToRun\\OfficeClickToRun.exe\\\" (\"");
    console.log("    echo \"    start \\\"\\\" \\\"%CommonProgramFiles%\\microsoft shared\\ClickToRun\\OfficeClickToRun.exe\\\" platform=x64 culture=en-us productstoadd=O365ProPlusRetail.16_en-us_x-none cdnbaseurl.16=http://officecdn.microsoft.com/pr/" + getFFN + " baseurl.16=http://officecdn.microsoft.com/pr/" + getFFN + " version.16=" + getBuild + " mediatype.16=CDN sourcetype.16=CDN O365ProPlusRetail.excludedapps.16=groove deliverymechanism=" + getFFN + "\"");
    console.log("    echo \")\"");
    console.log("} > launch.bat");
    console.log("");
    console.log("rm launch.js launch.sh > /dev/null 2>&1");
    console.log("");
    console.log("zip -r9 " + getBranch + "_" + getBuild + "_x64_O365ProPlusRetail_en-us.zip * > /dev/null 2>&1");
}

https.get("https://mrodevicemgr.officeapps.live.com/mrodevicemgrsvc/api/v2/C2RReleaseData?audienceFFN=" + getFFN, (getResponse) => {
    getResponse.on("data", (getData) => {
        if (getResponse.statusCode === 200) {
            const getParsedData = JSON.parse(getData);

            const getBuild = getParsedData.AvailableBuild;

            print(getBranch, getFFN, getBuild);
        } else {
            print(getBranch, getFFN, getBuild);
        }
    });
}).on("error", (getError) => {
    print(getBranch, getFFN, getBuild);
});
