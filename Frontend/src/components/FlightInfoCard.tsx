
import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Calendar, ArrowRight, Clock } from 'lucide-react';
import { format } from 'date-fns';

import { FlightInfoCardProps,FlightInfo } from '@/lib/Interfaces';
import { convertUTCtoReadable,convertUTCtoDate,calculateFlightDuration } from '@/lib/utils';

const FlightInfoCard: React.FC<FlightInfoCardProps> = ({data}) => {
  const flightInfo: FlightInfo=data
  console.log("FlightInfo:::",flightInfo)
   
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-flyerblue-500 to-flyerblue-600 py-4 px-6">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <Plane className="h-5 w-5" />
            <span className="font-medium">{flightInfo?.airline?.name}</span>
          </div>
          <div>
            <span className="font-bold">{flightInfo?.number}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
          {/* Left column - flight info */}
          <div className="space-y-4 flex-1">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col space-y-1"
            >
              <span className="text-sm text-muted-foreground">Aircraft Model</span>
              <span className="font-medium">{flightInfo?.aircraft?.model}</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4 text-flyerblue-500 flex-shrink-0" />
              <span>{convertUTCtoDate(flightInfo?.departure?.scheduledTime?.utc) }</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2"
            >
              <Clock className="h-4 w-4 text-flyerblue-500 flex-shrink-0" />
              <span>Flight Duration: {calculateFlightDuration(flightInfo?.departure?.scheduledTime?.utc,flightInfo?.arrival?.scheduledTime?.utc)}</span>
            </motion.div>
          </div>
          
          {/* Right column - route info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
              {/* Departure */}
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex-1"
              >
                <div className="text-3xl font-bold text-flyerblue-600">{flightInfo?.departure?.airport?.iata}</div>
                <div className="text-sm line-clamp-1 hover:line-clamp-none transition-all duration-200" title={flightInfo?.departure?.airport?.name + " International Airport"}>
                {flightInfo?.departure?.airport?.name + " International Airport"}
                </div>
                <div className="text-sm text-muted-foreground">
                {convertUTCtoReadable(flightInfo?.departure?.scheduledTime?.utc)}
                </div>
              </motion.div>
              
              {/* Flight path visual */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-row md:flex-col items-center justify-center flex-shrink-0"
              >
                <div className="w-2 h-2 rounded-full bg-flyerblue-500"></div>
                <div className="w-16 h-px md:w-px md:h-10 bg-flyerblue-200 mx-1 md:mx-0 md:my-1 relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="text-flyerblue-500 h-3 w-3 md:rotate-90" />
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-flyerblue-500"></div>
              </motion.div>
              
              {/* Arrival */}
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex-1"
              >
                <div className="text-3xl font-bold text-flyerblue-600">{flightInfo?.arrival?.airport?.iata}</div>
                <div className="text-sm line-clamp-1 hover:line-clamp-none transition-all duration-200 group" title={flightInfo?.arrival?.airport?.name + " International Airport"}>
                  {flightInfo?.arrival?.airport?.name + " International Airport"}
                </div>
                <div className="text-sm text-muted-foreground">
                {convertUTCtoReadable(flightInfo?.arrival?.scheduledTime?.utc)}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightInfoCard;
