import axios from 'axios'

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://115.159.147.190:3002/api/';

export default {
   getSixDayWeathers(city){
     return axios.get("getSixDayWeather?"+"city="+city)
   }
}
