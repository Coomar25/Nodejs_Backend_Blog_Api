

import Category from '../models/categoryModel.js'; // Import your category model here

export const createCategory = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).send('Title is missing');
        }
        let slug = title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/^-+|-+$/g, '');
        if (slug.length < 3) {
            slug = `${slug}-${Math.random().toString(36).substring(2, 5)}`;
        }
        slug = slug.replace(/[^a-z0-9-]+/g, '');
        const createdCategory = await Category.create({
            title,
            slug,
        });
        return res.status(201).json({
            message: 'Category has been added successfully',
            category: createdCategory,
        });
    } catch (error) {
        console.error('Error creating category:', error);
        return res.status(500).send('Internal Server Error');
    }
};



export const updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params; 
        const { title } = req.body;

        if (!title) {
            return res.status(400).send('Title is missing');
        }

        let slug = title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/^-+|-+$/g, '');

        if (slug.length < 3) {
            slug = `${slug}-${Math.random().toString(36).substring(2, 5)}`;
        }

        slug = slug.replace(/[^a-z0-9-]+/g, '');

        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { title, slug },
            { new: true } // This option returns the updated document
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.status(200).json({
            message: 'Category has been updated successfully',
            category: updatedCategory,
        });
    } catch (error) {
        console.error('Error updating category:', error);
        return res.status(500).send('Internal Server Error');
    }
};


export const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params; // Assuming categoryId is passed in the request parameters

        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.status(200).json({
            message: 'Category has been deleted successfully',
            category: deletedCategory,
        });
    } catch (error) {
        console.error('Error deleting category:', error);
        return res.status(500).send('Internal Server Error');
    }
};


export const getAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find();

        return res.status(200).json({
            categories: allCategories,
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return res.status(500).send('Internal Server Error');
    }
};



