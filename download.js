'use strict';
var https = require('https');
var fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const config = require('./行政区划代码.json')

function httpsDownload(url) {
    return new Promise(resolve => {
        if (!url) return resolve(false);
        https.get(url, function (res) {
            if (res.statusCode !== 200) return resolve(false);
            res.setTimeout(5000);
            res.setEncoding('utf8');
            var rawData = '';
            res.on('data', function (chunk) { rawData += chunk; });
            res.on('end', function () {
                resolve(rawData)
            });
        }).on('error', function (e) {
            resolve(false);
        });
    })
}

const list = config.data;
const url = 'https://geo.datav.aliyun.com/areas_v3/bound/geojson?code='

console.log('开始下载...')
const folderProvince = './data/province/'
fse.ensureDirSync(path.resolve(__dirname, folderProvince))
fse.emptyDirSync(path.resolve(__dirname, folderProvince))
const folderCity = './data/city/'
fse.ensureDirSync(path.resolve(__dirname, folderCity))
fse.emptyDirSync(path.resolve(__dirname, folderCity))

// 下载
list.forEach(async item => {
    const folder = item.areaCode.endsWith('0000') ? folderProvince : folderCity;
    const href = url + item.areaCode
    const fileName = `${folder}${item.areaCode}-${item.areaName}.json`
    const data = await httpsDownload(href);
    await fse.outputJSON(fileName, JSON.parse(data))
    console.log(`已下载: ${fileName}`)
})