import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

class InputForm extends React.Component {
    render(){
        return (
            <div className="container">
            <form onSubmit={this.props.getWeather}>
                <fieldset>
                    <div className="row">
                        <div className="col-md-8"><input className="form-control" type ="text" name="city" placeholder="City...or....City,Country..."/></div>
                        <div className="col-md-2"><button className="btn btn-default"><span className="glyphicon glyphicon-search"></span> Get Weather</button></div>
                    </div>
                </fieldset>
            </form>
            </div>
        );
    }
};

class Weather extends React.Component{
    render(){
        return(
            <div>
                <fieldset>
                        {this.props.city && this.props.country && <p>Location:  {this.props.city }, { this.props.country }</p>}
                        {this.props.humidity && <p>Humidity: { this.props.humidity }</p>}
                        {this.props.description && <p>Conditions: { this.props.description }</p>}
                        {this.props.temperature && <p>Temperature: { this.props.temperature }° Celsius</p>}
                        {this.props.icon && <p><img src={ "http://openweathermap.org/img/wn/"+ this.props.icon +".png"} height="42" width="42"/> </p>}
                        {this.props.error && <p>{this.props.error}</p>}
                </fieldset>
            </div>
        );
    }
};

const API_KEY = "25a6bb0371d24d3819a0a03b08ae5430";

class WeatherFinalExam extends React.Component {
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        icon: undefined,
        error: undefined
    }

    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        //convert response to json
        const data = await api_call.json();
        if(city){
            console.log(data);
            this.setState({
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity:data.main.humidity,
                description:data.weather[0].description,
                icon:data.weather[0].icon,
                error:""
            });
        } else {
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity:undefined,
                description:undefined,
                icon: undefined,
                error:"Please enter the values."
            });
        }
    }

    render(){
        return(
            <div>
                <h1 className="aligncenter">React Weather App using openweathermap.org</h1><br/>
                <h3 className="aligncenter">Example input format : montreal or montreal,ca</h3>
                <InputForm getWeather={this.getWeather}/>
                <Weather
                temperature={this.state.temperature}
                city={this.state.city}
                country={this.state.country}
                humidity={this.state.humidity}
                description={this.state.description}
                icon={this.state.icon}
                error={this.state.error}
                />
            </div>
        );
    }
};

ReactDOM.render(<WeatherFinalExam />,document.getElementById('root'));


serviceWorker.unregister();
