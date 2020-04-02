import React, { useEffect } from 'react';
import { usePageData } from '../../context/pageData';
import axios from 'axios';

const TicketPage = () => {
  const { mapData, ticketData, setTicketData } = usePageData();

  useEffect(() => {
    axios.get("/bugs")
    .then(response => {
      console.log(response)
      setTicketData(response);
    })
  }, [setTicketData])

  return (
    <div>
      <h1>TICKET PAGE</h1>
      <div>{mapData(ticketData)}</div>
    </div>
  );
}

export default TicketPage;