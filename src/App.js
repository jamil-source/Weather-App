import './App.css';
import { API_BASE_URL, API_PRO_URL } from './apis/config';
import FetchHourly from './hooks/hourly_fetchlocation';
import FetchDaily from './hooks/daily_fetchlocation';
import LocationSelector from './components/locationSelect';
import {Container} from 'react-bootstrap';
import WeatherList from './components/weatherlist';
import CurrentPosition from './components/currentposition';


function App() {
  const {data, error, isLoading, setUrl} = FetchHourly();
  const {result, errorDaily, isLoadingDaily, setDailyUrl} = FetchDaily();

  const getSearchedLocation = () => {
    if(error || errorDaily) return <h2>Error: {error}</h2>
    if((!data && isLoading) || (!result && isLoadingDaily)) return <h2>Loading...</h2>
    if(!data || !result) return null;
    return <WeatherList weathersHourly={data.list} weathersDaily = {result.list} />
  }
  return (
    <Container className="App">
      <CurrentPosition />
      <LocationSelector onSearch = {(city) => setUrl(`${API_BASE_URL}data/2.5/forecast?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`, setDailyUrl(`${API_PRO_URL}/data/2.5/forecast/daily?q=${city}&cnt=7&appid=${process.env.REACT_APP_API_KEY}&units=metric`))}/>
      {getSearchedLocation()}
    </Container>
  );
}

export default App;

