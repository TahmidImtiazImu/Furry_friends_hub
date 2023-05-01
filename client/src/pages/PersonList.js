import React from 'react';
import PersonCard from '../Components/PersonCard/PersonCard';
import Header from './Header'
import Footer from './Footer'


const PersonList = ({ persons }) => {
  return (
    <div className="person-list">
      {/* ------------------------------Header----------------------- */}
      <Header/>
      <div>
          <PersonCard img = "/images/bird.jpg" name = " Buddy Birdy" email = "birdy@gmail.com" location = "Hajiganj, Narayangonj," />
          <PersonCard img = "/images/cat.jpeg" name = " Kitty Kat" email = "kitty@gmail.com" location = "Hajiganj, Narayangonj" />
          <PersonCard img = "/images/dog.jpg" name = " Dashing Doggo" email = "doggo@gmail.com" location = "Hajiganj, Narayangonj" />
          <PersonCard img = "/images/rabbit.webp" name = " Carrot Theif" email = "Carrot@gmail.com" location = "Hajiganj, Narayangonj" />
          <PersonCard img = "/images/bird.jpg" name = " Buddy Birdy" email = "birdy@gmail.com" location = "Hajiganj, Narayangonj," />
          <PersonCard img = "/images/bird.jpg" name = " Buddy Birdy" email = "birdy@gmail.com" location = "Hajiganj, Narayangonj," />
          <PersonCard img = "/images/bird.jpg" name = " Buddy Birdy" email = "birdy@gmail.com" location = "Hajiganj, Narayangonj," />
          <PersonCard img = "/images/bird.jpg" name = " Buddy Birdy" email = "birdy@gmail.com" location = "Hajiganj, Narayangonj," />
          <PersonCard img = "/images/bird.jpg" name = " Buddy Birdy" email = "birdy@gmail.com" location = "Hajiganj, Narayangonj," />
      </div>
      <Footer/>
    </div>
  );
};

export default PersonList;
