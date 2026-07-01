/**
 * app.js — DFA Workshop frontend logic.
 *
 * This talks to the Spring Boot backend (see /backend) via fetch() for
 * section metadata. If the API isn't running (e.g. this file is opened
 * directly, or the backend is offline), it falls back to the local
 * LABELS/SEC_TRACK constants below so the page still works standalone.
 */

const API_BASE = 'http://localhost:8080/api/v1';

var LABELS = {
  "ap-cell1": "Cell 1 — Setup & Libraries",
  "ap-cell2": "Cell 2 — Variables & Lists",
  "ap-cell3": "Cell 3 — DataFrames",
  "ap-cell4": "Cell 4 — Your First Chart",
  "ap-cell67": "Cells 6 & 7 — Real Data",
  "ap-final": "Final Visualization"
};

// Fetch authoritative labels from the Java backend on load; silently keep
// the local fallback above if the request fails (offline / static hosting).
async function loadSectionLabelsFromApi() {
  try {
    const res = await fetch(API_BASE + '/sections');
    if (!res.ok) return;
    const sections = await res.json();
    sections.forEach(function (s) {
      if (s.audioTrackId) LABELS[s.audioTrackId] = s.audioTrackLabel;
    });
  } catch (err) {
    console.info('DFA Workshop API not reachable, using local labels.', err);
  }
}
loadSectionLabelsFromApi();

let current = -1;
function goHome() {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById('about-section').classList.remove('active');
  document.getElementById('hero-section').style.display = 'block';
  document.querySelectorAll('.nav-step').forEach(s => s.classList.remove('active','done'));
  document.getElementById('nav-home').classList.add('active');
  document.getElementById('progressFill').style.width = '0%';
  current = -1;
  document.querySelector('.nav-cta').textContent = 'Start workshop';
  window.scrollTo({top:0, behavior:'smooth'});
}
function goAbout() {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById('hero-section').style.display = 'none';
  document.getElementById('about-section').classList.add('active');
  document.querySelectorAll('.nav-step').forEach(s => s.classList.remove('active','done'));
  document.getElementById('nav-about').classList.add('active');
  document.getElementById('progressFill').style.width = '0%';
  current = -1;
  document.querySelector('.nav-cta').textContent = 'Start workshop';
  window.scrollTo({top:0, behavior:'smooth'});
}
function goTo(n) {
  document.getElementById('hero-section').style.display = 'none';
  document.getElementById('about-section').classList.remove('active');
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('sec-' + n);
  if (target) target.classList.add('active');
  document.querySelectorAll('.nav-step[data-step]').forEach(s => {
    const i = parseInt(s.dataset.step);
    s.classList.remove('active','done');
    if (i < n) s.classList.add('done');
    else if (i === n) s.classList.add('active');
  });
  document.getElementById('nav-home').classList.remove('active');
  document.getElementById('progressFill').style.width = ((n+1)/5*100) + '%';
  current = n;
  document.querySelector('.nav-cta').textContent = 'Restart workshop';
  window.scrollTo({top:0, behavior:'smooth'});
}
function copyCode(btn) {
  const text = btn.closest('.code-block').querySelector('.code-body').innerText;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy', 2000);
  });
}



document.addEventListener('keydown', e => {
  if (current === -1) return;
  if (e.key === 'ArrowRight' && current < 4) goTo(current + 1);
  if (e.key === 'ArrowLeft'  && current > 0) goTo(current - 1);
});
(function() {
  const slab = document.getElementById('slab');
  let drag = false, lx, ly, rx = -10, ry = 20;
  slab.addEventListener('mousedown', e => { drag=true; lx=e.clientX; ly=e.clientY; });
  document.addEventListener('mousemove', e => {
    if (!drag) return;
    ry += (e.clientX-lx)*0.5; rx -= (e.clientY-ly)*0.5;
    slab.style.transform = 'rotateX('+rx+'deg) rotateY('+ry+'deg)';
    lx=e.clientX; ly=e.clientY;
  });
  document.addEventListener('mouseup', () => drag=false);
  slab.addEventListener('touchstart', e=>{drag=true;lx=e.touches[0].clientX;ly=e.touches[0].clientY;},{passive:true});
  document.addEventListener('touchmove', e=>{
    if(!drag)return;
    ry+=(e.touches[0].clientX-lx)*0.5;rx-=(e.touches[0].clientY-ly)*0.5;
    slab.style.transform='rotateX('+rx+'deg) rotateY('+ry+'deg)';
    lx=e.touches[0].clientX;ly=e.touches[0].clientY;
  },{passive:true});
  document.addEventListener('touchend',()=>drag=false);
  document.getElementById('nav-home').classList.add('active');
})();
(function(){
  var LABELS = {
  "ap-cell1": "Cell 1 — Setup & Libraries",
  "ap-cell2": "Cell 2 — Variables & Lists",
  "ap-cell3": "Cell 3 — DataFrames",
  "ap-cell4": "Cell 4 — Your First Chart",
  "ap-cell67": "Cells 6 & 7 — Real Data",
  "ap-final": "Final Visualization"
};
  var SUBS   = {
  "ap-cell1": [{"s":0,"e":10,"t":"Hello, my name is Anirudh Moholkar, and today I'm going to be guiding you through this Design for America workshop on data design using Python."},{"s":10,"e":13,"t":"So first off, let's talk about what we're looking at here."},{"s":13,"e":18,"t":"This is Google colab, and it's honestly a bit of a miracle."},{"s":18,"e":28,"t":"A decade ago, doing serious data work meant installing Python, finding dependency conflicts for an hour, and probably, honestly, just giving up."},{"s":28,"e":31,"t":"Now, it runs in your browser and it's backed by Google's servers."},{"s":31,"e":38,"t":"You don't need to install anything, and we just use these libraries to do most of our work."},{"s":38,"e":44,"t":"So the four libraries that we'll be using are right here, as you can see on your screen."},{"s":44,"e":56,"t":"The first one is Matplotlib, and it was created in 2003 by a neuroscientist named John Hunter who wanted to replicate MATLAB plots in Python."},{"s":56,"e":63,"t":"It's the engine under almost every Python chart you've ever seen."},{"s":63,"e":78,"t":"Next is Seaborn wraps and this wraps Matplotlib and handles the aesthetics automatically, choosing sensible colors, spacing and font, so you spend less time fighting the defaults, and more time thinking about your data."},{"s":78,"e":86,"t":"Next is NumPy. You might have heard about this before, but this is basically the math behind our graphs."},{"s":86,"e":95,"t":"NumPy is short for numerical Python, and it gives you fast math on entire arrays at once, and then finally, is Pandas."},{"s":95,"e":100,"t":"And unfortunately, this isn't named after the animal, it's named after panel data."},{"s":100,"e":105,"t":"It's the reason why Python became the language of data scientists."},{"s":105,"e":99999,"t":"When this cell runs, you'll see a checkmark, and that means that you're connected to the same tool chain used at NASA, the New York Times and every major research university. So that's just what's going on here."}],
  "ap-cell2": [{"s":0,"e":7,"t":"Awesome. Well, now that we have our libraries downloaded, let's go over some of the Python basics."},{"s":7,"e":22,"t":"So first off, this is a variable we have university equal to UIUC, and that just means that whenever Python accesses the variable University, we'll get what's actually stored at that variable called UIUC."},{"s":22,"e":28,"t":"Next is another variable called semester, and for this example, it's fall 2024."},{"s":28,"e":35,"t":"And finally, is our integer variable, and that's the total number of courses, and we set to six."},{"s":35,"e":40,"t":"Now we can print all of these and we see exactly what's stored in each of those variables."},{"s":40,"e":46,"t":"Now getting into something a bit more complicated, these are arrays."},{"s":46,"e":48,"t":"So we have an array of strings."},{"s":48,"e":53,"t":"Strings just mean a combination of characters."},{"s":53,"e":63,"t":"So here we have a few example courses like ART 101, CS 101 and MATH 231, and then we have an array of integers."},{"s":63,"e":75,"t":"Here, they're examples of GPAs that students may have, like a 3.7 or a 4.0 so the main idea with arrays is that they're zero indexed."},{"s":75,"e":85,"t":"This often trips a lot of people up, but it just means that the first element, instead of being referred to as the one-th element, it's referred to as the zero-th element."},{"s":85,"e":97,"t":"So if we did courses zero, that gives us ART 101, and finally, another important function that you probably know of already is the average, the mean."},{"s":97,"e":101,"t":"And the mean is nothing but the sum divided by the length."},{"s":101,"e":117,"t":"So we can use these built in functions — and Python is really cool because it does have a lot of those built in functions — but here we're using sum, and we're using length, and this gets us the sum of all the items in grades and divided by the length of the array of grades."},{"s":117,"e":99999,"t":"That just throws back the average GPA out of all the numbers in this set."}],
  "ap-cell3": [{"s":0,"e":2,"t":"With the basics out of the way."},{"s":2,"e":6,"t":"Now we can take a look at what pandas is doing for us."},{"s":6,"e":19,"t":"Now this is referred to as a hash map, but in pandas it's also known as a data frame. It's just attributes corresponding with the entries that we have for each of them."},{"s":19,"e":26,"t":"So here we have name major year, GPA and credits, and for each we have an array corresponding to it."},{"s":26,"e":35,"t":"So with pandas, we can also access descriptions, which is really useful."},{"s":35,"e":41,"t":"So instead of having our little computation that we did in the last cell with the sum divided by the length."},{"s":41,"e":47,"t":"Now we can just do, dot mean, and this is where we see the power of these libraries."},{"s":47,"e":52,"t":"A lot of the really commonly used functions are just implemented for us already."},{"s":52,"e":59,"t":"So here we have mean, and the next one is describe, and I want you to look at what that does."},{"s":59,"e":99999,"t":"Think about how that may be working behind the scenes, and imagine how it could be useful to have functions like this that are already pre made for us, that we can just utilize as we analyze data."}],
  "ap-cell4": [{"s":1,"e":6,"t":"The time has come. We're making our first chart. This is monumental."},{"s":6,"e":11,"t":"So the first three lines are all that we need to make our first graph."},{"s":11,"e":18,"t":"And if you look closely, the first word of the first two lines is SNS."},{"s":18,"e":24,"t":"Think back, that is what we imported the seaborn library as."},{"s":24,"e":35,"t":"So this is an example of how we're using those libraries to make our lives a lot easier. So if you read into this line, it just setting up the basics."},{"s":35,"e":46,"t":"We set the X-axis to be the names and the Y-axis to be the GPA. And if we do plot dot show that gives us the visual that we've been waiting for."},{"s":46,"e":53,"t":"Now, a bit of extra code at the bottom that just changes some of the attributes and adds some more detail."},{"s":53,"e":59,"t":"You guys can look into that, but the main idea are the first two lines."},{"s":59,"e":99999,"t":"That is what creates the plot and gets us from nothing to something pretty awesome."}],
  "ap-cell67": [{"s":0,"e":2,"t":"Now things are about to get really crazy."},{"s":2,"e":12,"t":"So now that we know how to create these really awesome looking graphs, it's time to create those graphs for existing data with thousands and thousands of data points."},{"s":12,"e":22,"t":"This is where real data scientists love to work, and this is the part that creates these graphs that everybody loves to see."},{"s":22,"e":29,"t":"So here I got a CSV file, which is nothing but a big file filled with a lot of numerical data."},{"s":29,"e":42,"t":"This file is about grade distributions at UIUC, and all we're doing is loading this file and extracting its data."},{"s":42,"e":52,"t":"The second cell can look a bit overwhelming at first, but a lot of that annoying syntax can actually be done using AI."},{"s":52,"e":59,"t":"What's important is to create the ideas and come up with what you want in your visualizations."},{"s":59,"e":99999,"t":"After that, a lot of the grunt work that seems tedious and annoying can be done pretty well with integrated AI into colab."}],
  "ap-final": [{"s":0,"e":10,"t":"We made it. This is the final visualization of the workshop, and it's a culmination of everything that we've learned throughout this workshop."},{"s":10,"e":14,"t":"And I'm really excited for you guys to see it and understand it."},{"s":14,"e":24,"t":"So it may look like a lot of code at first, but there's four primary sections, one for each of the plots that we're making."},{"s":24,"e":32,"t":"We have a scatter plot, a heat map, a violin, and another bonus one that I want you guys to look into yourself."},{"s":32,"e":39,"t":"So remember, you don't need to understand every single line of code here. A lot of data scientists even don't."},{"s":39,"e":49,"t":"It's about understanding how to create what you want with the libraries and the documentation online."},{"s":49,"e":57,"t":"And trust me, it's a lot easier than it may seem, because almost nobody is writing these lines one letter at a time."},{"s":57,"e":71,"t":"It's a lot of copy and pasting from these awesome visualizations that we have the code for online, and it's a lot of using these development tools like the AI integrated into colab."},{"s":71,"e":79,"t":"So here I want you to go section by section and try to understand how each of these graphs are made."},{"s":79,"e":84,"t":"And after that, I want you to run it and see what we've been working towards."},{"s":84,"e":99999,"t":"This was such a fun workshop to make, and I'm really hoping that you were able to learn something from it. Thank you, and I'll see you again later."}]
};
  var SEC_TRACK = {'sec-0':'ap-cell1','sec-1':'ap-cell2','sec-2':'ap-cell4','sec-3':'ap-cell67','sec-4':'ap-final'};
  var currentId=null, aud=null, minimised=false;
  var floatEl  = document.getElementById('narratorFloat');
  var playBtn  = document.getElementById('narratorPlayBtn');
  var barEl    = document.getElementById('narratorBar');
  var fillEl   = document.getElementById('narratorFill');
  var curEl    = document.getElementById('narratorCur');
  var durEl    = document.getElementById('narratorDur');
  var subsEl   = document.getElementById('narratorSubs');
  var minBtn   = document.getElementById('narratorMinBtn');
  var trackLbl = document.getElementById('narratorTrackLbl');
  var header   = document.getElementById('narratorHeader');
  var PLAY_SVG  = '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M3 2.5a.5.5 0 0 1 .765-.424l10 5.5a.5.5 0 0 1 0 .848l-10 5.5A.5.5 0 0 1 3 13.5z"/></svg>';
  var PAUSE_SVG = '<svg viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/></svg>';
  function fmt(s){s=Math.floor(s||0);return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}
  function trySetDur(){if(aud&&isFinite(aud.duration)&&aud.duration>0)durEl.textContent=fmt(aud.duration);}
  function buildSubs(id){
    subsEl.innerHTML='';
    (SUBS[id]||[]).forEach(function(ln){
      var d=document.createElement('div');
      d.className='narrator-sub-line';
      d.dataset.start=ln.s;d.dataset.end=ln.e;d.textContent=ln.t;
      d.addEventListener('click',function(){if(aud){aud.currentTime=ln.s;aud.play();}});
      subsEl.appendChild(d);
    });
  }
  function loadTrack(id){
    if(id===currentId)return;
    if(aud)aud.pause();
    currentId=id; aud=document.getElementById('aud-'+id);
    trackLbl.textContent=LABELS[id]||id;
    fillEl.style.width='0%'; curEl.textContent='00:00'; durEl.textContent='--:--';
    playBtn.innerHTML=PLAY_SVG;
    buildSubs(id);
    trySetDur();
    ['loadedmetadata','durationchange','canplay','canplaythrough'].forEach(function(ev){aud.addEventListener(ev,trySetDur);});
    if(aud.readyState<2)aud.load();
    if(aud._tu)aud.removeEventListener('timeupdate',aud._tu);
    if(aud._pl)aud.removeEventListener('play',aud._pl);
    if(aud._pa)aud.removeEventListener('pause',aud._pa);
    if(aud._en)aud.removeEventListener('ended',aud._en);
    aud._tu=function(){
      var t=aud.currentTime,d=aud.duration||1;
      fillEl.style.width=(t/d*100)+'%'; curEl.textContent=fmt(t); trySetDur();
      var lines=subsEl.querySelectorAll('.narrator-sub-line'),active=null;
      lines.forEach(function(ln){
        if(t>=+ln.dataset.start&&t<+ln.dataset.end){ln.classList.add('active');active=ln;}
        else ln.classList.remove('active');
      });
      if(active)active.scrollIntoView({block:'nearest',behavior:'smooth'});
    };
    aud._pl=function(){playBtn.innerHTML=PAUSE_SVG;};
    aud._pa=function(){playBtn.innerHTML=PLAY_SVG;};
    aud._en=function(){playBtn.innerHTML=PLAY_SVG;fillEl.style.width='0%';aud.currentTime=0;};
    aud.addEventListener('timeupdate',aud._tu);
    aud.addEventListener('play',aud._pl);
    aud.addEventListener('pause',aud._pa);
    aud.addEventListener('ended',aud._en);
    floatEl.classList.add('visible');
  }
  playBtn.addEventListener('click',function(){if(!aud)return;if(aud.paused)aud.play();else aud.pause();});
  barEl.addEventListener('click',function(e){
    if(!aud||!aud.duration)return;
    var r=barEl.getBoundingClientRect();
    aud.currentTime=((e.clientX-r.left)/r.width)*aud.duration;
  });
  minBtn.addEventListener('click',function(e){
    e.stopPropagation();minimised=!minimised;
    floatEl.classList.toggle('minimised',minimised);
    minBtn.textContent=minimised?'+':'−';
  });
  header.addEventListener('click',function(){
    if(minimised){minimised=false;floatEl.classList.remove('minimised');minBtn.textContent='−';}
  });
 // Helper to update the Nav UI
 function updateNavUI(activeIdOrStep) {
    document.querySelectorAll('.nav-step').forEach(link => {
      link.classList.remove('active');
    });

    if (typeof activeIdOrStep === 'string') {
      var link = document.getElementById(activeIdOrStep);
      if (link) link.classList.add('active');
    } else {
      var stepLink = document.querySelector('.nav-step[data-step="' + activeIdOrStep + '"]');
      if (stepLink) stepLink.classList.add('active');
    }
  }

  window.goHome = function() {
    hideAll();
    document.getElementById('hero-section').style.display = 'block';
    floatEl.classList.remove('visible');
    if(aud) aud.pause();
    updateNavUI('nav-home');
  };

  window.goAbout = function() {
    hideAll();
    document.getElementById('about-section').style.display = 'block';
    floatEl.classList.remove('visible');
    if(aud) aud.pause();
    updateNavUI('nav-about');
  };

  function hideAll() {
    document.getElementById('hero-section').style.display = 'none';
    document.getElementById('about-section').style.display = 'none';
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
  }

  window.goTo = function(n) {
    hideAll();
    var sections = document.querySelectorAll('.section');
    if(sections[n]) sections[n].style.display = 'block';
    
    var tid = SEC_TRACK['sec-' + n];
    if (tid) {
      loadTrack(tid);
      floatEl.classList.add('visible'); 
    }
    
    var fill = document.getElementById('progressFill');
    if(fill) fill.style.width = ((n+1)/5 * 100) + '%';

    updateNavUI(n); 
  };

})(); // Keep this line! It closes the script wrapper
