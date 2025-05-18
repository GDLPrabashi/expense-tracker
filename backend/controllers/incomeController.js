const Income = require("../models/Income");
const User = require("../models/User");
const xlsx = require("xlsx");

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
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({userId});
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({message:"Error getting income",error:error.message});
        
    }
}

//delete income source
exports.deleteIncome = async (req, res) => {

    try {
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Income deleted successfully"});
    } catch (error) {
        res.status(500).json({message:"Error deleting income",error:error.message});
        
    }
}

//download income source
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({userId}).sort({date:-1});
        
        //prepare data fro excel
        const data = income.map((item) => ({
            "Icon":item.icon,
            "Source":item.source,
            "Amount":item.amount,
            "Date":item.date
        }));

        const wb=xlsx.utils.book_new();
        const ws=xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"Income");
        xlsx.writeFile(wb,"income.xlsx");
        res.download("income.xlsx");
        res.status(200).json({message:"Income downloaded successfully"});

    } catch (error) {
        res.status(500).json({message:"Error downloading income",error:error.message});
        
    }
}
