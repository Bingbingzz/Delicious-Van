# Delicious-Van
Authors: Annabelle Sun @AnnabelleAB, Alyn Xu @alynxu, Ce Zhao @Bingbingzz

## App Demo Video Link
### https://www.youtube.com/watch?v=f6ptO_oM4j4
### https://www.veed.io/view/1ddfadcd-9b07-4dcc-8c1b-123b028efb43?panel=share

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
In ieration 3, we updated **authentication** by adding login error alert, integrated **External API use** with **Location use** in PostAdd part, updated **notification** by enabling user to schedule when they want to receive notifications. As for the **camera-use**, we remained the same functionality as ieration2. The detail of add-ons and modifications are listed as below:

### Main function implemented & Contribution
- External API(Yelp) added @AnnabelleAB
  - enable user to search restaurant name to display the address of the restaurant that is related to their post
  - <img width="252" alt="yelp" src="https://user-images.githubusercontent.com/113411833/233753003-cd716f52-0968-467e-9808-cafef5bbb98e.PNG"><img width="252" alt="yelp" src="https://user-images.githubusercontent.com/113411833/233753007-ea042ac8-687b-4e68-8bda-e8c1789cc132.PNG"><img width="252" alt="yelp" src="https://user-images.githubusercontent.com/113411833/233753014-8ef93789-d16c-469d-b3b0-8da0fd2c843e.PNG">


- Login error alert set up @AnnabelleAB
  - set Alert when user tried login but not registered before or wrong password
  - <img width="252" alt="error" src="https://user-images.githubusercontent.com/113411833/233752800-009eeec0-8762-4071-b073-35c79d45530e.PNG">

- KeyboardShift component updated to work on Android platform @AnnabelleAB
  - fixed keyboard shift error while creating comment under the post in Android platform
- Minimum number of uploading photos alert set up @AnnabelleAB
  - set up alert for the user to ensure there is at least one photo in each post

- Notification schedule added @Bingbingzz
  - allow user to schedule when they want to receive the notifications as their own wishes
  - <img width="252" alt="notification" src="https://user-images.githubusercontent.com/113411833/233753136-5764b49a-7f0c-4a23-ac80-b5444ec07926.PNG"><img width="252" alt="notification" src="https://user-images.githubusercontent.com/113411833/233753147-588fd90a-5608-45f5-8d1b-70fd70325131.PNG"><img width="252" alt="notification" src="https://user-images.githubusercontent.com/113411833/233753151-6f460555-7495-4869-ac1c-b53e9e97240c.PNG">
  

- Multi-Photos dispayed in PostDetail modified @Bingbingzz
  - previously only the first photo will be displayed even though the user posted multiple photos and now it is updated to enable user to swipe to review multiple photo in the post. Black dot indicates which photo you are currently reviewing and white dots indicate the rest of photos.
  - <img width="252" alt="multiphoto" src="https://user-images.githubusercontent.com/113411833/233753375-9f7af8ec-386f-4278-9616-d5fd21b43083.PNG"><img width="252" alt="multiphoto" src="https://user-images.githubusercontent.com/113411833/233753432-e82a32f6-c440-4892-a601-fc59541a1417.PNG"><img width="252" alt="multiphoto" src="https://user-images.githubusercontent.com/113411833/233753434-23535fdf-188d-47e9-8a66-e023e0a1f8f4.PNG">


- Profile/Me screen updated(added 4 selections and enable user to upload customized avatar by tapping avatar) @alynxu
  - <img width="252" alt="mescreen" src="https://user-images.githubusercontent.com/113411833/233753589-cf3cf5ea-64c2-4bd1-8b03-769f8e3ca5da.PNG"><img width="252" alt="mescreen" src="https://user-images.githubusercontent.com/113411833/233753556-7beb5f7d-13d9-4ebf-9532-eb1f81111420.PNG"><img width="252" alt="mescreen" src="https://user-images.githubusercontent.com/113411833/233753579-63e2bccc-8930-4c54-8ce9-598fe87f1d53.PNG">
  
  - Profile: enable user to review/edit/update their profile information, userEmail will be replaced to username after the update
  - <img width="252" alt="profile" src="https://user-images.githubusercontent.com/113411833/233754107-49817e25-35f7-470d-9604-4b12b18bf59d.PNG"><img width="252" alt="profile" src="https://user-images.githubusercontent.com/113411833/233754161-1aff85a0-1aaf-4141-ae24-e08336fcd296.PNG">

  
  - Comments: enable user to review the comments they created & the comments they received from others(filter integrated at the header, user can tap the header to select to display my own comments or the comments received from others)Tapping each comment will navigate the user to the PostDetail related to that comment.
  - <img width="252" alt="mycomments" src="https://user-images.githubusercontent.com/113411833/233754253-031b6936-374d-46b3-b1db-547b84ffe07d.png"><img width="252" alt="receivedcomments" src="https://user-images.githubusercontent.com/113411833/233754246-fb5fc5f2-2a4a-450d-9736-ce1095e959da.png">

  - My Posts: enable user to review the collection of the user's own posts
  - <img width="252" alt="mypost" src="https://user-images.githubusercontent.com/113411833/233753945-22af568a-d7e6-486a-86a7-31ac2f8aba86.PNG">

  - Favorites: enable user to review the collection of the posts that the user liked
  - <img width="252" alt="myfavorites" src="https://user-images.githubusercontent.com/113411833/233753942-f2a20f12-1687-4c73-bf14-6210716d9351.PNG">


- Update-username Alert set up @alynxu
  - alert has been set up for user to update their username before they can add post/comment, the user without username will be directly navigated to ProfileEdit 
  - <img width="252" alt="usernamealert" src="https://user-images.githubusercontent.com/113411833/233754490-1a8f0d1e-8632-4a59-898a-469f033fdfb1.PNG"><img width="252" alt="usernamealert" src="https://user-images.githubusercontent.com/113411833/233754491-07d3d0a8-531b-4732-860d-a0248e9b7883.PNG">


 
- User info display modified after the user updates username(shown in previous pictures) @alynxu
  - UserEmail displayed in the ProfileScreen was modified to display UserName
  - UserEmail displayed in the PostDetail was modified to display UserName
  - UserEmail displayed in the Comment was modified to display UserName



  
