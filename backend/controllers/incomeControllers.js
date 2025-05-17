const Income = require("../models/Income");
const User = require("../models/User");

//add income source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon,source,amount,date} = req.body;

        if(!icon || !source || !amount || !date){
            return res.status(400).json({message:"Please fill in all fields"});
        }

        const newIncome = new Income ({
            userId,
            icon,
            source,
            amount,
            date:new Date(date)
        });

        await newIncome.save();
        res.status(200).json({message:"Income added successfully"});

    } catch (error) {
        res.status(500).json({message:"Error adding income",error:error.message});
        
    }
}

//get all income source
exports.getAllIncome = async (req, res) => {}

//delete income source
exports.deleteIncome = async (req, res) => {}

//download income source
exports.downloadIncomeExcele = async (req, res) => {}