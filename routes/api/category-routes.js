const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err){
    res.status(500).json(err)
  }
});

router.get('/:id', async(req, res) => {
  try {
    const singleCategoryData = await Category.findByPk( req.params.id, {
      include: [{model: Product}],
    });
    res.status(200).json(singleCategoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const createCategoryData = await Category.create(req.body, {
      include: [{model: Product}]
    });
    res.status(200).json(createCategoryData);
  } catch (err) {
    res.status(500).json(err)
  }

});

router.put('/:id', async (req, res) => {
  try {
    const updateCategoryData = await Category.update( req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(updateCategoryData)
  } catch (err) {
    res.status(500).json( err);

  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
