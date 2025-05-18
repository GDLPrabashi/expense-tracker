const Income = require("../models/Income");
const Expense = require("../models/Expense");
const User = require("../models/User");

const {isValidObjectId, Types} = require('mongoose');


exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        // Total income
        const totalIncomeAgg = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: "$userId", totalAmount: { $sum: "$amount" } } }
        ]);

        const totalExpenseAgg = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: "$userId", totalAmount: { $sum: "$amount" } } }
        ]);

        const totalIncome = totalIncomeAgg[0]?.totalAmount || 0;
        const totalExpense = totalExpenseAgg[0]?.totalAmount || 0;
        const totalBalance = totalIncome - totalExpense;

        // Income last 60 days
        const last60daysIncomeTransactions = await Income.find({
            userId: userObjectId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        const incomeLast60Days = last60daysIncomeTransactions.reduce(
            (sum, txn) => sum + txn.amount,
            0
        );

        // Expense last 30 days
        const last30daysExpenseTransactions = await Expense.find({
            userId: userObjectId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        const expenseLast30Days = last30daysExpenseTransactions.reduce(
            (sum, txn) => sum + txn.amount,
            0
        );

        // Last 5 transactions (income + expense)
        const recentIncome = await Income.find({ userId: userObjectId })
            .sort({ date: -1 })
            .limit(5);
        const recentExpense = await Expense.find({ userId: userObjectId })
            .sort({ date: -1 })
            .limit(5);

        const last5Transactions = [
            ...recentIncome.map(txn => ({ ...txn.toObject(), type: "income" })),
            ...recentExpense.map(txn => ({ ...txn.toObject(), type: "expense" }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

        // Final response
        res.json({
            totalBalance,
            totalIncome,
            totalExpense,
            last30daysExpense: {
                total: expenseLast30Days,
                transactions: last30daysExpenseTransactions
            },
            last60daysIncome: {
                total: incomeLast60Days,
                transactions: last60daysIncomeTransactions
            },
            recentTransactions: last5Transactions
        });

    } catch (error) {
        res.status(500).json({
            message: "Error getting dashboard data",
            error: error.message
        });
    }
};














// exports.getDashboardData = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const userObjectId = new Types.ObjectId(String(userId));   

//         //fetch total income & expense
//         const totalIncome = await Income.aggregate([
//             {$match:{userId: userObjectId}},
//             {$group:{_id:"$userId",totalAmount:{$sum:"$amount"}}}]);

        
//         const totalExpense = await Expense.aggregate([
//             {$match:{userId: userObjectId}},
//             {$group:{_id:"$userId",totalAmount:{$sum:"$amount"}}}]);

//         //get income transactions in the last 60 days
//         const last60daysIncomeTransactions = await Income.find({
//             userId: userObjectId,
//             date: {$gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)}
//         }).sort({date:-1});

//         //get total income for lst 60 days
//         const incomeLast60Days = last60daysIncomeTransactions.reduce(
//             (sum,transaction)=> sum + transaction.amount,0
//         )

//         //get expense transcations in the last 30 days
//         const last30daysExpenseTransactions = await Expense.find({
//             userId: userObjectId,
//             date: {$gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
//         }).sort({date:-1});

//         //get total expense for lst 30 days
//         const expenseLast30Days = last30daysExpenseTransactions.reduce(
//             (sum,transaction)=> sum + transaction.amount,0
//         )

//        //fetch last 5 transcations (income+Expense)
//         const last5Transactions = [
//             ...(await Income.find({userId: userObjectId}).sort({date:-1}).limit(5)).map(
//                 (txn)=>({
//                     ...txn.toObject(),
//                     type:"income"
        
//                 })
//             ),
//             ...(await Expense.find({userId: userObjectId}).sort({date:-1}).limit(5)).map(
//                 (txn)=>({
//                     ...txn.toObject(),
//                     type:"expense"
        
//                 })    
//             ).sort((a,b)=> b.date - a.date)

//             //final response
//             res.json({
//                 totalBalance:
//                 {totalIncome :[0]?.totalAmount || 0,} -{totalExpense :[0]?.totalAmount || 0,},
//                 totalIncome :totalIncome[0]?.totalAmount || 0,
//                 totalExpense :totalExpense[0]?.totalAmount || 0,
//                 last30daysExpense:{
//                     total:expenseLast30Days,
//                     transactions:last30daysExpenseTransactions
//                 },
//                 last60daysIncome:{
//                     total:incomeLast60Days,
//                     transactions:last60daysIncomeTransactions
//                 },
//                 recentTransactions:last5Transactions
            
                
//             })
//         ]

//     } catch (error) {
//         res.status(500).json({message:"Error getting dashboard data",error:error.message});
        
//     }
// }


