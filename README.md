# FED22 JavaScript 2 - Assignment 1
# Star Wars Encyclopedia

## Introduction

*BB-8 has entrusted you with a unique mission: to create a Star Wars encyclopedia, relieving him of the role of a mobile reference book so he can focus on more important matters, like rolling around and avoiding constant, trivial questions. He envisions a galaxy where his crew can effortlessly access information about everything in the Star Wars universe. Your pivotal mission is to construct this encyclopedia, thereby contributing to the peace of the galaxy.*

<img src="https://giphy.com/gifs/star-wars-the-force-awakens-iJfrIhrOOfLzy" width="100%">

## Requirements

- Use React, React Router, and specific tools like useState, useEffect, and Fetch/axios.
- Communication with the API should be  through a layer (a "service") where Fetch/axios communications take place.
- Responsive design (mobile-first).
- Component-based architecture.
- Ensure comprehensive loading and error handling to guard against the "Dark Side."
- Utilize TypeScript for precision (we are not Stormtroopers who always miss).
- Naturally, the code must be managed and versioned using Git, avoiding monstrous single commits.
- All source code should feature correct indentation (of course!).
- Deploy your project on Netlify or GitHub Pages."
  
## Project Specification

The application should provide the following functionality:

- Allow users to navigate through movies and characters, accompanied by basic pagination facilitated through previous/next buttons.
- Display all relevant information available for each resource.
- Ensure that each resource object includes links to their associated resources. For instance, when viewing a character's profile, users should be able to click on all the movies in which they've appeared and vice versa.

## Project Specifications for a Distinction (VG Grade)

In addition to the base requirements, achieving a VG grade involves:

- Enabling users to browse all resource categories, including films, characters, planets, species, starships, and vehicles.
- Implementing pagination using query parameters to ensure persistence through page reloads and seamless navigation using the browser's back/forward buttons (e.g., `/people/?page=2`).
- Implementing a search function for each resource. The same search form should be consistent across all components, and the search results should be prominently displayed (e.g., "Search results for Yoda..."). The search query should also be integrated into the query parameters (e.g., `?query=luke`) in the URL, similar to the current page for pagination.

## Resource Navigation

Users should be able to access detailed information about each "object." For example, by visiting `/people/`, users should be able to click into Luke Skywalker's profile (e.g., `/people/1/`) to explore all information related to that character. This functionality applies to all resources.

Don't forget to incorporate pagination in the overview view, ensuring easy navigation between all objects.

## API Endpoints

All API endpoints support pagination and search. Pagination can be initiated by appending `?page=X`, while searching is facilitated by adding `?search=X` to the endpoint URL. The API responses encompass all essential information, such as total counts and links to the next and previous pages.

Access to all available endpoints can be found at the root URL: [Star Wars API](https://swapi.thehiveresistance.com/api).

## Assignment Deadline: 14 days

