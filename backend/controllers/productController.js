import Product from "../models/product.js";
import cloudinary from "../config/cloudinary.js";

export const createProduct = async (req,res) => {
  try{
    const { title,description,price,category,status = "draft" } = req.body;
    const files = Array.isArray(req.files) ? req.files : [];

    const uploadedImages = [];
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path);
      uploadedImages.push(result.secure_url);
    }

    const product = await Product.create({
      title,
      description,
      price,
      category,
      status,
      images: uploadedImages,
      brandId:req.user.id
    });

    res.status(201).json(product);
  }catch(err){
    res.status(500).json({error:err.message});
  }
};
export const getProducts = async (req,res)=>{
  try{
    const {
      search="",
      category="",
      page=1,
      limit=10
    } = req.query;

    const query = {
      isDeleted:false,
      status: "published"
    };

    if(search){
      query.title = {$regex:search,$options:"i"};
    }

    if(category){
      query.category = category;
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);

    const products = await Product
      .find(query)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const total = await Product.countDocuments(query);

    res.json({
      products,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum)
    });
  }catch(err){
    res.status(500).json({error:err.message});
  }
};

export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ brandId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Ensure only the owner brand can update
    if (product.brandId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const files = Array.isArray(req.files) ? req.files : [];
    const uploadedImages = [];
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path);
      uploadedImages.push(result.secure_url);
    }

    const allowedUpdates = ["title", "description", "price", "category", "status"];

    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        product[key] = req.body[key];
      }
    }

    if (uploadedImages.length) {
      product.images = uploadedImages;
    }

    await product.save();

    res.json({
      message: "Product updated successfully",
      product
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.brandId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    product.isDeleted = true;
    await product.save();

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const brandId = req.user.id;

    const totalProducts = await Product.countDocuments({
      brandId,
      isDeleted: false
    });

    const publishedProducts = await Product.countDocuments({
      brandId,
      status: "published",
      isDeleted: false
    });

    const archivedProducts = await Product.countDocuments({
      brandId,
      isDeleted: true
    });

    res.json({
      totalProducts,
      publishedProducts,
      archivedProducts
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const restoreProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.brandId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    product.isDeleted = false;
    await product.save();

    res.json({ message: "Product unarchived successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getProductById = async (req,res)=>{
  try{
    const product = await Product.findOne({
      _id: req.params.id,
      isDeleted: false,
      status: "published"
    });

    if(!product){
      return res.status(404).json({message:"Product not found"});
    }

    res.json(product);
  }catch(err){
    res.status(500).json({error:err.message});
  }
};
