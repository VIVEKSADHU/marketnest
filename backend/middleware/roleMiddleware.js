export const requireBrand = (req, res, next) => {

  if (req.user.role !== "brand") {
    return res.status(403).json({
      message: "Access denied. Brand role required."
    });
  }

  next();
};