async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer');
  const footerP = document.createElement('p');
  const currentYear = new Date().getFullYear() - 1;
  const footerText = footerP.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;
  footer.appendChild(footerP);

  // My Work:

  // My first attempt at fetching the data efficiently using the promise.all(). Having been reccomended against it due to the .then() property being trickier I was instructed to simply await both links seperately and combine them through a map and filter process. 

  // Promise for Fetching the data
  // const fetchingData = async () => {
  //   const learnersEndPoint = axios.get('http://localhost:3003/api/learners');
  //   const mentorsEndPoint = axios.get('http://localhost:3003/api/mentors');
  //   const endPoints = await Promise.all([learnersEndPoint, mentorsEndPoint]).then((ele) => ele);

  //   console.log(endPoints[0]);
  // }
  // fetchingData();

  // fetchingData Function Notes
  // Retrieve both urls through a variable
  // Using the promise.all() as recommended to run both at the same time, promise the data of both api's
  // The .then()'s arrow function needs to ...
  // We need to replace the ID numbers of the mentors in the learners data, with the actual names of the mentors from the mentors data. Matching the ID's, and combining it so it is one database to work from. 

  // Final Fetching Data Code
  const learnersResponse = await axios.get('http://localhost:3003/api/learners');
  const mentorsResponse = await axios.get('http://localhost:3003/api/mentors');

  const learnersWithMentors = learnersResponse.data.map(learner => {
    const mentors = mentorsResponse.data.filter(mentor => learner.mentors.includes(mentor.id));
    const mentorNames = mentors.map(mentor => `${mentor.firstName} ${mentor.lastName}`)
    return {...learner, mentors: mentorNames}
  });

  // console.log(learnersWithMentors);

  // info tag change informing there is no learner selected
  const info = document.querySelector('.info');
  info.textContent = 'No learner is selected';

  // Selected Elements
  const cards = document.querySelector('.cards');

  // function to make each learner card
  const cardCreator = learnersWithMentors.forEach((learner) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const learnerName = document.createElement('h3');
    learnerName.textContent = `${learner.fullName}`;

    const learnerEmail = document.createElement('div');
    learnerEmail.textContent = `${learner.email}`

    const learnerMentors = document.createElement('h4');
    learnerMentors.classList.add('closed');
    learnerMentors.textContent = 'Mentors';

    const ul = document.createElement('ul');

    learner.mentors.forEach((mentor) => {
      const li = document.createElement('li');
      li.textContent = `${mentor}`;
      ul.appendChild(li);
    });
    
    // const liOne = document.createElement('li');
    // const liTwo = document.createElement('li');
    // liOne.textContent = `${learner.mentors[0]}`;
    // liTwo.textContent = `${learner.mentors[1]}`;
    // console.log(liOne);
    // ul.appendChild(liOne);
    // ul.appendChild(liTwo);
    learnerMentors.before(ul);


    card.appendChild(learnerName);
    card.appendChild(learnerEmail);
    card.appendChild(learnerMentors);
    card.appendChild(ul);
    cards.appendChild(card);

    //selecting and deselecting cards by clicking the card
    card.addEventListener('click', () => {
      const selected = document.querySelectorAll('.card.selected');
      console.log(selected);
      if(card.classList.length === 1) {
        selected.forEach((selCard) => {
          selCard.classList.remove('selected');
        })
        card.classList.add('selected');
        learnerName.textContent = `${learner.fullName}, ID ${learner.id}`;
        info.textContent = `The selected learner is ${learner.fullName}`;
        console.log(card.classList);
      } else if(card.classList[1] === 'selected') {
        card.classList.remove('selected');
        learnerName.textContent = `${learner.fullName}`;
        info.textContent = 'No learner is selected'
      } 
      

  });
      //Mentors dropdown listener
      learnerMentors.addEventListener('click', () => {
      console.log(learnerMentors.classList);
      if(learnerMentors.classList[0] === 'closed') {
        console.log(learnerMentors.classList[0]);
        learnerMentors.classList.remove('closed');
        learnerMentors.classList.add('open');
        card.appendChild(ul);
      } else if(learnerMentors.classList[0] === 'open') {
        learnerMentors.classList.remove('open');
        learnerMentors.classList.add('closed');
        // card.removeChild(ul);
      }
    });
  })

    

    

  // const cardCreatorn = () => {
  //   for(let i = 0; i < learnersWithMentors.length; i++) {
  //     const card = document.createElement('div');
  //     card.classList.add('card');
  //     const learnerName = document.createElement('h3');
  //     learnerName.textContent = `${learnersWithMentors[i].fullName}`;
  //     const learnerEmail = document.createElement('div');
  //     learnerEmail.textContent = 'learneremail@somemail.com';
  //     const learnerMentors = document.createElement('h4');
  //     learnerMentors.classList.add('closed');
  //     learnerMentors.textContent = "Learner's Mentors";
  //     const ul = document.createElement('ul');
  //     const li = 
  //   }
  // };

  // cardCreator Function Notes
  // Temporarily hard coded until I can incorporate the ability to access the data to insert into each card. 
  // We need to make the div, and add the class name card 
  // Next we need to make the h3 and add the text content of the learners name
  // Next we need to make another div and add the text content of the learners email
  // Next we need to make an h4 and add the class name of closed
  // Next we need to make a ul, and two li's each with the mentors names, appending the li's to the ul as it's children
  // Finally we can append the h3, the email div, the h4, and the ul to the card div as its children, and append the card div with all the information to the div with the class name of cards. 
  
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
