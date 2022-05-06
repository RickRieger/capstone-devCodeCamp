import React from 'react';

const EventCard = () => {
  return (
    <div className='event-card'>
      <div className='event-header'>
        <span className='date-header'>May 4</span> &nbsp;&nbsp;&nbsp;Foodtruck
        Night: Curry in a Hurry
      </div>
      <img
        className='event-image'
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbvrzF115cFlbrdCVcPcxSIQtQ6OZUEIC2BsKfxtizJA&s'
        alt='event-image'
      />

      <div className='event-details'>
        <div className='row-links'>
          <button className='icon-buttons'>
            <BookmarkAddedIcon />
            save event
          </button>
          <button className='icon-buttons'>
            <DirectionsIcon />
            directions
          </button>
          <button className='icon-buttons'>
            <InfoIcon />
            more info
          </button>
          <button className='icon-buttons'>
            <PaidIcon />
            buy tickets
          </button>
          <button
            className='icon-buttons'
            data-href='https://www.isleybrewingcompany.com/event-details/foodtruck-night-curry-in-a-hurry'
            data-layout='button_count'
            data-size='small'
          >
            <FacebookIcon />
            <a
              target='_blank'
              href='https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.isleybrewingcompany.com%2Fevent-details%2Ffoodtruck-night-curry-in-a-hurry&amp;src=sdkpreparse'
              class='fb-xfbml-parse-ignore'
            >
              Share
            </a>
          </button>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          Sat, 4 PM &nbsp;&nbsp;1715 Summit Ave Richmond, VA
        </div>
        <hr />
        <div class='description-card'>
          Join us at Isley for delicous food and cold brews! On site today:
          Curry in a Hurry RVARead more on Isley Brewing Company
        </div>
        <hr style={{ marginBottom: '.5rem' }} />
        <div className='rating-review-section'>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <span style={{ marginTop: '.3rem' }}>3</span> &nbsp; &nbsp;
            <ReactStars
              size={20}
              value={3}
              edit={false}
              style={{ display: 'inline-block' }}
            />
          </div>

          <span style={{ marginTop: '.3rem' }}>11 reviews</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
