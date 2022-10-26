const regExpUrl = /^(https?:\/\/)(www\.)?([a-z1-9-]{2,}\.)+[a-z]{2,}\/?[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*/i;
const ruName = /^[^a-zA-Z]+$/gi;
const enName = /[^a-zA-Z\s\d!?,.:;]+$/gi;

module.exports = { regExpUrl, ruName, enName };
