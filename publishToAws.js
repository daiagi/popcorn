/* eslint-disable import/no-extraneous-dependencies */
const AWS = require('aws-sdk');
const awsCli = require('aws-cli-js');
require('dotenv').config();

const { Options } = awsCli;
const { Aws } = awsCli;
const invalidateCacheCmd = `cloudfront create-invalidation --distribution-id ${process.env.CloudFront_Distrubution_ID} --paths "/index.html"`;
AWS.config.getCredentials((err) => {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {

    // create aws-cli-js
    const options = new Options(AWS.config.credentials.accessKeyId,
      AWS.config.credentials.secretAccessKey);
    const awscli = new Aws(options);

    // update s3 bucket
    awscli.command('s3 sync dist/ s3://pop-app-bucket').then((result) => {
      console.log(result);
      // invalidate index.html on cloudFront
      awscli.command(invalidateCacheCmd).then(console.log).catch((e) => {
        console.log('cloudfront cache invalidation failed');
        console.warn(e);
      });
    }).catch((error) => {
      console.log('s3 sync failed');
      console.warn(error);
    });
  }
});
