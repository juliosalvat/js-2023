import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';

interface PersonType {
  name: string;
  eye_color: string;
  hair_color: string;
  birth_year: string;
}

interface PeopleAPIResponse {
  results: PersonType[];
}

const apiUrl = `https://swapi.dev/api/people/`;
/** This component should load people from the API URL, filter to the first 10 and display
 * their name, eye color, hair color and birth year in cards below.
 *
 * Here is the desired behavior: https://fed-interview-sduwvu.stackblitz.io/
 */

const UsingData = () => {
  const [people, setPeople] = React.useState([]);
React.useEffect(() => {
  fetch(apiUrl)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      setPeople(data.results);      
    })
}, []);
  

  return (
    <div className="data">
      <header>
        <h1>API People</h1>
      </header>
      <main>
        <section className="cards">
          {/* After loading the data from the API there should be 10 cards shown with details of each person:

          Name, Eye Color, Hair Color, and Birth year

          (you don't have to use the material UI cards if you don't want to) */}
          {people?.map((person) => {
            return (
              <Card key={person.name}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  {person.name}
                </Typography>
                <Typography variant="body2">
                {person.eye_color}
                </Typography>
                <Typography variant="body2">
                {person.hair_color}
                </Typography>
                <Typography variant="body2">
                {person.birth_year}
                </Typography>
              </CardContent>
            </Card>    
            )
          })}
          
        </section>
      </main>
    </div>
  );
};

export default UsingData;
