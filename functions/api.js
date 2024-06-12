exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: "nothing haha", //process.env.OPENAI_API_KEY,
  };
};
