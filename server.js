// Require or import helper packages

const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Local Data instead of storing in a database

var coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
]

// build a schema for queries?

const schema = buildSchema(`
    type Query {
        course(id: Int!): Course,
        courses(topic: String): [Course]
    },
    type Course {
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

// functions for GraphQL thingy (I'm really bad at documenting stuff)

const getCourse = (args) => {
    var id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
}

const getCourses = (args) => {
    if (args.topic) {
        return coursesData.filter((course) => course.topic === args.topic);
    } else {
        return coursesData;
    }
}

const root = {
    course: getCourse,
    courses: getCourses
}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(5000, () => console.log('Listening on port 5000...'));