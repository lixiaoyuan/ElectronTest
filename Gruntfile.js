var grunt=require('grunt');

grunt.config.init({
    pkg: grunt.file.readJSON('package.json'),
    'create-windows-installer': {
        x64: {
            version: '1.0.0',
            authors: 'lixiaoyuan',
            projectUrl: '',
            appDirectory: './TsElectron-win32-x64',//要打包的输入目录
            exe: 'TsElectron.exe',//待打包文件名
            setupIcon: "8.ico",//安装文件图标
            iconUrl: "8.ico",//卸载图标
            noMsi: true
        }
    }
})

grunt.loadNpmTasks('grunt-electron-installer');
grunt.registerTask('default', ['create-windows-installer']);
