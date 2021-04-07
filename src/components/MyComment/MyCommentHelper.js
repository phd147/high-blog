export default function cssAction() {
  document.getElementById("textfield").addEventListener("focus", function () {
    document
      .getElementById("textfield")
      .classList.add("mycomment__textfield-focused");
    document
      .getElementsByClassName("mycomment__toolbar")[0]
      .classList.add("visible");
      document
        .getElementsByClassName("buffer")[0]
        .classList.add("visible");
  });
}
