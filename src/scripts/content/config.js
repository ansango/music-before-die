const user = "ansango";
const period = "3month";
const limit = 30;

const config = {
  user,
  period,
  limit,
};

const optionsSlugify = {
  lower: true,
  remove: /[*+~.()'"!:@,.""]/g,
  strict: true,
};

module.exports = {
  config,
  optionsSlugify,
};
