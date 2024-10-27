const container = document.querySelector(".container");
const btn = document.querySelector(".btn-start");
const text = document.querySelector(".text");

btn.addEventListener("click", handleClick);

function handleClick() {
  btn.disabled = true;
  text.textContent = "";
  const promises = [...container.children].map(() => {
    return new Promise((resolve, reject) => {
      const res = Math.random();

      if (res > 0.5) {
        resolve("🥶");
      } else {
        reject("😈");
      }
    });
  });

  Promise.allSettled(promises).then((data) => {
    const isWinner =
      data.every((item) => item.status === "fulfilled") ||
      data.every((item) => item.status === "rejected");

    data.forEach((item, i) => {
      container.children[i].textContent = "";

      setTimeout(() => {
        container.children[i].textContent = item.reason || item.value;

        if (i === data.length - 1) {
          text.textContent = isWinner ? "Winner" : "Loser";
          btn.disabled = false;
        }
      }, 1000 * (i + 1));
    });
  });
}
