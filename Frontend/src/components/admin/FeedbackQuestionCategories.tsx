
import React from 'react';

export interface FeedbackQuestion {
  id: string;
  text: string;
}

export const standardFeedbackQuestions: FeedbackQuestion[] = [
  { id: 'staff', text: 'Staff Behavior & Helpfulness' },
  { id: 'cleanliness', text: 'Cleanliness & Maintenance' },
  { id: 'waiting', text: 'Waiting Time & Efficiency' },
  { id: 'value', text: 'Value for Money' },
  { id: 'overall', text: 'Overall Experience' }
];

// Custom questions for specific entity types
export const getCustomQuestionsForCategory = (category: string): FeedbackQuestion[] => {
  switch (category) {
    case 'airline':
      return [
        { id: 'checkin', text: 'Check-in Experience' },
        { id: 'boarding', text: 'Boarding Process' },
        { id: 'staff', text: 'Staff Courtesy' },
        { id: 'luggage', text: 'Luggage Handling' },
        { id: 'overall', text: 'Overall Experience' },
      ];
    case 'lounge':
      return [
        { id: 'comfort', text: 'Comfort & Seating' },
        { id: 'food', text: 'Food & Beverages' },
        { id: 'amenities', text: 'Facilities & Amenities' },
        { id: 'staff', text: 'Staff Service' },
        { id: 'overall', text: 'Overall Experience' },
      ];
    case 'store':
      return [
        { id: 'variety', text: 'Product Variety' },
        { id: 'prices', text: 'Pricing' },
        { id: 'staff', text: 'Staff Assistance' },
        { id: 'layout', text: 'Store Layout & Accessibility' },
        { id: 'overall', text: 'Overall Shopping Experience' },
      ];
    case 'baggage':
      return [
        { id: 'handling', text: 'Baggage Handling' },
        { id: 'collection', text: 'Baggage Collection' },
        { id: 'services', text: 'Baggage Services' },
        { id: 'damaged', text: 'Damaged Baggage Response' },
        { id: 'lost', text: 'Lost Baggage Assistance' },
      ];
    case 'food-court':
      return [
        { id: 'quality', text: 'Food Quality' },
        { id: 'variety', text: 'Menu Variety' },
        { id: 'price', text: 'Pricing' },
        { id: 'service', text: 'Service Speed' },
        { id: 'cleanliness', text: 'Cleanliness' },
      ];
    case 'check-in':
      return [
        { id: 'speed', text: 'Processing Speed' },
        { id: 'staff', text: 'Staff Assistance' },
        { id: 'queue', text: 'Queue Management' },
        { id: 'kiosks', text: 'Self Check-in Kiosks' },
        { id: 'baggage-drop', text: 'Baggage Drop Experience' },
      ];
    case 'help-desk':
      return [
        { id: 'knowledge', text: 'Staff Knowledge' },
        { id: 'helpfulness', text: 'Staff Helpfulness' },
        { id: 'resolution', text: 'Problem Resolution' },
        { id: 'waiting', text: 'Waiting Time' },
        { id: 'accessibility', text: 'Accessibility' },
      ];
    case 'washroom':
      return [
        { id: 'cleanliness', text: 'Cleanliness' },
        { id: 'maintenance', text: 'Maintenance' },
        { id: 'supplies', text: 'Supplies Availability' },
        { id: 'accessibility', text: 'Accessibility' },
        { id: 'waiting', text: 'Waiting Time' },
      ];
    default:
      return standardFeedbackQuestions;
  }
};

export default getCustomQuestionsForCategory;
