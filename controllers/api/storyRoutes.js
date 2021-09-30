const router = require('express').Router();
const { Story } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    const body = req.body;

    try {
        const story = await Story.create({ ...body, userId: req.session.userId });
        res.json(story);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const [selectedStory] = await Story.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (selectedStory > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const [selectedStory] = Story.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (selectedStory > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;