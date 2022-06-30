export const SEND_EMAIL = 'SEND_EMAIL';
export const SEND_NAME = 'SEND_NAME';
export const SEND_SCORE = 'SEND_SCORE';

export const sendEmail = (payload) => ({
  type: SEND_EMAIL,
  payload,
});

export const sendName = (payload) => ({
  type: SEND_NAME,
  payload,
});

export const sendScore = (payload) => ({
  type: SEND_SCORE,
  payload,
});
