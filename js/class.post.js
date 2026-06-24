"use strict";

/*******************************************************
 *  Posts
 *
 *  See: https://jsonplaceholder.typicode.com/posts
 *
 *  Your posts should have:
 *      -id
 *      -title
 *      -body
 *
 *  You can skip the userId, your users know their posts (see class.user.js)
 *
 *  posts should also have comments[] (see main.js).
 *
 *  When printing a post, don't forget to make a button that
 *  loads the comments for the post. Once they are loaded, print them.
 *  *******************************************************/

export class Post {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.body = data.body;
        this.userId = data.userId;
        this.comments = [];
    }

    addComment(comment) {
        this.comments.push(comment);
    }
}