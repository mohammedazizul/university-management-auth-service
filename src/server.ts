import { Server } from 'http'
import mongoose from 'mongoose'
import config from '../config'
import app from './app'
import { errorLogger, logger } from './shared/logger'

let server: Server

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

process.on('SIGTERM', () => {
  logger.info('SIGTERM received!!!')
  if (server) {
    server.close()
  }
})

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    // console.log("MongoDB Database Connected Successfully!")
    logger.info('MongoDB Database Connected Successfully!')

    app.listen(config.port, () => {
      // console.log(`Application listening on prot ${config.port}`);
      logger.info(`Application listening on prot ${config.port}`)
    })
  } catch (error) {
    // console.log("MongoDB Database Connection Error:", error);
    errorLogger.error('MongoDB Database Connection Error:', error)
  }

  process.on('unhandledRejection', err => {
    // eslint-disable-next-line no-console
    console.log('unhandledRejection Detected !!! \nSever will shutdown!')
    if (server) {
      server.close(() => {
        errorLogger.error(err)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main().catch(err => errorLogger.error('MongoDB Connection Error: ', err))

// console.log(Z) // test from uncaughtException
