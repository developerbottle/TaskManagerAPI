const express = require('express');

const Task = require('../models/task');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/tasks', auth, async (request, response) => {
    const task = new Task({
        ...request.body,
        owner: request.user._id
    });
    
    try {
        await task.save();
        response.status(201).send(task);
    } catch (error) {
        response.status(400).send(error);
    }
});

router.get('/tasks', auth, async (request, response) => {
    const match = {};
    const sort = {};
    
    if (request.query.completed) {
        match.completed = request.query.completed === 'true'? true : request.query.completed === 'false'? false : undefined;
    }
    
    if (request.query.sortBy) {
        const parts = request.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc'? -1 : parts[1] === 'asc'? 1 : undefined;
    }
    
    try {
        await request.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(request.query.limit),
                skip: parseInt(request.query.skip),
                sort
            }
        }).execPopulate();
        response.send(request.user.tasks);
    } catch (error) {
        response.status(500).send();
    }
});

router.get('/tasks/:id', auth, async (request, response) => {
    const ID = request.params.id;
    
    try {
        const task = await Task.findOne({ _id: ID, owner: request.user._id });
        
        if (!task) {
            response.status(404).send();
            return;
        }
        
        response.send(task);
    } catch (error) {
        response.status(500).send();
    }
});

router.patch('/tasks/:id', auth, async (request, response) => {
    const updates = Object.keys(request.body);
    const allowedUpdates = ['description', 'completed'];
    const isOperationValid = updates.every((update) => allowedUpdates.includes(update));
    
    if (!isOperationValid) {
        response.status(400).send({ error: 'Invalid updates!' });
        return;
    }
    
    try {
        const task = await Task.findOne({ _id: request.params.id, owner: request.user._id });
        
        if (!task) {
            response.status(404).send();
            return;
        }
    
        updates.forEach((update) => task[update] = request.body[update]);
        await task.save();
        
        response.send(task);
    } catch (error) {
        response.status(400).send(error);
    }
});

router.delete('/tasks/:id', auth, async (request, response) => {
    try {
        const task = await Task.findOneAndDelete({ _id: request.params.id, owner: request.user._id });
        
        if (!task) {
            response.status(404).send();
            return;
        }
        
        response.send(task);
    } catch (error) {
        response.status(500).send();
    }
});

module.exports = router;