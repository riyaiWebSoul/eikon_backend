const express =require('express');
var cors = require('cors')
const router=express.Router();
const PortfolioController=require('../../controller/portfolio');


router
.get('/',cors(),PortfolioController.getAllPortfolios)
.get('/:id',cors(),PortfolioController.getPortfolio)
.post('/',cors(),PortfolioController.createPortfolio)
.put('/:id',cors(),PortfolioController.replacePortfolio)
.delete('/:id',cors(),PortfolioController.deletePortfolio)
.patch('/:id',cors(),PortfolioController.updatePortfolio)




exports.router=router