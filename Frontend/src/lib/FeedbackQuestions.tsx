type RatingType = "stars" | "text" | "dropdown";

interface Question {
  q: string;
  next?: number;
  ref: string;
  ratingType: RatingType;
}

interface FormCategory {
  [key: number]: Question;
}

interface FormDataStructure {
  foodcourt: FormCategory;
  airline: FormCategory;
  checkin: FormCategory;
  helpdesk: FormCategory;
  lounge: FormCategory;
  store: FormCategory;
  washroom: FormCategory;
  baggage: FormCategory;
}


const FEEDBACK_QUESTIONS: FormDataStructure = {
	foodcourt: {
		1: { q: "How would you rate the service?", next: 2, ref: "service", ratingType: "stars" },
		2: { q: "How would you rate the staff?", next: 3, ref: "staff", ratingType: "stars" },
		3: { q: "How would you rate the food quality?", next: 4, ref: "foodQuality", ratingType: "stars" },
		4: { q: "How would you rate the value for money?", next: 5, ref: "valueForMoney", ratingType: "stars" },
		5: { q: "How would you rate the cleanliness?", next: 6, ref: "cleanliness", ratingType: "stars" },
		6: { q: "How would you rate your overall experience?", next: 7, ref: "rating", ratingType: "stars" },
		7: { q: "Any additional feedback about the food court?", ref: "feedbackMessage", ratingType: "text" }
	  },
	airline: {
		1: { q: "How would you rate the staff's service?", next: 3, ref: "staff", ratingType: "stars" },
		2: { q: "Would you recommend this airline?", next: 4, ref: "recommendation", ratingType: "stars" },
		3: { q: "How would you rate the service quality?", next: 5, ref: "service", ratingType: "stars" },
		4: { q: "How would you rate your overall airline experience?", next: 6, ref: "rating", ratingType: "stars" },
		5: { q: "Any additional feedback about the airline?", ref: "feedbackMessage", ratingType: "text" }
	  }
	  ,
	checkin: {
		1: { q: "How would you rate the service during check-in?", next: 2, ref: "service", ratingType: "stars" },
		2: { q: "How would you rate the staff's assistance during check-in?", next: 3, ref: "staff", ratingType: "stars" },
		3: { q: "How would you rate your overall check-in experience?", next: 4, ref: "rating", ratingType: "stars" },
		4: { q: "Any additional feedback about the check-in process?", ref: "feedbackMessage", ratingType: "text" }
	  }
	  ,
	helpdesk: {
		1: { q: "How would you rate the efficiency of the help desk in answering your query?", next: 2, ref: "staffEfficiency", ratingType: "stars" },
		2: { q: "How would you rate the behavior of the staff?", next: 3, ref: "staff", ratingType: "stars" },
		3: { q: "How would you rate your overall experience with the help desk?", next: 4, ref: "rating", ratingType: "stars" },
		4: { q: "Any additional feedback about the help desk?", ref: "feedbackMessage", ratingType: "text" }
	  }
	  ,
	lounge: {
		1: { q: "How would you rate the staff?", next: 3, ref: "staff", ratingType: "stars" },
		2: { q: "Would you recommend this lounge?", next: 4, ref: "recommendation", ratingType: "stars" },
		3: { q: "How would you rate the food quality?", next: 5, ref: "food", ratingType: "stars" },
		4: { q: "How would you rate the service?", next: 6, ref: "service", ratingType: "stars" },
		5: { q: "How would you rate your overall lounge experience?", next: 7, ref: "rating", ratingType: "stars" },
		6: { q: "Any additional comments about the lounge?", ref: "feedbackMessage", ratingType: "text" }
	  }
	  ,
	store: {
		1: { q: "How would you rate the product quality?", next: 3, ref: "productQuality", ratingType: "stars" },
		2: { q: "Would you recommend this store?", next: 4, ref: "recommendation", ratingType: "stars" },
		3: { q: "How would you rate the service?", next: 5, ref: "service", ratingType: "stars" },
		4: { q: "How would you rate the staff?", next: 6, ref: "staff", ratingType: "stars" },
		5: { q: "How would you rate the value for money?", next: 7, ref: "valueForMoney", ratingType: "stars" },
		6: { q: "How would you rate your overall experience?", next: 8, ref: "rating", ratingType: "stars" },
		7: { q: "Any additional comments about the store?", ref: "feedbackMessage", ratingType: "text" }
	  }
	  ,
	washroom: {
		1: { q: "How would you rate the cleanliness of the washroom?", next: 2, ref: "cleanliness", ratingType: "stars" },
		2: { q: "How satisfied were you with the availability of toiletries?", next: 3, ref: "availabilityOfToiletries", ratingType: "stars" },
		3: { q: "How would you rate the overall washroom experience?", next: 4, ref: "rating", ratingType: "stars" },
		4: { q: "Any additional comments about the washroom?", ref: "feedbackMessage", ratingType: "text" }
	  }
	  ,
	baggage: {
		1: { q: "How would you rate the baggage service?", next: 2, ref: "service", ratingType: "stars" },
		2: { q: "How satisfied were you with the staff's assistance?", next: 3, ref: "staff", ratingType: "stars" },
		3: { q: "How would you rate the overall baggage experience?", next: 4, ref: "rating", ratingType: "stars" },
		4: { q: "Any additional comments on the baggage service?", ref: "feedbackMessage", ratingType: "text" }
	  }
	  
  };
  
  export default FEEDBACK_QUESTIONS;
  