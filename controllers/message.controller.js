const Message = require("../model/message.model");

//req has to have list of channels to retrive messages from
async function getMessages(req, res) {
  console.log("get message api hit");
  let messages = [];
  let temp = [];
  for (const channelId of req.body.channels) {
    temp = await getMessageFromChannelId(channelId);
    messages = [...messages, ...temp];
  }
  res.status(200).send({ messages: messages, status: true });
}

module.exports = getMessages;

async function getMessageFromChannelId(channelId) {
  try {
    const messages = await Message.find({ channelId: channelId })
      .populate("author")
    return messages;
  } catch (err) {
    console.log(`getting messages from a ${channelId} failed: ${err}`);
  }
}
