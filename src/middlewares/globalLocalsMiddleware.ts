// Styles and scripts arrays for each request

const setGlobalLocals = (req, res, next) => {
  res.locals.styles = [];
  res.locals.scripts = [];
  next();
};

export default setGlobalLocals;
