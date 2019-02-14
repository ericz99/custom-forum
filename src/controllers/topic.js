const _ = require("underscore");

// our models
const Post = require("../models/Post");
const Topic = require("../models/Topic");

module.exports = {
  // @route   GET api/users/text
  // @desc    Tests users route
  // @access  Public
  testAPIRoute: async (req, res, next) => {
    return res.status(200).json({
      statusCode: 200,
      errors: [],
      data: {
        msg: "OK, test route worked!"
      }
    });
  },
  // @route   GET api/users/fetch-all
  // @desc    fetches all created topics
  // @access  Private
  fetchAllTopicAPIRoute: async (req, res, next) => {
    const topic = await Topic.find().sort({ date: -1 });

    if (!topic) {
      return res.status(404).json({
        statusCode: 404,
        error: "No topic available. You can create one if you like!"
      });
    } else {
      return res.status(200).json({
        statusCode: 200,
        error: null,
        data: topic
      });
    }
  },
  // @route   POST api/users/create-topic
  // @desc    create topic route
  // @access  Private
  createTopicAPIRoute: async (req, res, next) => {
    const { name, desc } = req.body;

    if (name === "" || desc === "") {
      return res.status(400).json({
        statusCode: 400,
        errors: [{ reason: "Opps, looks like some field is left blank!" }]
      });
    }

    const topic = await Topic.findOne({ name });

    if (topic) {
      return res.status(400).json({
        statusCode: 400,
        errors: [{ reason: "Opps, looks like topic name already been taken!" }]
      });
    }

    // create the new topic object
    const newTopic = new Topic({
      user: req.user.id,
      name,
      desc,
      "subscriber.numberOfSubscriber": 0,
      posts: [],
      date: new Date().getTime()
    });

    // save new topic
    await newTopic.save();
    // give user response
    return res.status(200).json({
      statusCode: 200,
      errors: [],
      data: {
        msg: "Successfully created new topic thread!",
        topic_obj: newTopic
      }
    });
  },
  // @route   DELETE api/users/delete/:id
  // @desc    delete topic with specific id || only user created is permitted to delete the topic
  // @access  Private
  deleteTopicAPIRoute: async (req, res, next) => {
    const { id } = req.params;

    const topic = await Topic.findOne({ _id: id });

    if (!topic) {
      return res.status(404).json({
        statusCode: 404,
        error:
          "Opps, looks like the topic you clicked already has been deleted!"
      });
    }

    /**
     * only user that created this topic can delete else other user can't!
     */
    if (topic.user.toString() !== req.user.id) {
      return res.status(404).json({
        statusCode: 404,
        error: {
          notauthorized: "User does not have permission to delete this topic!"
        }
      });
    } else {
      // remove topic from database
      await topic.remove();
      // let user know the response
      return res.status(200).json({
        statusCode: 200,
        error: null,
        data: {
          msg: "Successfully deleted topic!"
        }
      });
    }
  },
  // @route   GET api/users/topic/subscribe/:id
  // @desc    subscribe to the topic by id
  // @access  Private
  subscribeAPIRoute: async (req, res, next) => {
    /**
     *
     * TODO:
     *
     */

    const { id } = req.params;

    const topic = await Topic.findOne({ _id: id }).exec();

    // check if no topic found
    if (!topic) {
      return res.status(404).json({
        statusCode: 404,
        error:
          "Opps, looks like the topic that you tried subscribing already has been deleted!"
      });
    }

    // check if you're the owner of this topic
    if (topic.user.toString() === req.user.id) {
      return res.status(404).json({
        statusCode: 404,
        error: "Opps, it looks like you're already a owner of the topic thread!"
      });
    }

    // find user that match index id
    const findIndex = topic.subscriber.users.find(
      val => val.user == req.user.id
    );

    // only display this if user is already subscribed to this topic thread
    if (findIndex) {
      return res.status(404).json({
        statusCode: 404,
        error:
          "Opps, it looks like you're already subscribed to this topic thread!"
      });
    }

    // increase number of subscriber +1
    await topic.subscriber.numberOfSubscriber++;

    // // add user
    await topic.subscriber.users.unshift({ user: req.user.id });

    // // save updated quires
    await topic.save();

    // let user know the response
    return res.status(200).json({
      statusCode: 200,
      error: null,
      data: {
        msg: "Successfully subscribed to your favorite topic!"
      }
    });
  },
  // @route   GET api/users/topic/unsubscribe/:id
  // @desc    unsubscribe to the topic by id
  // @access  Private
  unsubscribeAPIRoute: async (req, res, next) => {
    const { id } = req.params;

    const topic = await Topic.findById({ _id: id })
      .sort({ date: -1 })
      .exec();

    // check if no topic found
    if (!topic) {
      return res.status(404).json({
        statusCode: 404,
        error:
          "Opps, looks like the topic that you tried subscribing already has been deleted!"
      });
    }

    // find user that match index id
    const findIndex = topic.subscriber.users
      .map(val => val.user.toString())
      .indexOf(req.user.id);

    // check if user is already unsubscribed
    if (findIndex === -1) {
      return res.status(404).json({
        statusCode: 404,
        error: "Opps, it looks like you aren't subscribed to this topic thread!"
      });
    }
    // unsubscribed thread , and also decrease the subscriber number -1
    await topic.subscriber.numberOfSubscriber--;

    // splice out the user of the users array
    await topic.subscriber.users.splice(findIndex, 1);

    // save the updated quieres changes
    await topic.save();

    // let user know the response
    return res.status(200).json({
      statusCode: 200,
      error: null,
      data: {
        msg: "Successfully unsubscribed to your the topic thread!"
      }
    });
  }
};
