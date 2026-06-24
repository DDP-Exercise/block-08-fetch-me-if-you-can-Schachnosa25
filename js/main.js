"use strict";

import { User } from "./class.user.js";
import { Post } from "./class.post.js";

const userContainer = document.querySelector("#user-container");
console.log("main.js geladen");

let users = [];
let posts = [];
/*******************************************************
 *    Asynchronotrigger - 100p
 *
 *    This is your last assignment. Finish this to proof that
 *    you are a grown up now, who doesn't need to be held by
 *    the hand.
 *
 *    Create a users-class. Fetch the users, create Instances.
 *    - https://jsonplaceholder.typicode.com/users
 *
 *    Create a posts-class. Fetch the posts. create Instances.
 *    Assign them to the users (see userId in the posts).
 *    - https://jsonplaceholder.typicode.com/posts
 *
 *    Print the shit. Beautifully:
 *    List the 10 users. On click, expand them with their posts.
 *    Each Post should also have a Button to "load comments".
 *    Yes, you are correct. This is the perfect usecase for
 *    event-delegation! You can get the comments to a post from either
 *    - https://jsonplaceholder.typicode.com/posts/1/comments
 *    or
 *    - https://jsonplaceholder.typicode.com/comments?postId=1
 *    where "1" stands for the posts ID of course.
 *
 *    I believe in...
 *    Schachnosa Viertbauer - 2026-06-19
 *  *******************************************************/


async function loadUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();

    users = data.map(user => new User(user));

    users.forEach(user => {
        const div = document.createElement("div");
        div.classList.add("user");
        div.dataset.id = user.id;
        div.innerHTML = `
            <h2>${user.name}</h2>
            <p><a href="mailto:${user.email}">${user.email}</a></p>
<p><a href="https://${user.website}" target="_blank">${user.website}</a></p>
            <div class="posts" style="display:none;"></div>
        `;

        userContainer.appendChild(div);
    });
}

async function loadPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    posts = data.map(post => new Post(post));

    posts.forEach(post => {
        const user = users.find(u => u.id === post.userId);
        if (user) user.addPost(post);
    });

    console.log("Posts geladen:", posts);
}

userContainer.addEventListener("click", (e) => {
    const userDiv = e.target.closest(".user");
    if (!userDiv) return;

    const userId = userDiv.dataset.id;
    const user = users.find(u => u.id == userId);

    const postsDiv = userDiv.querySelector(".posts");

    if (postsDiv.innerHTML === "") {
        postsDiv.innerHTML = user.posts.map(post => `
            <div class="post">
                <h4>${post.title}</h4>
                <button class="load-comments" data-id="${post.id}">
                    Load comments
                </button>
                <div class="comments"></div>
            </div>
        `).join("");
    }

    postsDiv.style.display =
        postsDiv.style.display === "none" ? "block" : "none";
});

userContainer.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("load-comments")) return;

    const postId = e.target.dataset.id;
    const commentsDiv = e.target.nextElementSibling;

    const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );

    const data = await response.json();

    commentsDiv.innerHTML = data.map(c => `
        <p><b>${c.name}</b>: ${c.body}</p>
    `).join("");
});

async function init() {
    await loadUsers();
    await loadPosts();
}

init();