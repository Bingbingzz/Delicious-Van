# Delicious-Van
Authors: Anabelle Sun @AnnabelleAB, Alyn Xu @alynxu, Ce Zhao @Bingbingzz

## Set up instruction: 
- cd into the repo delicious_van
- npm install
- npm start

## Project description
  Introducing our innovative food review app! The main function of our app is Explore, this app provides an easy and convenient way to share your thoughts and opinions on your dining experiences.

  The Explore function is perfect for discovering new places to dine. Here, you can share reviews and ratings for restaurants that are not yet registered in our app. Other users can view these reviews in the Explore section, helping them make informed decisions about where to eat.

  Our app is designed with user experience in mind, providing a simple and intuitive interface that is easy to use. With just a few taps, you can find restaurant information, read reviews, and even post your own food experience.

  If you're a foodie who loves to explore new places and share your experiences with others, this app is for you! Download it today and start discovering the best dining spots in town.

### Target user
- People(Age12+) who live in or are visiting Vancouver and are looking for recommendations on local restaurants and food establishments.


## Iteration1
### Main function implemented
- Welcome page and Navigation Stack setup by @AnnabelleAB
- Login/Register/Logout by @AnnabelleAB
- Post (enable user to create/read/update/delete post to firestore, users are ONLY allowed to edit/delete their own posts) by @AnnabelleAB and @alynxu
- Comments (enable user to create/delete comments under the posts, users are ONLY allowed to delete their own posts) by @alynxu
- Likes (enable user to favorite the posts and display the count of likes of that post) by @alynxu
- Search posts by title (enable user to search keywords then display the realated posts) by @Bingbingzz

### Demo:


https://user-images.githubusercontent.com/113411833/229270403-a68ac81d-d995-40e6-bc7a-c41efde36ecb.mp4


## Iteration2
### Main function implemented & Contribution
- Welcome page & **Login/Register** updated @AnnabelleAB
- Show **location** on post detail, select location on post add and post edit @AnnabelleAB
- Improve post detail and edit layout and design @alynxu
- Use **camera** to take picture when user edit post @alynxu
- Implement local **notification** at everyday 4PM @Bingbingzz
- Implement Sort by newest and hottest function @Bingbingzz

### Demo:
- Sorting filter
  - <img width="250" alt="image" src="https://user-images.githubusercontent.com/49429865/231046486-6cb4d783-bd50-44b7-892f-e3b14032692e.png">
  
- Location Use
  - <img width="266" alt="image" src="https://user-images.githubusercontent.com/49429865/231046753-82804e4b-bea6-44af-bd81-cf391ef42cdf.png">
  - <img width="252" alt="image" src="https://user-images.githubusercontent.com/49429865/231046695-97bc64a6-0eef-42f5-8948-c87fce72efd8.png">

- Camera Use
  -  <img width="252" alt="image" src="https://user-images.githubusercontent.com/49429865/231047000-d186c94c-01ef-44af-93b9-6907b10a103f.png">
  -  <img width="252" alt="image" src="https://user-images.githubusercontent.com/49429865/231047349-e5cc1963-539d-4357-a8e0-fc82dd8d5270.png">
  
- Notification
  -  <img width="252" alt="image" src="https://user-images.githubusercontent.com/49429865/231047455-055ebeee-54c4-4455-aea7-716532de0109.png">
  -  <img width="252" alt="image" src="https://user-images.githubusercontent.com/49429865/231047571-b381c8c2-9538-4dff-a2fd-92a632603863.png">

## Iteration3
### Main function implemented & Contribution
- External API(Yelp) added @AnnabelleAB
  - enable user to search restaurant name to display the address of the restaurant that is related to their post

- Login error alert set up @AnnabelleAB
  - set Alert when user tried login but not registered before or wrong password

- Notification schedule added @Bingbingzz
  - allow user to schedule when they want to receive the notifications as their own wishes
  
- Multi-Photos dispayed in PostDetail modified @Bingbingzz
  - previously only the first photo will be displayed even though the user posted multiple photos and now it is updated to enable user to swipe to review multiple photo in the post

- Profile/Me screen updated(added 4 selections and enable user to upload customized avatar) @alynxu
  - Profile: enable user to review/edit/update their profile information
  - Comments: enable user to review the comments they created & the comments they received from others(filter integrated at the header)
  - My Posts: enable user to review the collection of the user's own posts
  - Favorites: enable user to review the collection of the posts that the user liked

- Update-username Alert set up @alynxu
  - alert has been set up for user to update their username before they can add post/comment, the user without username will be directly navigated to ProfileEdit 
 
- User info display modified @alynxu
  - UserEmail displayed in the PostDetail was modified to display UserName
