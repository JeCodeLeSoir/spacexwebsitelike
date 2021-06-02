/*
Author: JeCodeLeSoir 'Aurélien Lebreton'
*/

//sass base.scss ../www/style/base-n.css --watch

const browserslist = [
    "> 1%",
    "ie >= 8",
    "edge >= 15",
    "ie_mob >= 10",
    "ff >= 45",
    "chrome >= 45",
    "safari >= 7",
    "opera >= 23",
    "ios >= 7",
    "android >= 4",
    "bb >= 10"
]

const config = require("../scss/config.json")
const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const fs = require('fs')
const path = require('path')

console.log("-- autoprefixer --");

const { spawn } = require("child_process");

config.files.forEach(cfile => {

    const ls = spawn("sass", [cfile.dir + cfile.name, config.buildDir + cfile.newname, "--watch"], { shell: true });
    
    ls.stdout.on("data", data => {
        console.log(`stdout: ${data}`);

        fs.readFile(config.buildDir + cfile.newname, (err, css) => {
            if (err) throw err;

            postcss([autoprefixer(browsers = browserslist)]).process(css, { from: "config.json" }).then(result => {

                result.warnings().forEach(warn => {
                    console.warn(warn.toString())
                })

                console.log("compile..");

                fs.writeFile(config.buildEnd + cfile.newname, result.css, function (err) {
                    if (err) return console.log(err);
                    
                        console.log('compile');
                });
            })
        });
    });
    
    ls.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });
    
    ls.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });
    
    ls.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });
})