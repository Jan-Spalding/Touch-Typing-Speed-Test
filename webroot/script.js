input = document.getElementById("input");
output = document.getElementById("display");
timer = document.getElementById("timer");
display = document.getElementById("output");

let total = 0, characters = 0,bruh = 0, newArray = [], wordCount = 0, restartValue = false, updateArray = [],spanTop, thousand = false, hundred = true, amountOfWords, time = true, words = false, amountOfTime = 60;

function setThousand() {
  thousand = true
  hundred = false
  document.getElementById("hide").style.display = "none"
  restart()
}

function wording() {
  time = false
  words = true
  timer.style.fontSize = "20px"
  document.getElementById("wordButtons").style.display = "block"
  document.getElementById("timeButtons").style.display = "none";
  document.getElementById("hide").style.display = "none";
  restart()
}

function timing() {
  words = false;
  time = true;
  timer.style.fontSize = "30px"
  document.getElementById("wordButtons").style.display = "none";
  document.getElementById("timeButtons").style.display = "block";
  if (hundred) {
    document.getElementById("hide").style.display = "block";
  }
  restart()
}

function setHundred() {
  thousand = false;
  hundred = true
  if (time) {
    document.getElementById("hide").style.display = "block"
  }
  restart()
}

function scramble() {
  document.getElementById("hide").style.display = "none"
  input.innerHTML = "";
  newArray = [];
  characters = 0;
  total = 0;
  wordCount = 0;
  bruh = 0;
  output.scrollTo(0, 0);
  restartValue = true;
  timer.innerHTML = "60s "
  for (let j = 0; j < 200; j++) {
    let length = Math.floor(Math.random() * 7) + 1;
    let string = "";
    for (let i = 0; i < length; i++) {
      string += String.fromCharCode(97 + Math.floor(Math.random() * 26))
    }
    newArray.push(string)
  }
  addSpan(newArray)
}

const commonWords = [
  'the',     'be',    'of',    'and',    'a',      'to',
  'in',      'he',    'have',  'it',     'that',   'for',
  'they',    'I',     'with',  'as',     'not',    'on',
  'she',     'at',    'by',    'this',   'we',     'you',
  'do',      'but',   'from',  'or',     'which',  'one',
  'would',   'all',   'will',  'there',  'say',    'who',
  'make',    'when',  'can',   'more',   'if',     'no',
  'man',     'out',   'other', 'so',     'what',   'time',
  'up',      'go',    'about', 'than',   'into',   'could',
  'state',   'only',  'new',   'year',   'some',   'take',
  'come',    'these', 'know',  'see',    'use',    'get',
  'like',    'then',  'first', 'any',    'work',   'now',
  'may',     'such',  'give',  'over',   'think',  'most',
  'even',    'find',  'day',   'also',   'after',  'way',
  'many',    'must',  'look',  'before', 'great',  'back',
  'through', 'long',  'where', 'much',   'should', 'well',
  'people',  'down',  'own',   'just',   'because','good',   
  'each',    'those', 'feel',  'seem',   'how',    'high',    
  'too',     'place', 'little','world',  'very',   'still',   
  'nation',  'hand',  'old',   'life',   'tell',   'write',   
  'become',  'here',  'show',  'house',  'both',   'between', 
  'need',    'mean',  'call',  'develop','under',  'last',    
  'right',   'move',  'thing', 'general','school', 'never',  
  'same',    'another','begin','while',  'number', 'part',    
  'turn',    'real',  'leave', 'might',  'want',   'point',   
  'form',    'off',   'child', 'few',    'small',  'since',   
  'against', 'ask',   'late',  'home',   'interest','large',   
  'person',  'end',   'open',  'public', 'follow', 'during',  
  'present', 'without','again', 'hold',  'govern', 'around',  
  'possible','head',  'consider','word', 'program','problem', 
  'however', 'lead',  'system','set',    'order',  'eye',    
  'plan',    'run',   'keep',  'face',   'fact',   'group',   
  'play',    'stand', 'increase','early','course', 'change',  
  'help',    'line'
];

const thousandWords = [
  'a',         'ability',    'able',      'about',      'above',     
  'accept',    'according',  'account',   'across',     'act',     
  'action',    'activity',   'actually',  'add',        'address',   
  'administration','admit',  'adult',     'affect',     'after',
  'again',     'against',    'age',       'agency',     'agent',     
  'ago',       'agree',      'agreement', 'ahead',      'air',      
  'all',       'allow',      'almost',    'alone',      'along',     
  'already',   'also',       'although',  'always',     'American',
  'among',     'amount',     'analysis',  'and',        'animal',   
  'another',   'answer',     'any',       'anyone',     'anything', 
  'appear',    'apply',      'approach',  'area',       'argue',     
  'arm',       'around',     'arrive',    'art',        'article',
  'artist',    'as',         'ask',       'assume',     'at',        
  'attack',    'attention',  'attorney',  'audience',   'author',   
  'authority', 'available',  'avoid',     'away',       'baby',      
  'back',      'bad',        'bag',       'ball',       'bank',
  'bar',       'base',       'be',        'beat',       'beautiful', 
  'because',   'become',     'bed',       'before',     'begin',    
  'behavior',  'behind',     'believe',   'benefit',    'best',      
  'better',    'between',    'beyond',    'big',        'bill',
  'billion',   'bit',        'black',     'blood',      'blue',
  'board',     'body',       'book',      'born',       'both',
  'box',       'boy',        'break',     'bring',      'brother',
  'budget',    'build',      'building',  'business',   'but',
  'buy',       'by',         'call',      'camera',     'campaign',
  'can',       'cancer',     'candidate', 'capital',    'car',
  'card',      'care',       'career',    'carry',      'case',
  'catch',     'cause',      'cell',      'center',     'central',
  'century',   'certain',    'certainly', 'chair',      'challenge',
  'chance',    'change',     'character', 'charge',     'check',
  'child',     'choice',     'choose',    'church',     'citizen',
  'city',      'civil',      'claim',     'class',      'clear',
  'clearly',   'close',      'coach',     'cold',       'collection',
  'college',   'color',      'come',      'commercial', 'common',
  'community', 'company',    'compare',   'computer',   'concern',
  'condition', 'conference', 'Congress',  'consider',   'consumer',
  'contain',   'continue',   'control',   'cost',       'could',
  'country',   'couple',     'course',    'court',      'cover',
  'create',    'crime',      'cultural',  'culture',    'cup',
  'current',   'customer',   'cut',       'dark',       'data',
  'daughter',  'day',        'dead',      'deal',       'death',       
  'debate',    'decade',     'decide',    'decision',   'deep',        
  'defense',   'degree',     'Democrat',  'democratic', 'describe',      
  'design',    'despite',    'detail',    'determine',  'develop',
  'development','die',       'difference','different',  'difficult',  
  'dinner',    'direction',  'director',  'discover',   'discuss',     
  'discussion','disease',    'do',        'doctor',     'dog',       
  'door',      'down',       'draw',      'dream',      'drive',     
  'drop',      'drug',       'during',    'each',       'early',     
  'east',      'easy',       'eat',       'economic',   'economy',   
  'edge',      'education',  'effect',    'effort',     'eight',     
  'either',    'election',   'else',      'employee',   'end',       
  'energy',    'enjoy',      'enough',    'enter',      'entire',    
  'environment','environmental','especially','establish','even',      
  'evening',   'event',      'ever',      'every',      'everybody', 
  'everyone',  'everything', 'evidence',  'exactly',    'example',   
  'executive', 'exist',      'expect',    'experience', 'expert',    
  'explain',   'eye',        'face',      'fact',       'factor',    
  'fail',      'fall',       'family',    'far',        'fast',      
  'father',    'fear',       'federal',   'feel',       'feeling',
  'few',     'field',      'fight',   'figure',     'fill',
  'film',    'final',      'finally', 'financial',  'find',
  'fine',    'finger',     'finish',  'fire',       'firm',
  'first',   'fish',       'five',    'floor',      'fly',
  'focus',   'follow',     'food',    'foot',       'for',
  'force',   'foreign',    'forget',  'form',       'former',
  'forward', 'four',       'free',    'friend',     'from',
  'front',   'full',       'fund',    'future',     'game',
  'garden',  'gas',        'general', 'generation', 'get',
  'girl',    'give',       'glass',   'go',         'goal',
  'good',    'government', 'great',   'green',      'ground',
  'group',   'grow',       'growth',  'guess',      'gun',
  'guy',     'hair',       'half',    'hand',       'hang',
  'happen',  'happy',      'hard',    'have',       'he',
  'head',    'health',     'hear',    'heart',      'heat',
  'heavy',   'help',       'her',     'here',       'herself',
  'high',    'him',        'himself', 'his',        'history',
  'hit',     'hold',       'home',    'hope',       'hospital',
  'hot',     'hotel',      'hour',    'house',      'how',
  'however', 'huge',       'human',   'hundred',    'husband',
  'I',           'idea',        'identify',    'if','image',       
  'imagine',     'impact',      'important','improve',     'in',          
  'include',     'including','increase',    'indeed',      'indicate',    
  'individual','industry',    'information', 'inside',      'instead',
  'institution', 'interest',    'interesting', 'international','interview',   
  'into',        'investment',  'involve','issue',       'it',          
  'item',        'its','itself',      'job',         'join',        
  'just','keep',        'key',         'kid',         'kill',
  'kind',        'kitchen',     'know',        'knowledge','land',        
  'language',    'large',       'last','late',        'later',       
  'laugh',       'law','lawyer',      'lay',         'lead',        
  'leader', 'learn',       'least',       'leave',       'left',
  'leg',         'legal',       'less',        'let','letter',      
  'level',       'lie',         'life','light',       'like',        
  'likely',      'line','list',        'listen',      'little',      
  'live','local',       'long',        'look',        'lose',
  'loss',        'lot',         'love',        'low','machine',     
  'magazine',    'main',        'maintain','major',       'majority',    
  'make',        'man','manage',      'management',  'manager',     
  'many','market',      'marriage',    'material',    'matter',
  'may',       'maybe',    'me',      'mean',         'measure',
  'media',     'medical',  'meet',    'meeting',      'member',
  'memory',    'mention',  'message', 'method',       'middle',
  'might',     'military', 'million', 'mind',         'minute',
  'miss',      'mission',  'model',   'modern',       'moment',
  'money',     'month',    'more',    'morning',      'most',
  'mother',    'mouth',    'move',    'movement',     'movie',
  'Mr',        'Mrs',      'much',    'music',        'must',
  'my',        'myself',   'name',    'nation',       'national',
  'natural',   'nature',   'near',    'nearly',       'necessary',
  'need',      'network',  'never',   'new',          'news',
  'newspaper', 'next',     'nice',    'night',        'no',
  'none',      'nor',      'north',   'not',          'note',
  'nothing',   'notice',   'now',     "n't",          'number',
  'occur',     'of',       'off',     'offer',        'office',
  'officer',   'official', 'often',   'oh',           'oil',
  'ok',        'old',      'on',      'once',         'one',
  'only',      'onto',     'open',    'operation',    'opportunity',
  'option',    'or',       'order',   'organization', 'other',
  'others',    'our',      'out',     'outside',      'over',
  'own',          'owner',     'page',        'pain',        'painting',
  'paper',        'parent',    'part',        'participant', 'particular',
  'particularly', 'partner',   'party',       'pass',        'past',
  'patient',      'pattern',   'pay',         'peace',       'people',
  'per',          'perform',   'performance', 'perhaps',     'period',
  'person',       'personal',  'phone',       'physical',    'pick',
  'picture',      'piece',     'place',       'plan',        'plant',
  'play',         'player',    'PM',          'point',       'police',
  'policy',       'political', 'politics',    'poor',        'popular',
  'population',   'position',  'positive',    'possible',    'power',
  'practice',     'prepare',   'present',     'president',   'pressure',
  'pretty',       'prevent',   'price',       'private',     'probably',
  'problem',      'process',   'produce',     'product',     'production',
  'professional', 'professor', 'program',     'project',     'property',
  'protect',      'prove',     'provide',     'public',      'pull',
  'purpose',      'push',      'put',         'quality',     'question',
  'quickly',      'quite',     'race',        'radio',       'raise',
  'range',        'rate',      'rather',      'reach',       'read',
  'ready',        'real',      'reality',     'realize',     'really',
  'reason',       'receive',   'recent',      'recently',    'recognize',
  'record',      'red',        'reduce',       'reflect','region',      
  'relate',     'relationship', 'religious','remain',      'remember',   
  'remove',       'report','represent',   'Republican', 'require',      
  'research','resource',    'respond',    'response',     'responsibility',
  'rest',        'result',     'return',       'reveal','rich',        
  'right',      'rise',         'risk','road',        'rock',       
  'role',         'room','rule',        'run',        'safe',         
  'same','save',        'say',        'scene',        'school',
  'science',     'scientist',  'score',        'sea','season',      
  'seat',       'second',       'section','security',    'see',        
  'seek',         'seem','sell',        'send',       'senior',       
  'sense','series',      'serious',    'serve',        'service',
  'set',         'seven',      'several',      'sex','sexual',      
  'shake',      'share',        'she','shoot',       'short',      
  'shot',         'should','shoulder',    'show',       'side',        
  'sign','significant', 'similar',    'simple',       'simply',
  'since',       'sing',       'single',       'sister','sit',         
  'site',       'situation',    'six','size',        'skill',      
  'skin',         'small','smile',       'so',         'social',       
  'society','soldier',     'some',       'somebody',     'someone',
  'something',  'sometimes', 'son',        'song',       'soon',
  'sort',       'sound',     'source',     'south',      'southern',
  'space',      'speak',     'special',    'specific',   'speech',
  'spend',      'sport',     'spring',     'staff',      'stage',
  'stand',      'standard',  'star',       'start',      'state',
  'statement',  'station',   'stay',       'step',       'still',
  'stock',      'stop',      'store',      'story',      'strategy',
  'street',     'strong',    'structure',  'student',    'study',
  'stuff',      'style',     'subject',    'success',    'successful',
  'such',       'suddenly',  'suffer',     'suggest',    'summer',
  'support',    'sure',      'surface',    'system',     'table',
  'take',       'talk',      'task',       'tax',        'teach',
  'teacher',    'team',      'technology', 'television', 'tell',
  'ten',        'tend',      'term',       'test',       'than',
  'thank',      'that',      'the',        'their',      'them',
  'themselves', 'then',      'theory',     'there',      'these',
  'they',       'thing',     'think',      'third',      'this',
  'those',      'though',    'thought',    'thousand',   'threat',
  'three',      'through',   'throughout', 'throw',      'thus',
  'time',       'to',        'today',      'together',   'tonight', 
  'too',     'top',       'total',       'tough',    'toward',
  'town',    'trade',     'traditional', 'training', 'travel',
  'treat',   'treatment', 'tree',        'trial',    'trip',
  'trouble', 'true',      'truth',       'try',      'turn',
  'TV',      'two',       'type',        'under',    'understand',
  'unit',    'until',     'up',          'upon',     'us',
  'use',     'usually',   'value',       'various',  'very',
  'victim',  'view',      'violence',    'visit',    'voice',
  'vote',    'wait',      'walk',        'wall',     'want',
  'war',     'watch',     'water',       'way',      'we',
  'weapon',  'wear',      'week',        'weight',   'well',
  'west',    'western',   'what',        'whatever', 'when',
  'where',   'whether',   'which',       'while',    'white',
  'who',     'whole',     'whom',        'whose',    'why',
  'wide',    'wife',      'will',        'win',      'wind',
  'window',  'wish',      'with',        'within',   'without',
  'woman',   'wonder',    'word',        'work',     'worker',
  'world',   'worry',     'would',       'write',    'writer',
  'wrong',   'yard',      'yeah',        'year',     'yes',
  'yet',     'you',       'young',       'your',     'yourself'
]

//wordCount.toString().search("0") > 0
function inputWords(event) {
  bruh++;
  if (event.keyCode == 32) { //Space
    let word = input.textContent;
    input.innerHTML = "";
    event.preventDefault;
    wordCount++;
    if (words) {
      if (amountOfWords == undefined) {
        amountOfWords = 50;
      }
      document.getElementById("countValue").innerHTML = wordCount + "/" + amountOfWords
      if (wordCount == amountOfWords) {
        updateArray = [];
        outputText()
      }
    }
    let idCount = "id" + wordCount;
    let idCountOFFSET = "id" + (wordCount + 1);
    document.getElementById(idCountOFFSET).style.backgroundColor = "LightGray";
    if (word.trim() == newArray[wordCount - 1]) {
      total++;
      characters += word.trim().length;
      document.getElementById(idCount).style.removeProperty("background-color");
      document.getElementById(idCount).style.color = "green";
      if (document.getElementById(idCountOFFSET).getBoundingClientRect().bottom > 85) {
        while (document.getElementById(idCountOFFSET).getBoundingClientRect().top > spanTop) {
          output.scrollTop += 1;
        }
      }
    } else {
      document.getElementById(idCount).style.removeProperty("background-color");
      document.getElementById(idCount).style.color = "red";
      if (document.getElementById(idCountOFFSET).getBoundingClientRect().bottom > 85) {
        while (document.getElementById(idCountOFFSET).getBoundingClientRect().top > spanTop) {
          output.scrollTop += 1;
        }
      } 
    }
  } else if (bruh == 1) {
    if (time) {
      spanTop = document.getElementById("id1").getBoundingClientRect().top
      startTimer();
    } else if (words) {
      spanTop = document.getElementById("id1").getBoundingClientRect().top
      wordsTimer()
    }

  } 
}

function randomWords() {
  if (hundred) {
    for(let i = 0; i < commonWords.length; i++) {
      let x = Math.floor(Math.random() * commonWords.length);
      newArray.push(commonWords[x]);
    }
    addSpan(newArray)
  } else if (thousand) {
    for (let i = 0; i <= 200; i++) {
      let x = Math.floor(Math.random() * thousandWords.length);
      newArray.push(thousandWords[x]);
    }
    addSpan(newArray)
  }
}

function outputText(updateArray) {
  let text = "";
  let displayArray = updateArray;
  input.focus();
  if (displayArray == undefined) {
    output.innerHTML = "";
  } else {
    text = displayArray.join(' ');
    output.innerHTML = text;
  }
}

function restart() {
  if (time) {
    input.innerHTML = "";
    newArray = [];
    characters = 0;
    total = 0;
    wordCount = 0;
    bruh = 0;
    output.scrollTo(0, 0);
    restartValue = true;
    document.getElementById("countValue").innerHTML = ""
    timer.innerHTML = amountOfTime + "s ";
    randomWords();
  } else if (words) {
    input.innerHTML = "";
    newArray = []
    characters = 0;
    total = 0; 
    wordCount = 0
    bruh = 0;
    output.scrollTo(0, 0);
    restartValue = true;
    if (amountOfWords == undefined) {
      amountOfWords = 50;
    }
    document.getElementById("countValue").innerHTML = "0/" + amountOfWords
    timer.innerHTML = "0:0s "
    randomWords();
  }
}

// Javascript Timer

function startTimer() {
  restartValue = false;
  // Set the date we're counting down to

  let number = amountOfTime * 1000
  number += 1000

  var countDownDate = new Date().getTime() + number;

  // Update the count down every 1 second
  var x = setInterval(function() {

    if (restartValue == true) {
      restartValue = false; 
      clearInterval(x);
      return;
    }
    // Get today's date and time
    var now = new Date().getTime();
      
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
      
    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
    // Output the result in an element with id="demo"
    timer.innerHTML = seconds + "s ";
      
    // If the count down is over, write some text 
    if (distance < 0) {
      clearInterval(x);
      timer.innerHTML = "0s ";
      updateArray = [];
      outputText()
      result();
    }  
  }, 1000);
}

function wordsTimer() {
  restartValue = false
  let seconds = 0;
  let minutes = 0;
  let x = setInterval(function() {
    if (restartValue == true) {
      restartValue = false; 
      clearInterval(x);
      return;
    }

    seconds += 1

    if (seconds >= 60) {
      seconds = 0
      minutes += 1
      return;
    }


    if (wordCount >= amountOfWords) {
      clearInterval(x);
      wordsResult(minutes, seconds)
    }
    timer.innerHTML = minutes + ":" + seconds + "s " 
  }, 1000);
}

function result() {
  let finishTime = 0
  finishTime = amountOfTime / 60
  finishTime = finishTime.toFixed(2)
  let wpm = total / finishTime
  accuracy = (total / wordCount) * 100;
  display.innerHTML = "WPM: " + Math.round(wpm) + "<br>Characters: " + characters + "<br>Accuracy: " + Math.round(accuracy) + "%";
  if (hundred && time && amountOfTime == 60) {
    socket.emit("check", total)
  }
}

function wordsResult(minutes, seconds) {
  let finishTime = 0
  for (let i = 0; i < minutes; i++ ) {
    finishTime += 60
  }
  finishTime += seconds
  finishTime /= 60
  finishTime = finishTime.toFixed(2)
  let wpm = total / finishTime
  accuracy = (total / wordCount) * 100
  display.innerHTML = "WPM: " + Math.round(wpm) + "<br>Characters: " + characters + "<br>Accuracy: " + Math.round(accuracy) + "%";
}

function addSpan(newArray) {
  updateArray = [...newArray];
  var number = 1;
  for (let i = 0; i < updateArray.length; i+=2) {
    updateArray.splice([i], 0, "<span id='id"+ number +"'>");
    number++;
  }
  addEnd(updateArray)
}

function addEnd(updateArray) {
  for (let i = 2; i < updateArray.length; i+=3) {
    updateArray.splice([i], 0, "</span>");
  }
  updateArray.push("</span>");
  outputText(updateArray);
}

background = document.getElementById("background")
slider = document.getElementById("words")

window.addEventListener("load", startup, false);
window.addEventListener("load", wordAmount, false);
window.addEventListener("load", timeAmount, false);

function timeAmount() {
  settime.value = 60;
  settime.addEventListener("input", inputTime, false)
  settime.select()
}

function inputTime(event) {
  let output = document.getElementById("sliderOutputt")
  if (output) {
    output.innerHTML = "Time: " + event.target.value + "s ";
    amountOfTime = event.target.value;
    timer.innerHTML = event.target.value + "s ";
    if (amountOfTime != 60) {
      document.getElementById("hide").style.display = "none";
    } else {
      document.getElementById("hide").style.display = "block"
    }
  }
}

function startup() {
  if (document.cookie == "") {
    background.value = "#FFFFFF" 
  } else { 
    let color = document.cookie.split("=")
    background.value = color[1]
    document.body.style.backgroundColor = color[1]
  }
  background.addEventListener("input", updateBackground, false)
  background.select()
}

function wordAmount() {
  slider.value = 50;
  slider.addEventListener("input", inputWordAmount, false)
  slider.select()
}

function inputWordAmount(event) {
  let output = document.getElementById("sliderOutput")
  if (output) {
    output.innerHTML = "Words: " + event.target.value;
    document.getElementById("countValue").innerHTML = "0/" + event.target.value
    amountOfWords = event.target.value;
  }
}

function updateBackground(event) {
  let p = document.body
  if(p) {
    p.style.backgroundColor = event.target.value;
    document.cookie = "color=" + event.target.value
  }
}



// ------------------ SEVER INPUT -----------------------------


error = document.getElementById("error")

const socket = io()


function userInput() {
  socket.emit("userInput", { myUsername: input1.value, myWPM: total, myAccuracy: Math.round(accuracy) })
  input.focus
}

function clearScore() {
  socket.emit("clearScore", "clear")
}

socket.on("highScore", function(data) {
  addToTable(data)
})


function addToTable(data) {
  for (let i = 0; i < data.length; i++) {
    this["content"+i] = data[i]
  }

  for (let i = 0; i < data.length; i++) {
    let id = "output"+i
    document.getElementById(id).innerHTML = "<br>Username: " + this["content"+i][0] + "<br>WPM: " + this["content"+i][1] + "<br>Accuracy: " + this["content"+i][2]
  }

}

socket.on("error", function(text) {
  error.innerHTML = text
  if (text == "You managed to get on the leaderboard!") {
    error.style.color = "green";
  } else {
    error.style.color = "red";
  }
})

socket.on("clear", () => {
  for (let i = 0; i < 5; i++ ) {
    let id = "output"+i
    document.getElementById(id).innerHTML = "";
  }
})

socket.on("display", function(value) {
  if (value == false) {
    document.getElementsByClassName("title")[0].style.display = "none"
    document.getElementsByClassName("title")[1].style.display = "none"
  } else if (value == true) {
    document.getElementsByClassName("title")[0].style.display = "flex"
    document.getElementsByClassName("title")[1].style.display = "flex"
  }
})