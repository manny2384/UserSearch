import './App.css';
import React, {useState, useEffect} from 'react';

// svg assets
import icon_sun from './assets/icon-sun.svg';
import icon_moon from './assets/icon-moon.svg';
import icon_search from './assets/icon-search.svg';
import icon_twitter from './assets/icon-twitter.svg';
import icon_location from './assets/icon-location.svg';
import icon_website from './assets/icon-website.svg';
import icon_company from './assets/icon-company.svg';

function Profile(user){
  user = user.data;
  console.log(user);


  return <div className="Profile" >
    <img id="profile_pic" src="https://avatars.githubusercontent.com/u/583231?v=4" alt="Profile Pic" />

    <p className="biography">
      {!user['bio'] && "This profile has no bio."}
      {user['bio'] && "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros."}
    </p>

    <table className="socialInfo">
      <tbody>
      <tr> <th>Repos</th> <th>Followers</th> <th>Following</th> </tr>
      <tr><td>{user.public_repos}</td><td>{user.followers}</td><td>{user.following}</td></tr>
      </tbody>
    </table>

    <div className="info_widgets">

      <div className="one">
        <div> <img src={icon_location} alt="img" /> 
          {user['location'] && <span> {user.location} </span>}
          {!user['location'] && <span> Not Available </span>} 
        </div>

        <div> <img src={icon_website} alt="img" />
          {user['blog'] && <span> {user.blog} </span>} 
          {!user['blog'] && <span> Not Available </span>} 
        </div>
      </div>

      <div className="two">
        <div> <img src={icon_twitter} alt="img" />
          {user['twitter_username'] && <span> {user['twitter_username']} </span>}
          {!user['twitter_username'] && <span> Not Available </span>}
        </div>

        <div> <img src={icon_company} alt="img" />  
          {user['company'] && <span> {user.company} </span>} 
          {!user['company'] && <span> Not Available </span>}
        </div>
      </div>

    </div>

    

  </div>
}

function App() {

  // tone sets dark or light mode
  const [tone, setTone] = useState(true);

  // contains user information
  const [userInfo, setUserInfo] = useState();

  // stores user name
  const [user, setUser] = useState("octocat");
  useEffect(()=>{
    console.log("updated user ", user);
  },[user])

  // contains initial and requested user name
  const [update, setUpdate] = useState(false);
  useEffect(()=>{

    console.log("Re-render");

    let cancel = false;

    async function getUser(){

      if(!cancel && user){


        let response = await fetch(`https://api.github.com/users/${user}`);
        let data = await response.json();
        console.log(data);

        // update user info
        setUserInfo(data);

      }

    }
    
    getUser();

    return () =>{
      cancel = true;
    }

  }, [update]);

  return (
    <div className="App">

      <div className="header"> 

        <span id="logo"> devfinder </span>

        {!tone && <span id="mode" onClick={()=>setTone(!tone)}> LIGHT <span> <img src={icon_sun} alt="sun" /> </span></span>}
        {tone && <span id="mode" onClick={()=>setTone(!tone)}> DARK <span> <img src={icon_moon} alt="moon" /> </span></span>}

      </div>

      <div className="SearchBar">
        <span>
          <span> 
            <img id="searchIcon" src={icon_search} alt="searchIcon" /> 
            <input id="searchUser" type="text" placeholder="Search GitHub username..." onChange={(e)=>{setUser(e.target.value)}}/>
          </span> 
        </span>

        <span style={{display:'inherit'}}> <button id="searchBtn" onClick={()=>setUpdate((prevState)=>!prevState)}> Search </button> </span> 
      </div>

        { userInfo && <Profile data={userInfo} /> }

    </div>
  );
}

export default App;
