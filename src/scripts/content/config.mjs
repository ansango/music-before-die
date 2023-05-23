const user = "ansango";
const period = "6month";
const limit = 20;

export const config = {
  user,
  period,
  limit,
};

export const optionsSlugify = {
  lower: true,
  remove: /[*+~.()'"!:@,.""]/g,
  strict: true,
};
