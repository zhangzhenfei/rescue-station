// yarn global add gulp gulp-sftp
const gulp = require('gulp')
const sftp = require('gulp-sftp')

/**
 *  上传测试环境
 */
gulp.task('upload:ali', () =>
  gulp.src('dist/**').pipe(
    sftp({
      host: '47.112.112.220',
      user: 'root',
      pass: 'xinfangwangABC!@#',
      remotePath: '/mnt/app'
    })
  )
)
