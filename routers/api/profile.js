const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Profile = require('../../modals/Profile');
const auth = require('../../middleware/auth');
const User = require('../../modals/User');
const Post = require('../../modals/Post');
const { Router } = require('express');
const request = require('request');
const config = require('config');

//Get Specific Profile Route : https://localhost:5000/api/profile/me

router.get('/me', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(404).json({ msg: 'This is no profile for this user' });
    }

    res.send(profile);
  } catch (err) {
    res.status(500).json({ msg: 'Internal Server error' });
  }
});

//Post Profile Route : https://localhost:5000/api/profile

router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      facebook,
      twitter,
      linkedin,
      instagram,
    } = req.body;

    //Create a profile object

    let profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills)
      profileFields.skills = skills.split(',').map((skill) => skill.trim());

    //Build a social media object in profileFields

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    if (twitter) profileFields.social.twitter = twitter;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.send(profile);
      }

      //Create Profile

      profile = new Profile(profileFields);
      await profile.save();
      res.send(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//Get All Profiles Route

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.send(profiles);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// router: user/:user_id
// Get Profile with the user id

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    res.send(profile);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).send('Profile not found!');
    }
    res.status(500).send('Server Error');
  }
});

// Delete Route
// This router delete profile and user
// Private route

router.delete('/', auth, async (req, res) => {
  try {
    await Post.deleteMany({user: req.user.id });
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.send({ msg: 'User Removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// PUT Request route = /experience
// This route update experience in user profile.
// Private

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      from,
      to,
      current,
      location,
      description,
    } = req.body;
    const newExp = {
      title,
      company,
      from,
      to,
      current,
      location,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);
      await profile.save();
      res.send(profile);
    } catch (err) {
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// Delete Request route = /experience/:exp_id
// This route delete experience in user profile.
// Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.send(profile);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// PUT Request route = /education
// This route update education in user profile.
// Private

router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Field of Study is required').not().isEmpty(),
      check('from', 'From is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;
    const education = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(education);
      await profile.save();
      res.send(profile);
    } catch (err) {
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// Delete Request route = /experience/:exp_id
// This route delete experience in user profile.
// Private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.send(profile);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get Request in github ex: api/profile/github/:username
// Get user repo from github
// public

router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecretKey')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };
    request(options, (error, response, body) => {
      if (error) console.log(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'Github Repo not found' });
      }
      res.send(JSON.parse(body));
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
