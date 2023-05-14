import React, { useReducer , useState, useEffect} from 'react';
import PersonCard from '../Components/PersonCard/PersonCard';
import Header from './Header'
import Footer from './Footer'
import { useLocation } from "react-router-dom";


const PersonList = ({ props }) => {
  const location = useLocation();
  const searchData = location.state?.searchData;
  const [personList, setPersonList] = useState([]);
  console.log("hi from pet sitterlist after user search for pet sitter list")
  console.log(searchData.selected);
  console.log(searchData.serviceselected);
  console.log(searchData.timerangeselectedValue) ;
  console.log(searchData.petsizeselectedValue);
  console.log(searchData.area);
  useEffect(() => {
    // Fetch data from backend API using search criteria
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/users/${searchData.selected}/${searchData.serviceselected}/${searchData.timerangeselectedValue}/${searchData.petsizeselectedValue}/${searchData.area}`);
        const data = await response.json();
        setPersonList(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (searchData) {
      fetchData();
    }
  }, [searchData],);

  // const img = 'data:image/jpg;base64,${.image}';
  return (
    <div className="person-list">
      {/* ------------------------------Header----------------------- */}
      <Header/>
      <div>
      {personList.map(person => (
          <PersonCard
            img={`data:image/jpg;base64,${person.img}`}
            name={person.name}
            email={person.email}
            location={person.location}
          />
        ))}
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default PersonList;
