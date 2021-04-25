import logo from './logo.svg';
import './App.css';
import { API_URL, API_KEY } from './apis/config';
import UseFetch from './hooks/fetch_location';
import LocationSelector from './components/locationSelect';
import {Container} from 'react-bootstrap';
import WeatherList from './components/weatherlist';


function App() {
  const {data, error, isLoading, setUrl} = UseFetch();
  return (
    <Container className="App">
      <LocationSelector onSearch = {(city) => setUrl(`${API_URL}data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`)}/>
      {data && <WeatherList weathers={data.list} />}
    </Container>
  );
}

export default App;

