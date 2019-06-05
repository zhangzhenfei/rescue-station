// yarn global add gulp gulp-sftp
const gulp = require('gulp')
const sftp = require('gulp-sftp')

/**
 *  上传测试环境
 */
gulp.task('upload:ali', () =>
  gulp.src('dist/**').pipe(
    sftp({
      host: '47.107.237.94',
      user: 'root',
      pass: 'LTxiaofanggui!@#',
      remotePath: '/mnt/app'
    })
  )
)
