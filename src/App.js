import './App.css';
import { API_URL, API_KEY } from './apis/config';
import UseFetch from './hooks/fetch_location';
import LocationSelector from './components/locationSelect';
import {Container} from 'react-bootstrap';
import WeatherList from './components/weatherlist';
import CurrentPosition from './components/currentposition';


function App() {
  const {data, error, isLoading, setUrl} = UseFetch();
  
  const getSearchedLocation = () => {
    if(error) return <h2>Error: {error}</h2>
    if(!data && isLoading) return <h2>Loading...</h2>
    if(!data) return null;
    return <WeatherList weathers={data.list} />
  }
  return (
    <Container className="App">
      <CurrentPosition />
      <LocationSelector onSearch = {(city) => setUrl(`${API_URL}data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`)}/>
      {getSearchedLocation()}
    </Container>
  );
}

export default App;

