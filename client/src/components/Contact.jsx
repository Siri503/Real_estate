import React, { useEffect, useState } from 'react';

export const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const handleSendMessage = () => {
    if (landlord) {
      const encodedSubject = encodeURIComponent(`Regarding ${listing.name}`);
      const encodedBody = encodeURIComponent(message);
      const gmailComposeURL = `https://mail.google.com/mail/?view=cm&to=${landlord.email}&subject=${encodedSubject}&body=${encodedBody}&fs=1`;
      
      window.open(gmailComposeURL, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{landlord.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          ></textarea>
          <button onClick={handleSendMessage} className='bg-slate-700 text-white p-3 uppercase hover:opacity-95 rounded-lg'>
            Send Message
          </button>
        </div>
      )}
    </>
  );
};
