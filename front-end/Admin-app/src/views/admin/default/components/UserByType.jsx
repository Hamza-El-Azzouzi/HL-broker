import Card from "components/card";
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from "axios";




const UserByType = (props) => {
  const chartContainer = useRef(null);
 

  useEffect(() => {

    const ctx = chartContainer.current.getContext('2d');
 
    // Sample data
    const data = {
      labels: ['Vendeur', 'Acheteur'],
      datasets: [
        {
          data: [props.vendeur ,props.acheteur],
          
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1,
        },
      ],
    };

    // Chart configuration
    const options = {
      responsive: true,
      maintainAspectRatio: false,
    };

    new Chart(ctx, {
      type: 'pie',
      data: data,
      options: options,
    });

  }, [])


  return (
    <Card extra="!p-[20px] text-center">
      <div className="flex justify-between">
        <canvas ref={chartContainer}></canvas>

      </div>

      {/* <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="flex flex-col">
          
          
          <div className="flex flex-col items-start">
        
            <div className="flex flex-row items-center justify-center">
           
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          
        </div>
      </div> */}
    </Card>
  );
};

export default UserByType;
