const URL = 'https://official-joke-api.appspot.com/random_joke';

fetch(URL)
    .then((res)=>{
         console.log(res);
         return res.json();
    })
    .then((data)=>{
          console.log(data.setup);
          const setup = document.querySelector('.setup');
          setup.innerHTML= data.setup;
          const punchline = document.querySelector('.punchline');
          setTimeout(()=>{
            punchline.innerHTML= data.punchline
          },5000)
    })