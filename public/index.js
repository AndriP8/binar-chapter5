const bgImg = document.querySelectorAll(".item");

bgImg.forEach((bg) => {
  bg.addEventListener("click", () => {
    removeBg();
    bg.classList.add("bgClick");
  });
});

function removeBg() {
  bgImg.forEach((bg) => {
    bg.classList.remove("bgClick");
  });
}

function randomNum() {
  const comp = Math.random();
  if (comp < 0.33) return "batu";
  if (comp >= 0.33 && comp < 0.66) return "kertas";
  return "gunting";
}

function result(player, comp) {
  if (player == comp) return "DRAW";
  if (player == "batu") return comp == "kertas" ? "COM WIN" : "PLAYER 1 WIN";
  if (player == "kertas") return comp == "gunting" ? "COM WIN" : "PLAYER 1 WIN";
  if (player == "gunting") return comp == "batu" ? "COM WIN" : "PLAYER 1 WIN";
}

class Games {
  constructor() {
    this.batu = document.querySelector(".item .batu");
    this.kertas = document.querySelector(".item .kertas");
    this.gunting = document.querySelector(".item .gunting");
  }

  draw() {
    const draw = document.querySelectorAll(".results");
    let index = draw.length - 1;
    if (draw[index].textContent === "DRAW") {
      draw[index].classList.add("draw");
    }
  }

  logMatch() {
    const draw = document.querySelectorAll(".results");
    let index = draw.length - 1;
    console.log(`Hasil pertandingan : ${draw[index].textContent}`);
  }
}

class FirstItem extends Games {
  constructor(batu) {
    super(batu);
  }

  firstPick() {
    this.batu.addEventListener("click", () => {
      const firstGame = () => {
        const player = this.batu.className;
        const comp = randomNum();
        const finalResult = result(player, comp);
        console.log(`Item yang di pilih Player : ${player}`);
        setTimeout(() => {
          // get random comp
          const imgCompRandom = document.querySelectorAll(".img-comp");
          let random = Math.floor(Math.random() * imgCompRandom.length);
          let hasil = imgCompRandom[random];
          if (hasil) {
            hasil.setAttribute("src", `assets/${comp}.png`);
            hasil.classList.add("bgClick");
          }
          this.batu.addEventListener("click", () => {
            setTimeout(() => {
              // remove comp background if click other item or click item again in player in delay 0,1 second
              if (hasil.classList.contains("bgClick")) {
                hasil.classList.remove("bgClick");
              }
            }, 100);
          });
          // get the winner
          const referee = document.querySelector(".referee");
          const newResult = document.createElement("p");
          setTimeout(() => {
            newResult.classList.add("results");
            newResult.innerHTML = finalResult;
            referee.append(newResult);
            this.draw();
            this.logMatch();
          }, 200);
        }, 1000);
      };
      firstGame();
    });
  }
}

const firstPick = new FirstItem();
firstPick.firstPick();

class SecondItem extends Games {
  constructor(kertas) {
    super(kertas);
  }
  secondPick() {
    this.kertas.addEventListener("click", () => {
      const firstGame = () => {
        const player = this.kertas.className;
        const comp = randomNum();
        const finalResult = result(player, comp);
        console.log(`Item yang di pilih Player : ${player}`);
        setTimeout(() => {
          // get random comp
          const imgCompRandom = document.querySelectorAll(".img-comp");
          let random = Math.floor(Math.random() * imgCompRandom.length);
          let hasil = imgCompRandom[random];
          if (hasil) {
            hasil.setAttribute("src", `assets/${comp}.png`);
            hasil.classList.add("bgClick");
          }
          this.kertas.addEventListener("click", () => {
            setTimeout(() => {
              // remove comp background if click other item or click item again in player in delay 0,1 second
              if (hasil.classList.contains("bgClick")) {
                hasil.classList.remove("bgClick");
              }
            }, 100);
          });

          const referee = document.querySelector(".referee");
          const newResult = document.createElement("p");
          setTimeout(() => {
            newResult.classList.add("results");
            newResult.innerHTML = finalResult;
            referee.append(newResult);
            this.draw();
            this.logMatch();
          }, 200);
        }, 1000);
      };
      firstGame();
    });
  }
}

const secondPick = new SecondItem();
secondPick.secondPick();

class ThirdItem extends Games {
  constructor(gunting) {
    super(gunting);
  }
  thirdPick() {
    this.gunting.addEventListener("click", () => {
      const firstGame = () => {
        const player = this.gunting.className;
        const comp = randomNum();
        const finalResult = result(player, comp);
        console.log(`Item yang di pilih Player : ${player}`);
        setTimeout(() => {
          // get random comp
          const imgCompRandom = document.querySelectorAll(".img-comp");
          let random = Math.floor(Math.random() * imgCompRandom.length);
          let hasil = imgCompRandom[random];
          if (hasil) {
            hasil.setAttribute("src", `assets/${comp}.png`);
            hasil.classList.add("bgClick");
          }
          this.gunting.addEventListener("click", () => {
            setTimeout(() => {
              // remove comp background if click other item or click item again in player in delay 0,1 second
              if (hasil.classList.contains("bgClick")) {
                hasil.classList.remove("bgClick");
              }
            }, 100);
          });
          // get the winner
          const referee = document.querySelector(".referee");
          const newResult = document.createElement("p");
          setTimeout(() => {
            newResult.classList.add("results");
            newResult.innerHTML = finalResult;
            referee.append(newResult);
            this.draw();
            this.logMatch();
          }, 200);
        }, 1000);
      };
      firstGame();
    });
  }
}

const thirdPick = new ThirdItem();
thirdPick.thirdPick();
