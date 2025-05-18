const Expense = require("../models/Expense");
const User = require("../models/User");
const xlsx = require("xlsx");

//add expanse source
exports.addExpense = async (req, res) => {
const userId = req.user.id;

try {
    const { icon,source,amount,date} = req.body;

    if(!icon || !source || !amount || !date){
        return res.status(400).json({message:"Please fill in all fields"});
    }

    const newExpense = new Expense ({
        userId,
        icon,
        source,
        amount,
        date:new Date(date)
    });

    await newExpense.save();
    res.status(200).json({message:"Expense added successfully"});

} catch (error) {
    res.status(500).json({message:"Error adding expense",error:error.message});
    
}

}

//get all expanse source
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({userId});
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({message:"Error getting income",error:error.message});
        
    }
}

//delete expense source
exports.deleteExpense = async (req, res) => {

    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Expanse deleted successfully"});
    } catch (error) {
        res.status(500).json({message:"Error deleting expanse",error:error.message});
        
    }
}

//download income source
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({userId}).sort({date:-1});
        
        //prepare data fro excel
        const data = expense.map((item) => ({
            "category":item.category,
            "Amount":item.amount,
            "Date":item.date
        }));

        const wb=xlsx.utils.book_new();
        const ws=xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"Expense");
        xlsx.writeFile(wb," expense.xlsx");
        res.download("expense.xlsx");
        res.status(200).json({message:"Expense downloaded successfully"});

    } catch (error) {
        res.status(500).json({message:"Error downloading expense",error:error.message});
        
    }
}
