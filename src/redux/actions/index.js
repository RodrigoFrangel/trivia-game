export const SEND_TOKEN = 'SEND_TOKEN';

export const sendToken = (payload) => ({
  type: SEND_TOKEN,
  payload,
});
