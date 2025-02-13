import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

const cloudWatchLogs = new AWS.CloudWatchLogs();

const logGroupName = "ReactAppLogs";
const logStreamName = `log-stream-${new Date().toISOString().split("T")[0]}`;

export const logToAWS = async (level: string, message: string) => {
  try {
    const logParams = {
      logGroupName,
      logStreamName,
      logEvents: [
        {
          message: JSON.stringify({
            level,
            message,
            timestamp: new Date().toISOString(),
          }),
          timestamp: Date.now(),
        },
      ],
    };

    await cloudWatchLogs.putLogEvents(logParams).promise();
    console.info("Log successfully sent to AWS CloudWatch:", message);
  } catch (error) {
    console.error("Error sending log to AWS CloudWatch:", error);
  }
};

export const logger = {
  info: (message: string) => logToAWS("info", message),
  warn: (message: string) => logToAWS("warn", message),
  error: (message: string) => logToAWS("error", message),
};
