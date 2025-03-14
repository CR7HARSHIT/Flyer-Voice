export interface Location {
	lat: number;
	lon: number;
  }
  
  export interface Airport {
	icao: string;
	iata: string;
	name: string;
	shortName: string;
	municipalityName: string;
	location: Location;
	countryCode: string;
	timeZone: string;
  }
  
  export interface ScheduledTime {
	utc: string;
	local: string;
  }
  
  export interface PredictedTime {
	utc: string;
	local: string;
  }
  
  export interface Aircraft {
	model: string;
  }
  
  export interface Airline {
	name: string;
	iata: string;
	icao: string;
  }
  
  export interface GreatCircleDistance {
	meter: number;
	km: number;
	mile: number;
	nm: number;
	feet: number;
  }
  
  export interface FlightInfo {
	greatCircleDistance: GreatCircleDistance;
	departure: {
	  airport: Airport;
	  scheduledTime: ScheduledTime;
	  quality: string[];
	};
	arrival: {
	  airport: Airport;
	  scheduledTime: ScheduledTime;
	  predictedTime: PredictedTime;
	  terminal: string;
	  quality: string[];
	};
	lastUpdatedUtc: string;
	number: string;
	status: string;
	codeshareStatus: string;
	isCargo: boolean;
	aircraft: Aircraft;
	airline: Airline;
  }

  export interface FlightInfoCardProps {
	data: FlightInfo; // Here we specify that `data` should be of type `FlightInfo`
  }