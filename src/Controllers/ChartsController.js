const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense'); 

const charts = async (req, res) =>{
    try {
        // Fetch expense data from the database
        const expenses = await Expense.find({}, 'category_id amount'); 
        
        // Process the fetched data to create the format expected by the client
        const categoryIds = expenses.map(expense => expense.category_id);
        
        // Fetch categories corresponding to the category IDs
        const categories = await Category.find({ _id: { $in: categoryIds } }, 'name');
        
        // Map category names to the corresponding expenses
        const labels = expenses.map(expense => {
            const category = categories.find(cat => cat._id.equals(expense.category_id));
            return category ? category.name : 'Unknown';
        });

        const data = expenses.map(expense => expense.amount);
        
        // Construct the response object
        const response = {
            labels: labels,
            datasets: [{
                label: 'Spending',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.5)'
            }]
        };

        // Send the spending data as the response
        res.json(response);
    } catch (err) {
        // If an error occurs, send an error response
        console.error('Error fetching spending data:', err);
        res.status(500).json({ error: 'Failed to fetch spending data' });
    }
};

module.exports = charts;
