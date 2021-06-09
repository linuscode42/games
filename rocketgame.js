  
        let banane = true;
       let KEY_SPACE = false;
       let KEY_DOWN = false;
       let KEY_UP = false;
       let KEY_RIGHT = false;
       let KEY_LEFT = false;
       let KEY_ENTER = false;
       let lebenVorbei = false;
        let ultimative = false;
       let ultimative_waffe = true;

       let canvas;
       let ctx;

       let drwidth = 100;
       let drheight =50;

       let abgeschosseneUfos = 0;
       let kometnscore = 0;
       let feuerballscore = 0;

       let backgroundImage = new Image();
       let backgroundImageTwo = new Image();
       let backgroundImageThree = new Image();

       let zerstörte_Kometn = 0;

       let hallo = false;

       let rocket = {
           x: 50,
           y: 200,
           width: 118.5,
           height: 75,
           src: 'img/rocket.png'
       };
       

       let ufos = new Array();
       let shots = new Array();
       let megashots = new Array();
       let kometen = new Array();
       let heals = new Array();
       let ultis = new Array();
       let flashs = new Array();
       let weapons = new Array();  
       let Images = new Array();
       // Arrays für alle objekte außer der Rakete

    

       document.onkeydown = function(e){
           if(e.keyCode == 32){
               KEY_SPACE = true;
           }
           if(e.keyCode == 96){
               ultimative = true;
           }
           
           if(e.keyCode == 38 || e.keyCode == 87){//UP Arrow gedrückt
               KEY_UP = true;
           }
           if(e.keyCode == 40 || e.keyCode == 83){//DOWN Arrow gedrückt
               KEY_DOWN = true;
           }
           if(e.keyCode == 39 || e.keyCode == 68){//RIGHT Arrow gedrückt
               KEY_RIGHT = true;
           }
           if(e.keyCode == 37 || e.keyCode == 65){//LEFT Arrow gedrückt
               KEY_LEFT = true;
           }
           if(e.keyCode == 13){//LEFT Arrow gedrückt
               KEY_ENTER = true;
           }
       }
       

       document.onkeyup = function(e){
           if(e.keyCode == 32){
               KEY_SPACE = false;
           }
           if(e.keyCode == 38 || e.keyCode == 87){// UP Arrow losgelassen
               KEY_UP = false;
           }
           if(e.keyCode == 40 || e.keyCode == 83){// DOWN Arrow losgelassen
               KEY_DOWN = false;
           }
           if(e.keyCode = 39 || e.keyCode == 68){
               KEY_RIGHT = false;
           }
           if(e.keyCode = 37 || e.keyCode == 65){
               KEY_LEFT = false;
           }
           if(e.keyCode == 13){//LEFT Arrow gedrückt
               KEY_ENTER = false;
           }
           
           if(e.keyCode == 96){
               ultimative = false;
           }
       }
       // Tasten werden geprüft

       

       function startGame(){
// Steuer Funktion
           canvas = document.getElementById('canvas');

           canvas.width = window.innerWidth;
           canvas.height = window.innerHeight;

           // Das canvas nimmt den gesamten platz der Website ein

           ctx = canvas.getContext('2d');

           setTimeout(gewonnen, 60000);
           setTimeout(macheenemiesschneller, 30000);
           loadImages();
           setInterval(update, 1000 / 25);
           setInterval(spawnkometen, 5000);
           setInterval(spawnheals, 7400);
           setInterval(spawnUfos, 620);
           setInterval(spawnshots, 1000 / 25);
           setInterval(checkforulti, 1000 / 25);
           setInterval(spawnflashs, 7400 )
           setTimeout(spawnwaffen, 10000);
           setTimeout(spawnwaffen, 20000);
           setTimeout(spawnwaffen, 30000);
           setInterval(spawnmegashots, 1000 / 25);
           setInterval(pruefeKollision, 1000 / 25);
           animate();
           // alle notwendigen Funktionien werden mit Interval, 
           // Timeout oder einfach so aufgerufen
       }
       
       function spawnwaffen() {
           let weapon = {
                x: 1600,
                y: Math.round(Math.random()*window.innerHeight),
                width: 100,
                height: 70,
                img: new Image(),
                src: 'img/firstweapon.png'
           }
           // Es werden Waffen erschaffen, die man einsammeln kann
           // und man dadurch stärker wird
           weapon.img.src = weapon.src;
           weapons.push(weapon);
       }
       function spawnflashs() {
           let flash = {
            x: 1600,
               y: Math.round(Math.random()*740+0.5),
               width: 80,
               height: 100,
               img: new Image(),
               src: 'img/flash.jpg'
           }
           flash.img.src = flash.src;
           flashs.push(flash);
       }
       
       function spawnheals() {
           let heal = {
               x: 1600,
               y: Math.round(Math.random()*740+0.5),
               width: 80,
               height: 100,
               img: new Image(),
               src: 'img/neuerheal.png'
           }
           heal.img.src = heal.src;
           heals.push(heal);
       }
       
       function spawnmegashots () {
           // Die mega shots werden erschafft
           if(KEY_ENTER){
            let megashot = {
                x: rocket.x + 5,
               y: rocket.y,
               width: drwidth,
               height: drheight,
               img: new Image(),
               src: 'img/klö3.png'
            }
            megashot.img.src = megashot.src;
            megashots.push(megashot)
       }
    }
       
       function spawnkometen () {
           let komet = {
               x: 1800,
               y: Math.round(Math.random()*740+0.5),
               width: 300,
               height: 160,
               img: new Image(),
               src: 'img/pngkomet.png'
           }
           // Die Kometen Werte werden festgelet und in das Array übergeben
           komet.img.src = komet.src;
           kometen.push(komet);

       }
       function spawnshots() {
           if(KEY_SPACE){
           let shot = {
               x: rocket.x + 5,
               y: rocket.y,
               width: drwidth,
               height: drheight,
               img: new Image(),
               src: 'img/lightning.png'
           }
           shot.img.src = shot.src;
           shots.push(shot);
           // Die shots werden festgelegt und in ihr Array übergeben
        }
       }
       function checkforulti() {
            if(ultimative && ultimative_waffe == true){
                rocket.x = 50;
                rocket.y = 10;
                let ulti = {
                    x: rocket.x + 5,
                    y: rocket.y,
                    width: 20,
                    height: canvas.height,
                    img: new Image(),
                    src: 'img/sea.jpg'
                }
                // eine einmalige Waffe wird erschaffen die alles böse wegfetzt
                // man wird auto. an den ort teleportiert der am geeignesten ist
                ulti.img.src = ulti.src;
                ultis.push(ulti);
                ultimative_waffe = false;
            }
       }
       function macheenemiesschneller() {
           canvas = document.getElementById('canvas');
           ctx = canvas.getContext('2d');

           setInterval(spawnUfos, 630);
           // nach einer bestimmten Zeit werden die Feuerbälle schneller
       }
       function gewonnen () {
           alert('you win');
       }
       
      
       function loadImages () {

     backgroundImage.src = 'img/klö2.jpg';
    backgroundImageTwo.src = 'img/background.jpg';
    rocket.img = new Image();
    rocket.img.src = rocket.src;

}

       function pruefeKollision () {

        weapons.forEach(function(weapon){
            if(rocket.x <= weapon.x + weapon.width && rocket.x + rocket.width >= weapon.x && rocket.y <= weapon.y + weapon.height && rocket.y + rocket.height >= weapon.y){
                // wenn die waffe die rakete trifft:
                weapons = weapons.filter( u => u != weapon);
                drheight += 50;
                drwidth += 50; 
                rocket.width -= 20;
                rocket.height -= 20;
                setTimeout(function(){
                    drheight -= 50;
                    drwidth -= 50;
                    rocket.width += 20;
                    rocket.height += 20;
                }, 10000)
            }
        })

        heals.forEach(function(heal){
            if(rocket.x <= heal.x + heal.width && rocket.x + rocket.width >= heal.x && rocket.y <= heal.y + heal.height && rocket.y + rocket.height >= heal.y){
                // wenn rocket und heal kollidieren wird ein leben wieder aufgefrischt
                lebenVorbei = false;
                heals = heals.filter( u => u != heal);
                rocket.img.src = 'img/neuerheal.png';
                setTimeout(function(){
                    rocket.img.src = 'img/rocket.png';
                }, 1500);
            }
        })
           
         ufos.forEach(function(ufo){
             ultis.forEach(function(ulti){
                 if( ulti.x <= ufo.x + ufo.width && ulti.x + ulti.width >= ufo.x && ulti.y <= ufo.y + ufo.height && ulti.y + ulti.height >= ufo.y){
                    // wenn ulti und feuerbal kollidieren wird der feuerball entfernt 
                    ufos = ufos.filter( u => u != ufo);
                 }
             })
           if( rocket.x <= ufo.x + ufo.width && rocket.x + rocket.width >= ufo.x && rocket.y <= ufo.y + ufo.height && rocket.y + rocket.height >= ufo.y ){
               // Es wird geprüft ob raket und Feuerball kollidieren, dann wird der Feuerball entfernt
                ufos = ufos.filter(u => u != ufo);
                alert('Du hast nur noch die Hälfte deiner Leben');
                banane = true;
                setTimeout(function(){
                    lebenVorbei = true;
                });
           }
          
           
           if(rocket.x + rocket.width > ufo.x && rocket.y + rocket.height > ufo.y && rocket.x < ufo.x && rocket.y < ufo.y && lebenVorbei == true){
            // wenn rakete und Feuerball zum zweiten Mal kollidieren dann ist das spiel vorbei   
            rocket.img.src = 'img/explosion.png';
               setTimeout(verloren,300);
           }
           shots.forEach(function(shot){
               if( shot.x <= ufo.x + ufo.width && shot.x + shot.width >= ufo.x && shot.y <= ufo.y + ufo.height && shot.y + shot.height >= ufo.y){
                // Es wird geprüft ob der schuss mit dem feuerball kollidiert und dann wird beides entfernt   
                ufos = ufos.filter( u => u != ufo);
                   shots = shots.filter( u => u != shot);
                   feuerballscore += 1;
                   if(feuerballscore == 5){
                     
                     
                 }
                 // nach einer bestimmten Anzahl getroffener Gegner wird die zahl ausgegeben
                 if(feuerballscore > 10) {
                    lebenVorbei = false;
                    
                    feuerballscore += 1;
                 }
               }
           })
           megashots.forEach(function(megashot){
               if(megashot.x <= ufo.x + ufo.width && megashot.x + megashot.width >= ufo.x && megashot.y <= ufo.y + ufo.height && megashot.y + megashot.height >= ufo.y){
                // es wird geprüft ob megashot und feuerball kollidieren
                ufos.forEach(function(ufo){
                    // wenn megashot und rakete kollidieren wird der feuerball langsamer
                    ufo -= 10;
                })
               }
           })

         });
         megashots.forEach(function(megashot){
         kometen.forEach(function(komet){
             if(rocket.x <= komet.x + komet.width && rocket.x + rocket.width >= komet.x && rocket.y <= komet.y + komet.height && rocket.y + rocket.height >= komet.y){
                console.log('hallo');
                alert('Du hast nur noch die Hälfte deiner Leben');
                 hallo = true;
             }
             // Es wird geprüft ob die rakete mit dem kometen kollidiert
             
             if(megashot.x <= komet.x + komet.width && megashot.x + megashot.width >= komet.x && megashot.y <= komet.y + komet.height && megashot.y + megashot.height >= komet.y){
                 // wenn der megashot und der komet kollidieren passiert das :
                 kometen = kometen.filter( u => u != komet);
                 megashots = megashots.filter( u => u != megashot);
                 kometnscore += 1;
                 if(kometnscore == 5){
                    lebenVorbei = false;
                    // wenn du fünf kometen oder 10 feuerbälle getroffen hast wird falls du es hast, ein verlorenes leben wiederhergestellt 
                    
                     kometnscore += 1;
                 }
                 if(kometnscore == 10) {
                    
                    kometnscore += 1;
                 }
             }
         })
        })
         
         kometen.forEach(function(komet){
             ultis.forEach(function(ulti){
                 if( ulti.x <= komet.x + komet.width && ulti.x + ulti.width >= komet.x && ulti.y <= komet.y + komet.height && ulti.y + ulti.height >= komet.y){
                     kometen = kometen.filter( u => u != komet);
                 }
             })

             if(rocket.x <= komet.x + komet.width && rocket.x + rocket.width >= komet.x && rocket.y <= komet.y + komet.height && rocket.y + rocket.height >= komet.y){
                // ES wird geprüft ob die raket mit einem kometn kollidiert
                rocket.img.src = 'img/explosion.png';
                kometen = kometen.filter( u => u != komet);
                setTimeout(function(){
                    alert('Du wurdest leider von einem Kometen getroffen. Game over');
                }, 500);
             }
         })
            };
       

       function spawnUfos () {
           let ufo = {
           x: 1800,
           y: Math.round(Math.random()*760+0.5),
           width: 150,
           height: 80,
           src: 'img/Feuerball.png',
           img: new Image()
       };
           ufo.img.src = ufo.src;
           ufos.push(ufo);
       }
       


      function update () {
          if(zerstörte_Kometn > 19){
              alert('you win');
          }
          if(KEY_UP && rocket.y > 10){
              rocket.y -= 10;
          }
          if(KEY_DOWN && rocket.y < canvas.height - rocket.height){
              rocket.y += 10;
          }
          
          if(KEY_RIGHT && rocket.x < 1200){
              rocket.x += 100;
          }
          if(KEY_LEFT && rocket.x > 50){
              rocket.x -= 100;
          }
          if(abgeschosseneUfos > 5){
              alert('du bist ein meisterschütze!');
          }
          
          
          shots.forEach(function(shot){
              shot.x += 32;
          })

          ufos.forEach(function(ufo){
               ufo.x -= 20;
          });
          kometen.forEach(function(komet){
              komet.x -= 35;
          })
          megashots.forEach(function(megashot){
              megashot.x += 35;
          })
          heals.forEach(function(heal){
              heal.x -= 30;
          })
          ultis.forEach(function(ulti){
              ulti.x += 10;
          })
          weapons.forEach(function(weapon){
              weapon.x -= 25;
          })
          flashs.forEach(function(flash){
              flash.x -= 30;
              if(rocket.x <= flash.x + flash.width && rocket.x + rocket.width >= flash.x && rocket.y <= flash.y + flash.height && rocket.y + rocket.height >= flash.y){
                flashs.filter( u=> u != flash);
                if(KEY_UP && rocket.y > 10){
              rocket.y -= 10;
          }
          if(KEY_DOWN && rocket.y < canvas.height - rocket.height){
              rocket.y += 10;
          }
          
          if(KEY_RIGHT && rocket.x < 1200){
              rocket.x += 120;
          }
          if(KEY_LEFT && rocket.x > 50){
              rocket.x -= 120;
          }
              }
          })
      }
       function animate() {

            ctx.clearRect(0, 0, canvas.width, canvas.height);

               ctx.drawImage(backgroundImage,0,0);
               ctx.drawImage(rocket.img, rocket.x, rocket.y, rocket.width, rocket.height);

               ufos.forEach(function(ufo) {
                   ctx.drawImage(ufo.img, ufo.x, ufo.y, ufo.width, ufo.height);
               });
               kometen.forEach(function(komet){
                   ctx.drawImage(komet.img, komet.x, komet.y, komet.width, komet.height);
               })
               shots.forEach(function(shot){
                   ctx.drawImage(shot.img, shot.x, shot.y, shot.width, shot.height);
               })
               megashots.forEach(function(megashot){
                   ctx.drawImage(megashot.img, megashot.x, megashot.y, megashot.width, megashot.height);
               })
               heals.forEach(function(heal){
                   ctx.drawImage(heal.img, heal.x, heal.y, heal.width, heal.height);
               })
               ultis.forEach(function(ulti){
                   ctx.drawImage(ulti.img, ulti.x, ulti.y, ulti.width, ulti.height);
               })
               flashs.forEach(function(flash){
                   ctx.drawImage(flash.img, flash.x, flash.y, flash.width, flash.height);
               })
               weapons.forEach(function(weapon){
                   ctx.drawImage(weapon.img, weapon.x, weapon.y, weapon.width, weapon.height);
               })

           requestAnimationFrame(animate);
       }
       function verloren(){
          console.log('verloren');
          alert('Du hast leider verloren');
       }


        
